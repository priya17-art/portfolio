const fs = require('fs');

const content = fs.readFileSync('src/App.jsx', 'utf-8');

// Extract styles
const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
const styles = styleMatch ? styleMatch[1] : '';

// Extract body inner content
const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/);
const bodyHtml = bodyMatch ? bodyMatch[1] : '';

// Clean up html to jsx
let jsx = bodyHtml.replace(/class="/g, 'className="');

// Fix onclick to onClick
jsx = jsx.replace(/onclick="(.*?)"/g, (match, p1) => {
    return `onClick={() => {${p1}}}`;
});

// Fix inline styles (string to object)
jsx = jsx.replace(/style="(.*?)"/g, (match, styleStr) => {
    const props = styleStr.split(';');
    const objProps = [];
    for (let prop of props) {
        if (prop.includes(':')) {
            let [key, val] = prop.split(':');
            key = key.trim();
            val = val.trim();
            // Convert kebab-case to camelCase
            key = key.replace(/-([a-z])/g, (m, p1) => p1.toUpperCase());
            objProps.push(`${key}: "${val}"`);
        }
    }
    return `style={{${objProps.join(', ')}}}`;
});

// Fix comments
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Fix void elements
const voidElements = ['input', 'img', 'br', 'hr', 'meta', 'link'];
for (const tag of voidElements) {
    const regex = new RegExp(`(<${tag}\\b[^>]*)(?<!/)>`, 'g');
    jsx = jsx.replace(regex, '$1 />');
}

// Ensure img tags are closed properly (the previous regex might have missed if there is trailing whitespace)
jsx = jsx.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');

// Insert the photo
const photoJsx = '<div className="av"><img src={heroImg} alt="Kavi Priya" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%"}} /></div>';
jsx = jsx.replace('<div className="av">KP</div>', photoJsx);

const reactCode = `import React, { useEffect } from "react";
import "./App.css";
import heroImg from "./assets/hero.png";

export default function Portfolio() {
    useEffect(() => {
        window.scrollTo = (opts) => {
            if (typeof opts === "number") window.scroll(0, opts);
            else window.scroll(opts);
        };
        window.go = (id) => document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
        window.toggleMob = () => document.getElementById("mmenu")?.classList.toggle("open");
    }, []);

    return (
        <div className="lm">
            {/* The photo is added here */}
            ${jsx}
        </div>
    );
}
`;

fs.writeFileSync('src/App.jsx', reactCode, 'utf-8');
fs.writeFileSync('src/App.css', styles, 'utf-8');
