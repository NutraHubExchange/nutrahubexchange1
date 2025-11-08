import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Slider } from '../../components/ui/slider';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { 
  Zap, 
  TrendingUp,
  DollarSign,
  Settings,
  CheckCircle,
  ArrowRight,
  Percent,
  Clock,
  Target,
  BarChart3,
  Shield,
  MessageSquare
} from 'lucide-react';

const AutoBiddingPage: React.FC = () => {
  const [minMargin, setMinMargin] = useState([18]);
  const [maxDiscount, setMaxDiscount] = useState([10]);
  const [autoNegotiate, setAutoNegotiate] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBid, setShowBid] = useState(false);

  const handleGenerateBid = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowBid(true);
    }, 2000);
  };

  const mockRFQ = {
    product: 'Ashwagandha Extract KSM-66',
    quantity: '1000 kg',
    specs: '5% withanolides, organic certified',
    buyerBudget: '$40-45/kg',
    deliveryWindow: '30 days'
  };

  const generatedBid = {
    basePrice: '$42.50/kg',
    moq: '500 kg',
    leadTime: '14 days',
    discount: '5% for orders > 1500kg',
    alternateOffer: 'Standard grade at $38/kg',
    totalValue: '$42,500',
    estimatedMargin: '22%',
    competitiveness: 'High'
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="h-12 w-12" />
              <Badge className="bg-yellow-500 text-black border-0 px-3 py-1">AUTOMATED</Badge>
            </div>
            <h1 className="mb-6">Auto-Bidding Engine</h1>
            <p className="text-xl opacity-90 mb-8">
              Intelligent bid generation that maximizes your win rate while protecting your margins. Set guardrails and let AI handle the rest.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">How Auto-Bidding Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">1. Set Your Guardrails</h3>
                  <p className="text-gray-600 text-sm">
                    Define minimum margins, max discounts, inventory priorities, and negotiation boundaries.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">2. AI Generates Bids</h3>
                  <p className="text-gray-600 text-sm">
                    System analyzes market rates, competitor pricing, and your inventory to create optimal bids automatically.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">3. Auto-Negotiate</h3>
                  <p className="text-gray-600 text-sm">
                    Optional chat-based negotiation keeps terms within approved limits while maximizing deal closure.
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Configure Your Bidding Strategy</h2>
              <p className="text-gray-600">
                Set your parameters and watch AI generate the optimal bid
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Settings Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Bidding Guardrails
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Minimum Margin: {minMargin}%</Label>
                    <Slider
                      value={minMargin}
                      onValueChange={setMinMargin}
                      min={10}
                      max={40}
                      step={1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-600">Bids won't go below this profit margin</p>
                  </div>

                  <div>
                    <Label className="mb-3 block">Max Discount: {maxDiscount}%</Label>
                    <Slider
                      value={maxDiscount}
                      onValueChange={setMaxDiscount}
                      min={0}
                      max={25}
                      step={1}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-600">Maximum discount for volume orders</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label>Auto-Negotiate</Label>
                      <p className="text-xs text-gray-600 mt-1">Allow AI to counter buyer proposals</p>
                    </div>
                    <Switch
                      checked={autoNegotiate}
                      onCheckedChange={setAutoNegotiate}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Current Inventory Priority</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">Aging Stock</Button>
                      <Button variant="outline" size="sm" className="bg-primary text-white">Fresh Stock</Button>
                      <Button variant="outline" size="sm">All</Button>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateBid}
                    disabled={isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Zap className="h-5 w-5 mr-2 animate-pulse" />
                        Generating Bid...
                      </>
                    ) : (
                      <>
                        <Target className="h-5 w-5 mr-2" />
                        Generate Optimal Bid
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* RFQ Preview & Generated Bid */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Incoming RFQ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Product</p>
                      <p className="font-medium">{mockRFQ.product}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{mockRFQ.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Specifications</p>
                      <p className="font-medium">{mockRFQ.specs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Buyer Budget</p>
                      <p className="font-medium text-primary">{mockRFQ.buyerBudget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivery Window</p>
                      <p className="font-medium">{mockRFQ.deliveryWindow}</p>
                    </div>
                  </CardContent>
                </Card>

                {showBid && (
                  <Card className="border-2 border-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          AI-Generated Bid
                        </CardTitle>
                        <Badge className="bg-green-500 text-white">
                          {generatedBid.competitiveness} Competitiveness
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Price per kg</p>
                          <p className="text-lg font-bold text-primary">{generatedBid.basePrice}</p>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Total Value</p>
                          <p className="text-lg font-bold text-primary">{generatedBid.totalValue}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">MOQ</span>
                          <span className="text-sm font-medium">{generatedBid.moq}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Lead Time</span>
                          <span className="text-sm font-medium">{generatedBid.leadTime}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Volume Discount</span>
                          <span className="text-sm font-medium">{generatedBid.discount}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">Estimated Margin</span>
                          <span className="text-sm font-medium text-green-600">{generatedBid.estimatedMargin}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-1">Alternate Offer</p>
                        <p className="text-sm text-blue-700">{generatedBid.alternateOffer}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Bid
                        </Button>
                        <Button variant="outline">
                          Adjust
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">Why Auto-Bidding?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Save Time</h4>
                  <p className="text-sm text-gray-600">
                    Reduce bid creation time from hours to seconds. Respond to RFQs instantly.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Increase Win Rate</h4>
                  <p className="text-sm text-gray-600">
                    AI optimizes pricing to be competitive while maintaining profitability.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Protect Margins</h4>
                  <p className="text-sm text-gray-600">
                    Guardrails ensure you never bid below your minimum acceptable margin.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <BarChart3 className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Market Intelligence</h4>
                  <p className="text-sm text-gray-600">
                    Pricing recommendations based on real-time market data and competitor analysis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Percent className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Dynamic Discounting</h4>
                  <p className="text-sm text-gray-600">
                    Automatically offer volume discounts to close larger deals faster.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <MessageSquare className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Smart Negotiation</h4>
                  <p className="text-sm text-gray-600">
                    AI handles counter-offers within your approved parameters.
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
            <h2 className="mb-4">Ready to automate your bidding?</h2>
            <p className="text-gray-600 mb-8">
              Let AI handle repetitive quoting while you focus on building relationships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#/signup">
                <Button size="lg">
                  Start Bidding Smarter
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

export default AutoBiddingPage;
