import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

type ClipartItem = {
  id: string;
  name: string;
  folder: string;
  thumbnailUrl: string;
  assetUrl: string;
};

type ClipartQuery = {
  folder: string;
  search: string;
};

type ClipartSearchResponse = {
  total: number;
  items: ClipartItem[];
};

function proxifyAssetUrl(url: string) {
  if (!url) return url;
  if (url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.startsWith('https://maestro.onlinelabels.com/')) {
    return `/maestro-asset${url.replace('https://maestro.onlinelabels.com', '')}`;
  }
  return url;
}

function svgDataUrl(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const placeholderClipart: ClipartItem[] = [
  {
    id: 'handprint',
    name: 'Handprint',
    folder: 'kids',
    thumbnailUrl: svgDataUrl(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="white"/><path d="M55 20c0-6 10-6 10 0v38h6V16c0-6 10-6 10 0v44h6V22c0-6 10-6 10 0v54c0 18-14 32-32 32H50c-18 0-32-14-32-32V52c0-6 10-6 10 0v22h6V30c0-6 10-6 10 0v44h6V20z" fill="#111"/></svg>',
    ),
    assetUrl: svgDataUrl(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M220 80c0-24 40-24 40 0v152h24V64c0-24 40-24 40 0v176h24V88c0-24 40-24 40 0v216c0 72-56 128-128 128H200c-72 0-128-56-128-128V208c0-24 40-24 40 0v88h24V120c0-24 40-24 40 0v176h24V80z" fill="#111"/></svg>',
    ),
  },
  {
    id: 'heart',
    name: 'Heart',
    folder: 'symbols',
    thumbnailUrl: svgDataUrl(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="white"/><path d="M64 110S20 84 20 50c0-16 12-28 28-28 8 0 14 3 16 7 2-4 8-7 16-7 16 0 28 12 28 28 0 34-44 60-44 60z" fill="#e11d48"/></svg>',
    ),
    assetUrl: svgDataUrl(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 444S80 338 80 200c0-64 48-112 112-112 32 0 56 12 64 28 8-16 32-28 64-28 64 0 112 48 112 112 0 138-176 244-176 244z" fill="#e11d48"/></svg>',
    ),
  },
  {
    id: 'apple',
    name: 'Apple',
    folder: 'food',
    thumbnailUrl: svgDataUrl(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="white"/><path d="M68 28c10 0 18-8 18-18-10 0-18 8-18 18z" fill="#16a34a"/><path d="M64 34c-20 0-36 16-36 36 0 34 20 48 36 48s36-14 36-48c0-20-16-36-36-36z" fill="#dc2626"/></svg>',
    ),
    assetUrl: svgDataUrl(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M272 112c40 0 72-32 72-72-40 0-72 32-72 72z" fill="#16a34a"/><path d="M256 136c-80 0-144 64-144 144 0 136 80 192 144 192s144-56 144-192c0-80-64-144-144-144z" fill="#dc2626"/></svg>',
    ),
  },
  {
    id: 'maestro_asset_1',
    name: 'Maestro Asset',
    folder: 'all',
    thumbnailUrl:
      'https://maestro.onlinelabels.com/LabelMaker/Api/File/GetAsset?asset=a1a%252fxtVGFQTEMcQ2h0cHmA%253d%253d',
    assetUrl:
      'https://maestro.onlinelabels.com/LabelMaker/Api/File/GetAsset?asset=a1a%252fxtVGFQTEMcQ2h0cHmA%253d%253d',
  },
  {
    id: 'maestro_asset_2',
    name: 'Maestro Asset 2',
    folder: 'all',
    thumbnailUrl:
      'https://maestro.onlinelabels.com/LabelMaker/Api/File/GetAsset?asset=YXfxGb06Y2bplVXWp3dWHw%253d%253d',
    assetUrl:
      'https://maestro.onlinelabels.com/LabelMaker/Api/File/GetAsset?asset=YXfxGb06Y2bplVXWp3dWHw%253d%253d',
  },
];

async function searchMaestroClipart(_query: ClipartQuery): Promise<ClipartSearchResponse> {
  const search = _query.search.trim().toLowerCase();

  let filtered = placeholderClipart;
  if (_query.folder !== 'all') {
    filtered = filtered.filter((i) => i.folder === _query.folder);
  }
  if (search.length > 0) {
    filtered = filtered.filter((i) => i.name.toLowerCase().includes(search));
  }

  return {
    total: filtered.length,
    items: filtered,
  };
}

const folders = [
  { id: 'all', name: 'All' },
  { id: 'kids', name: 'Kids' },
  { id: 'food', name: 'Food' },
  { id: 'symbols', name: 'Symbols' },
];

interface ClipartPickerProps {
  selectedClipart: string;
  onSelect: (emoji: string) => void;
}

export function ClipartPicker({ selectedClipart, onSelect }: ClipartPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [items, setItems] = useState<ClipartItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    searchMaestroClipart({ folder: selectedFolder, search: searchTerm })
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setTotalCount(res.total);
      })
      .catch(() => {
        if (cancelled) return;
        setItems([]);
        setTotalCount(0);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchTerm, selectedFolder]);

  const selectedIsUrl = useMemo(() => {
    return selectedClipart?.startsWith('http') || selectedClipart?.startsWith('data:') || selectedClipart?.startsWith('/');
  }, [selectedClipart]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Clipart</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Select value={selectedFolder} onValueChange={setSelectedFolder}>
          <SelectTrigger>
            <SelectValue placeholder="Folder" />
          </SelectTrigger>
          <SelectContent>
            {folders.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {loading ? 'Loading…' : `${totalCount.toLocaleString()} images`}
      </p>

      {/* Clipart Grid */}
      <ScrollArea className="h-60 rounded-md border border-border">
        {items.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground">
            No clipart loaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-2">
            {items.map((item) => (
              (() => {
                const assetUrl = proxifyAssetUrl(item.assetUrl);
                return (
              <button
                key={item.id}
                onClick={() => onSelect(assetUrl)}
                className={`relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-white p-2 transition-colors hover:bg-muted/40 ${
                  selectedClipart === assetUrl ? 'ring-2 ring-primary' : ''
                }`}
                title={item.name}
              >
                <span className="absolute left-1 top-1 text-sm text-foreground/80">★</span>
                <img
                  src={proxifyAssetUrl(item.thumbnailUrl)}
                  alt={item.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </button>
                );
              })()
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Selected Preview */}
      {selectedClipart && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">Selected:</span>
          {selectedIsUrl ? (
            <img src={selectedClipart} alt="Selected clipart" className="h-10 w-10 object-contain" />
          ) : (
            <span className="text-3xl">{selectedClipart}</span>
          )}
        </div>
      )}
    </div>
  );
}
