import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { DollarSign, Building2, CreditCard, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const PayoutSettingsPage: React.FC = () => {
  const [payoutMethod, setPayoutMethod] = useState<'bank' | 'paypal'>('bank');
  const [bankDetails, setBankDetails] = useState({
    accountName: 'NutriSource Ltd',
    accountNumber: '****1234',
    routingNumber: '****5678',
    bankName: 'Bank of America',
    swift: 'BOFAUS3N',
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Payout settings updated successfully');
  };

  const payoutHistory = [
    {
      id: '1',
      date: '2025-11-01',
      amount: 15250.00,
      status: 'completed',
      description: 'October 2025 Earnings',
    },
    {
      id: '2',
      date: '2025-10-01',
      amount: 18750.00,
      status: 'completed',
      description: 'September 2025 Earnings',
    },
    {
      id: '3',
      date: '2025-12-01',
      amount: 12890.00,
      status: 'pending',
      description: 'November 2025 Earnings',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-orange-100 text-orange-800',
      failed: 'bg-red-100 text-red-800',
    };

    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="mb-2">Payout Settings</h1>
          <p className="text-gray-600">Manage how you receive payments for accepted quotes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-3xl font-semibold">$12,890</p>
                </div>
                <DollarSign className="h-10 w-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Month</p>
                  <p className="text-3xl font-semibold">$15,250</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">YTD Earnings</p>
                  <p className="text-3xl font-semibold">$189K</p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Next Payout</p>
                  <p className="text-3xl font-semibold">Dec 1</p>
                </div>
                <Calendar className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Payout Method
            </CardTitle>
            <CardDescription>
              Choose how you want to receive your payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <Select value={payoutMethod} onValueChange={(value: 'bank' | 'paypal') => setPayoutMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {payoutMethod === 'bank' && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        value={bankDetails.accountName}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        value={bankDetails.routingNumber}
                        onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="swift">SWIFT/BIC Code</Label>
                      <Input
                        id="swift"
                        value={bankDetails.swift}
                        onChange={(e) => setBankDetails({ ...bankDetails, swift: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {payoutMethod === 'paypal' && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div>
                    <Label htmlFor="paypalEmail">PayPal Email</Label>
                    <Input
                      id="paypalEmail"
                      type="email"
                      placeholder="your-email@example.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Payouts will be sent to this PayPal email address
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button onClick={handleSave}>Save Payout Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>
              Your payment transaction history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payoutHistory.map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">${payout.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{payout.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(payout.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(payout.status)}
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Payout Schedule</p>
                <p className="text-sm text-gray-600 mt-1">
                  Payouts are processed on the 1st of each month for the previous month's earnings.
                  Ensure your payout method is set up correctly to avoid delays.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PayoutSettingsPage;
