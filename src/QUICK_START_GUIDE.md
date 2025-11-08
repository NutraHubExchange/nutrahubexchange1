# 🚀 Quick Start Guide - NutraHubExchange

## For New Users

### What Happens When You First Visit

1. **Homepage loads** → Green banner appears at top: *"New to NutraHubExchange? Take a quick tour"*

2. **Onboarding Animation Automatically Plays** (8 scenes, ~60 seconds)
   - Scene 1: Welcome
   - Scene 2: Create Your Account  
   - Scene 3: Buyers Post RFQs
   - Scene 4: Sellers List Inventory
   - Scene 5: AI-Powered Matching
   - Scene 6: Negotiate & Award
   - Scene 7: Track & Deliver
   - Scene 8: Build Trust & Reputation

3. **After Tour**: Click "Get Started" → Never see tour again (stored in browser)

### Can I Skip the Tour?
✅ **Yes!** Click the "X" button or "Skip" at any time.

### Can I Restart the Tour Later?
✅ **Yes!** Go to **Help → Platform Tour** card and click it.

---

## Navigation Overview

### Public Pages (No Login Required)

| Page | Description | URL |
|------|-------------|-----|
| **Home** | Landing page with hero section | `#/` |
| **About** | Company information | `#/about` |
| **Directory** | Browse suppliers (public view) | `#/directory` |
| **NutraSense AI** | AI features showcase | `#/nutrasense-ai` |
| **Blogs** | 10 industry articles | `#/blogs` ⭐ NEW |
| **Help** | FAQ and support | `#/help` |

### Blog Topics

Browse articles about:
- 🌿 **Nutraceuticals** - Market trends, ingredients, research
- 🤖 **AI in Nutraceuticals** - Automation, quality control, matching
- 🌍 **Global Trends** - Worldwide consumption, growth projections
- 💼 **Tariffs & Trade** - Import/export, regulations, sourcing

---

## How to Test First-Time Experience

### Developer Testing

```javascript
// Open browser console (F12)
// Run these commands:
localStorage.removeItem('nutrahub-onboarding-seen');
localStorage.removeItem('nutrahub-banner-dismissed');
location.reload();

// Tour will now play automatically as if first visit
```

### What Gets Saved in Browser

```javascript
// Check what's stored:
console.log(localStorage.getItem('nutrahub-onboarding-seen')); 
// null = haven't seen, 'true' = already seen

console.log(localStorage.getItem('nutrahub-banner-dismissed'));
// null = banner shows, 'true' = banner hidden
```

---

## Key Features

### ✨ Onboarding Tour
- 8 animated scenes
- Auto-advances every 6 seconds
- Manual controls (Next/Previous/Skip)
- Green brand colors (#4F9C3E)
- Professional animations
- Mobile responsive

### 📰 Blogs Page
- 10 professional articles
- Search functionality
- 4 category filters
- High-quality images
- Author info & read times
- Newsletter signup

---

## User Flows

### First-Time Visitor
```
Homepage → Banner → [Start Tour] → 8 Scenes → [Get Started] → Explore Site
         OR [Dismiss Banner] → Explore Site
```

### Returning Visitor
```
Homepage → No banner/tour → Browse as normal
         Can restart tour from Help page if desired
```

### Reading Blogs
```
Click "Blogs" in header → View 10 articles → [Search or Filter] → Read excerpts
```

---

## Quick Links

| Action | How |
|--------|-----|
| Start tour manually | Help → Platform Tour |
| Read industry blogs | Header → Blogs |
| Browse suppliers | Header → Directory |
| Learn about AI | Header → NutraSense AI |
| Get help | Header → Help |
| Sign up | Top right → Sign Up |

---

## Technical Notes

### Browser Compatibility
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Responsive design for all screen sizes

### Performance
- Animations use hardware acceleration
- Images lazy-loaded
- LocalStorage for persistence
- No external API calls for static content

### Privacy
- Only stores UI preferences in localStorage
- No personal data collected during onboarding
- Tour can be restarted/cleared at any time

---

## Common Questions

### Q: Why does the tour play automatically?
**A:** To help first-time visitors understand how the platform works before signing up.

### Q: Can I see the tour again?
**A:** Yes! Go to Help page → Click "Platform Tour"

### Q: Where did the Contact page go?
**A:** Contact was replaced with Blogs. You can still reach support through the Help page.

### Q: How do I stop the banner from showing?
**A:** Click the X button on the banner or click "Start Tour" and complete/skip it.

### Q: Do I need to sign up to read blogs?
**A:** No! Blogs are public and free to read.

---

## Support

Need help?
- 📧 Email: support@nutrahubexchange.com
- 💬 Help Center: Click "Help" in navigation
- 🎬 Platform Tour: Help → Platform Tour

---

**Last Updated**: November 8, 2025  
**Version**: 1.0.0
