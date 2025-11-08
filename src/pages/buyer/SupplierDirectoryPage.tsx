import React, { useState } from 'react';
import { AppLayout } from '../../components/Layout';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search, Star, MapPin, CheckCircle } from 'lucide-react';
import { mockSuppliers } from '../../data/mockData';

const SupplierDirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || supplier.categories.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1>Supplier Directory</h1>
          <p className="text-gray-600">Browse and connect with verified suppliers</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search suppliers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Herbal Extracts">Herbal Extracts</SelectItem>
                  <SelectItem value="Marine Extracts">Marine Extracts</SelectItem>
                  <SelectItem value="Probiotics">Probiotics</SelectItem>
                  <SelectItem value="Vitamins">Vitamins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{supplier.companyName}</h3>
                      {supplier.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="text-gray-500">({supplier.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {supplier.location}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{supplier.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {supplier.categories.slice(0, 3).map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                  ))}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <CheckCircle className="h-4 w-4 inline mr-1" />
                  {supplier.certifications.filter(c => c.status === 'verified').length} verified certifications
                </div>

                <a href={`#/suppliers/${supplier.id}`}>
                  <Button className="w-full">View Profile</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SupplierDirectoryPage;
