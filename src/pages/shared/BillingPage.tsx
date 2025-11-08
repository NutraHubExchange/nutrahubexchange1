import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { CreditCard, Check, Calendar, DollarSign } from 'lucide-react';

const BillingPage: React.FC = () => {
  const currentPlan = {
    name: 'Professional',
    price: 199,
    interval: 'month',
    features: [
      'Unlimited RFQs',
      'Advanced supplier search',
      'Priority support',
      'Team collaboration (up to 10 users)',
      'API access',
      'Custom reporting',
    ],
    nextBillingDate: '2025-12-07',
  };

  const plans = [
    {
      name: 'Basic',
      price: 49,
      interval: 'month',
      features: [
        '10 RFQs per month',
        'Basic supplier search',
        'Email support',
        '1 user',
      ],
    },
    {
      name: 'Professional',
      price: 199,
      interval: 'month',
      features: [
        'Unlimited RFQs',
        'Advanced supplier search',
        'Priority support',
        'Team collaboration (up to 10 users)',
        'API access',
        'Custom reporting',
      ],
      current: true,
    },
    {
      name: 'Enterprise',
      price: 499,
      interval: 'month',
      features: [
        'Everything in Professional',
        'Unlimited users',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'White-label options',
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your subscription and billing information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Current Plan</p>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
              <p className="text-2xl font-semibold mb-1">{currentPlan.name}</p>
              <p className="text-gray-600">
                ${currentPlan.price}/{currentPlan.interval}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <p className="text-sm text-gray-600">Next Billing Date</p>
              </div>
              <p className="text-2xl font-semibold">
                {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <p className="text-sm text-gray-600">Monthly Spend</p>
              </div>
              <p className="text-2xl font-semibold">${currentPlan.price}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Your active subscription details and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium text-lg">{currentPlan.name} Plan</p>
                  <p className="text-gray-600">
                    ${currentPlan.price} billed monthly
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </div>
              <div>
                <p className="font-medium mb-3">Included Features:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="mb-4">Available Plans</h2>
          <p className="text-gray-600 mb-6">
            Choose the plan that best fits your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? 'border-blue-500 border-2' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.current && (
                    <Badge className="bg-blue-100 text-blue-800">Current</Badge>
                  )}
                </div>
                <div className="text-3xl font-semibold">
                  ${plan.price}
                  <span className="text-base font-normal text-gray-600">/{plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full">
                    {plan.price < currentPlan.price ? 'Downgrade' : 'Upgrade'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2026</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
            <Button variant="link" className="mt-4">+ Add New Payment Method</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BillingPage;
