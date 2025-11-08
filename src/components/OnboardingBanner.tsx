import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useOnboarding } from '../contexts/OnboardingContext';

export function OnboardingBanner() {
  const { hasSeenOnboarding, showOnboarding } = useOnboarding();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('nutrahub-banner-dismissed');
    setIsDismissed(dismissed === 'true');
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('nutrahub-banner-dismissed', 'true');
    setIsDismissed(true);
  };

  const handleShowTour = () => {
    showOnboarding();
    handleDismiss();
  };

  if (hasSeenOnboarding || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#4F9C3E] to-[#60A444] text-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PlayCircle className="size-6" />
              </motion.div>
              <span className="text-sm md:text-base">
                <strong>New to NutraHubExchange?</strong> Take a quick tour to see how it works
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleShowTour}
                className="bg-white text-[#4F9C3E] hover:bg-gray-100"
              >
                Start Tour
              </Button>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Dismiss"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
