import { createContext, useContext, useState, ReactNode } from 'react';

interface TierContextType {
  currentTier: string;
  setCurrentTier: (tier: string) => void;
  isTestMode: boolean;
  setIsTestMode: (isTest: boolean) => void;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider = ({ children }: { children: ReactNode }) => {
  const [currentTier, setCurrentTier] = useState("Ridge");
  const [isTestMode, setIsTestMode] = useState(false);

  return (
    <TierContext.Provider value={{ currentTier, setCurrentTier, isTestMode, setIsTestMode }}>
      {children}
    </TierContext.Provider>
  );
};

export const useTier = () => {
  const context = useContext(TierContext);
  if (context === undefined) {
    throw new Error('useTier must be used within a TierProvider');
  }
  return context;
};
