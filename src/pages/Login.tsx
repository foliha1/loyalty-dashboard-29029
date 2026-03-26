import { Logo29029 } from "@/components/Logo29029";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="card-29029 w-full max-w-sm p-8 sm:p-10">
        <div className="flex justify-center mb-8">
          <Logo29029 />
        </div>

        <h1 className="type-metric-secondary text-center mb-8">Welcome Back</h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm uppercase tracking-wider text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="bg-background border-border/40 focus:border-foreground/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm uppercase tracking-wider text-muted-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-background border-border/40 focus:border-foreground/40"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black uppercase tracking-wider hover:bg-white/90 transition-colors"
          >
            Log In
          </Button>
        </form>

        <div className="text-center mt-5">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/40"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
