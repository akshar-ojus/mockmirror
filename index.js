// index.js
const { execSync } = require('child_process');

console.log("🚀 Starting AI Component Preview...");

try {
  // Step 1: Run the Analyzer
  console.log("\n--- STEP 1: ANALYZING COMPONENT ---");
  // We use 'stdio: inherit' so you see the logs from analyze.js in real-time
  execSync('node analyze.js', { stdio: 'inherit' });

  // Step 2: Run the Builder
  console.log("\n--- STEP 2: BUILDING PREVIEW ---");
  execSync('node build.js', { stdio: 'inherit' });

  console.log("\n✅ DONE! Run 'npx vite preview' to see the result.");

} catch (error) {
  console.error("\n❌ Something went wrong.");
  // The specific error would have been printed by the individual scripts
  process.exit(1);
}