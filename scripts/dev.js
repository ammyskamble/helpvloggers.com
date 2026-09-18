import { spawn, execSync } from 'child_process';
import process from 'process';
import path from 'path';

const PORT = 4321;

function freePortWindows(port) {
  try {
    const stdout = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    const lines = stdout.trim().split('\n');
    const pids = new Set();

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const state = parts[3];
      const pid = parts[parts.length - 1];
      if ((state === 'LISTENING' || line.includes('LISTENING')) && pid && pid !== '0' && pid !== `${process.pid}`) {
        pids.add(pid);
      }
    }

    for (const pid of pids) {
      try {
        console.log(`[HelpVloggers] Cleaning up lingering process ${pid} on port ${port}...`);
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      } catch (e) {}
    }
  } catch (err) {
    // Port is free
  }
}

// Automatically ensure port is free before starting Vite
if (process.platform === 'win32') {
  freePortWindows(PORT);
}

console.log(`[HelpVloggers] Starting Vite server on http://localhost:${PORT}/ (and http://127.0.0.1:${PORT}/)`);

const viteBin = path.resolve('node_modules/vite/bin/vite.js');

const vite = spawn(process.execPath, [viteBin, '--host', '0.0.0.0', '--port', String(PORT)], {
  stdio: 'inherit'
});

vite.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  vite.kill('SIGTERM');
  process.exit(0);
});
