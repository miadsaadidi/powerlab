const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function deploy() {
  const accessKeysPath = path.resolve(__dirname, '../accesskeys.txt');
  if (!fs.existsSync(accessKeysPath)) {
    console.error('accesskeys.txt not found.');
    process.exit(1);
  }

  const content = fs.readFileSync(accessKeysPath, 'utf8');
  const match = content.match(/vercel_token=([^\r\n]+)/);
  if (!match || !match[1]) {
    console.error('Could not parse vercel_token from accesskeys.txt');
    process.exit(1);
  }

  const token = match[1].trim();

  console.log('Initiating Vercel production deployment...');
  
  // Use spawn with environment variable or arguments without logging the token
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const child = spawn(npxCmd, ['vercel', '--prod', '--yes', '--token', token], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, VERCEL_TOKEN: token },
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
  });

  child.stdout.on('data', (data) => {
    const text = data.toString();
    // Filter out any potential sensitive output
    const safeText = text.replace(new RegExp(token, 'g'), '[REDACTED_TOKEN]');
    process.stdout.write(safeText);
  });

  child.stderr.on('data', (data) => {
    const text = data.toString();
    const safeText = text.replace(new RegExp(token, 'g'), '[REDACTED_TOKEN]');
    process.stderr.write(safeText);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('\nDeployment to Vercel production completed successfully!');
    } else {
      console.error(`\nDeployment exited with code ${code}`);
    }
    process.exit(code);
  });
}

deploy();
