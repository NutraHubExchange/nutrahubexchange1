import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { 
  Target, 
  Search, 
  CheckCircle, 
  TrendingUp,
  Building2,
  MapPin,
  Award,
  Clock,
  DollarSign,
  Package,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const SmartMatchmakingPage: React.FC = () => {
  const [rfqInput, setRfqInput] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setShowResults(true);
    }, 2000);
  };

  const mockMatches = [
    {
      id: 1,
      supplier: 'Herbal Naturals Ltd.',
      location: 'Mumbai, India',
      matchScore: 98,
      price: '$42.50/kg',
      moq: '500 kg',
      leadTime: '14 days',
      certifications: ['GMP', 'ISO 22000', 'FSSAI'],
      reliability: 96,
      complianceScore: 99
    },
    {
      id: 2,
      supplier: 'BioExtracts International',
      location: 'Bangalore, India',
      matchScore: 95,
      price: '$44.00/kg',
      moq: '300 kg',
      leadTime: '12 days',
      certifications: ['GMP', 'USDA Organic', 'Halal'],
      reliability: 94,
      complianceScore: 98
    },
    {
      id: 3,
      supplier: 'Pure Botanicals Co.',
      location: 'Guangzhou, China',
      matchScore: 92,
      price: '$39.80/kg',
      moq: '1000 kg',
      leadTime: '18 days',
      certifications: ['GMP', 'ISO 9001'],
      reliability: 91,
      complianceScore: 95
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="h-12 w-12" />
              <Badge className="bg-yellow-500 text-black border-0 px-3 py-1">AI-POWERED</Badge>
            </div>
            <h1 className="mb-6">Smart RFQ Matchmaking</h1>
            <p className="text-xl opacity-90 mb-8">
              Intelligent parsing and matching that connects buyers with the perfect suppliers based on specs, compliance, pricing, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">How Smart Matchmaking Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">1. Intelligent Parsing</h3>
                  <p className="text-gray-600 text-sm">
                    AI extracts product specs, grade, certifications, MOQ, delivery windows, and budget from your RFQ in natural language.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">2. Ontology Enrichment</h3>
                  <p className="text-gray-600 text-sm">
                    Knowledge graph expands specifications to find compatible alternatives and equivalent formulations automatically.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">3. Smart Ranking</h3>
                  <p className="text-gray-600 text-sm">
                    Suppliers ranked by availability, spec fit, compliance, lead-time, reliability, price, and logistics risk.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Try Smart Matchmaking</h2>
              <p className="text-gray-600">
                Enter an RFQ and see how our AI instantly finds the best supplier matches
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sample RFQ Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Request</label>
                  <Textarea
                    placeholder="Example: Need 1000kg of Ashwagandha KSM-66 extract, min 5% withanolides, GMP certified, organic preferred, delivery to USA within 30 days, budget $40-45/kg"
                    value={rfqInput}
                    onChange={(e) => setRfqInput(e.target.value)}
                    rows={4}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleMatch} 
                  disabled={!rfqInput || isMatching}
                  className="w-full"
                  size="lg"
                >
                  {isMatching ? (
                    <>
                      <Search className="h-5 w-5 mr-2 animate-spin" />
                      Finding Matches...
                    </>
                  ) : (
                    <>
                      <Target className="h-5 w-5 mr-2" />
                      Find Supplier Matches
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {showResults && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3>Top Supplier Matches</h3>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {mockMatches.length} Matches Found
                  </Badge>
                </div>

                {mockMatches.map((match, index) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg">{match.supplier}</h4>
                              <Badge className="bg-green-500 text-white">
                                {match.matchScore}% Match
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{match.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {match.certifications.map((cert) => (
                                <Badge key={cert} variant="outline" className="text-xs">
                                  <Award className="h-3 w-3 mr-1" />
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Price</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-primary" />
                            {match.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">MOQ</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <Package className="h-4 w-4 text-primary" />
                            {match.moq}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Lead Time</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            {match.leadTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Reliability</p>
                          <p className="font-semibold text-sm text-green-600">{match.reliability}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Compliance</p>
                          <p className="font-semibold text-sm text-green-600">{match.complianceScore}%</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button variant="outline">
                          View Full Profile
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">Matching Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                  <h4 className="mb-2">Spec Compatibility</h4>
                  <p className="text-sm text-gray-600">
                    Exact match or equivalent alternatives based on ingredient ontology
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                  <h4 className="mb-2">Certification Match</h4>
                  <p className="text-sm text-gray-600">
                    Automated verification of GMP, organic, halal, kosher, and regional certifications
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                  <h4 className="mb-2">Price Optimization</h4>
                  <p className="text-sm text-gray-600">
                    Historical price analysis and market rate comparison
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                  <h4 className="mb-2">Lead Time Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Real-time inventory and shipping time calculations
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                  <h4 className="mb-2">Supplier Reliability</h4>
                  <p className="text-sm text-gray-600">
                    Track record based on past performance and buyer ratings
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                  <h4 className="mb-2">Logistics Risk</h4>
                  <p className="text-sm text-gray-600">
                    Shipping route analysis and customs complexity scoring
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Ready to find your perfect supplier match?</h2>
            <p className="text-gray-600 mb-8">
              Join NutraHubExchange and let AI do the heavy lifting
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#/signup">
                <Button size="lg">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </a>
              <a href="#/nutrasense-ai">
                <Button size="lg" variant="outline">
                  Explore All AI Features
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default SmartMatchmakingPage;
