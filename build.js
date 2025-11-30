// build.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob'); // We need this library to find files

// --- CONFIGURATION ---
const COMPONENT_PATH = './src/UserCard.jsx';
const DATA_PATH = './mock-data.json';

async function buildPreview() {
  console.log("🏗️  Starting Build Process...");

  // 1. FIND CSS FILES (The "Style Sniffer")
  // We look for any .css file in the src folder.
  // In a real project, you might look for 'tailwind.css' or 'App.css' specifically.
  const cssFiles = glob.sync('src/**/*.css');
  
  let cssImports = '';
  if (cssFiles.length > 0) {
    console.log(`🎨 Found ${cssFiles.length} CSS file(s):`, cssFiles);
    // Create import strings: import './src/index.css';
    cssImports = cssFiles.map(file => `import './${file}';`).join('\n');
  } else {
    console.log("⚠️  No CSS files found. Preview might look unstyled.");
  }

  // 2. GENERATE THE REACT WRAPPER
  // We inject the 'cssImports' at the top!
  const entryContent = `
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    ${cssImports}  // <--- CSS IS INJECTED HERE
    import UserCard from '${COMPONENT_PATH}'; 
    import mockData from '${DATA_PATH}';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <div style={{ padding: '20px' }}>
        <h1>Preview: UserCard</h1>
        <hr />
        <br />
        <UserCard {...mockData} />
      </div>
    );
  `;

  fs.writeFileSync('preview-main.jsx', entryContent);
  console.log("✅ Created temporary React entry point with styles.");

  // 3. GENERATE HTML (Standard)
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AI Component Preview</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/preview-main.jsx"></script>
      </body>
    </html>
  `;
  fs.writeFileSync('index.html', htmlContent);

  // 4. RUN VITE
  try {
    console.log("📦 Running Vite Build...");
    execSync('npx vite build', { stdio: 'inherit' }); 
    console.log("🎉 Build Complete!");
  } catch (error) {
    console.error("❌ Build Failed:", error.message);
  }
}

buildPreview();