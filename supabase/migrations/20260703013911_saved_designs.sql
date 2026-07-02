-- Saved designs: one re-editable saved design per user per product type.
CREATE TABLE public.saved_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('circular', 'square', 'rectangular', 'mixed')),
  design JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_type)
);

ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved designs" ON public.saved_designs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved designs" ON public.saved_designs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved designs" ON public.saved_designs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all saved designs" ON public.saved_designs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all saved designs" ON public.saved_designs
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_saved_designs_updated_at
  BEFORE UPDATE ON public.saved_designs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
