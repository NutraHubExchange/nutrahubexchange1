import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, BookOpen, MessageCircle, Video, FileText, PlayCircle } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useOnboarding } from '../../contexts/OnboardingContext';

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { showOnboarding } = useOnboarding();

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How does the platform tour work?',
          a: 'New visitors automatically see an interactive tour showing the complete workflow from registration to order fulfillment. You can also restart the tour anytime by clicking "Platform Tour" in this Help Center.'
        },
        {
          q: 'How do I create an account?',
          a: 'Click the "Sign Up" button in the top right corner. Choose whether you\'re a buyer or supplier, fill in your details, and you\'ll be ready to start using the platform within minutes.'
        },
        {
          q: 'What is the difference between buyer and supplier accounts?',
          a: 'Buyer accounts can create RFQs and browse suppliers. Supplier accounts can respond to RFQs and manage certifications. Both have access to messaging and dispute resolution features.'
        },
        {
          q: 'Is there a free trial?',
          a: 'Yes! We offer a 14-day free trial on all plans. No credit card required to start. Explore all features before committing to a subscription.'
        },
      ]
    },
    {
      category: 'For Buyers',
      questions: [
        {
          q: 'How do I create an RFQ?',
          a: 'Navigate to "Create RFQ" from your dashboard. Fill in the product details, quantity, certifications required, and deadline. Your RFQ will be visible to all verified suppliers matching your criteria.'
        },
        {
          q: 'How do I compare quotes?',
          a: 'Go to your RFQ detail page to see all submitted quotes side-by-side. You can filter and sort by price, lead time, supplier rating, and certification status.'
        },
        {
          q: 'Can I save RFQ templates?',
          a: 'Yes! After creating an RFQ, you can save it as a template for future use. Access your saved templates from the "Templates" page and customize them as needed.'
        },
        {
          q: 'How do I verify supplier certifications?',
          a: 'All supplier certifications are verified by our team. You can view certification details on each supplier\'s profile, including expiration dates and verification status.'
        },
      ]
    },
    {
      category: 'For Suppliers',
      questions: [
        {
          q: 'How do I get verified?',
          a: 'Upload your certifications (GMP, ISO, FDA, etc.) in the "Certifications" section of your profile. Our team reviews submissions within 2-3 business days and you\'ll be notified of the verification status.'
        },
        {
          q: 'How do I submit a quote?',
          a: 'Browse incoming RFQs that match your capabilities from your dashboard. Click on an RFQ to view full details and fill out the quote form with your pricing, lead times, and terms.'
        },
        {
          q: 'When do I get paid?',
          a: 'Payments are processed securely through the platform. Set up your payout settings in your profile to receive funds directly to your bank account. Payouts are typically processed within 3-5 business days after order completion.'
        },
        {
          q: 'Can I showcase my products?',
          a: 'Yes! You can add products to your supplier profile with descriptions, images, and certifications. This helps buyers find you more easily.'
        },
      ]
    },
    {
      category: 'Billing & Subscriptions',
      questions: [
        {
          q: 'What subscription plans are available?',
          a: 'We offer Starter ($99/mo - 10 RFQs), Professional ($299/mo - 50 RFQs), and Enterprise ($999/mo - unlimited RFQs) plans. Each plan includes different features and limits tailored to your business needs.'
        },
        {
          q: 'Can I change my plan?',
          a: 'Yes, you can upgrade or downgrade your plan at any time from the Billing page in your account settings. Changes take effect immediately, and billing is prorated.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express) and ACH bank transfers for Enterprise plans. All payments are processed securely.'
        },
      ]
    },
    {
      category: 'Security & Privacy',
      questions: [
        {
          q: 'How is my data protected?',
          a: 'We use industry-standard encryption (SSL/TLS) for all data transmission. Your payment information is processed through PCI-compliant payment processors and never stored on our servers.'
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you can delete your account at any time from your account settings. Note that this action is permanent and all data will be removed from our systems.'
        },
        {
          q: 'Who can see my RFQs?',
          a: 'Only verified suppliers can view your RFQs. You can also make RFQs private and invite specific suppliers to quote.'
        },
      ]
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Help Center</h1>
            <p className="text-xl opacity-90 mb-8">
              Find answers to common questions and learn how to use NutraHubExchange
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help..."
                className="pl-12 h-12 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={showOnboarding}
            >
              <CardContent className="pt-6 text-center">
                <PlayCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="mb-2">Platform Tour</h3>
                <p className="text-sm text-gray-600">See how it works</p>
              </CardContent>
            </Card>
            <a href="#/help" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.querySelector('.container')?.offsetTop || 0, behavior: 'smooth' }); }}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="mb-2">User Guides</h3>
                  <p className="text-sm text-gray-600">Step-by-step tutorials</p>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.youtube.com/@NutraHubExchange" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <Video className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="mb-2">Video Tutorials</h3>
                  <p className="text-sm text-gray-600">Watch and learn</p>
                </CardContent>
              </Card>
            </a>
            <a href="#/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-600">Get personalized help</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8 text-center">Frequently Asked Questions</h2>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-8">
              {filteredFaqs.map((category, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <h3 className="mb-4">{category.category}</h3>
                    <Accordion type="single" collapsible>
                      {category.questions.map((faq, qIdx) => (
                        <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                          <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
                <Button variant="link" onClick={() => setSearchQuery('')}>Clear search</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Support Image and CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1748261500463-d15e624baf8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjdXN0b21lciUyMHN1cHBvcnQlMjB0ZWFtJTIwb2ZmaWNlfGVufDF8fHx8MTc2MjYwMjY1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional Customer Support Team"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h2 className="mb-4">Still need help?</h2>
                <p className="text-gray-600 mb-6">
                  Our support team is available Monday through Friday, 9am-6pm EST. We typically respond within 2 hours during business hours.
                </p>
                <div className="space-y-4">
                  <a href="#/contact">
                    <Button size="lg" className="w-full sm:w-auto">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact Support
                    </Button>
                  </a>
                  <a href="mailto:support@nutrahubexchange.com" className="block">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HelpPage;
