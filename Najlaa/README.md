# Najlaa - New Year 2026 Romantic Website 💕

A beautiful, interactive romantic website built with React, Tailwind CSS, and Framer Motion.

## Features

- 🎭 **3 Interactive Stages**: Intro → Envelope → Reveal
- 🎨 **Beautiful Design**: Cute, minimalist aesthetic with pastel colors
- ✨ **Smooth Animations**: Powered by Framer Motion
- 🎊 **Confetti Effects**: Automatic confetti on letter reveal
- 🎵 **Background Music**: Subtle audio player
- 📱 **Fully Responsive**: Mobile-first design
- 😄 **Fun Interactions**: "No" button runs away (literally can't be clicked!)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Customization

### Change the Name
Edit line 15 in `src/App.jsx`:
```javascript
const name = 'Najlaa' // Change to your person's name
```

### Add Your Photo
Replace the placeholder image URL in Stage 3 (around line 260):
```javascript
src="YOUR_PHOTO_URL_HERE"
```

### Add Background Music
1. Place your music file in the `public` folder
2. Update the audio source in `src/App.jsx` (around line 70):
```javascript
<source src="/your-music-file.mp3" type="audio/mpeg" />
```

### Change GIFs
Update the GIF URLs in Stage 1 (around lines 85-87):
```javascript
src={showCryingGif 
  ? "YOUR_CRYING_GIF_URL" 
  : "YOUR_HELLO_GIF_URL"
}
```

## Technologies

- React 18
- Tailwind CSS 3
- Framer Motion
- Canvas Confetti
- Lucide React (icons)
- Vite (build tool)

## License

Made with 💕
