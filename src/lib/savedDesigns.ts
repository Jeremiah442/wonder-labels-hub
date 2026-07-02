import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export type ProductType = 'circular' | 'square' | 'rectangular' | 'mixed';

export interface SavedDesignRow {
  id: string;
  user_id: string;
  product_type: ProductType;
  design: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/** Loads the signed-in user's own saved design for this product type, if any. */
export async function loadOwnSavedDesign(productType: ProductType): Promise<Record<string, unknown> | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('saved_designs')
    .select('design')
    .eq('user_id', user.id)
    .eq('product_type', productType)
    .maybeSingle();

  if (error || !data) return null;
  return data.design as Record<string, unknown>;
}

/** Saves (or overwrites) the signed-in user's design for this product type. */
export async function saveOwnDesign(productType: ProductType, design: Record<string, unknown>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: new Error('You need to be signed in to save a design.') };

  const { error } = await supabase
    .from('saved_designs')
    .upsert({ user_id: user.id, product_type: productType, design: design as unknown as Json }, { onConflict: 'user_id,product_type' });

  return { error };
}

/** Loads any saved design by id, for admins reviewing/editing a customer's design. */
export async function loadSavedDesignById(id: string): Promise<SavedDesignRow | null> {
  const { data, error } = await supabase.from('saved_designs').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return { ...data, design: data.design as Record<string, unknown> } as SavedDesignRow;
}

/** Updates a saved design by id — used when an admin edits a customer's design. */
export async function updateSavedDesignById(id: string, design: Record<string, unknown>) {
  const { error } = await supabase
    .from('saved_designs')
    .update({ design: design as unknown as Json })
    .eq('id', id);
  return { error };
}
