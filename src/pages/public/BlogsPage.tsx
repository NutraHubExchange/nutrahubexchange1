import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  TrendingUp,
  Brain,
  Globe,
  DollarSign,
  Pill,
  BarChart3,
  Sparkles,
  Shield,
  Package,
  Building2
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
  icon: React.ReactNode;
  tags: string[];
}

const BlogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Rise of Personalized Nutraceuticals: A Market Perspective',
      excerpt: 'Explore how personalized nutrition is transforming the nutraceuticals industry, with customized supplements tailored to individual genetic profiles, lifestyle factors, and health goals driving unprecedented market growth.',
      category: 'Nutraceuticals',
      date: 'November 5, 2025',
      readTime: '8 min read',
      author: 'Dr. Sarah Chen',
      imageUrl: 'https://images.unsplash.com/photo-1740560052706-fd75ee856b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbGl6ZWQlMjBudXRyaXRpb24lMjBzdXBwbGVtZW50c3xlbnwxfHx8fDE3NjI2MDEzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Pill className="size-5" />,
      tags: ['Market Trends', 'Personalization', 'Innovation']
    },
    {
      id: 2,
      title: 'AI-Powered Quality Control: Revolutionizing COA Verification',
      excerpt: 'Learn how artificial intelligence and machine learning algorithms are automating Certificate of Analysis verification, detecting fraud, and ensuring compliance in real-time, reducing verification time from days to seconds.',
      category: 'AI in Nutraceuticals',
      date: 'November 3, 2025',
      readTime: '10 min read',
      author: 'James Mitchell',
      imageUrl: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI1NzIwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Brain className="size-5" />,
      tags: ['AI', 'Quality Control', 'Compliance']
    },
    {
      id: 3,
      title: 'Global Nutraceuticals Market: 2025 Trends and Projections',
      excerpt: 'An in-depth analysis of worldwide nutraceutical consumption patterns, emerging markets in Asia-Pacific and Latin America, and projected growth rates through 2030, with market size expected to exceed $600 billion.',
      category: 'Global Trends',
      date: 'October 28, 2025',
      readTime: '12 min read',
      author: 'Maria Rodriguez',
      imageUrl: 'https://images.unsplash.com/photo-1759661659595-44917c3d9045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMGdyb3d0aHxlbnwxfHx8fDE3NjI1NzY3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Globe className="size-5" />,
      tags: ['Market Analysis', 'Global', 'Statistics']
    },
    {
      id: 4,
      title: 'Tariff Impact Analysis: US-China Trade Relations and Ingredient Costs',
      excerpt: 'Examining how recent tariff implementations are reshaping global supply chains, affecting ingredient pricing, and driving manufacturers to diversify sourcing strategies across India, Southeast Asia, and Europe.',
      category: 'Tariffs & Trade',
      date: 'October 25, 2025',
      readTime: '9 min read',
      author: 'Robert Chen',
      imageUrl: 'https://images.unsplash.com/photo-1590309427055-e667fa5a5281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkZSUyMGZpbmFuY2UlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjI2MDEzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <DollarSign className="size-5" />,
      tags: ['Tariffs', 'Supply Chain', 'Economics']
    },
    {
      id: 5,
      title: 'Machine Learning for Demand Forecasting in B2B Nutraceuticals',
      excerpt: 'Discover how predictive analytics and ML models are helping suppliers optimize inventory levels, reduce waste, and match production capacity with buyer demand patterns across seasonal and regional variations.',
      category: 'AI in Nutraceuticals',
      date: 'October 20, 2025',
      readTime: '11 min read',
      author: 'Dr. Priya Sharma',
      imageUrl: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzfGVufDF8fHx8MTc2MjUzMDMyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <BarChart3 className="size-5" />,
      tags: ['Machine Learning', 'Forecasting', 'Supply Chain']
    },
    {
      id: 6,
      title: 'Adaptogens and Stress Relief: The Fastest Growing Supplement Category',
      excerpt: 'Deep dive into the science behind adaptogenic herbs like Ashwagandha, Rhodiola, and Holy Basil, consumer demand drivers, clinical efficacy studies, and why this category is growing at 15% annually.',
      category: 'Nutraceuticals',
      date: 'October 15, 2025',
      readTime: '7 min read',
      author: 'Dr. Michael Zhang',
      imageUrl: 'https://images.unsplash.com/photo-1556760621-0431cd11d983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGVyYnMlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjI1NzEyMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Sparkles className="size-5" />,
      tags: ['Adaptogens', 'Wellness', 'Research']
    },
    {
      id: 7,
      title: 'European Tariffs on Botanical Extracts: What Buyers Need to Know',
      excerpt: 'Comprehensive guide to new EU import regulations, documentation requirements for botanical ingredients, duty rates by country of origin, and strategic considerations for European buyers and sellers.',
      category: 'Tariffs & Trade',
      date: 'October 10, 2025',
      readTime: '10 min read',
      author: 'Elena Kovacs',
      imageUrl: 'https://images.unsplash.com/photo-1684063007804-7933d167733e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGJ1c2luZXNzJTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2MjYwMTM2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Building2 className="size-5" />,
      tags: ['Europe', 'Regulations', 'Import/Export']
    },
    {
      id: 8,
      title: 'NLP and Document Processing: Automating RFQ Matching',
      excerpt: 'How Natural Language Processing algorithms parse complex product specifications, extract key attributes, normalize terminology, and match buyers with qualified suppliers faster than manual review processes.',
      category: 'AI in Nutraceuticals',
      date: 'October 5, 2025',
      readTime: '9 min read',
      author: 'Alex Kumar',
      imageUrl: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2dyYW1taW5nJTIwY29kZXxlbnwxfHx8fDE3NjI1ODU1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Shield className="size-5" />,
      tags: ['NLP', 'Automation', 'Efficiency']
    },
    {
      id: 9,
      title: 'Probiotics Market Boom: From $50B to $100B by 2028',
      excerpt: 'Analysis of the explosive growth in probiotics and gut health supplements, emerging strain research, consumer awareness trends, regulatory landscape, and opportunities for ingredient suppliers and formulators.',
      category: 'Global Trends',
      date: 'September 30, 2025',
      readTime: '8 min read',
      author: 'Dr. Lisa Wang',
      imageUrl: 'https://images.unsplash.com/photo-1607073606268-05ba53ffcf3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9iaW90aWMlMjBoZWFsdGglMjBzY2llbmNlfGVufDF8fHx8MTc2MjYwMTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <TrendingUp className="size-5" />,
      tags: ['Probiotics', 'Growth', 'Innovation']
    },
    {
      id: 10,
      title: 'India vs. China: Shifting Dynamics in Ingredient Sourcing Post-2024',
      excerpt: 'Comparative analysis of manufacturing capabilities, cost structures, quality certifications, and how geopolitical factors are accelerating the shift toward Indian suppliers for key botanical and herbal extracts.',
      category: 'Tariffs & Trade',
      date: 'September 25, 2025',
      readTime: '11 min read',
      author: 'Rajesh Gupta',
      imageUrl: 'https://images.unsplash.com/photo-1761048163208-5588e188f19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGNoaW5hJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYyNjAxMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: <Package className="size-5" />,
      tags: ['Sourcing', 'India', 'China']
    }
  ];

  const categories = ['All', 'Nutraceuticals', 'AI in Nutraceuticals', 'Global Trends', 'Tariffs & Trade'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">NutraHub Insights</h1>
            <p className="text-xl opacity-90 mb-8">
              Expert analysis, industry trends, and the latest innovations in nutraceuticals and B2B commerce
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                className="pl-12 h-12 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white flex items-center gap-1">
                        {post.icon}
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <h3 className="mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="size-4" />
                        <span>{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Read More
                        <ArrowRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No articles found matching your search.</p>
              <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for weekly insights on nutraceuticals, AI innovations, and industry trends
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogsPage;
