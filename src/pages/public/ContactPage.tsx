import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">
              We're here to help. Reach out to our team anytime.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <p className="text-sm text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2">Thank you for your message!</h3>
                      <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" placeholder="your@email.com" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" placeholder="Your company name" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" placeholder="How can we help?" required />
                      </div>
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" rows={6} placeholder="Tell us more about your inquiry..." required />
                      </div>
                      <Button type="submit" className="w-full" size="lg">Send Message</Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Image Section */}
              <div className="mt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1557200134-3103da7b6bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwdXMlMjBjb21tdW5pY2F0aW9ufGVufDF8fHx8MTc2MjU0OTgwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Contact Support Team"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-4">Email</h3>
                  <a 
                    href="mailto:support@nutrahubexchange.com" 
                    className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors group border border-primary/20"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-primary group-hover:text-primary/80 break-words">
                        support@nutrahubexchange.com
                      </p>
                    </div>
                  </a>
                  <p className="text-sm text-gray-500 mt-3">Click to send us an email</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Phone className="h-6 w-6 text-primary mb-3" />
                  <h3 className="mb-2">Phone</h3>
                  <a href="tel:+15551234567" className="text-gray-600 hover:text-primary">
                    +1 (555) 123-4567
                  </a>
                  <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9am-6pm EST</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <MapPin className="h-6 w-6 text-primary mb-3" />
                  <h3 className="mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Business Avenue<br />
                    Suite 500<br />
                    San Francisco, CA 94105
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-6 w-6 text-primary mb-3" />
                  <h3 className="mb-2">Business Hours</h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                    Saturday: 10:00 AM - 2:00 PM EST<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">Need Quick Answers?</h2>
            <p className="text-gray-600 mb-8">
              Check out our Help Center for frequently asked questions and guides.
            </p>
            <a href="#/help">
              <Button size="lg" variant="outline">Visit Help Center</Button>
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
