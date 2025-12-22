import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const tokenHash = url.searchParams.get('token_hash');
      const type = url.searchParams.get('type');

      const hashParams = new URLSearchParams((url.hash || '').replace(/^#/, ''));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      let errorMessage: string | null = null;

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) errorMessage = error.message;
      } else if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
          type: type as any,
          token_hash: tokenHash,
        } as any);
        if (error) errorMessage = error.message;
      } else if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) errorMessage = error.message;
      } else {
        errorMessage = 'Invalid or expired verification link.';
      }

      if (cancelled) return;

      if (errorMessage) {
        navigate(`/auth?mode=signin`, { replace: true, state: { error: errorMessage } });
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate('/products', { replace: true });
        return;
      }

      navigate('/auth?mode=signin', { replace: true });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return null;
}
