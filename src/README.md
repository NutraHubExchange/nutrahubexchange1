# 🌿 NutraHubExchange

## B2B Nutraceuticals Exchange Platform with AI-Powered Procurement

NutraHubExchange is a comprehensive enterprise-grade B2B marketplace platform for the nutraceutical industry, featuring AI-powered procurement, intelligent matchmaking, automated bidding, and quality compliance management.

---

## 🚀 Live Demo

**Deployed on Vercel**: [Your URL will be here after deployment]

---

## ✨ Features

### Core Platform (46 Pages)
- **Public Pages**: Home, About, Blogs, Directory, AI Features, Help, Contact
- **Authentication**: Login, Signup, Password Recovery, Multi-step Onboarding
- **Buyer Portal**: RFQ Management, Supplier Discovery, Quote Comparison
- **Supplier Portal**: Bid Management, Certifications, Inventory Sync
- **Admin Dashboard**: User Management, Analytics, Dispute Resolution
- **Shared Features**: Profiles, Billing, Chat, Activity Logs

### NutraSense AI Engine
- 🎯 **Smart RFQ Matchmaking**: Intelligent supplier matching based on specs and compliance
- 💰 **Auto-Bidding**: Automated bidding within seller-defined guardrails
- 🛡️ **Quality Guardrails**: COA verification and document fraud detection
- 📊 **Price Intelligence**: Real-time market pricing and trend analysis

### Design System
- **Color Scheme**: Green theme (#4F9C3E primary, #60A444 secondary, #2F5A29 accent)
- **Typography**: Sora font family throughout
- **Components**: 40+ Shadcn/ui components with full accessibility
- **Responsive**: Mobile-first design with tablet and desktop optimizations

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **Deployment**: Vercel

### Backend (Planned/In Progress)
- **API**: FastAPI (Python)
- **Databases**: PostgreSQL, Neo4j, Redis
- **ML/AI**: Scikit-learn, spaCy, OpenAI
- **Orchestration**: Apache Airflow
- **Search**: OpenSearch
- **Infrastructure**: Docker, Kubernetes

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/nutrahubexchange.git
cd nutrahubexchange

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment to Vercel

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions.

### Quick Deploy

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (automatic configuration)
4. Your site is live! 🎉

---

## 📁 Project Structure

```
nutrahubexchange/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Logo.tsx        # Brand logo
│   └── Router.tsx      # Application routing
├── pages/              # Page components
│   ├── public/         # Public-facing pages
│   ├── buyer/          # Buyer portal pages
│   ├── supplier/       # Supplier portal pages
│   ├── admin/          # Admin dashboard pages
│   └── shared/         # Shared authenticated pages
├── contexts/           # React contexts (Auth, Theme, Onboarding)
├── data/              # Mock data and constants
├── styles/            # Global CSS and Tailwind config
├── types/             # TypeScript type definitions
├── backend/           # FastAPI backend (separate deployment)
└── public/            # Static assets
```

---

## 🎨 Design Features

### Onboarding Animation
- 8-scene animated introduction
- Professional motion design
- One-time display with localStorage persistence
- Skip functionality

### Responsive Design
- Mobile-first approach
- Tablet breakpoints
- Desktop optimization
- Fluid typography

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Supabase (when ready)
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Backend API
VITE_API_URL=your_api_url

# Analytics
VITE_GA_TRACKING_ID=your_tracking_id
```

### Vercel Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables

---

## 📊 Features Roadmap

### Phase 1: Frontend (✅ Complete)
- [x] All 46 pages implemented
- [x] Full responsive design
- [x] Onboarding animation
- [x] Blog and directory
- [x] AI feature pages
- [x] Accessibility compliance

### Phase 2: Backend Integration (In Progress)
- [ ] Supabase database setup
- [ ] Authentication flow
- [ ] RFQ/Quote workflows
- [ ] File uploads
- [ ] Real-time chat

### Phase 3: AI Features (Planned)
- [ ] NLP-based RFQ parsing
- [ ] ML matchmaking engine
- [ ] Automated bidding system
- [ ] Fraud detection
- [ ] Price prediction models

### Phase 4: Enterprise Features (Future)
- [ ] Multi-tenant support
- [ ] Advanced analytics
- [ ] API marketplace
- [ ] Mobile apps
- [ ] Blockchain integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

- **Email**: support@nutrahubexchange.com
- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues]

---

## 🎯 Business Model

- **Buyers**: Free to post RFQs, pay on transaction completion
- **Suppliers**: Subscription tiers (Starter/Pro/Enterprise)
- **Platform Fee**: 2-5% of transaction value
- **AI Features**: Premium add-ons

---

## 📈 Analytics & Metrics

- Page views and user engagement
- RFQ conversion rates
- Supplier match success rates
- AI recommendation accuracy
- Platform health monitoring

---

## 🔒 Security

- HTTPS/SSL encryption (Vercel automatic)
- Input sanitization
- CSRF protection
- Rate limiting
- Secure authentication (coming with Supabase)

---

## 🌟 Acknowledgments

- **UI Framework**: Shadcn/ui
- **Icons**: Lucide React
- **Images**: Unsplash
- **Hosting**: Vercel
- **Database**: Supabase (planned)

---

**Built with ❤️ for the Nutraceutical Industry**

*Transforming B2B procurement with intelligent automation*
