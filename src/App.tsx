import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { Router } from './components/Router';
import { Toaster } from './components/ui/sonner';
import { OnboardingAnimation } from './components/OnboardingAnimation';

export default function App() {
  return (
    <ThemeProvider>
      <OnboardingProvider>
        <AuthProvider>
          <Router />
          <Toaster />
          <OnboardingAnimation />
        </AuthProvider>
      </OnboardingProvider>
    </ThemeProvider>
  );
}
