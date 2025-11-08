# Dark Mode Implementation Guide

## Overview
NutraHubExchange now features a comprehensive dark mode toggle that works across the entire platform. The dark mode system is built with React Context, localStorage persistence, and smooth transitions.

## Features

### ✨ Key Capabilities
- **System Preference Detection**: Automatically detects user's system dark mode preference on first visit
- **Persistent State**: User's dark mode choice is saved in localStorage and persists across sessions
- **Smooth Transitions**: All color changes animate smoothly with 200ms transitions
- **Accessible**: Tooltips explain the toggle functionality
- **Global**: Works across all 46 pages (public, buyer, supplier, admin, shared)

### 🎨 Dark Mode Color Palette
- **Background**: Deep forest black (#0a0f0a)
- **Cards**: Dark charcoal (#111611)
- **Primary**: Vibrant green (#60A444)
- **Secondary**: Light green (#6FB454)
- **Accent**: Forest green (#2F5A29)
- **Borders**: Subtle green tint (rgba(96, 164, 68, 0.15))
- **Text**: Off-white (#f0f4f0)

## Architecture

### Context Provider
Located at `/contexts/ThemeContext.tsx`
```typescript
- ThemeProvider: Wraps the entire app
- useTheme(): Hook to access theme state and toggle function
- isDarkMode: Boolean state
- toggleDarkMode(): Function to switch themes
```

### Implementation Details

#### 1. **App Integration**
The ThemeProvider wraps the entire application in `/App.tsx`:
```tsx
<ThemeProvider>
  <AuthProvider>
    <Router />
    <Toaster />
  </AuthProvider>
</ThemeProvider>
```

#### 2. **Layout Components**
Both PublicLayout and AppLayout include dark mode toggles:
- **PublicLayout**: Toggle in top navigation (desktop) and mobile menu
- **AppLayout**: Toggle in authenticated user header alongside notifications

#### 3. **Global Styles**
Dark mode styles are defined in `/styles/globals.css`:
- CSS custom properties for light and dark themes
- `.dark` class applied to `<html>` element
- Smooth transitions on all color-related properties

## Usage

### For Users
1. **Toggle Location**: Look for the moon/sun icon in the header
   - Moon icon (🌙) = Switch to dark mode
   - Sun icon (☀️) = Switch to light mode
2. **Persistence**: Your choice is automatically saved
3. **System Sync**: On first visit, matches your device's dark mode setting

### For Developers

#### Accessing Theme State
```tsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};
```

#### Using Theme-Aware Colors
Use Tailwind's semantic color classes for automatic dark mode support:
```tsx
// These automatically adapt to dark mode
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="border-border">
```

#### Custom Dark Mode Styles
For component-specific dark mode styles:
```tsx
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-gray-100">Text</p>
</div>
```

## Color System Reference

### Light Mode
| Token | Color | Usage |
|-------|-------|-------|
| `--background` | #ffffff | Page background |
| `--card` | #ffffff | Card backgrounds |
| `--primary` | #4F9C3E | Primary actions, buttons |
| `--secondary` | #60A444 | Secondary elements |
| `--accent` | #2F5A29 | Accents, highlights |
| `--muted` | #ececf0 | Muted backgrounds |
| `--border` | rgba(0,0,0,0.1) | Border colors |

### Dark Mode
| Token | Color | Usage |
|-------|-------|-------|
| `--background` | #0a0f0a | Page background |
| `--card` | #111611 | Card backgrounds |
| `--primary` | #60A444 | Primary actions, buttons |
| `--secondary` | #6FB454 | Secondary elements |
| `--accent` | #2F5A29 | Accents, highlights |
| `--muted` | #1a221a | Muted backgrounds |
| `--border` | rgba(96,164,68,0.15) | Border colors |

## Best Practices

### ✅ DO
- Use semantic color classes (`bg-card`, `text-foreground`, etc.)
- Test components in both light and dark modes
- Ensure sufficient contrast in both themes
- Use the theme context for conditional logic

### ❌ DON'T
- Hardcode color values like `#ffffff` or `black`
- Use `bg-white` or `text-black` (use semantic equivalents)
- Forget to test dark mode on new components
- Override theme colors without good reason

## Browser Support
- Modern browsers with localStorage support
- Graceful fallback to light mode if localStorage unavailable
- System preference detection via `prefers-color-scheme` media query

## Troubleshooting

### Issue: Dark mode not persisting
**Solution**: Check browser's localStorage permissions

### Issue: Colors not changing
**Solution**: Ensure you're using semantic color classes, not hardcoded values

### Issue: Transitions too slow/fast
**Solution**: Adjust transition duration in `globals.css`:
```css
transition-duration: 200ms; /* Adjust this value */
```

## Future Enhancements
- [ ] Per-page theme overrides
- [ ] Theme scheduler (automatic switching)
- [ ] Additional theme variants (e.g., high contrast)
- [ ] Theme preview mode
- [ ] Keyboard shortcut for toggle

---

**Version**: 1.0
**Last Updated**: November 2025
**Maintained By**: NutraHubExchange Development Team
