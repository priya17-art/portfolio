import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract styles
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
styles = style_match.group(1) if style_match else ''

# Extract body inner content
body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL)
body_html = body_match.group(1) if body_match else ''

# Clean up html to jsx
jsx = body_html.replace('class="', 'className="')

# Fix onclick to onClick
jsx = re.sub(r'onclick="(.*?)"', r'onClick={() => {\1}}', jsx)

# Fix inline styles (string to object)
def style_to_object(match):
    style_str = match.group(1)
    # Split by semicolon
    props = style_str.split(';')
    obj_props = []
    for prop in props:
        if ':' in prop:
            key, val = prop.split(':', 1)
            key = key.strip()
            val = val.strip()
            # Convert kebab-case to camelCase
            key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
            obj_props.append(f'{key}: "{val}"')
    return 'style={{' + ', '.join(obj_props) + '}}'

jsx = re.sub(r'style="(.*?)"', style_to_object, jsx)

# Fix comments
jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx)

# Fix void elements
void_elements = ['input', 'img', 'br', 'hr', 'meta', 'link']
for tag in void_elements:
    jsx = re.sub(r'<(%s\b[^>]*)(?<!/)>' % tag, r'<\1 />', jsx)

# Insert the photo
photo_jsx = '<div className="av"><img src={heroImg} alt="Kavi Priya" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%"}} /></div>'
jsx = jsx.replace('<div className="av">KP</div>', photo_jsx)

react_code = f"""import React, {{ useEffect }} from "react";
import "./App.css";
import heroImg from "./assets/hero.png";

export default function Portfolio() {{
    useEffect(() => {{
        window.scrollTo = (opts) => {{
            if (typeof opts === "number") window.scroll(0, opts);
            else window.scroll(opts);
        }};
        window.go = (id) => document.getElementById(id)?.scrollIntoView({{behavior: "smooth"}});
        window.toggleMob = () => document.getElementById("mmenu")?.classList.toggle("open");
    }}, []);

    return (
        <div className="lm">
            {{/* The photo is added here */}}
            {jsx}
        </div>
    );
}}
"""

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(react_code)

with open('src/App.css', 'w', encoding='utf-8') as f:
    f.write(styles)
