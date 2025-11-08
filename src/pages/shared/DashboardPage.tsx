import React from 'react';
import { AppLayout } from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { FileText, TrendingUp, Users, CheckCircle, Clock, DollarSign, Package, AlertCircle } from 'lucide-react';
import { mockRFQs, mockQuotes, mockCertifications } from '../../data/mockData';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const BuyerDashboard: React.FC = () => {
  const myRFQs = mockRFQs.filter(rfq => rfq.buyerId === 'buyer-1');
  const openRFQs = myRFQs.filter(rfq => rfq.status === 'open');
  const totalQuotes = myRFQs.reduce((sum, rfq) => sum + rfq.quotesCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1>Buyer Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your procurement overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active RFQs</p>
                <p className="text-3xl font-semibold">{openRFQs.length}</p>
              </div>
              <FileText className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Quotes</p>
                <p className="text-3xl font-semibold">{totalQuotes}</p>
              </div>
              <Package className="h-10 w-10 text-secondary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-semibold">24h</p>
              </div>
              <Clock className="h-10 w-10 text-accent opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spend (YTD)</p>
                <p className="text-3xl font-semibold">$450K</p>
              </div>
              <DollarSign className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Image Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1704650311329-fb978a50e5e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzJTIwY2Fwc3VsZXN8ZW58MXx8fHwxNzYyNTQ5Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Nutraceutical Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
            <div className="px-8 text-white">
              <h2 className="mb-2">Streamline Your Procurement</h2>
              <p className="text-white/90 mb-4">Access verified suppliers and competitive quotes</p>
              <a href="#/suppliers">
                <Button variant="secondary">Explore Suppliers</Button>
              </a>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent RFQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myRFQs.slice(0, 3).map(rfq => (
                <div key={rfq.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{rfq.title}</p>
                    <p className="text-sm text-gray-600">{rfq.quotesCount} quotes received</p>
                  </div>
                  <a href={`#/rfq/detail/${rfq.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                </div>
              ))}
            </div>
            <a href="#/rfq/my-list">
              <Button variant="link" className="w-full mt-4">View All RFQs</Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="#/rfq/new" className="block">
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New RFQ
                </Button>
              </a>
              <a href="#/suppliers" className="block">
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Suppliers
                </Button>
              </a>
              <a href="#/rfq/templates" className="block">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Use RFQ Template
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SupplierDashboard: React.FC = () => {
  const myQuotes = mockQuotes.filter(q => q.supplierId === 'supplier-1');
  const pendingQuotes = myQuotes.filter(q => q.status === 'pending');
  const certifications = mockCertifications.filter(c => c.supplierId === 'supplier-1');
  const pendingCerts = certifications.filter(c => c.status === 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1>Supplier Dashboard</h1>
        <p className="text-gray-600">Track your quotes and opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Quotes</p>
                <p className="text-3xl font-semibold">{pendingQuotes.length}</p>
              </div>
              <Package className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Win Rate</p>
                <p className="text-3xl font-semibold">35%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-secondary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certifications</p>
                <p className="text-3xl font-semibold">{certifications.length}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-accent opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue (YTD)</p>
                <p className="text-3xl font-semibold">$890K</p>
              </div>
              <DollarSign className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Image Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1607398027609-fbd1a06fb5d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzYyNDg1NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Manufacturing Quality"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
            <div className="px-8 text-white">
              <h2 className="mb-2">Grow Your Business</h2>
              <p className="text-white/90 mb-4">Connect with buyers looking for quality ingredients</p>
              <a href="#/rfq/incoming">
                <Button variant="secondary">View RFQ Opportunities</Button>
              </a>
            </div>
          </div>
        </div>
      </Card>

      {pendingCerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Pending Certification Verification</p>
                <p className="text-sm text-gray-600">You have {pendingCerts.length} certification(s) awaiting admin review.</p>
              </div>
              <a href="#/profile/certifications">
                <Button variant="outline" size="sm">View</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New RFQ Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRFQs.slice(0, 3).map(rfq => (
                <div key={rfq.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{rfq.title}</p>
                    <p className="text-sm text-gray-600">{rfq.quantity} {rfq.unit}</p>
                  </div>
                  <a href={`#/rfq/incoming/detail/${rfq.id}`}>
                    <Button variant="outline" size="sm">Quote</Button>
                  </a>
                </div>
              ))}
            </div>
            <a href="#/rfq/incoming">
              <Button variant="link" className="w-full mt-4">View All Opportunities</Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myQuotes.map(quote => (
                <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">${quote.totalPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Status: {quote.status}</p>
                  </div>
                  <a href="#/quotes/my-list">
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1>Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-semibold">1,247</p>
              </div>
              <Users className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active RFQs</p>
                <p className="text-3xl font-semibold">{mockRFQs.length}</p>
              </div>
              <FileText className="h-10 w-10 text-secondary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Certs</p>
                <p className="text-3xl font-semibold">{mockCertifications.filter(c => c.status === 'pending').length}</p>
              </div>
              <Clock className="h-10 w-10 text-accent opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue (MTD)</p>
                <p className="text-3xl font-semibold">$45K</p>
              </div>
              <DollarSign className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Image Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBtZXRyaWNzJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2MjU1MDAwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Platform Analytics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
            <div className="px-8 text-white">
              <h2 className="mb-2">Platform Insights</h2>
              <p className="text-white/90 mb-4">Monitor performance and optimize operations</p>
              <a href="#/admin/analytics">
                <Button variant="secondary">View Analytics</Button>
              </a>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="#/admin/certifications/pending" className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">Certification Reviews</p>
                  <p className="text-sm text-gray-600">1 pending verification</p>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </a>
              <a href="#/admin/disputes" className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">Open Disputes</p>
                  <p className="text-sm text-gray-600">1 requires attention</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a href="#/admin/users" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </a>
              <a href="#/admin/analytics" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </a>
              <a href="#/admin/settings/general" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Platform Settings
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {user?.role === 'buyer' && <BuyerDashboard />}
        {user?.role === 'supplier' && <SupplierDashboard />}
        {user?.role === 'admin' && <AdminDashboard />}
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
