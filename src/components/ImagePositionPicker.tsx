import { Image as ImageIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type ImagePosition = 'top' | 'bottom' | 'left' | 'right';

export const defaultImagePosition: ImagePosition = 'top';

export function imageContainerDirectionClass(position: ImagePosition): string {
  switch (position) {
    case 'left':
      return 'flex-row';
    case 'right':
      return 'flex-row-reverse';
    case 'bottom':
      return 'flex-col-reverse';
    case 'top':
    default:
      return 'flex-col';
  }
}

const allSpots: { value: ImagePosition; area: string }[] = [
  { value: 'top', area: 'col-start-2 row-start-1' },
  { value: 'left', area: 'col-start-1 row-start-2' },
  { value: 'right', area: 'col-start-3 row-start-2' },
  { value: 'bottom', area: 'col-start-2 row-start-3' },
];

const allPositions: ImagePosition[] = ['top', 'left', 'right', 'bottom'];

interface ImagePositionPickerProps {
  value: ImagePosition;
  onChange: (value: ImagePosition) => void;
  /** Restrict which positions are selectable. Defaults to all four. */
  allowedPositions?: ImagePosition[];
  /** Heading text, for when a page shows more than one picker. */
  label?: string;
  /** Helper text under the picker. */
  helperText?: string;
}

export function ImagePositionPicker({
  value,
  onChange,
  allowedPositions = allPositions,
  label = 'Image Position',
  helperText = 'Choose where the image sits relative to the name.',
}: ImagePositionPickerProps) {
  const hasHorizontal = allowedPositions.includes('left') || allowedPositions.includes('right');

  const spots = allSpots
    .filter((spot) => allowedPositions.includes(spot.value))
    .map((spot) =>
      hasHorizontal
        ? spot
        : { value: spot.value, area: spot.value === 'top' ? 'col-start-1 row-start-1' : 'col-start-1 row-start-3' }
    );
  const nameArea = hasHorizontal ? 'col-start-2 row-start-2' : 'col-start-1 row-start-2';

  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-primary" />
        {label}
      </Label>
      <div
        className={cn(
          'grid h-32 grid-rows-3 gap-1.5 rounded-xl border border-border bg-muted/30 p-1.5 mx-auto sm:mx-0',
          hasHorizontal ? 'w-32 grid-cols-3' : 'w-16 grid-cols-1'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-md border border-dashed border-border bg-background text-[9px] font-medium leading-tight text-muted-foreground',
            nameArea
          )}
        >
          Name
        </div>
        {spots.map((spot) => {
          const active = value === spot.value;
          return (
            <button
              key={spot.value}
              type="button"
              aria-label={`Image ${spot.value}`}
              onClick={() => onChange(spot.value)}
              className={cn(
                'flex items-center justify-center rounded-md border-2 transition-all hover:scale-105',
                spot.area,
                active
                  ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary ring-offset-2'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/50'
              )}
            >
              <ImageIcon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">{helperText}</p>
    </div>
  );
}
