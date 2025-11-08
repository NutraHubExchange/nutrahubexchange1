import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, FileText, DollarSign, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { mockRFQs, mockCertifications } from '../../data/mockData';

const AdminDashboardPage: React.FC = () => {
  const pendingCerts = mockCertifications.filter(c => c.status === 'pending').length;
  const openDisputes = 1;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-semibold">1,247</p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </div>
                <Users className="h-10 w-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active RFQs</p>
                  <p className="text-3xl font-semibold">{mockRFQs.length}</p>
                  <p className="text-xs text-green-600 mt-1">+8% this month</p>
                </div>
                <FileText className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">GMV (MTD)</p>
                  <p className="text-3xl font-semibold">$1.2M</p>
                  <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Platform Revenue</p>
                  <p className="text-3xl font-semibold">$45K</p>
                  <p className="text-xs text-green-600 mt-1">+10% vs last month</p>
                </div>
                <TrendingUp className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingCerts > 0 && (
                  <a href="#/admin/certifications/pending" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Certification Reviews</p>
                        <p className="text-sm text-gray-600">{pendingCerts} pending verification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Review</Button>
                  </a>
                )}
                {openDisputes > 0 && (
                  <a href="#/admin/disputes" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Open Disputes</p>
                        <p className="text-sm text-gray-600">{openDisputes} requires attention</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <div className="flex-1">
                    <p className="text-sm">New user registration</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <div className="flex-1">
                    <p className="text-sm">RFQ created</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <div className="flex-1">
                    <p className="text-sm">Quote submitted</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Buyers</span>
                  <span className="font-medium">642</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Suppliers</span>
                  <span className="font-medium">605</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-semibold">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>RFQ Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Open</span>
                  <span className="font-medium">{mockRFQs.filter(r => r.status === 'open').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Closed</span>
                  <span className="font-medium">{mockRFQs.filter(r => r.status === 'closed').length}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-semibold">{mockRFQs.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Approved</span>
                  <span className="font-medium">{mockCertifications.filter(c => c.status === 'approved').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pending</span>
                  <span className="font-medium">{pendingCerts}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-semibold">{mockCertifications.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboardPage;
