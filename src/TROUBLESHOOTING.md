# 🔧 Troubleshooting Guide

## Common Deployment Issues and Solutions

---

## 🐛 Git & GitHub Issues

### Issue: "git: command not found"
**Solution:**
1. Install Git: https://git-scm.com/downloads
2. Restart your terminal after installation
3. Verify: `git --version`

### Issue: "Permission denied (publickey)"
**Solution:**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings → SSH Keys → Add SSH Key
# Or use HTTPS instead:
git remote set-url origin https://github.com/YOUR_USERNAME/nutrahubexchange.git
```

### Issue: "Repository not found"
**Solution:**
- Double-check your GitHub username in the URL
- Ensure the repository exists on GitHub
- Verify you're logged in to the correct GitHub account

---

## 🔨 Vercel Build Issues

### Issue: "Build failed - Module not found"
**Solution:**
1. Check that all imports in your files are correct
2. Ensure `package.json` lists all dependencies
3. Verify file names match import statements (case-sensitive)

**Command to rebuild:**
```bash
# In Vercel dashboard
Deployments → Select Failed Build → Redeploy
```

### Issue: "TypeScript errors during build"
**Solution:**
```bash
# Test build locally first
npm run build

# Fix any TypeScript errors shown
# Then push fixed code
git add .
git commit -m "Fix TypeScript errors"
git push
```

### Issue: "Build succeeds but page is blank"
**Solution:**
1. Check browser console for errors (F12)
2. Verify `main.tsx` is correctly importing `App.tsx`
3. Ensure `index.html` references `main.tsx`
4. Check that `dist` folder was created during build

---

## 🌐 Vercel Deployment Issues

### Issue: "Deployment takes too long"
**Normal behavior:**
- First deployment: 2-5 minutes
- Subsequent deployments: 1-2 minutes

**If stuck longer:**
1. Check Vercel dashboard for build logs
2. Cancel and retry deployment
3. Clear Vercel cache: Settings → General → Clear Cache

### Issue: "Domain shows 404 Not Found"
**Solution:**
1. Wait 2-3 minutes after deployment
2. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
3. Check deployment status in Vercel dashboard
4. Verify `vercel.json` routing configuration

### Issue: "Custom domain not working"
**Solution:**
1. In Vercel: Settings → Domains → Check status
2. Verify DNS records are correct (Vercel shows what to add)
3. DNS propagation can take 24-48 hours
4. Use Vercel's default URL while DNS propagates

---

## 🖼️ Image Loading Issues

### Issue: "Images not loading from Unsplash"
**Solution:**
- Unsplash rate limits: Normal, images will load eventually
- Check browser console for blocked requests
- Verify URLs are correct in component code
- Consider caching images locally for production

### Issue: "SVG icons not showing"
**Solution:**
```bash
# Verify lucide-react is installed
npm install lucide-react

# Rebuild
npm run build
```

---

## 🔐 Authentication Issues (When Implementing)

### Issue: "Cannot connect to Supabase"
**Solution:**
1. Verify environment variables in Vercel:
   - Settings → Environment Variables
   - Add: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Redeploy after adding variables
3. Check Supabase project is active

---

## 💻 Local Development Issues

### Issue: "npm install fails"
**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Or use alternative package manager
pnpm install
# or
yarn install
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or change port in vite.config.ts
server: {
  port: 3001,
}
```

### Issue: "Hot reload not working"
**Solution:**
1. Check Vite config has correct settings
2. Restart dev server: Stop and run `npm run dev` again
3. Clear browser cache
4. Disable browser extensions that might interfere

---

## 📱 Mobile/Responsive Issues

### Issue: "Layout broken on mobile"
**Solution:**
1. Check responsive classes in components
2. Test in browser DevTools mobile view (F12 → Toggle device)
3. Verify viewport meta tag in `index.html`
4. Check for fixed widths that should be responsive

### Issue: "Touch events not working"
**Solution:**
- Ensure you're testing on actual device or Chrome DevTools mobile emulation
- Verify touch event handlers are properly attached
- Check for CSS that might block touch: `pointer-events: none`

---

## 🎨 Styling Issues

### Issue: "Tailwind classes not working"
**Solution:**
1. Check `styles/globals.css` imports Tailwind
2. Verify `postcss.config.js` exists
3. Restart dev server after Tailwind config changes
4. Clear browser cache

### Issue: "Fonts not loading (Sora)"
**Solution:**
1. Check `index.html` has Google Fonts link
2. Verify `globals.css` has font-family declarations
3. Test on incognito/private window
4. Check browser console for font loading errors

---

## 🔄 State Management Issues

### Issue: "Onboarding animation shows every time"
**Solution:**
- Check browser localStorage: F12 → Application → Local Storage
- Should see `onboardingCompleted: true`
- Clear and test: `localStorage.clear()`

### Issue: "Dark mode not persisting"
**Solution:**
- Verify ThemeContext is saving to localStorage
- Check browser privacy settings (some block localStorage)
- Test in different browser

---

## 🌍 Performance Issues

### Issue: "Site loads slowly"
**Solution:**
1. **Enable Compression**: Vercel does this automatically
2. **Optimize Images**: Use smaller Unsplash sizes if needed
3. **Code Splitting**: Already configured in `vite.config.ts`
4. **Check Network**: Use browser DevTools Network tab

### Issue: "High bandwidth usage"
**Solution:**
- Monitor in Vercel dashboard
- Optimize image sizes
- Enable caching (already configured in `vercel.json`)
- Consider upgrading Vercel plan if needed

---

## 🔍 Debugging Tips

### Check Build Logs
```bash
# In Vercel Dashboard:
Deployments → Select deployment → View Function Logs
```

### Test Locally Before Deploy
```bash
# Always test build locally
npm run build
npm run preview

# Fix any issues before pushing to GitHub
```

### Browser Console
```
F12 → Console tab
Look for red errors
Check Network tab for failed requests
```

### Vercel CLI (Advanced)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from CLI
vercel

# Check logs
vercel logs
```

---

## 🆘 Still Stuck?

### Get Help
1. **Vercel Support**: https://vercel.com/support
2. **Vercel Discord**: https://vercel.com/discord
3. **GitHub Issues**: Create issue in your repository
4. **Stack Overflow**: Tag with `vercel` and `react`

### Provide This Info When Asking for Help
- Deployment URL
- Error message (exact text)
- Build logs from Vercel
- Browser console errors (screenshot)
- What you've already tried

---

## ✅ Prevention Checklist

Before deploying, always:
- [ ] Test locally: `npm run build`
- [ ] Check all imports are correct
- [ ] Verify no TypeScript errors
- [ ] Test responsive design
- [ ] Check all links work
- [ ] Review browser console for errors
- [ ] Commit all files to Git

---

## 📊 Monitoring Your Site

### Vercel Analytics (Free)
```
In Vercel Dashboard:
Project → Analytics → Enable
```

**Tracks:**
- Page views
- Load times
- User locations
- Errors

### Custom Monitoring
```typescript
// Add to main.tsx for error tracking
window.onerror = (msg, url, lineNo, columnNo, error) => {
  console.error('Error:', msg, url, lineNo, columnNo, error);
  // Send to error tracking service
};
```

---

**Remember: Most issues are simple fixes. Check the basics first!** ✅
