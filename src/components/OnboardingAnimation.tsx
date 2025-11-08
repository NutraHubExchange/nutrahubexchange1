import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  FileText, 
  Package, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Truck, 
  Star,
  X,
  ChevronRight,
  ShoppingCart,
  Award,
  Globe,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { useOnboarding } from '../contexts/OnboardingContext';
import logoImage from 'figma:asset/0ec4e3907161eb98211de7e6643045f7e8c4c3c4.png';

interface Scene {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  animation: React.ReactNode;
}

/**
 * OnboardingAnimation - Interactive 8-scene tour for first-time visitors
 * 
 * This component automatically renders for first-time visitors (when localStorage 
 * doesn't have 'nutrahub-onboarding-seen'). It can also be triggered manually 
 * from the Help page "Platform Tour" card.
 */
export function OnboardingAnimation() {
  const { hasSeenOnboarding, setHasSeenOnboarding } = useOnboarding();
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scenes: Scene[] = [
    {
      id: 1,
      title: "Welcome to NutraHubExchange",
      description: "Your global B2B marketplace for nutraceuticals. Let's show you how it works.",
      icon: <Globe className="size-12 text-[#4F9C3E]" />,
      animation: <WelcomeAnimation />
    },
    {
      id: 2,
      title: "Create Your Account",
      description: "Register as a Buyer or Seller. Complete verification and access your personalized dashboard.",
      icon: <UserPlus className="size-12 text-[#4F9C3E]" />,
      animation: <RegistrationAnimation />
    },
    {
      id: 3,
      title: "Buyers: Post RFQs",
      description: "Submit detailed product requests with specs, COAs, and compliance requirements.",
      icon: <FileText className="size-12 text-[#4F9C3E]" />,
      animation: <RFQAnimation />
    },
    {
      id: 4,
      title: "Sellers: List Inventory",
      description: "Publish your products with certifications, batch info, and real-time availability.",
      icon: <Package className="size-12 text-[#4F9C3E]" />,
      animation: <InventoryAnimation />
    },
    {
      id: 5,
      title: "AI-Powered Matching",
      description: "Our NutraSense AI instantly matches buyers with verified suppliers based on specs and compliance.",
      icon: <Sparkles className="size-12 text-[#4F9C3E]" />,
      animation: <MatchingAnimation />
    },
    {
      id: 6,
      title: "Negotiate & Award",
      description: "Chat in real-time, adjust terms, and award bids with transparent pricing.",
      icon: <MessageSquare className="size-12 text-[#4F9C3E]" />,
      animation: <NegotiationAnimation />
    },
    {
      id: 7,
      title: "Track & Deliver",
      description: "Live shipment tracking from warehouse to delivery with automated notifications.",
      icon: <Truck className="size-12 text-[#4F9C3E]" />,
      animation: <ShippingAnimation />
    },
    {
      id: 8,
      title: "Build Trust & Reputation",
      description: "Rate transactions and build verified supplier relationships for future deals.",
      icon: <Star className="size-12 text-[#4F9C3E]" />,
      animation: <RatingAnimation />
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      } else {
        setIsPlaying(false);
      }
    }, 6000); // 6 seconds per scene

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying, scenes.length]);

  const handleSkip = () => {
    setHasSeenOnboarding(true);
  };

  const handleNext = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setIsPlaying(false);
    } else {
      handleSkip();
    }
  };

  const handlePrevious = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
      setIsPlaying(false);
    }
  };

  if (hasSeenOnboarding) {
    return null;
  }

  const currentSceneData = scenes[currentScene];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4F9C3E] to-[#60A444] p-6 text-white relative">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
            <h2 className="text-2xl mb-2">How NutraHubExchange Works</h2>
            <div className="flex gap-1">
              {scenes.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index === currentScene
                      ? 'bg-white'
                      : index < currentScene
                      ? 'bg-white/60'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scene Content */}
          <div className="p-8 min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6"
                >
                  {currentSceneData.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl text-[#2F5A29] mb-4"
                >
                  {currentSceneData.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-8 max-w-2xl"
                >
                  {currentSceneData.description}
                </motion.p>

                {/* Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-2xl"
                >
                  {currentSceneData.animation}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t bg-gray-50 p-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {currentScene + 1} of {scenes.length}
            </div>
            <div className="flex gap-3">
              {currentScene > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="bg-[#4F9C3E] hover:bg-[#60A444] text-white"
              >
                {currentScene === scenes.length - 1 ? "Get Started" : "Next"}
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Scene Animations
function WelcomeAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
        className="relative"
      >
        <motion.img
          src={logoImage}
          alt="NutraHubExchange Logo"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="w-48 h-48"
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(79, 156, 62, 0.3))'
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#4F9C3E]/20 blur-xl"
        />
      </motion.div>
    </div>
  );
}

function RegistrationAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-80 bg-gray-50 rounded-xl p-6 border-2 border-[#4F9C3E]/20 shadow-lg"
      >
        {/* Form Fields */}
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
            className="h-3 bg-[#4F9C3E]/30 rounded mb-3"
          />
        ))}
        
        {/* Submit Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: 'spring' }}
          className="mt-4 h-10 bg-gradient-to-r from-[#4F9C3E] to-[#60A444] rounded flex items-center justify-center"
        >
          <CheckCircle2 className="size-5 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function RFQAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center gap-6">
      {/* Document */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-40 h-48 bg-white border-2 border-[#4F9C3E] rounded-lg p-4 shadow-lg"
      >
        <FileText className="size-8 text-[#4F9C3E] mb-2" />
        {[1, 2, 3, 4].map((_, index) => (
          <motion.div
            key={index}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8 + index * 0.15 }}
            className="h-2 bg-gray-200 rounded mb-2"
          />
        ))}
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, x: [0, 10, 0] }}
        transition={{ 
          scale: { delay: 1.2 },
          x: { delay: 1.5, duration: 1, repeat: Infinity }
        }}
      >
        <ChevronRight className="size-8 text-[#4F9C3E]" />
      </motion.div>

      {/* Live Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
        className="bg-[#4F9C3E] text-white px-6 py-3 rounded-full shadow-lg"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full"
          />
          RFQ Live
        </div>
      </motion.div>
    </div>
  );
}

function InventoryAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center">
      <div className="grid grid-cols-4 gap-3">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.6 + index * 0.1,
              type: 'spring',
              stiffness: 200
            }}
            className="w-16 h-16 bg-gradient-to-br from-[#4F9C3E] to-[#60A444] rounded-lg shadow-lg flex items-center justify-center"
          >
            <Package className="size-8 text-white" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MatchingAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center gap-8">
      {/* Buyer */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
          <ShoppingCart className="size-10 text-blue-600" />
        </div>
        <span className="text-sm text-gray-600">Buyer</span>
      </motion.div>

      {/* AI Matching */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 border-4 border-[#4F9C3E] border-t-transparent rounded-full"
        />
        <Sparkles className="size-10 text-[#4F9C3E] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Sellers */}
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 + index * 0.2 }}
            className="flex items-center gap-2 bg-[#4F9C3E]/10 rounded-lg p-2"
          >
            <div className="w-8 h-8 bg-[#4F9C3E] rounded-full flex items-center justify-center">
              <Package className="size-4 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="w-20 h-2 bg-[#4F9C3E]/40 rounded" />
              <div className="w-16 h-1.5 bg-gray-300 rounded mt-1" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 + index * 0.2 }}
            >
              <Award className="size-4 text-yellow-500" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NegotiationAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Chat bubbles */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-100 rounded-2xl rounded-tl-none p-3 mb-3 max-w-[70%]"
        >
          <p className="text-sm">Can you do $42/kg for 1000kg?</p>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-[#4F9C3E]/20 rounded-2xl rounded-tr-none p-3 mb-3 max-w-[70%] ml-auto"
        >
          <p className="text-sm">Yes, if you increase to 1200kg</p>
        </motion.div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-blue-100 rounded-2xl rounded-tl-none p-3 mb-3 max-w-[70%]"
        >
          <p className="text-sm">Deal! ✓</p>
        </motion.div>

        {/* Award Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#4F9C3E] to-[#60A444] text-white px-6 py-2 rounded-full shadow-xl flex items-center gap-2"
        >
          <CheckCircle2 className="size-5" />
          Bid Awarded
        </motion.div>
      </div>
    </div>
  );
}

function ShippingAnimation() {
  return (
    <div className="relative h-64 flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        {/* Route line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-1/2 left-0 right-0 h-1 bg-[#4F9C3E]/30 origin-left"
        />

        {/* Waypoints */}
        <div className="flex justify-between items-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-4 h-4 bg-[#4F9C3E] rounded-full mb-1" />
            <span className="text-xs text-gray-600">Warehouse</span>
          </motion.div>

          {/* Truck */}
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute left-1/2 top-1/2 transform -translate-y-1/2"
          >
            <Truck className="size-12 text-[#4F9C3E]" />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-4 h-4 bg-gray-300 rounded-full mb-1" />
            <span className="text-xs text-gray-600">In Transit</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ delay: 2.5, duration: 0.5, repeat: 2 }}
              className="w-4 h-4 bg-[#4F9C3E] rounded-full mb-1"
            />
            <span className="text-xs text-gray-600">Delivered</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function RatingAnimation() {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rating < 5) {
        setRating(rating + 1);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [rating]);

  return (
    <div className="relative h-64 flex flex-col items-center justify-center gap-6">
      {/* Stars */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: rating >= star ? 1 : 0,
              rotate: rating >= star ? 0 : -180
            }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Star 
              className={`size-12 ${
                rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-3 bg-[#4F9C3E]/10 rounded-lg px-6 py-3"
      >
        <Shield className="size-8 text-[#4F9C3E]" />
        <div>
          <div className="text-sm text-gray-600">Verified Supplier</div>
          <div className="flex items-center gap-1 mt-1">
            <Zap className="size-4 text-[#4F9C3E]" />
            <span className="text-xs text-gray-500">Trust Score: 98%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
