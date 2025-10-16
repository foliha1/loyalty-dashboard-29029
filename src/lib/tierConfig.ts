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
    color: "novus",
  },
  {
    name: "Ridge",
    description: "Transformation, turning point",
    icon: TrendingUp,
    threshold: 500,
    color: "verto",
  },
  {
    name: "Ardent",
    description: "Mastery, passion refined",
    icon: Flame,
    threshold: 1000,
    color: "ardent",
  },
  {
    name: "Sanctum",
    description: "Sacred, inner circle — invitation only",
    icon: Crown,
    threshold: 2000,
    color: "sanctum",
  },
];

export const getCurrentTier = (tierName: string): Tier | undefined => {
  return tiers.find(tier => tier.name === tierName);
};
