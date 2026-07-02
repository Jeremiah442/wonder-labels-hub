import { cn } from '@/lib/utils';
import { imageContainerDirectionClass, type ImagePosition } from '@/components/ImagePositionPicker';
import { largeSquareTier, smallSquareTier, squareRenderSizes } from '@/lib/squareLabelSizing';

export interface SquareLabelData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  imageSize: number;
  imagePosition: ImagePosition;
  textColor: string;
  backgroundColorOdd: string;
  backgroundColorEven: string;
  font: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface SquareLabelPreviewProps {
  labelData: SquareLabelData;
  fontOverride?: string;
}

// Column configuration: odd columns (1,3,5,7) have 3 squares of 3cm, even columns (2,4,6) have 4 squares of 2.1cm
const columns: { count: number; size: '3cm' | '2.1cm' }[] = [
  { count: 3, size: '3cm' },
  { count: 4, size: '2.1cm' },
  { count: 3, size: '3cm' },
  { count: 4, size: '2.1cm' },
  { count: 3, size: '3cm' },
  { count: 4, size: '2.1cm' },
  { count: 3, size: '3cm' },
];

/** Pure rendering of the square label sheet — shared by the live designer and the admin preview/print views. */
export function SquareLabelPreview({ labelData, fontOverride }: SquareLabelPreviewProps) {
  const canvasFont = fontOverride ?? labelData.font;
  const imageIsUrl =
    labelData.imageUrl?.startsWith('http') ||
    labelData.imageUrl?.startsWith('data:') ||
    labelData.imageUrl?.startsWith('/') ||
    labelData.imageUrl?.startsWith('blob:');

  const largeSquareSizes = squareRenderSizes(largeSquareTier, labelData.imageSize, labelData.fontSize);
  const smallSquareSizes = squareRenderSizes(smallSquareTier, labelData.imageSize, labelData.fontSize);
  const sizesForColumn = (size: '3cm' | '2.1cm') => (size === '3cm' ? largeSquareSizes : smallSquareSizes);

  const previewBackgroundForColumn = (colIndex: number) => {
    const isOddColumnOneBased = colIndex % 2 === 0;
    return isOddColumnOneBased ? labelData.backgroundColorOdd : labelData.backgroundColorEven;
  };

  return (
    <div className="flex items-start justify-center min-h-[520px] p-4 gap-2 overflow-x-auto">
      {columns.map((col, colIndex) => {
        const sizes = sizesForColumn(col.size);
        return (
          <div key={`col-${colIndex}`} className="flex flex-col gap-2 items-center">
            {[...Array(col.count)].map((_, i) => (
              <div
                key={`square-${colIndex}-${i}`}
                className={cn(
                  'flex border-4 border-gray-300 shadow-lg items-center justify-center gap-1 p-2 transition-all rounded-md',
                  imageContainerDirectionClass(labelData.imagePosition)
                )}
                style={{
                  width: col.size,
                  height: col.size,
                  backgroundColor: previewBackgroundForColumn(colIndex),
                  fontFamily: canvasFont,
                }}
              >
                {labelData.imageUrl && imageIsUrl ? (
                  <img
                    src={labelData.imageUrl}
                    alt="Selected image"
                    className="object-contain shrink-0"
                    style={{ width: sizes.imageSize, height: sizes.imageSize }}
                    draggable={false}
                  />
                ) : null}
                <div className="flex flex-col items-center justify-center min-w-0">
                  {!!labelData.firstName && (
                    <span
                      className="leading-tight"
                      style={{
                        color: labelData.textColor,
                        fontSize: sizes.fontSize,
                        fontWeight: labelData.bold ? 700 : 400,
                        fontStyle: labelData.italic ? 'italic' : 'normal',
                        textDecoration: labelData.underline ? 'underline' : 'none',
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      {labelData.firstName}
                    </span>
                  )}
                  {!!labelData.lastName && (
                    <span
                      className="leading-tight"
                      style={{
                        color: labelData.textColor,
                        fontSize: sizes.fontSize,
                        fontWeight: labelData.bold ? 700 : 400,
                        fontStyle: labelData.italic ? 'italic' : 'normal',
                        textDecoration: labelData.underline ? 'underline' : 'none',
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      {labelData.lastName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
