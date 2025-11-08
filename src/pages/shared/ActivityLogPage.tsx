import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { FileText, User, Settings, DollarSign, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

interface ActivityLog {
  id: string;
  type: 'rfq' | 'quote' | 'profile' | 'payment' | 'message' | 'dispute';
  action: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error';
}

const mockActivities: ActivityLog[] = [
  {
    id: '1',
    type: 'rfq',
    action: 'RFQ Created',
    description: 'Created new RFQ for Vitamin C Powder - 500kg',
    timestamp: '2025-11-07T10:30:00Z',
    status: 'success',
  },
  {
    id: '2',
    type: 'quote',
    action: 'Quote Received',
    description: 'New quote received from NutriSource Ltd',
    timestamp: '2025-11-07T09:15:00Z',
    status: 'success',
  },
  {
    id: '3',
    type: 'message',
    action: 'Message Sent',
    description: 'Sent message to Jane Supplier regarding delivery schedule',
    timestamp: '2025-11-06T16:45:00Z',
  },
  {
    id: '4',
    type: 'profile',
    action: 'Profile Updated',
    description: 'Updated company billing address',
    timestamp: '2025-11-06T14:20:00Z',
    status: 'success',
  },
  {
    id: '5',
    type: 'payment',
    action: 'Payment Method Added',
    description: 'Added new credit card ending in 4242',
    timestamp: '2025-11-05T11:00:00Z',
    status: 'success',
  },
  {
    id: '6',
    type: 'dispute',
    action: 'Dispute Filed',
    description: 'Filed dispute regarding order #ORD-1234',
    timestamp: '2025-11-04T13:30:00Z',
    status: 'warning',
  },
];

const ActivityLogPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'rfq':
        return <FileText className="h-5 w-5" />;
      case 'quote':
        return <DollarSign className="h-5 w-5" />;
      case 'profile':
        return <User className="h-5 w-5" />;
      case 'payment':
        return <DollarSign className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'dispute':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const variants = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-orange-100 text-orange-800',
      error: 'bg-red-100 text-red-800',
    };
    
    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredActivities = mockActivities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesSearch = 
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="mb-2">Activity Log</h1>
          <p className="text-gray-600">View all your recent account activities</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="rfq">RFQs</SelectItem>
                  <SelectItem value="quote">Quotes</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="dispute">Disputes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                    {getIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium">{activity.action}</p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}

              {filteredActivities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No activities found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ActivityLogPage;
