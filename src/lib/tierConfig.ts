import { Sparkles, TrendingUp, Flame, Crown, LucideIcon } from "lucide-react";

export interface Tier {
  name: string;
  description: string;
  icon: LucideIcon;
  threshold: number;
  color: string;
}

export const tiers: Tier[] = [
  {
    name: "Base",
    description: "New spark, fresh start",
    icon: Sparkles,
    threshold: 0,
    color: "base",
  },
  {
    name: "Ridge",
    description: "Transformation, turning point",
    icon: TrendingUp,
    threshold: 400,
    color: "ridge",
  },
  {
    name: "Peak",
    description: "Mastery, passion refined",
    icon: Flame,
    threshold: 750,
    color: "peak",
  },
  {
    name: "The 29",
    description: "Sacred, inner circle — invitation only",
    icon: Crown,
    threshold: 2000,
    color: "peak",
  },
];

export const getCurrentTier = (tierName: string): Tier | undefined => {
  return tiers.find(tier => tier.name === tierName);
};
