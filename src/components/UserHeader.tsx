import { Flame } from "lucide-react";

export const UserHeader = () => {
  return (
    <header className="mb-12 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Alex Rivera</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Belonging through participation
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl font-bold text-ember">880</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Total AQ
            </div>
          </div>
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg border border-border">
            <Flame className="w-5 h-5 text-ember" />
            <span className="font-semibold">Verto</span>
          </div>
        </div>
      </div>
    </header>
  );
};
