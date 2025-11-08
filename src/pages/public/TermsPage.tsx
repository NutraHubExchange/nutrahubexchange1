import React from 'react';
import { PublicLayout } from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { FileText, Scale, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const TermsPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Scale className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="mb-4">Terms of Service</h1>
            <p className="text-lg opacity-90">
              Please read these terms carefully before using NutraHubExchange
            </p>
            <p className="text-sm opacity-75 mt-4">Last updated: November 7, 2025</p>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-primary mb-3" />
                <h3 className="mb-2">Your Rights</h3>
                <p className="text-sm text-gray-600">Access to a secure, professional B2B marketplace with verified partners</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <AlertCircle className="h-8 w-8 text-primary mb-3" />
                <h3 className="mb-2">Your Responsibilities</h3>
                <p className="text-sm text-gray-600">Accurate information, professional conduct, and compliance with all terms</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using NutraHubExchange (the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access or use the Platform. These Terms constitute a legally binding agreement between you and NutraHubExchange.
            </p>

            <h2>User Accounts</h2>
            
            <h3>Account Creation</h3>
            <p>To use our Platform, you must create an account. By creating an account, you agree that:</p>
            <ul>
              <li>You will provide accurate, current, and complete information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You are authorized to represent and bind your company to these Terms</li>
              <li>You are at least 18 years old and legally capable of entering into contracts</li>
              <li>One account per company is permitted unless otherwise authorized</li>
              <li>You will immediately notify us of any unauthorized use of your account</li>
            </ul>

            <h3>Account Types</h3>
            <ul>
              <li><strong>Buyer Accounts:</strong> For companies sourcing nutraceutical ingredients. Buyers can create RFQs, browse suppliers, and manage procurement.</li>
              <li><strong>Supplier Accounts:</strong> For companies providing nutraceutical ingredients. Suppliers can respond to RFQs, manage certifications, and showcase products.</li>
              <li>Each account type has specific features, limitations, and pricing as outlined in our <a href="#/help" className="text-primary hover:underline">subscription plans</a>.</li>
            </ul>

            <h2>Platform Usage</h2>
            
            <h3>Acceptable Use</h3>
            <p>You agree to:</p>
            <ul>
              <li>Use the Platform only for legitimate business-to-business transactions</li>
              <li>Provide accurate, complete, and truthful information in all RFQs, quotes, and communications</li>
              <li>Maintain valid, up-to-date certifications if you are a supplier</li>
              <li>Communicate professionally and respectfully with other users</li>
              <li>Comply with all applicable local, state, national, and international laws and regulations</li>
              <li>Honor commitments made through the Platform</li>
              <li>Respond to communications in a timely manner</li>
            </ul>

            <h3>Prohibited Activities</h3>
            <p>You may not:</p>
            <ul>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Harass, threaten, or abuse other users</li>
              <li>Attempt to circumvent platform fees or payment obligations</li>
              <li>Scrape, data mine, or use automated tools to access the Platform</li>
              <li>Interfere with or disrupt the Platform's operation</li>
              <li>Use the Platform for illegal activities or to sell prohibited substances</li>
              <li>Share your account credentials with unauthorized parties</li>
              <li>Impersonate another person or entity</li>
              <li>Upload viruses, malware, or harmful code</li>
              <li>Violate intellectual property rights</li>
            </ul>

            <h2>Transactions and Payments</h2>
            
            <h3>RFQs and Quotes</h3>
            <p>
              RFQs (Requests for Quote) and quotes submitted through the Platform are binding offers. When a buyer accepts a quote, both parties are obligated to complete the transaction according to the agreed terms.
            </p>

            <h3>Payment Processing</h3>
            <ul>
              <li>All payments are processed securely through our third-party payment processors</li>
              <li>Platform fees apply as outlined in your subscription plan</li>
              <li>Buyers must have valid payment methods on file</li>
              <li>Suppliers must complete payout settings to receive funds</li>
              <li>Refunds and disputes are handled according to our dispute resolution process</li>
            </ul>

            <h3>Pricing and Fees</h3>
            <p>
              Subscription fees, transaction fees, and other charges are outlined in your account settings. We reserve the right to modify pricing with 30 days' notice to existing users.
            </p>

            <h2>Certifications and Verification</h2>
            <p>
              Suppliers must maintain valid certifications (GMP, ISO, FDA, etc.) relevant to their products. We verify certifications but do not guarantee their accuracy or compliance. Users are responsible for conducting their own due diligence.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Platform and its content (excluding user-generated content) are owned by NutraHubExchange and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our written permission.
            </p>
            <p>
              By posting content on the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content in connection with operating the Platform.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              We provide a dispute resolution system for transaction-related disputes. Users agree to:
            </p>
            <ul>
              <li>First attempt to resolve disputes directly with the other party</li>
              <li>Use our mediation services if direct resolution fails</li>
              <li>Cooperate with our dispute resolution process</li>
              <li>Accept binding arbitration for unresolved disputes</li>
            </ul>

            <h2>Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT GUARANTEE THE ACCURACY, RELIABILITY, OR QUALITY OF USER-GENERATED CONTENT OR TRANSACTIONS.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NUTRAHUBEXCHANGE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold NutraHubExchange harmless from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Platform, violation of these Terms, or infringement of any rights of others.
            </p>

            <h2>Termination</h2>
            <p>
              We may suspend or terminate your account at any time for violations of these Terms, illegal activity, or other reasons at our discretion. You may cancel your account at any time through your account settings. Upon termination:
            </p>
            <ul>
              <li>Your access to the Platform will be revoked</li>
              <li>Outstanding payment obligations remain due</li>
              <li>Certain provisions of these Terms survive termination</li>
            </ul>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or Platform notification. Continued use after changes constitutes acceptance of the modified Terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County, California.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@nutrahubexchange.com" className="text-primary hover:underline">legal@nutrahubexchange.com</a></li>
              <li><strong>Address:</strong> NutraHubExchange, 123 Business Avenue, Suite 500, San Francisco, CA 94105</li>
              <li><strong>Phone:</strong> <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a></li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="mt-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758519288480-1489c17b1519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50JTIwY29udHJhY3R8ZW58MXx8fHwxNzYyNDYxOTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Legal Terms and Contracts"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Questions About Our Terms?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our legal team is available to answer your questions about these terms.
          </p>
          <a href="#/contact">
            <Button size="lg">Contact Legal Team</Button>
          </a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TermsPage;
