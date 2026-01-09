# Quick Customization Guide

## Essential Changes

### 1. Change the Name
**File:** `src/App.jsx` (Line 18)
```javascript
const name = 'Najlaa' // Change to the person's name
```

### 2. Add Your Photo
**File:** `src/App.jsx` (Line ~295)
Replace the placeholder URL:
```javascript
src="YOUR_PHOTO_URL_HERE"
// Or if using local file in public folder:
src="/your-photo.jpg"
```

### 3. Add Background Music
**Option A - Local File:**
1. Place your `.mp3` file in the `public` folder
2. **File:** `src/App.jsx` (Line ~95)
```javascript
<source src="/your-music-file.mp3" type="audio/mpeg" />
```

**Option B - Online URL:**
```javascript
<source src="https://your-music-url.mp3" type="audio/mpeg" />
```

### 4. Change GIFs
**File:** `src/App.jsx` (Lines ~115-118)
```javascript
src={showCryingGif 
  ? "YOUR_CRYING_GIF_URL" 
  : "YOUR_HELLO_GIF_URL"
}
```

### 5. Customize Message
**File:** `src/App.jsx` (Lines ~270-290)
Edit the letter content in Stage 3 (The Reveal section)

### 6. Adjust Colors
**File:** `tailwind.config.js`
Modify the `pastel-blue` and `soft-pink` color values

## Tips

- Test the site locally with `npm run dev`
- For production, run `npm run build` and deploy the `dist` folder
- Make sure music files are optimized (not too large)
- Use high-quality images for best results
- Test on mobile devices for responsive design
