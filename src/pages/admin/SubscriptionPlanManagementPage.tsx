import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { CreditCard, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const SubscriptionPlanManagementPage: React.FC = () => {
  const [plans, setPlans] = useState([
    { id: '1', name: 'Basic', price: 49, features: ['10 RFQs/month', 'Basic search', 'Email support', '1 user'], active: true },
    { id: '2', name: 'Professional', price: 199, features: ['Unlimited RFQs', 'Advanced search', 'Priority support', '10 users', 'API access'], active: true },
    { id: '3', name: 'Enterprise', price: 499, features: ['Everything in Pro', 'Unlimited users', 'Dedicated manager', 'Custom integrations'], active: true },
  ]);

  const handleTogglePlan = (id: string) => {
    setPlans(plans.map(plan => plan.id === id ? { ...plan, active: !plan.active } : plan));
    toast.success('Plan status updated');
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">Subscription Plans</h1>
            <p className="text-gray-600">Manage platform subscription tiers</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <Switch checked={plan.active} onCheckedChange={() => handleTogglePlan(plan.id)} />
                </div>
                <div className="text-3xl font-semibold">
                  ${plan.price}
                  <span className="text-base font-normal text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">Edit Plan</Button>
                  <p className="text-xs text-center text-gray-500">0 subscribers</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Plan Settings</CardTitle>
            <CardDescription>
              Configure global subscription settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Trial Period</p>
                <p className="text-sm text-gray-600">Offer a free trial for new users</p>
              </div>
              <div className="flex items-center gap-4">
                <Input type="number" defaultValue="14" className="w-20" />
                <span className="text-sm text-gray-600">days</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <p className="font-medium">Allow Annual Billing</p>
                <p className="text-sm text-gray-600">Offer yearly subscriptions with discount</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-3 border-t">
              <div>
                <p className="font-medium">Annual Discount</p>
                <p className="text-sm text-gray-600">Percentage discount for annual plans</p>
              </div>
              <div className="flex items-center gap-2">
                <Input type="number" defaultValue="20" className="w-20" />
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>
            <Button className="mt-4">Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SubscriptionPlanManagementPage;
