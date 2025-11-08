import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  ArrowRight,
  Globe,
  Calendar,
  Target,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const PriceIntelligencePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('ashwagandha');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  const priceData = {
    currentAvg: '$42.50',
    monthlyChange: '+5.2%',
    yearlyChange: '+12.8%',
    trend: 'up',
    lowPrice: '$38.00',
    highPrice: '$48.50',
    volatility: 'Medium',
    nextForecast: '$44.20',
    confidence: '87%'
  };

  const regionalPrices = [
    { region: 'India', price: '$40.50', change: '+3.1%', suppliers: 45 },
    { region: 'China', price: '$38.20', change: '+4.5%', suppliers: 32 },
    { region: 'USA', price: '$46.80', change: '+2.8%', suppliers: 18 },
    { region: 'Europe', price: '$45.00', change: '+3.9%', suppliers: 22 }
  ];

  const marketFactors = [
    { factor: 'Raw Material Cost', impact: 'High', direction: 'up', value: '+8%' },
    { factor: 'Seasonal Demand', impact: 'Medium', direction: 'up', value: '+15%' },
    { factor: 'Supply Chain', impact: 'Low', direction: 'stable', value: '0%' },
    { factor: 'Tariffs (US-India)', impact: 'Medium', direction: 'up', value: '+5%' }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <DollarSign className="h-12 w-12" />
              <Badge className="bg-yellow-500 text-black border-0 px-3 py-1">REAL-TIME</Badge>
            </div>
            <h1 className="mb-6">Price Intelligence</h1>
            <p className="text-xl opacity-90 mb-8">
              Real-time market pricing, historical trends, and AI-powered forecasting to help you buy smarter and sell competitively.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">Market Intelligence at Your Fingertips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">1. Real-Time Data</h3>
                  <p className="text-gray-600 text-sm">
                    Live pricing aggregated from thousands of RFQs, bids, and completed transactions across the platform.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">2. Trend Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Historical price movements, seasonality patterns, and market factor correlations powered by machine learning.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">3. AI Forecasting</h3>
                  <p className="text-gray-600 text-sm">
                    Predictive models forecast price movements 30-90 days ahead based on supply chain signals and demand patterns.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Price Tracker */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Live Price Tracker</h2>
              <p className="text-gray-600">
                Select a product and region to see current market intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <label className="text-sm font-medium mb-2 block">Product</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ashwagandha">Ashwagandha Extract (KSM-66)</SelectItem>
                      <SelectItem value="curcumin">Curcumin 95%</SelectItem>
                      <SelectItem value="rhodiola">Rhodiola Rosea Extract</SelectItem>
                      <SelectItem value="bacopa">Bacopa Monnieri Extract</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global Average</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex items-end">
                  <Button onClick={handleAnalyze} className="w-full" size="lg">
                    <Target className="h-5 w-5 mr-2" />
                    Get Price Intelligence
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Price Analysis Dashboard */}
            {showAnalysis && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Main Price Card */}
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle>Ashwagandha Extract (KSM-66) - Global Market</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Current Average</p>
                        <p className="text-3xl font-bold text-primary">{priceData.currentAvg}</p>
                        <p className="text-xs text-gray-600 mt-1">per kg</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Monthly Change</p>
                        <p className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                          <TrendingUp className="h-5 w-5" />
                          {priceData.monthlyChange}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">vs last month</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Price Range</p>
                        <p className="text-lg font-bold text-blue-900">
                          {priceData.lowPrice} - {priceData.highPrice}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">current market</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">30-Day Forecast</p>
                        <p className="text-2xl font-bold text-purple-900">{priceData.nextForecast}</p>
                        <p className="text-xs text-gray-600 mt-1">{priceData.confidence} confidence</p>
                      </div>
                    </div>

                    {/* Mock Price Chart */}
                    <div className="h-64 bg-gradient-to-b from-primary/5 to-transparent rounded-lg p-6 flex items-end justify-between gap-2">
                      {[38, 42, 40, 45, 43, 46, 44, 42, 45, 47, 46, 43].map((height, idx) => (
                        <div key={idx} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 px-6">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Regional Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Regional Price Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {regionalPrices.map((region) => (
                        <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{region.region}</h4>
                              <p className="text-sm text-gray-600">{region.suppliers} active suppliers</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">{region.price}</p>
                            <p className="text-sm text-green-600 flex items-center gap-1 justify-end">
                              <TrendingUp className="h-4 w-4" />
                              {region.change}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Market Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Market Factors Influencing Price
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {marketFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <div>
                              <h4 className="font-medium">{factor.factor}</h4>
                              <Badge variant="outline" className="mt-1">
                                {factor.impact} Impact
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {factor.direction === 'up' && (
                              <TrendingUp className="h-5 w-5 text-red-500" />
                            )}
                            {factor.direction === 'down' && (
                              <TrendingDown className="h-5 w-5 text-green-500" />
                            )}
                            {factor.direction === 'stable' && (
                              <div className="h-5 w-5 flex items-center justify-center">
                                <div className="h-0.5 w-4 bg-gray-400"></div>
                              </div>
                            )}
                            <span className={`font-semibold ${
                              factor.direction === 'up' ? 'text-red-600' : 
                              factor.direction === 'down' ? 'text-green-600' : 
                              'text-gray-600'
                            }`}>
                              {factor.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Insights & Recommendations */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">AI Insights & Recommendations</h4>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>Current prices are <strong>5.2% above historical average</strong> due to increased seasonal demand</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span><strong>Best time to buy:</strong> Prices expected to stabilize in 45-60 days as harvest season begins</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span><strong>Regional advantage:</strong> Indian suppliers currently offering 6.5% lower prices than global average</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span><strong>Volume opportunity:</strong> Orders &gt;1500kg can negotiate 8-10% discounts based on market data</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">Comprehensive Market Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Live Market Rates</h4>
                  <p className="text-sm text-gray-600">
                    Real-time pricing from thousands of active transactions across the platform
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Historical Trends</h4>
                  <p className="text-sm text-gray-600">
                    12-24 month price history with seasonality and volatility analysis
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Globe className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Regional Comparison</h4>
                  <p className="text-sm text-gray-600">
                    Compare prices across India, China, USA, and Europe markets
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Calendar className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Demand Forecasting</h4>
                  <p className="text-sm text-gray-600">
                    Predict price movements 30-90 days ahead with ML models
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <BarChart3 className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Market Factor Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Track tariffs, supply chain, seasonality, and raw material costs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Target className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Competitive Benchmarking</h4>
                  <p className="text-sm text-gray-600">
                    See where your pricing stands vs market averages
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
            <h2 className="mb-4">Make data-driven pricing decisions</h2>
            <p className="text-gray-600 mb-8">
              Access real-time market intelligence and stay ahead of price movements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#/signup">
                <Button size="lg">
                  Get Price Intelligence
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

export default PriceIntelligencePage;
