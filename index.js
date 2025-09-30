const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'commits.txt');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Initial content\n', 'utf8');
}

const runCommand = (command) => {
  try {
    const output = execSync(command, { stdio: 'inherit', shell: true });
    return output?.toString();
  } catch (error) {
    console.error(`Error executing command: ${command}`, error.message);
    process.exit(1);
  }
};

const commitCount = 1000;

for (let i = 1; i <= commitCount; i++) {
  fs.appendFileSync(filePath, `Commit number ${i}\n`, 'utf8');

  runCommand(`git add "${filePath}"`);

  runCommand(`git commit -m "Automated commit #${i}"`);
}

runCommand("git push");
console.log(`Successfully created ${commitCount} commits!`);