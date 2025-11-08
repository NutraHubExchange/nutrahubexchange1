import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { FileCheck, Upload, Calendar, AlertCircle, CheckCircle, Clock, Plus } from 'lucide-react';
import { mockCertifications } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const MyCertificationsPage: React.FC = () => {
  const supplierCerts = mockCertifications.filter(c => c.supplierId === 'supplier-1');
  const [isUploading, setIsUploading] = useState(false);
  const [newCert, setNewCert] = useState({
    type: '',
    number: '',
    expiryDate: '',
  });

  const handleUpload = () => {
    toast.success('Certification uploaded successfully. Pending admin review.');
    setIsUploading(false);
    setNewCert({ type: '', number: '', expiryDate: '' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'expiring_soon':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <Calendar className="h-3 w-3 mr-1" />
            Expiring Soon
          </Badge>
        );
      default:
        return null;
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry < 60 && daysUntilExpiry > 0;
  };

  const pendingCount = supplierCerts.filter(c => c.status === 'pending').length;
  const approvedCount = supplierCerts.filter(c => c.status === 'approved').length;
  const expiringCount = supplierCerts.filter(c => isExpiringSoon(c.expiryDate)).length;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="mb-2">My Certifications</h1>
          <p className="text-gray-600">Manage your quality and compliance certifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-3xl font-semibold">{supplierCerts.length}</p>
                </div>
                <FileCheck className="h-10 w-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Approved</p>
                  <p className="text-3xl font-semibold">{approvedCount}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-semibold">{pendingCount}</p>
                </div>
                <Clock className="h-10 w-10 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
                  <p className="text-3xl font-semibold">{expiringCount}</p>
                </div>
                <AlertCircle className="h-10 w-10 text-red-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {expiringCount > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Action Required: Expiring Certifications</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You have {expiringCount} certification(s) expiring within 60 days. Please renew them to maintain your verified status.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Certifications</CardTitle>
                <CardDescription>
                  Your quality and compliance certificates
                </CardDescription>
              </div>
              <Dialog open={isUploading} onOpenChange={setIsUploading}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Certification
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Certification</DialogTitle>
                    <DialogDescription>
                      Add a new quality or compliance certificate
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="certType">Certification Type</Label>
                      <Select
                        value={newCert.type}
                        onValueChange={(value) => setNewCert({ ...newCert, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GMP">GMP (Good Manufacturing Practice)</SelectItem>
                          <SelectItem value="ISO_9001">ISO 9001</SelectItem>
                          <SelectItem value="ISO_22000">ISO 22000</SelectItem>
                          <SelectItem value="HACCP">HACCP</SelectItem>
                          <SelectItem value="Organic">Organic Certification</SelectItem>
                          <SelectItem value="Kosher">Kosher</SelectItem>
                          <SelectItem value="Halal">Halal</SelectItem>
                          <SelectItem value="FDA">FDA Registration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="certNumber">Certificate Number</Label>
                      <Input
                        id="certNumber"
                        placeholder="CERT-2025-001"
                        value={newCert.number}
                        onChange={(e) => setNewCert({ ...newCert, number: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={newCert.expiryDate}
                        onChange={(e) => setNewCert({ ...newCert, expiryDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="file">Upload Certificate File</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max 10MB)</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleUpload} className="flex-1">
                        Upload & Submit for Review
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsUploading(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{cert.type}</p>
                        {getStatusBadge(cert.status)}
                        {isExpiringSoon(cert.expiryDate) && cert.status === 'approved' && getStatusBadge('expiring_soon')}
                      </div>
                      <p className="text-sm text-gray-600">Number: {cert.number}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-xs text-gray-500">
                          Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                    {isExpiringSoon(cert.expiryDate) && (
                      <Button size="sm">Renew</Button>
                    )}
                  </div>
                </div>
              ))}

              {supplierCerts.length === 0 && (
                <div className="text-center py-12">
                  <FileCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No certifications uploaded yet</p>
                  <Button onClick={() => setIsUploading(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Your First Certification
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MyCertificationsPage;
