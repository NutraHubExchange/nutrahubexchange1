import React from 'react';
import { PublicLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const PrivacyPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="mb-4">Privacy Policy</h1>
            <p className="text-lg opacity-90">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm opacity-75 mt-4">Last updated: November 7, 2025</p>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Lock className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="mb-2">Secure & Encrypted</h3>
                <p className="text-sm text-gray-600">All data is encrypted and securely stored</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Eye className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="mb-2">Transparent</h3>
                <p className="text-sm text-gray-600">You always know how your data is used</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="mb-2">Your Control</h3>
                <p className="text-sm text-gray-600">You own your data and can delete it anytime</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              NutraHubExchange ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our B2B marketplace platform for nutraceutical ingredients.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Account information:</strong> Name, email address, company name, business registration details</li>
              <li><strong>Profile information:</strong> Business certifications, product catalogs, company descriptions</li>
              <li><strong>Transaction data:</strong> RFQs, quotes, orders, and related business communications</li>
              <li><strong>Communications:</strong> Messages through our chat system and support inquiries</li>
              <li><strong>Payment information:</strong> Billing details and payment method information (processed securely through third-party payment processors)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li><strong>Log data:</strong> IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Device information:</strong> Device type, operating system, unique device identifiers</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience</li>
              <li><strong>Analytics data:</strong> Usage patterns and feature interactions to improve our platform</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li><strong>Provide services:</strong> Operate and maintain our marketplace platform</li>
              <li><strong>Process transactions:</strong> Facilitate RFQs, quotes, and orders between buyers and suppliers</li>
              <li><strong>Verify credentials:</strong> Check and validate business certifications and compliance documents</li>
              <li><strong>Communication:</strong> Send notifications about your account, transactions, and platform updates</li>
              <li><strong>Improve platform:</strong> Analyze usage to enhance features and user experience</li>
              <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
              <li><strong>Legal compliance:</strong> Meet legal and regulatory obligations</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Other Users:</strong> Profile information, RFQs, and quotes are visible to relevant platform users (buyers see supplier profiles, suppliers see RFQs)</li>
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform (payment processors, hosting providers, analytics services)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p>We never sell your personal information to third parties.</p>

            <h2>Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure data storage with encryption at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.
            </p>

            <h2>Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correct:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Delete:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong>Object:</strong> Object to processing of your data for certain purposes</li>
              <li><strong>Restrict:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Portability:</strong> Receive your data in a structured, commonly used format</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent, you can withdraw it at any time</li>
            </ul>
            <p>To exercise these rights, please contact us using the information below.</p>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookies through your browser settings, but disabling cookies may affect platform functionality.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our platform is intended for business use only and not directed to individuals under 18. We do not knowingly collect information from children.
            </p>

            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by email or through a prominent notice on our platform. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:privacy@nutrahubexchange.com" className="text-primary hover:underline">privacy@nutrahubexchange.com</a></li>
              <li><strong>Address:</strong> NutraHubExchange, 123 Business Avenue, Suite 500, San Francisco, CA 94105</li>
              <li><strong>Phone:</strong> <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a></li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="mt-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1760597307381-2bec368dcf26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YWN5JTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc2MjUwMTcyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Data Security and Privacy"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Questions About Privacy?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you understand how we protect your data.
          </p>
          <a href="#/contact">
            <Button size="lg">Contact Us</Button>
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PrivacyPage;
