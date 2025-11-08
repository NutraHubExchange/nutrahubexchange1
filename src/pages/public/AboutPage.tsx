import React from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, Target, Award, Shield, Globe, TrendingUp, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">About NutraHubExchange</h1>
            <p className="text-xl opacity-90">
              We're building the most trusted B2B marketplace for nutraceutical ingredients, connecting quality suppliers with discerning buyers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section with Image */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2020, NutraHubExchange was born from the frustration of inefficient ingredient sourcing in the nutraceutical industry. Our founders, having worked for years in supplement manufacturing and distribution, saw firsthand how fragmented and opaque the B2B marketplace was.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, we serve hundreds of companies across the globe, facilitating millions in transactions while maintaining the highest standards for verification and transparency. Our platform has become the go-to marketplace for companies seeking quality ingredients with confidence.
                </p>
                <a href="#/signup">
                  <Button size="lg">Join Our Network</Button>
                </a>
              </div>
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1631557675489-a923dfbda67d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBzY2llbnRpc3R8ZW58MXx8fHwxNzYyNTQ5ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Research and Quality Control"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              The principles that guide everything we do at NutraHubExchange
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="mb-2">Trust & Transparency</h3>
              <p className="text-gray-600">
                Every supplier is verified, every certification checked, every transaction protected.
              </p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Connecting nutraceutical businesses across continents with seamless communication.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="mb-2">Continuous Innovation</h3>
              <p className="text-gray-600">
                Always improving our platform to serve the evolving needs of the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Team, Commitment, Swag */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To streamline nutraceutical procurement through transparency, verification, and modern technology.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="mb-2">Our Team</h3>
                <p className="text-gray-600">
                  Industry veterans with decades of combined experience in nutraceuticals and B2B platforms.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="mb-2">Our Commitment</h3>
                <p className="text-gray-600">
                  Ensuring every transaction is backed by verified certifications and secure processes.
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105">
              <a href="#/swag">
                <CardContent className="pt-6">
                  <ShoppingBag className="h-10 w-10 text-primary mb-4" />
                  <h3 className="mb-2">Our Swag</h3>
                  <p className="text-gray-600">
                    Premium branded merchandise showcasing our identity and commitment to quality.
                  </p>
                </CardContent>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of companies who trust NutraHubExchange for their ingredient sourcing needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#/signup">
              <Button size="lg" variant="secondary">
                Sign Up Free
              </Button>
            </a>
            <a href="#/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
