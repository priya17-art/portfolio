const fs = require('fs');

let jsx = fs.readFileSync('src/App.jsx', 'utf-8');

// Remove the script tag and its contents
jsx = jsx.replace(/<script>([\s\S]*?)<\/script>/g, '');

fs.writeFileSync('src/App.jsx', jsx, 'utf-8');
