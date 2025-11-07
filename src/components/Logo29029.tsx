import { cn } from "@/lib/utils";

interface Logo29029Props {
  className?: string;
  size?: number;
}

export const Logo29029 = ({ className, size = 32 }: Logo29029Props) => {
  return (
    <svg 
      width={size} 
      height={size * (672/783)} 
      viewBox="0 0 783 672" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-all duration-300", className)}
      aria-label="29029 Logo"
    >
      <path 
        d="M0 671.143H783L391.5 0L0 671.143ZM724.832 637.581H662.413L313.251 200.614L391.593 66.3129L724.832 637.581ZM421.19 389.54L228.174 637.581H147.769L294.394 232.939L421.19 389.54ZM121.947 637.581H58.3531L227.074 348.345L121.947 637.581ZM526.936 637.581H448.726L338.953 558.995L442.321 422.114L526.936 637.581ZM619.72 637.581H551.224L487.426 472.415L619.72 637.581ZM320.304 637.581H274.077L306.191 596.649L320.304 637.581ZM388.898 637.581H345.356L332.254 599.981L388.898 637.581Z" 
        fill="currentColor"
      />
    </svg>
  );
};
