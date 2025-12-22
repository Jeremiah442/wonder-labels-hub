import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, User, Phone, Package } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const disposableEmailDomains = new Set([
  '10minutemail.com',
  '10minutemail.net',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'yopmail.com',
  'yopmail.net',
  'yopmail.org',
  'getnada.com',
  'trashmail.com',
  'dispostable.com',
  'mintemail.com',
]);

function isDisposableEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  if (!domain) return false;
  if (disposableEmailDomains.has(domain)) return true;
  for (const blocked of disposableEmailDomains) {
    if (domain.endsWith(`.${blocked}`)) return true;
  }
  return false;
}

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify'>(() => {
    const m = searchParams.get('mode');
    return m === 'signup' || m === 'verify' ? m : 'signin';
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const stateEmail = (location.state as { email?: string } | null)?.email;
  const stateError = (location.state as { error?: string } | null)?.error;
  const emailFromQuery = searchParams.get('email');

  useEffect(() => {
    const m = searchParams.get('mode');
    setMode(m === 'signup' || m === 'verify' ? m : 'signin');
  }, [searchParams]);

  useEffect(() => {
    const email = emailFromQuery || stateEmail;
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [emailFromQuery, stateEmail]);

  useEffect(() => {
    if (stateError) {
      toast.error(stateError);
    }
  }, [stateError]);

  useEffect(() => {
    if (user && mode !== 'verify') {
      navigate('/products');
    }
  }, [user, navigate, from, mode]);

  const maybeResendVerificationEmail = async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    const cooldownMs = 60_000;
    const storageKey = `verification_email_last_sent:${normalizedEmail}`;
    const lastSentAt = Number(localStorage.getItem(storageKey) || '0');
    if (lastSentAt && Date.now() - lastSentAt < cooldownMs) {
      return;
    }

    const { error } = await supabase.auth.resend({ type: 'signup', email: normalizedEmail });
    if (!error) {
      localStorage.setItem(storageKey, String(Date.now()));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signin') {
        const validated = signInSchema.parse(formData);
        if (isDisposableEmail(validated.email)) {
          toast.error('Please use a real email address (temporary emails are not allowed).');
          return;
        }
        const { error } = await signIn(validated.email, validated.password);
        if (error) {
          if (error.message.includes('Invalid login')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          const { data } = await supabase.auth.getUser();
          const emailConfirmedAt = (data.user as unknown as { email_confirmed_at?: string | null } | null)?.email_confirmed_at;
          if (!emailConfirmedAt) {
            await supabase.auth.signOut();
            await maybeResendVerificationEmail(validated.email);
            toast.error('Please verify your email from the link we sent you before signing in.');
            setMode('verify');
            return;
          }
          toast.success('Welcome back!');
          navigate('/products');
        }
      } else {
        const validated = signUpSchema.parse(formData);
        if (isDisposableEmail(validated.email)) {
          toast.error('Please use a real email address (temporary emails are not allowed).');
          return;
        }
        const { error } = await signUp(validated.email, validated.password, validated.fullName, validated.phone);
        if (error) {
          if (error.message.includes('already registered')) {
            await maybeResendVerificationEmail(validated.email);
            toast.error('This email is already registered. Please check your email to verify your account, then sign in.');
            setMode('verify');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created. Check your email to verify your account.');
          setMode('verify');
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout hideNavbar>
      <section className="py-24 min-h-[90vh] flex items-center bg-gradient-to-b from-background via-background to-surface-1">
        <div className="container px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                {mode === 'signin' ? 'Welcome Back' : 'Welcome to Wonder Labels'}
              </h1>
              <p className="text-muted-foreground text-lg">
                {mode === 'signin'
                  ? 'Sign in to your account to continue'
                  : 'Create your account to get started with premium labeling solutions'}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-card border border-border">
              {mode === 'verify' ? (
                <div className="space-y-5">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">Verify your email</h2>
                    <p className="text-muted-foreground text-sm">
                      We’ve sent a verification link to{' '}
                      <span className="font-medium text-foreground">{formData.email || 'your email address'}</span>.
                      {' '}Open the email and tap <span className="font-medium text-foreground">Verify Email</span> to sign in automatically.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
                  {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                    className="text-primary font-medium hover:underline"
                  >
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-sm mt-6">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
