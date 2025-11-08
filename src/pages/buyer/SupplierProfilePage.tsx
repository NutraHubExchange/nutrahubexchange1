import React from 'react';
import { AppLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Star, MapPin, CheckCircle, Calendar, MessageSquare } from 'lucide-react';
import { mockSuppliers } from '../../data/mockData';

const SupplierProfilePage: React.FC<{ id?: string }> = ({ id = 'supplier-1' }) => {
  const supplier = mockSuppliers.find(s => s.id === id) || mockSuppliers[0];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-3xl font-semibold">
                {supplier.companyName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1>{supplier.companyName}</h1>
                  {supplier.verified && (
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{supplier.rating}</span>
                    <span>({supplier.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-5 w-5" />
                    {supplier.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-5 w-5" />
                    Joined {new Date(supplier.joinedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Supplier
                  </Button>
                  <Button variant="outline">Request Quote</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{supplier.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {supplier.categories.map((cat) => (
                    <Badge key={cat}>{cat}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Verified Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplier.certifications.filter(c => c.status === 'verified').map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <p className="font-medium">{cert.type}</p>
                        </div>
                        <p className="text-sm text-gray-600">Issued by {cert.issuingBody}</p>
                        <p className="text-sm text-gray-600">
                          Valid until {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">Verified</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Excellent Service</span>
                      </div>
                      <span className="text-sm text-gray-500">Nov 1, 2025</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      Great quality products and reliable delivery. The team was very responsive to our questions.
                    </p>
                    <p className="text-sm text-gray-500">- Health Foods Inc</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SupplierProfilePage;
