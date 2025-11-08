import React from 'react';
import { PublicLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  DollarSign,
  FileCheck,
  Users,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Search,
  MessageSquare,
  Award
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const NutraSenseAIPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI1NzIwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="AI Technology"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="h-12 w-12" />
              <Badge className="bg-yellow-500 text-black border-0 px-3 py-1">NEW</Badge>
            </div>
            <h1 className="mb-6">
              NutraSense AI
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Intelligent automation for nutraceutical procurement. AI-powered RFQ matching, smart bidding, quality compliance, and real-time pricing intelligence.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#/ai/smart-matchmaking">
                <Badge variant="secondary" className="text-base px-4 py-2 cursor-pointer hover:bg-white/90 transition-colors">Smart Matchmaking</Badge>
              </a>
              <a href="#/ai/auto-bidding">
                <Badge variant="secondary" className="text-base px-4 py-2 cursor-pointer hover:bg-white/90 transition-colors">Auto-Bidding</Badge>
              </a>
              <a href="#/ai/quality-guardrails">
                <Badge variant="secondary" className="text-base px-4 py-2 cursor-pointer hover:bg-white/90 transition-colors">Quality Guardrails</Badge>
              </a>
              <a href="#/ai/price-intelligence">
                <Badge variant="secondary" className="text-base px-4 py-2 cursor-pointer hover:bg-white/90 transition-colors">Price Intelligence</Badge>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What NutraSense AI Does */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Core Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              NutraSense AI transforms nutraceutical procurement with intelligent automation, real-time insights, and end-to-end workflow optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Smart RFQ Matchmaking */}
            <a href="#/ai/smart-matchmaking">
              <Card className="border-2 hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Smart RFQ → Matchmaking</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Intelligent Parsing:</span> Extracts product specs, grade, certifications, MOQ, Incoterms, delivery window, and budget from buyer RFQs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Ontology Expansion:</span> Enriches specs via knowledge graph (e.g., "Ashwagandha KSM-66 ⟶ Withania somnifera extract 5% withanolides; alternate 2.5% w/ adjusted dosage")
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Smart Ranking:</span> Ranks compatible sellers by availability, spec fit, compliance, lead-time, historic reliability, price, and logistics risk
                    </p>
                  </div>
                </div>
              </CardContent>
              </Card>
            </a>

            {/* Auto-Bid & Negotiation */}
            <a href="#/ai/auto-bidding">
              <Card className="border-2 hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Auto-Bid & Negotiation</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">For Sellers:</span> Generates optimal bids (price, MOQ, ship-from, lead-time, alternates) using margin guardrails and inventory aging
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">For Buyers:</span> Counter-proposal recommendations based on multi-seller price curves, demand history, and seasonality
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Chat Negotiation Agent:</span> Optional chat-style negotiation that keeps terms within pre-approved limits
                    </p>
                  </div>
                </div>
              </CardContent>
              </Card>
            </a>

            {/* Quality & Compliance Guardrail */}
            <a href="#/ai/quality-guardrails">
              <Card className="border-2 hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Quality & Compliance Guardrail</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Automated Verification:</span> Checks FSSAI/AYUSH/GMP/ISO/Halal/Kosher/USDA-Organic tags and certificate validity dates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">COA Forensics:</span> Flags anomalies (assay too perfect, recycled PDFs, inconsistent lab addresses) with document forensics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Risk Scoring:</span> Supplier risk scores based on adverse events, late shipments, and claim disputes
                    </p>
                  </div>
                </div>
              </CardContent>
              </Card>
            </a>

            {/* Pricing Intelligence */}
            <a href="#/ai/price-intelligence">
              <Card className="border-2 hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Real-Time Pricing Intelligence</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Real-Time Market Index:</span> Live pricing data for common nutraceuticals (spot vs contract)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Seller Price Hints:</span> Competitive pricing suggestions based on comparable SKUs, logistics, and FX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Anomaly Alerts:</span> Flags abnormal quotes (too low/high vs index)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Inventory & Availability Sync */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Inventory & Availability Sync</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Real-Time Stock Updates:</span> Seller portal/API to publish stock, batch-level COAs, expiry, hold quantities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Lead-Time Prediction:</span> Buyer lead-time estimates at SKU × origin × route level
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fraud/Anomaly Detection */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Fraud/Anomaly Detection</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Behavior Analysis:</span> Identifies suspicious seller behavior, duplicate docs, and sudden price swings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Document Verification:</span> Detects PO/Invoice mismatches and document inconsistencies
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explainable Decisions */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Explainable Decisions</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Transparent AI:</span> Every match/bid includes detailed reason codes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Example: "Spec fit 0.92 (assay 5% ±0.2), Lead-time 10d, COA verified 2025-04-01, Price −3.4% vs market"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Automation */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Workflow Automation</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">End-to-End Automation:</span> One-click shortlist → bid request → award → PO → shipment track
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Smart Reminders:</span> Auto-reminders on expiring certificates, batches nearing expiry, shipment milestones
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Performance Scores */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Trust & Performance Scores</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Reliability Index:</span> Tracks on-time delivery, quality acceptance rate, dispute rate, and response speed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Transparent Metrics:</span> Both buyers and sellers receive performance scores for continuous improvement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use It - Buyers */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">For Buyers</span>
              </div>
              <h2 className="mb-4">Why Procurement & QA Teams Love NutraSense AI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Higher Spec-Fit at Lower TCO</h3>
                  <p className="text-sm text-muted-foreground">
                    Data-driven ranking and intelligent alternates ensure optimal sourcing even in tight supply situations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Fewer QA Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated certificate/COA checks and anomaly flags catch problems before they reach your facility
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Unmatched Speed</h3>
                  <p className="text-sm text-muted-foreground">
                    RFQs matched and bid out in minutes, not days. Accelerate procurement cycles dramatically
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Search className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Complete Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    Market index visibility plus explainable AI decisions give you confidence in every sourcing choice
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <AlertTriangle className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Risk Reduction</h3>
                  <p className="text-sm text-muted-foreground">
                    Supplier risk scoring and fraud detection protect your supply chain and brand reputation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Ops Efficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated reminders and end-to-end workflows eliminate email ping-pong and manual tracking
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use It - Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-secondary">For Suppliers</span>
              </div>
              <h2 className="mb-4">Why Manufacturers & Distributors Choose NutraSense AI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">More Qualified Demand</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive RFQs you can truly fulfill based on your verified capabilities and inventory
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Win-Rate Uplift</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-assisted pricing within guardrails plus recommendations on MOQs/lead-times to win more bids
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Inventory Velocity</h3>
                  <p className="text-sm text-muted-foreground">
                    Intelligent promotion of aging lots and expiring batches helps move inventory strategically
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Lower Overhead</h3>
                  <p className="text-sm text-muted-foreground">
                    Auto-fill bids, reusable spec & COA bundles, negotiation bot keeps within policy
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Trust Advantage</h3>
                  <p className="text-sm text-muted-foreground">
                    Performance score highlights your reliability, making repeat awards easier to secure
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <MessageSquare className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-3">Smarter Negotiation</h3>
                  <p className="text-sm text-muted-foreground">
                    AI negotiation agent maintains competitive positioning while staying within your approved limits
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6">Powered by Advanced Machine Learning</h2>
                <p className="text-muted-foreground mb-6">
                  NutraSense AI leverages cutting-edge natural language processing, knowledge graphs, and predictive analytics to deliver intelligent automation that learns and improves with every transaction.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Neural networks trained on millions of nutraceutical transactions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Real-time pattern recognition for fraud and anomaly detection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Continuous learning from market dynamics and user feedback</span>
                  </li>
                </ul>
              </div>
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzYyNjAyOTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Advanced Machine Learning Neural Network Visualization"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Intelligence */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MjQ3NzA5NHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Data Analytics Dashboard"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="mb-6">Real-Time Market Intelligence</h2>
                <p className="text-muted-foreground mb-6">
                  Access comprehensive pricing data, supply trends, and market forecasts. Make data-driven decisions with confidence backed by real-time analytics and historical insights.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Live spot and contract pricing for 500+ nutraceutical ingredients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Seasonal demand patterns and supply chain predictions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Currency fluctuation impact analysis and hedging recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Brain className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="mb-4">Ready to Transform Your Procurement with AI?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Experience the future of nutraceutical sourcing. Let NutraSense AI handle the complexity while you focus on growing your business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#/signup">
              <Button size="lg" variant="secondary">
                Get Started Free
              </Button>
            </a>
            <a href="#/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Request a Demo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default NutraSenseAIPage;
