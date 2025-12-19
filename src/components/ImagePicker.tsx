import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type ImageItem = {
  id: string;
  name: string;
  url: string;
};

type ImagePickerProps = {
  selectedImageUrl: string;
  onSelect: (url: string) => void;
};

const imageModules = import.meta.glob(
  [
    '../assets/user-images/**/*.{png,jpg,jpeg,webp,svg}',
    '../assets/Clipart/**/*.{png,jpg,jpeg,webp,svg}',
  ],
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>;

function filenameFromPath(path: string) {
  const parts = path.split('/');
  const last = parts[parts.length - 1] ?? path;
  return last;
}

export function ImagePicker({ selectedImageUrl, onSelect }: ImagePickerProps) {
  const [uploadedItems, setUploadedItems] = useState<ImageItem[]>([]);

  const items = useMemo<ImageItem[]>(() => {
    const entries = Object.entries(imageModules);
    const mapped = entries.map(([path, url]) => {
      const filename = filenameFromPath(path);
      const baseName = filename.replace(/\.[^.]+$/, '');
      return {
        id: path,
        name: baseName,
        url,
      };
    });

    const merged = [...uploadedItems, ...mapped];
    return merged.sort((a, b) => a.name.localeCompare(b.name));
  }, [uploadedItems]);

  const handleUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next: ImageItem[] = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => {
        const url = URL.createObjectURL(f);
        const name = f.name.replace(/\.[^.]+$/, '');
        return {
          id: `upload:${f.name}:${f.size}:${f.lastModified}`,
          name,
          url,
        };
      });
    setUploadedItems((prev) => {
      const seen = new Set(prev.map((p) => p.id));
      const deduped = next.filter((n) => !seen.has(n.id));
      return [...deduped, ...prev];
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Images</h3>
      </div>

      <div className="flex items-center justify-between gap-3">
        <label className="text-sm text-muted-foreground cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            {...({ webkitdirectory: '', directory: '' } as any)}
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />
          <span className="underline">Add images</span>
        </label>
        {uploadedItems.length > 0 && (
          <button
            type="button"
            className="text-sm text-muted-foreground underline"
            onClick={() => setUploadedItems([])}
          >
            Clear added
          </button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">{items.length.toLocaleString()} images</p>

      <ScrollArea className="h-60 rounded-md border border-border">
        {items.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground">
            No images found. Put your files in src/assets/Clipart/ (or use Add images).
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item.url)}
                className={`relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-white p-2 shadow-sm transition-colors hover:bg-muted/40 ${
                  selectedImageUrl === item.url ? 'ring-2 ring-primary' : ''
                }`}
                title={item.name}
                type="button"
              >
                <span className="absolute left-1 top-1 text-sm text-black">★</span>
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </ScrollArea>

      {selectedImageUrl && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">Selected:</span>
          <img src={selectedImageUrl} alt="Selected image" className="h-10 w-10 object-contain" />
        </div>
      )}
    </div>
  );
}
