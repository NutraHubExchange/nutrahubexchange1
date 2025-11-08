import React from 'react';
import { PublicLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, Shield, TrendingUp, Users, Zap, Globe, Brain, Sparkles, Youtube, Instagram, Linkedin } from 'lucide-react';
import heroImage from 'figma:asset/7604472ed79a6f0505fe6740e76d69cf447da64f.png';
import labImage from 'figma:asset/1463ba0ac1dd281922ade7dea9a2f81fe5e8870e.png';
import { OnboardingBanner } from '../../components/OnboardingBanner';

const HomePage: React.FC = () => {
  return (
    <PublicLayout>
      <OnboardingBanner />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImage} alt="Premium Nutraceutical Ingredients" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">
              The Trusted B2B Marketplace for Nutraceutical Ingredients
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Connect with verified suppliers, streamline procurement, and scale your nutraceutical business with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#/signup">
                <Button size="lg" variant="secondary">
                  Get Started Free
                </Button>
              </a>
              <a href="#/about">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NutraSense AI Announcement */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <a href="#/nutrasense-ai" className="block group">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-xl bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Brain className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-foreground">NutraSense AI</h3>
                      <Badge className="bg-yellow-500 text-black border-0 px-2 py-0.5">NEW</Badge>
                    </div>
                    <p className="text-muted-foreground">
                      Intelligent automation for procurement: AI-powered RFQ matching, smart bidding, quality compliance & real-time pricing intelligence
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0">
                  <span className="hidden sm:inline">Learn More</span>
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose NutraHubExchange?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the tools and infrastructure you need to source high-quality ingredients efficiently and securely.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="mb-3">Verified Suppliers</h3>
                <p className="text-muted-foreground">
                  All suppliers undergo rigorous certification verification. Trade with confidence knowing partners meet industry standards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="mb-3">Streamlined RFQ Process</h3>
                <p className="text-muted-foreground">
                  Create detailed RFQs in minutes. Receive competitive quotes from multiple suppliers and compare them side-by-side.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="mb-3">Built-in Communication</h3>
                <p className="text-muted-foreground">
                  Real-time messaging, dispute resolution, and collaborative tools keep your procurement process transparent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Powerful Features for Every Role</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="mb-6">For Buyers</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Smart RFQ Management</span>
                    <p className="text-sm text-muted-foreground">Create, track, and manage requests with templates and automated workflows</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Supplier Directory</span>
                    <p className="text-sm text-muted-foreground">Search and filter verified suppliers by certifications, categories, and ratings</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Quote Comparison</span>
                    <p className="text-sm text-muted-foreground">Compare pricing, lead times, and terms side-by-side to make informed decisions</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6">For Suppliers</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Targeted RFQ Feed</span>
                    <p className="text-sm text-muted-foreground">Receive relevant opportunities that match your verified capabilities</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Certification Management</span>
                    <p className="text-sm text-muted-foreground">Upload and manage your certifications with status tracking and reminders</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Quote Tracking</span>
                    <p className="text-sm text-muted-foreground">Monitor the status of all submitted quotes in one centralized dashboard</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Certification Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <h2 className="mb-6">Quality-First Marketplace</h2>
              <p className="text-muted-foreground mb-6">
                Every supplier on NutraHubExchange undergoes rigorous verification. We ensure all partners maintain the highest standards of quality, safety, and compliance in the nutraceutical industry.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-1">Verified Certifications</h4>
                    <p className="text-sm text-muted-foreground">GMP, ISO, FDA, and other industry-standard certifications verified by our team</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-1">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground">Regular audits and compliance checks ensure ongoing quality standards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-1">Trusted Network</h4>
                    <p className="text-sm text-muted-foreground">Connect with pre-vetted manufacturers and suppliers worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={labImage} 
                alt="Quality Control Laboratory" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2 text-primary" style={{ fontWeight: 400 }}>500+</div>
              <div className="text-muted-foreground">Verified Suppliers</div>
            </div>
            <div>
              <div className="text-4xl mb-2 text-primary" style={{ fontWeight: 400 }}>10,000+</div>
              <div className="text-muted-foreground">RFQs Processed</div>
            </div>
            <div>
              <div className="text-4xl mb-2 text-primary" style={{ fontWeight: 400 }}>$50M+</div>
              <div className="text-muted-foreground">Transaction Volume</div>
            </div>
            <div>
              <div className="text-4xl mb-2 text-primary" style={{ fontWeight: 400 }}>98%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Promotion Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">Explore Our Supplier Directory</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our comprehensive directory of 20+ verified nutraceutical suppliers from around the world. 
              Find the perfect partner for vitamins, minerals, herbal extracts, amino acids, and specialty ingredients.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl mb-1 text-primary" style={{ fontWeight: 400 }}>20+</div>
                <div className="text-sm text-muted-foreground">Global Suppliers</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl mb-1 text-primary" style={{ fontWeight: 400 }}>15+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl mb-1 text-primary" style={{ fontWeight: 400 }}>200+</div>
                <div className="text-sm text-muted-foreground">Ingredients</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl mb-1 text-primary" style={{ fontWeight: 400 }}>12+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
            <a href="#/directory">
              <Button size="lg" className="gap-2">
                <Globe className="h-5 w-5" />
                Browse Supplier Directory
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">Stay Connected</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, industry insights, and nutraceutical trends.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.youtube.com/@NutraHubExchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-white shadow-lg hover:shadow-xl rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-red-600">
                  <Youtube className="h-8 w-8 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm mt-2 text-muted-foreground">YouTube</p>
              </a>
              <a 
                href="https://www.instagram.com/nutrahubexchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-white shadow-lg hover:shadow-xl rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500">
                  <Instagram className="h-8 w-8 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm mt-2 text-muted-foreground">Instagram</p>
              </a>
              <a 
                href="https://www.linkedin.com/company/nutrahubexchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-white shadow-lg hover:shadow-xl rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-blue-700">
                  <Linkedin className="h-8 w-8 text-blue-700 group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm mt-2 text-muted-foreground">LinkedIn</p>
              </a>
              <a 
                href="https://www.tiktok.com/@nutrahubexchange" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-16 h-16 bg-white shadow-lg hover:shadow-xl rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-black">
                  <svg className="h-8 w-8 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <p className="text-sm mt-2 text-muted-foreground">TikTok</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="mb-4">Ready to Transform Your Procurement?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of companies already streamlining their nutraceutical ingredient sourcing on NutraHubExchange.
          </p>
          <a href="#/signup">
            <Button size="lg" variant="secondary">
              Start Your Free Trial
            </Button>
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
