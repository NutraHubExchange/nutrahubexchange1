import React, { useState } from 'react';
import { PublicLayout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { X } from 'lucide-react';
import brandedTshirt from 'figma:asset/ab05e32882fb2c09f2072d8fbcc924cb272adc6a.png';
import brandedWaterBottle from 'figma:asset/8363cfe9bded2921eecb1d504efc3018cae83c90.png';
import brandedBaseballCap from 'figma:asset/7d24fb55b067c5b43152906be6ddb859354f52d1.png';
import brandedHoodie from 'figma:asset/676cf9964c5744e6516c8e99996dacf09ac32e86.png';
import brandedMug from 'figma:asset/d77a614b7ce43883bca90b3c90711d0c45d7c9ef.png';
import brandedBeanie from 'figma:asset/8e2ff991aebc0f7ef8ecf73f26f33ef03e0682fb.png';
import brandedStickers from 'figma:asset/2fd50d3fb360bfdfb4650e5e95f17f6dabed395a.png';
import brandedWindbreaker from 'figma:asset/d2a7ab66b9ec0be79d0b13b9c302747611894ad6.png';
import brandedUSB from 'figma:asset/507a8672bbdcbfb8c1ae81a3b0bee0f2b58703fa.png';
import brandedPowerBank from 'figma:asset/a1d55f85d7aea42546a38093d3b0ca6c805a8060.png';
import brandedWhiteCap from 'figma:asset/46f86f5e1ceb36e90d6dd81c1b253aeb71613b18.png';
import brandedWhiteTshirt from 'figma:asset/1bb14e915beb9838ee52b4ddfe6d296dbd1e6230.png';
import brandedPremiumPen from 'figma:asset/f4414cab42b79de6ce1b9f750bf4a11e2bab7978.png';
import swagCollectionScene from 'figma:asset/722f2473ae99b611b7735fa4559524e7d6354c43.png';
import swagCollectionScene2 from 'figma:asset/fd8a82e1a9d0e40f9694a18cae892d33e874cf44.png';
import swagHeroImage from 'figma:asset/35cd9aae51bc69593027fea13704beeee490a277.png';
import logoTransparent from 'figma:asset/0ec4e3907161eb98211de7e6643045f7e8c4c3c4.png';

interface SwagItem {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  logoOverlay?: {
    size: number; // percentage
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    rotation?: number;
    opacity?: number;
  };
}

const swagItems: SwagItem[] = [
  // Wearables
  { 
    id: 'tshirt-crew', 
    name: 'Crew Neck T-Shirt', 
    image: brandedTshirt, 
    category: 'Wearables',
    description: 'Premium cotton t-shirt with NutraHub Exchange logo screen-printed on chest. Available in black, white, and green.',
  },
  { 
    id: 'tshirt-vneck', 
    name: 'V-Neck T-Shirt', 
    image: brandedTshirt, 
    category: 'Wearables',
    description: 'Comfortable v-neck design featuring our signature branding. Perfect for casual wear.',
  },
  { 
    id: 'tshirt-long', 
    name: 'Long Sleeve T-Shirt', 
    image: brandedTshirt, 
    category: 'Wearables',
    description: 'Long sleeve cotton tee with NutraHub Exchange branding. Ideal for cooler weather.',
  },
  { 
    id: 'hoodie', 
    name: 'Premium Hoodie', 
    image: brandedHoodie, 
    category: 'Wearables',
    description: 'Ultra-soft fleece hoodie with embroidered logo and kangaroo pocket. Premium quality for team members.',
  },
  { 
    id: 'baseball-cap', 
    name: 'Baseball Cap', 
    image: brandedBaseballCap, 
    category: 'Wearables',
    description: 'Adjustable baseball cap with embroidered NutraHub Exchange logo. UV-protective fabric.',
  },
  { 
    id: 'white-baseball-cap', 
    name: 'White Baseball Cap', 
    image: brandedWhiteCap, 
    category: 'Wearables',
    description: 'Classic white adjustable baseball cap with full-color embroidered NutraHub Exchange logo. Premium quality with UV protection.',
  },
  { 
    id: 'white-tshirt', 
    name: 'White Logo T-Shirt', 
    image: brandedWhiteTshirt, 
    category: 'Wearables',
    description: 'Premium white cotton t-shirt featuring the full NutraHub Exchange logo on chest. Crisp, professional look for events.',
  },
  { 
    id: 'beanie', 
    name: 'Knit Beanie', 
    image: brandedBeanie, 
    category: 'Wearables',
    description: 'Warm knit beanie with embroidered NutraHub Exchange logo. Perfect for winter events.',
  },
  { 
    id: 'jacket', 
    name: 'Windbreaker Jacket', 
    image: brandedWindbreaker, 
    category: 'Wearables',
    description: 'Lightweight windbreaker with embroidered NutraHub Exchange logo on chest. Water-resistant with packable design.',
  },
  
  // Office & Tech
  { 
    id: 'mug', 
    name: 'Ceramic Mug', 
    image: brandedMug, 
    category: 'Office & Tech',
    description: '11oz ceramic mug with full-color NutraHub logo. Dishwasher and microwave safe.',
  },
  { 
    id: 'water-bottle', 
    name: 'Insulated Water Bottle', 
    image: brandedWaterBottle, 
    category: 'Office & Tech',
    description: 'Double-wall insulated 32oz bottle with laser-etched logo. Keeps drinks cold for 24 hours.',
  },
  { 
    id: 'usb-drive', 
    name: 'USB Flash Drive', 
    image: brandedUSB, 
    category: 'Office & Tech',
    description: '16GB USB 3.0 flash drive with full-color NutraHub Exchange logo. Compact sleek design with metal connector.',
  },
  { 
    id: 'power-bank', 
    name: 'Power Bank', 
    image: brandedPowerBank, 
    category: 'Office & Tech',
    description: '10,000mAh portable power bank with NutraHub Exchange branding. Dual USB ports and USB-C charging.',
  },
  { 
    id: 'premium-pen', 
    name: 'Premium Pen Set', 
    image: brandedPremiumPen, 
    category: 'Office & Tech',
    description: 'Elegant metal ballpoint pens with engraved NutraHub Exchange logo. Smooth black finish with chrome accents. Comes in a set of 2.',
  },
  { 
    id: 'stickers', 
    name: 'Laptop Sticker Pack', 
    image: brandedStickers, 
    category: 'Office & Tech',
    description: 'Premium vinyl sticker pack featuring the NutraHub Exchange logo in multiple designs and sizes. Waterproof and UV-resistant.',
  },
  { 
    id: 'tote-bag', 
    name: 'Canvas Tote Bag', 
    image: swagCollectionScene2, 
    category: 'Office & Tech',
    description: 'Eco-friendly canvas tote with screen-printed NutraHub Exchange logo. Perfect for groceries or everyday use.',
  },

];

const categories = ['Wearables', 'Office & Tech'];

const SwagPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SwagItem | null>(null);

  return (
    <PublicLayout>
      {/* Hero Section with Collection Scene */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="mb-6">Our Swag Collection</h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Premium branded merchandise featuring the NutraHub Exchange logo. Each item showcases our commitment to quality and professionalism in the nutraceuticals industry.
              </p>
            </div>
            
            {/* Featured Collection Image */}
            <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={swagHeroImage} 
                alt="NutraHub Exchange Branded Merchandise Collection"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Swag Items by Category */}
      {categories.map((category) => {
        const categoryItems = swagItems.filter((item) => item.category === category);
        
        return (
          <section key={category} className="py-16 bg-white even:bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="mb-8 text-center">{category}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryItems.map((item) => (
                    <Card 
                      key={item.id}
                      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white"
                      onClick={() => setSelectedItem(item)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Logo Overlay */}
                          {item.logoOverlay && (
                            <div 
                              className="absolute pointer-events-none"
                              style={{
                                top: item.logoOverlay.top || '50%',
                                left: item.logoOverlay.left || '50%',
                                right: item.logoOverlay.right,
                                bottom: item.logoOverlay.bottom,
                                transform: `translate(-50%, -50%) rotate(${item.logoOverlay.rotation || 0}deg)`,
                                width: `${item.logoOverlay.size}%`,
                                opacity: item.logoOverlay.opacity || 1,
                              }}
                            >
                              <img 
                                src={logoTransparent} 
                                alt="NutraHub Logo"
                                className="w-full h-auto"
                                style={{
                                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-gray-800">{item.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Want NutraHub Swag?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our platform and become part of the NutraHub Exchange community. Premium swag available for active members and partners.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#/signup">
              <button className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors">
                Join Now
              </button>
            </a>
            <a href="#/contact">
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Enlarged View Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedItem?.name}</span>
              <button
                onClick={() => setSelectedItem(null)}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </DialogTitle>
            <DialogDescription>
              {selectedItem && `Premium branded ${selectedItem.name.toLowerCase()} from the NutraHub Exchange collection`}
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="mt-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-8 relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="max-w-full max-h-[60vh] object-contain"
                />
                {/* Logo Overlay in Modal */}
                {selectedItem.logoOverlay && (
                  <div 
                    className="absolute pointer-events-none"
                    style={{
                      top: selectedItem.logoOverlay.top || '50%',
                      left: selectedItem.logoOverlay.left || '50%',
                      right: selectedItem.logoOverlay.right,
                      bottom: selectedItem.logoOverlay.bottom,
                      transform: `translate(-50%, -50%) rotate(${selectedItem.logoOverlay.rotation || 0}deg)`,
                      width: `${selectedItem.logoOverlay.size}%`,
                      opacity: selectedItem.logoOverlay.opacity || 1,
                    }}
                  >
                    <img 
                      src={logoTransparent} 
                      alt="NutraHub Logo"
                      className="w-full h-auto"
                      style={{
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {selectedItem.category}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
};

export default SwagPage;
