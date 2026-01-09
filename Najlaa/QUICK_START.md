# 🚀 QUICK START GUIDE

## ⚠️ IMPORTANT: You MUST install Node.js first!

### Step 1: Install Node.js
1. **Download Node.js**: Go to https://nodejs.org/
2. **Download the LTS version** (Long Term Support - the green button)
3. **Run the installer** and follow the setup wizard
4. **Restart your computer** after installation

### Step 2: Verify Installation
Open a **NEW** terminal/command prompt and type:
```bash
node --version
npm --version
```

You should see version numbers (like `v20.x.x` and `10.x.x`).

### Step 3: Install Project Dependencies
In the terminal, navigate to this folder and run:
```bash
npm install
```

Wait for it to finish (this may take 1-2 minutes).

### Step 4: Start the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
You'll see output like:
```
➜  Local:   http://localhost:5173/
```

**Copy that URL and paste it in your browser!**

---

## ❌ Common Problems

### "npm is not recognized"
- Node.js is not installed OR
- You didn't restart your terminal/computer after installing Node.js
- **Solution**: Restart your computer, then try again

### "Cannot find module" or installation errors
- Delete the `node_modules` folder (if it exists)
- Delete `package-lock.json` (if it exists)
- Run `npm install` again

### Port 5173 already in use
- Another app is using that port
- **Solution**: Kill the process or change the port in `vite.config.js`

### Blank page in browser
- Check the browser console (Press F12)
- Make sure you're opening the URL from the terminal, NOT the HTML file directly

---

## ✅ What Should Happen

1. Terminal shows: `VITE v5.x.x ready in xxx ms`
2. A URL appears (like `http://localhost:5173/`)
3. You open that URL in your browser
4. You see a beautiful romantic website with:
   - A cute animated character
   - "Hey Najlaa! Will you be my Valentine for 2026?"
   - Two buttons: "Yes! 💕" and "No"

---

## 📝 Need Help?

If you're still having issues:
1. Make sure Node.js is installed: `node --version`
2. Make sure you're in the correct folder
3. Check the terminal for error messages
4. Try opening `test.html` in your browser to see the instructions page

