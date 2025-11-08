# 📝 Command Reference Card

Quick reference for all commands you'll need.

---

## 🚀 Initial Deployment Commands

### Set Up Git Repository
```bash
# Initialize Git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - NutraHubExchange"

# Create main branch
git branch -M main

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nutrahubexchange.git

# Push to GitHub
git push -u origin main
```

---

## 🔄 Update Your Live Site

### After Making Changes
```bash
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Your change description here"

# Push to trigger deployment
git push
```

### Quick Update (One Command)
```bash
git add . && git commit -m "Update" && git push
```

---

## 💻 Local Development Commands

### Install Dependencies
```bash
# First time setup
npm install

# Or if issues
npm ci
```

### Start Development Server
```bash
# Start dev server (http://localhost:3000)
npm run dev
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Type Checking
```bash
# Check for TypeScript errors
npm run type-check
```

---

## 🔧 Troubleshooting Commands

### Clear Cache and Reinstall
```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall
npm install
```

### Fix Git Issues
```bash
# Check Git status
git status

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes (CAREFUL!)
git reset --hard HEAD
```

### Kill Port 3000 (if in use)
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 🌿 Vercel CLI Commands (Optional)

### Install Vercel CLI
```bash
npm i -g vercel
```

### Deploy from CLI
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

---

## 📦 NPM Package Management

### Add New Package
```bash
npm install package-name
```

### Remove Package
```bash
npm uninstall package-name
```

### Update All Packages
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

---

## 🔍 Diagnostic Commands

### Check Versions
```bash
# Node version
node --version

# NPM version
npm --version

# Git version
git --version
```

### View Package Info
```bash
npm list
npm list --depth=0
```

### Check Build Output
```bash
# After npm run build
ls -la dist/
```

---

## 🗂️ File Management Commands

### View Files
```bash
# List files
ls -la

# View file content
cat filename.txt

# Search in files
grep -r "search term" .
```

### Navigate Directories
```bash
# Current directory
pwd

# Change directory
cd folder-name

# Go back
cd ..

# Go to home
cd ~
```

---

## 🔐 Git Configuration

### Set Up Git Identity
```bash
# Set username
git config --global user.name "Your Name"

# Set email
git config --global user.email "your.email@example.com"

# View config
git config --list
```

### SSH Key Setup (Optional)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy key to clipboard
# Mac:
pbcopy < ~/.ssh/id_ed25519.pub

# Windows:
clip < ~/.ssh/id_ed25519.pub

# Linux:
cat ~/.ssh/id_ed25519.pub
```

---

## 🌐 Vercel-Specific Commands

### Link Project
```bash
vercel link
```

### Pull Environment Variables
```bash
vercel env pull
```

### Add Environment Variable
```bash
vercel env add VARIABLE_NAME
```

### View Deployments
```bash
vercel ls
```

### Rollback Deployment
```bash
vercel rollback [deployment-url]
```

---

## 🧪 Testing Commands

### Run Type Check
```bash
npm run type-check
```

### Manual Testing
```bash
# Build and preview
npm run build && npm run preview
```

---

## 📊 Performance Commands

### Analyze Bundle Size
```bash
npm run build

# Then check dist folder size
du -sh dist/
```

### Check Dependencies Size
```bash
npx npm-check
```

---

## 🔄 Branch Management

### Create New Branch
```bash
git checkout -b feature-name
```

### Switch Branches
```bash
git checkout main
```

### Merge Branch
```bash
git checkout main
git merge feature-name
```

### Delete Branch
```bash
git branch -d feature-name
```

---

## 🚨 Emergency Commands

### Revert Last Commit
```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```

### Stash Changes
```bash
# Save current changes
git stash

# Apply stashed changes
git stash pop
```

### Force Push (CAREFUL!)
```bash
git push --force
```

---

## 📝 Quick Command Combinations

### Complete Update Flow
```bash
git add . && git commit -m "Update" && git push
```

### Clean Build
```bash
rm -rf node_modules dist && npm install && npm run build
```

### Fresh Start
```bash
rm -rf node_modules package-lock.json && npm install && npm run dev
```

---

## 💡 Pro Tips

### Create Aliases (Make commands shorter)

#### Bash/Zsh (~/.bashrc or ~/.zshrc)
```bash
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias dev='npm run dev'
alias build='npm run build'
```

#### Windows (PowerShell profile)
```powershell
Set-Alias -Name dev -Value npm run dev
```

### Use Up Arrow
- Press ↑ to cycle through previous commands
- No need to retype!

### Tab Completion
- Start typing and press Tab
- Autocompletes file/folder names

---

## 📚 Help Commands

### Get Help
```bash
# Git help
git help

# NPM help
npm help

# Vercel help
vercel help

# Command-specific help
git help commit
npm help install
```

---

## ✅ Most Common Commands (Memorize These!)

```bash
# 1. Check status
git status

# 2. Add all changes
git add .

# 3. Commit changes
git commit -m "Description"

# 4. Push to GitHub (triggers Vercel deploy)
git push

# 5. Start dev server
npm run dev

# 6. Build for production
npm run build
```

---

**That's it! These commands are all you need to deploy and manage your NutraHubExchange platform.** 🚀

Save this file for quick reference!
