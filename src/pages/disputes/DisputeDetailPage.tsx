import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { AlertCircle, Send, FileText, Calendar, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const DisputeDetailPage: React.FC<{ id?: string }> = ({ id }) => {
  const [newMessage, setNewMessage] = useState('');

  const dispute = {
    id: id || '1',
    disputeNumber: 'DSP-2025-001',
    subject: 'Quality issue with delivered batch',
    orderNumber: 'ORD-1234',
    filedDate: '2025-11-05',
    status: 'in_review',
    priority: 'high',
    category: 'Product Quality Issue',
    description: 'The delivered batch of Vitamin C powder does not match the agreed specifications. The purity level is below 98% as per the COA provided.',
    filedBy: 'John Buyer (Health Foods Inc)',
    respondent: 'Jane Supplier (NutriSource Ltd)',
  };

  const messages = [
    {
      id: '1',
      sender: 'John Buyer',
      message: 'The batch received does not meet the specifications we agreed upon.',
      timestamp: '2025-11-05T10:30:00Z',
      isAdmin: false,
    },
    {
      id: '2',
      sender: 'Admin Support',
      message: 'Thank you for filing this dispute. We have notified the supplier and are reviewing the documentation provided.',
      timestamp: '2025-11-05T14:00:00Z',
      isAdmin: true,
    },
    {
      id: '3',
      sender: 'Jane Supplier',
      message: 'We apologize for the issue. We are reviewing our quality control process and will provide a replacement batch.',
      timestamp: '2025-11-06T09:15:00Z',
      isAdmin: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast.success('Message sent');
      setNewMessage('');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-blue-100 text-blue-800',
      in_review: 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800',
    };

    return (
      <Badge variant="secondary" className={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <a href="#/disputes" className="text-blue-600 hover:underline">Disputes</a>
            <span className="text-gray-400">/</span>
            <span>{dispute.disputeNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <h1>{dispute.subject}</h1>
            <div className="flex gap-2">
              {getStatusBadge(dispute.status)}
              {getPriorityBadge(dispute.priority)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dispute Number</p>
                    <p className="font-medium">{dispute.disputeNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Number</p>
                    <p className="font-medium">{dispute.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Filed Date</p>
                    <p className="font-medium">{new Date(dispute.filedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="font-medium">{dispute.category}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-800">{dispute.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg ${
                        msg.isAdmin ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{msg.sender}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-gray-700">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a message to the discussion..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parties Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Filed By</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{dispute.filedBy}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Respondent</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{dispute.respondent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">COA_Report.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Product_Photo.jpg</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {dispute.status === 'resolved' && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Dispute Resolved</p>
                      <p className="text-sm text-green-700 mt-1">
                        This dispute has been successfully resolved.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DisputeDetailPage;
