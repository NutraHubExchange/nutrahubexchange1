import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Shield, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileCheck,
  Award,
  Clock,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Search,
  AlertCircle
} from 'lucide-react';

const QualityGuardrailsPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 2500);
  };

  const mockCertifications = [
    { name: 'GMP', status: 'verified', expiry: '2026-03-15', issuer: 'WHO-GMP' },
    { name: 'ISO 22000', status: 'verified', expiry: '2025-12-20', issuer: 'ISO International' },
    { name: 'FSSAI', status: 'verified', expiry: '2026-06-10', issuer: 'Food Safety Authority' },
    { name: 'USDA Organic', status: 'expired', expiry: '2024-11-01', issuer: 'USDA' },
  ];

  const coaAnalysis = {
    documentAuthenticity: 95,
    assayConsistency: 88,
    labVerification: 'Verified',
    anomaliesDetected: 2,
    riskScore: 'Low',
    issues: [
      { severity: 'warning', message: 'Assay value variance across batches (±3%)' },
      { severity: 'info', message: 'Lab address updated recently - verified with accreditation body' }
    ]
  };

  const supplierRisk = {
    overallScore: 92,
    lateShipments: 2,
    qualityComplaints: 1,
    disputeHistory: 0,
    positiveReviews: 47,
    rating: 4.8
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12" />
              <Badge className="bg-yellow-500 text-black border-0 px-3 py-1">FRAUD DETECTION</Badge>
            </div>
            <h1 className="mb-6">Quality & Compliance Guardrails</h1>
            <p className="text-xl opacity-90 mb-8">
              Advanced AI-powered verification that catches certification fraud, validates COAs, and protects your business from non-compliant suppliers.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">Multi-Layer Verification System</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">1. Certificate Verification</h3>
                  <p className="text-gray-600 text-sm">
                    Automated checks of GMP, ISO, FSSAI, USDA Organic, Halal, Kosher certifications against issuing authority databases.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">2. COA Forensics</h3>
                  <p className="text-gray-600 text-sm">
                    Document analysis detects recycled PDFs, suspiciously perfect assays, inconsistent lab addresses, and forged signatures.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingDown className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3">3. Risk Scoring</h3>
                  <p className="text-gray-600 text-sm">
                    Supplier risk assessment based on adverse events, late shipments, claim disputes, and compliance history.
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
              <h2 className="mb-4">Live Compliance Scanner</h2>
              <p className="text-gray-600">
                See how our AI verifies supplier credentials in real-time
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Supplier Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Supplier Profile Under Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="mb-3">BioExtracts International Pvt. Ltd.</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">Location: Bangalore, India</p>
                      <p className="text-gray-600">Registration: FSSAI-12345678901234</p>
                      <p className="text-gray-600">Years in Business: 8</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm mb-3">Submitted Certifications</h4>
                    <div className="space-y-2">
                      {mockCertifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-sm">{cert.name}</p>
                              <p className="text-xs text-gray-600">{cert.issuer}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">Exp: {cert.expiry}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleScan}
                    disabled={scanning}
                    className="w-full"
                    size="lg"
                  >
                    {scanning ? (
                      <>
                        <Shield className="h-5 w-5 mr-2 animate-pulse" />
                        Scanning Credentials...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Run Compliance Scan
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Scan Results */}
              {showResults && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="border-2 border-green-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Verification Results</CardTitle>
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {supplierRisk.overallScore}% Safe
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Certifications Status */}
                      <div>
                        <h4 className="text-sm mb-3">Certification Status</h4>
                        <div className="space-y-2">
                          {mockCertifications.map((cert, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-2 rounded ${
                              cert.status === 'verified' ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                              <div className="flex items-center gap-2">
                                {cert.status === 'verified' ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm font-medium">{cert.name}</span>
                              </div>
                              <Badge variant={cert.status === 'verified' ? 'default' : 'destructive'} className="text-xs">
                                {cert.status === 'verified' ? 'Valid' : 'Expired'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* COA Analysis */}
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm mb-3 flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-blue-600" />
                          COA Forensics Analysis
                        </h4>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-600">Document Authenticity</p>
                            <p className="text-sm font-semibold text-blue-900">{coaAnalysis.documentAuthenticity}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Assay Consistency</p>
                            <p className="text-sm font-semibold text-blue-900">{coaAnalysis.assayConsistency}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Lab Verification</p>
                            <p className="text-sm font-semibold text-green-600">{coaAnalysis.labVerification}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Risk Level</p>
                            <p className="text-sm font-semibold text-green-600">{coaAnalysis.riskScore}</p>
                          </div>
                        </div>
                        {coaAnalysis.issues.map((issue, idx) => (
                          <div key={idx} className={`flex items-start gap-2 p-2 rounded mb-2 ${
                            issue.severity === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                          }`}>
                            {issue.severity === 'warning' ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            )}
                            <p className="text-xs">{issue.message}</p>
                          </div>
                        ))}
                      </div>

                      {/* Supplier Risk Score */}
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="text-sm mb-3 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          Supplier Reliability Score
                        </h4>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-600">Rating</p>
                            <p className="text-sm font-semibold text-green-900">★ {supplierRisk.rating}/5.0</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Reviews</p>
                            <p className="text-sm font-semibold text-green-900">{supplierRisk.positiveReviews}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Disputes</p>
                            <p className="text-sm font-semibold text-green-900">{supplierRisk.disputeHistory}</p>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <p className="flex justify-between">
                            <span className="text-gray-600">Late Shipments (12mo):</span>
                            <span className="font-medium">{supplierRisk.lateShipments}</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-gray-600">Quality Complaints:</span>
                            <span className="font-medium">{supplierRisk.qualityComplaints}</span>
                          </p>
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Supplier
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">Comprehensive Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Certificate Verification</h4>
                  <p className="text-sm text-gray-600">
                    Real-time validation against issuing authority databases (GMP, ISO, FSSAI, Organic, Halal, Kosher)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <FileCheck className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">COA Fraud Detection</h4>
                  <p className="text-sm text-gray-600">
                    ML algorithms spot recycled PDFs, templated results, and statistical anomalies
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Expiry Monitoring</h4>
                  <p className="text-sm text-gray-600">
                    Automated alerts for expiring certifications before they lapse
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Search className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Lab Verification</h4>
                  <p className="text-sm text-gray-600">
                    Cross-reference testing labs with accreditation registries
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <TrendingDown className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Risk Scoring</h4>
                  <p className="text-sm text-gray-600">
                    Historical performance analysis including shipment delays and disputes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h4 className="mb-2">Continuous Monitoring</h4>
                  <p className="text-sm text-gray-600">
                    Ongoing surveillance for adverse events and compliance violations
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
            <h2 className="mb-4">Protect your business from fraud</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of buyers who trust NutraHubExchange's AI-powered verification
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#/signup">
                <Button size="lg">
                  Start Verifying Suppliers
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

export default QualityGuardrailsPage;
