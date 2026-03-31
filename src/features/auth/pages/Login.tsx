import { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Mail, Lock, ArrowRight, Diamond } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Stagger animation setup
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-[90vh] flex items-stretch">
      
      {/* Visual / Branding Side (Left) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-black items-end p-12 lg:p-16">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-70 mix-blend-screen"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1542314831-c6a4d14d8379?auto=format&fit=crop&w=2000&q=80" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-lg mb-4">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="mb-6 flex items-center gap-3">
              <Diamond className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
              <span className="text-2xl font-black tracking-widest text-white uppercase">LuxeStay</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tighter">
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-serif italic font-light tracking-tight">
                Hospitality.
              </span>
            </h1>
            <p className="text-lg text-white/70 font-light max-w-md leading-relaxed tracking-wide">
              Sign in to manage your premium reservations and curate your ultimate travel itinerary.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Authentication Form Side (Right) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative overflow-hidden border-l border-white/5 bg-background lg:bg-background">
        
        {/* Ambient background glow for right side */}
        <div className="absolute pointer-events-none inset-0 flex justify-center items-center overflow-hidden z-0">
          <div className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
        </div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 flex justify-center">
             <Diamond className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
          </div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-black tracking-tighter mb-2 text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground font-light mb-10 tracking-wide">
              Enter your credentials to access your account.
            </p>
          </motion.div>

          {/* Social Logins */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-8">
            <Button variant="outline" className="flex-1 h-12 glass border-white/10 hover:bg-white/5 rounded-xl font-medium tracking-wide">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="flex-1 h-12 glass border-white/10 hover:bg-white/5 rounded-xl font-medium tracking-wide">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.79 2.12-.04 3.5.94 4.35 2.5-3.69 2.05-2.93 6.36.43 7.52-.77 1.95-1.93 3.56-3.44 2.94zm-3-11.45c-.46-2.58 1.4-4.8 3.86-5.04.53 2.76-1.8 5-3.86 5.04z" />
              </svg>
              Apple
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-background px-4 text-muted-foreground/50">Or continue with</span>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2 group">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  className="pl-11 h-12 bg-white/5 border-white/10 focus-visible:ring-cyan-400/50 text-base rounded-xl transition-all hover:bg-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2 group">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Link to="/forgot-password" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Recovery options
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-11 h-12 bg-white/5 border-white/10 focus-visible:ring-cyan-400/50 text-base rounded-xl transition-all hover:bg-white/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6 mt-10">
            <Button className="w-full h-14 text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] rounded-xl transition-all group overflow-hidden relative">
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/30" />
              </div>
              Sign In
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Button>
            
            <p className="text-sm font-medium text-center text-muted-foreground">
              New to LuxeStay?{' '}
              <Link to="/register" className="text-white font-bold hover:text-cyan-300 transition-colors ml-1 border-b border-transparent hover:border-cyan-300 pb-0.5">
                Create an account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
