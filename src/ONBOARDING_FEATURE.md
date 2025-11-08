# 🎬 NutraHubExchange Onboarding Animation

## Overview

An immersive, interactive onboarding experience that automatically plays when users visit NutraHubExchange for the first time. The animation guides users through the complete B2B marketplace workflow with professional animations and clear explanations.

## ✨ Features

### 8-Scene Animated Tour
1. **Welcome** - Introduction to the global B2B marketplace
2. **Registration** - Account creation and verification process
3. **Post RFQs** - How buyers submit product requests
4. **List Inventory** - How sellers publish products
5. **AI Matching** - NutraSense AI-powered buyer-seller matching
6. **Negotiation** - Real-time bidding and deal finalization
7. **Tracking** - Live shipment tracking from warehouse to delivery
8. **Rating** - Building trust through verified ratings

### Design Highlights
- **Color Scheme**: Green gradient (#4F9C3E → #60A444) matching brand identity
- **Animations**: Smooth Motion (Framer Motion) transitions
- **Duration**: 6 seconds per scene (auto-advance) or manual control
- **Controls**: 
  - Next/Previous buttons
  - Scene progress indicators
  - Skip anytime
  - Close button

### User Experience
- **Auto-trigger**: Shows on first visit
- **One-time**: Never shows again after completion
- **Dismissible**: Users can skip at any time
- **Restartable**: Available in Help Center → "Platform Tour"
- **Smart Banner**: Subtle top banner for first-time users on homepage

## 🎯 Implementation

### Files Created
```
/contexts/OnboardingContext.tsx       - State management
/components/OnboardingAnimation.tsx   - Main animation component (700+ lines)
/components/OnboardingBanner.tsx      - Homepage banner notification
```

### Integration Points
- **App.tsx**: Root-level provider and component
- **HomePage.tsx**: Banner notification for first-time users
- **HelpPage.tsx**: "Platform Tour" card to restart tour

## 🚀 Usage

### For Users
1. **First Visit**: Animation plays automatically
2. **Skip Tour**: Click "X" or "Skip" button
3. **Restart Tour**: 
   - Visit Help page → Click "Platform Tour" card
   - Or add `?tour=true` to URL (future enhancement)

### For Developers

#### Reset Onboarding (Testing)
```javascript
// Browser console:
localStorage.removeItem('nutrahub-onboarding-seen');
localStorage.removeItem('nutrahub-banner-dismissed');
window.location.reload();
```

#### Trigger Manually
```typescript
import { useOnboarding } from '../contexts/OnboardingContext';

function MyComponent() {
  const { showOnboarding } = useOnboarding();
  
  return (
    <button onClick={showOnboarding}>
      Watch Tour
    </button>
  );
}
```

#### Check Status
```typescript
const { hasSeenOnboarding } = useOnboarding();
// Returns true if user has completed or skipped
```

## 🎨 Scene Animations

Each scene features custom animations:

| Scene | Animation Type | Duration |
|-------|---------------|----------|
| Welcome | Rotating globe with pulse effect | 6s |
| Registration | Form fields filling progressively | 6s |
| RFQ | Document → Arrow → Live badge | 6s |
| Inventory | 8 product boxes appearing with rotation | 6s |
| Matching | Buyer + AI spinner + 3 sellers appearing | 6s |
| Negotiation | Chat bubbles + award confirmation | 6s |
| Shipping | Truck moving along route with waypoints | 6s |
| Rating | Stars filling + trust badge reveal | 6s |

## 📱 Responsive Design

- **Desktop**: Full 4xl modal (896px max-width)
- **Tablet**: Adjusted padding and icon sizes
- **Mobile**: Responsive layout with horizontal scroll protection

## ♿ Accessibility

- **Keyboard Navigation**: Tab through controls
- **ARIA Labels**: Proper labeling for screen readers
- **Skip Option**: Always available
- **High Contrast**: Readable text on all backgrounds
- **Reduced Motion**: Respects `prefers-reduced-motion` (future enhancement)

## 🔧 Customization

### Adjust Animation Speed
```typescript
// In OnboardingAnimation.tsx, line ~95
const timer = setTimeout(() => {
  // Change 6000 to desired milliseconds
}, 6000);
```

### Modify Scenes
Edit the `scenes` array in `OnboardingAnimation.tsx`:
```typescript
const scenes: Scene[] = [
  {
    id: 1,
    title: "Your Title",
    description: "Your description",
    icon: <YourIcon />,
    animation: <YourAnimationComponent />
  },
  // ...
];
```

### Color Customization
Update green colors throughout:
- `#4F9C3E` - Primary green
- `#60A444` - Secondary green
- `#2F5A29` - Accent green

## 📊 Analytics (Future Enhancement)

Potential tracking events:
- `onboarding_started`
- `onboarding_scene_viewed` (with scene number)
- `onboarding_completed`
- `onboarding_skipped` (with scene number)
- `onboarding_restarted`

## 🐛 Troubleshooting

### Animation Not Showing
1. Check localStorage: Should NOT have `nutrahub-onboarding-seen: true`
2. Verify OnboardingProvider wraps app
3. Check console for errors

### Animation Stuck
1. Clear localStorage
2. Refresh page
3. Check Motion/Framer Motion is installed

### Performance Issues
1. Reduce animation complexity in low-end devices
2. Add `prefers-reduced-motion` detection
3. Lazy load animation components

## 🎯 Success Metrics

Track these KPIs:
- % of users who complete tour
- Average scenes viewed before skip
- Tour restart rate from Help Center
- User retention after viewing tour

## 🚀 Future Enhancements

- [ ] Add voiceover narration
- [ ] Multi-language support
- [ ] Video alternative option
- [ ] Progress save (resume later)
- [ ] URL parameter trigger (`?tour=true`)
- [ ] A/B testing different tour lengths
- [ ] Interactive elements (clickable demos)
- [ ] Mobile-optimized vertical layout
- [ ] Analytics integration
- [ ] Keyboard shortcuts (ESC to close, arrows to navigate)

## 📚 Related Documentation

- [Animation Library (Motion)](https://motion.dev/)
- [Context API Guide](https://react.dev/reference/react/useContext)
- [Local Storage Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## ✅ Testing Checklist

- [x] Shows on first visit
- [x] Can be skipped
- [x] Can navigate between scenes
- [x] Closes properly
- [x] Doesn't show again after completion
- [x] Can be restarted from Help page
- [x] Banner shows/dismisses correctly
- [x] Mobile responsive
- [x] Animations smooth on all devices
- [x] Accessibility features work

---

**Built with**: React, TypeScript, Motion (Framer Motion), Tailwind CSS  
**Created**: November 2024  
**Version**: 1.0.0
