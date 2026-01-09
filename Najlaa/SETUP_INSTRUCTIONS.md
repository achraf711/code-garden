# Setup Instructions

## Prerequisites
You need **Node.js** installed on your computer.

### Install Node.js (if not already installed):
1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer and follow the instructions
4. **Restart your terminal/computer** after installation

### Verify Installation:
Open a new terminal and run:
```bash
node --version
npm --version
```

You should see version numbers for both commands.

---

## Running the Project

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages (React, Tailwind, Framer Motion, etc.)

### 2. Start Development Server
```bash
npm run dev
```

This will start the Vite development server. You should see output like:
```
  VITE v5.0.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Open in Browser
Copy the URL (usually `http://localhost:5173/`) and paste it in your browser.

---

## Troubleshooting

### If you see a blank page:
1. Check the browser console (F12) for errors
2. Make sure all dependencies installed correctly
3. Try clearing browser cache

### If npm commands don't work:
- Make sure Node.js is installed and you restarted your terminal
- Try using Command Prompt instead of PowerShell, or vice versa

### Common Issues:
- **Port already in use**: Change the port in `vite.config.js` or kill the process using port 5173
- **Dependencies error**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

---

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder. You can deploy this folder to any static hosting service.

