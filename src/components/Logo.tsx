import React from 'react';
import logoImage from 'figma:asset/0ec4e3907161eb98211de7e6643045f7e8c4c3c4.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-20 w-20", showText = true }) => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={logoImage} 
        alt="NutraHubExchange Logo" 
        className={className}
        style={{ 
          objectFit: 'contain',
          imageRendering: 'crisp-edges',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        }}
      />
      {showText && (
        <div className="flex flex-col leading-tight justify-center">
          <span className="text-inherit tracking-tight" style={{ fontWeight: 700, fontSize: '1.25rem' }}>NutraHub</span>
          <span className="text-primary tracking-wider" style={{ fontWeight: 600, fontSize: '0.875rem' }}>EXCHANGE</span>
        </div>
      )}
    </div>
  );
};
