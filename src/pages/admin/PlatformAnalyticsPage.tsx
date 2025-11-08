import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { TrendingUp, Users, FileText, DollarSign, Download } from 'lucide-react';

const PlatformAnalyticsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Platform Analytics</h1>
              <p className="text-gray-600">Detailed insights and metrics</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="30">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-semibold">1,247</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">RFQs Created</p>
              <p className="text-3xl font-semibold">342</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">GMV</p>
              <p className="text-3xl font-semibold">$1.2M</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <span className="text-sm font-medium text-green-600">+10%</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Revenue</p>
              <p className="text-3xl font-semibold">$45K</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-gray-500">Chart: User signups over time</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>RFQ Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-gray-500">Chart: RFQs created over time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Vitamins & Minerals', 'Herbal Extracts', 'Amino Acids', 'Proteins & Peptides'].map((cat, i) => (
                  <div key={cat} className="flex items-center justify-between">
                    <span className="text-sm">{cat}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${90 - i * 15}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{90 - i * 15}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Buyers</span>
                  <span className="font-medium">642 (51.5%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Suppliers</span>
                  <span className="font-medium">605 (48.5%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default PlatformAnalyticsPage;
