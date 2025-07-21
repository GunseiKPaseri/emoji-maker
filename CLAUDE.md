# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

emoji-maker is a React-based SPA for creating custom Slack emojis. Users can specify fonts, text, and colors to generate PNG emoji files suitable for Slack.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

### Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Vanilla CSS with CSS Grid/Flexbox
- **Canvas**: HTML5 Canvas API for emoji generation

### Component Structure

- `App.jsx` - Main application with shared state management
- `components/DesignPanel.jsx` - Configuration form (fonts, colors, text, size)
- `components/PreviewPanel.jsx` - Real-time preview and download functionality

### Key Features

- Real-time canvas-based emoji preview
- Configurable font families (Arial, Helvetica, Times New Roman, etc.)
- Color picker for text and background
- Multiple output sizes (64x64 to 512x512)
- PNG download with automatic filename generation

## Development Guidelines

- Canvas rendering is handled in `PreviewPanel` with useEffect hooks
- State management uses React's built-in useState in the main App component
- Responsive design with CSS Grid for desktop/mobile layouts
- Form validation prevents empty text downloads
