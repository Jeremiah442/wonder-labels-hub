import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  type ProductType,
  loadOwnSavedDesign,
  saveOwnDesign,
  loadSavedDesignById,
  updateSavedDesignById,
} from '@/lib/savedDesigns';

/**
 * Loads a customer's own saved design (or, for an admin following an ?editId=
 * link from the admin panel, someone else's saved design) into the designer's
 * state on mount, and exposes a save() that writes back to the right place.
 */
export function useSavedDesign<T extends Record<string, unknown>>(
  productType: ProductType,
  setLabelData: Dispatch<SetStateAction<T>>
) {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('editId');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      if (editId) {
        const row = await loadSavedDesignById(editId);
        if (!active) return;
        if (row) {
          setLabelData((prev) => ({ ...prev, ...(row.design as Partial<T>) }));
        } else {
          toast.error('Could not load that saved design.');
        }
      } else {
        const design = await loadOwnSavedDesign(productType);
        if (!active) return;
        if (design) {
          setLabelData((prev) => ({ ...prev, ...(design as Partial<T>) }));
        }
      }
      if (active) setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [editId, productType, setLabelData]);

  const save = async (labelData: T) => {
    setSaving(true);
    const { error } = editId ? await updateSavedDesignById(editId, labelData) : await saveOwnDesign(productType, labelData);
    setSaving(false);

    if (error) {
      toast.error(error.message || 'Failed to save design');
    } else {
      toast.success(editId ? 'Design updated' : 'Design saved — come back anytime to keep editing it.');
    }
    return { error };
  };

  return { loading, saving, isEditingOther: !!editId, save };
}
