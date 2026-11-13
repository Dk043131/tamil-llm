import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = forwardRef(({ className, variant = 'primary', size = 'default', children, onClick, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none shadow-sm active:translate-y-1 active:shadow-none";
  
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-[0_4px_0_0_#c2410c]",
    secondary: "bg-violet-500 text-white hover:bg-violet-600 shadow-[0_4px_0_0_#6d28d9]",
    outline: "border-2 border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800",
    ghost: "bg-transparent text-slate-300 hover:bg-slate-800",
  };
  
  const sizes = {
    default: "h-12 px-4 py-2 text-lg",
    sm: "h-9 rounded-xl px-3 text-sm",
    lg: "h-14 rounded-2xl px-8 text-xl",
    icon: "h-10 w-10",
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export { Button, cn };
