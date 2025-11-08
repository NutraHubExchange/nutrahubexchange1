import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * OnboardingContext - Manages first-time user experience
 * 
 * To reset onboarding for testing, run in browser console:
 * localStorage.removeItem('nutrahub-onboarding-seen')
 * localStorage.removeItem('nutrahub-banner-dismissed')
 * Then refresh the page
 */

interface OnboardingContextType {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
  showOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(true); // Default to true to prevent flash
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem('nutrahub-onboarding-seen');
    
    // Logic:
    // - First visit: localStorage returns null → (null === 'true') is false → hasSeenOnboarding = false → SHOWS tour ✓
    // - Return visit: localStorage returns 'true' → ('true' === 'true') is true → hasSeenOnboarding = true → HIDES tour ✓
    setHasSeenOnboardingState(seen === 'true');
    setIsChecked(true);
  }, []);

  const setHasSeenOnboarding = (value: boolean) => {
    localStorage.setItem('nutrahub-onboarding-seen', value.toString());
    setHasSeenOnboardingState(value);
  };

  const showOnboarding = () => {
    setHasSeenOnboardingState(false);
  };

  return (
    <OnboardingContext.Provider value={{ hasSeenOnboarding, setHasSeenOnboarding, showOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
