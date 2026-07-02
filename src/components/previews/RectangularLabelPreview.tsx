import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { imageContainerDirectionClass, type ImagePosition } from '@/components/ImagePositionPicker';
import { bigRectTier, midRectTier, smallRectTier, rectRenderSizes } from '@/lib/rectangleLabelSizing';

export interface RectangularLabelData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  imageSize: number;
  imagePosition: ImagePosition;
  compactImagePosition: ImagePosition;
  textColor: string;
  backgroundColorCol14TopAndBottom: string;
  backgroundColorCol14BottomRect: string;
  backgroundColorCol23: string;
  font: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface RectangularLabelPreviewProps {
  labelData: RectangularLabelData;
  fontOverride?: string;
}

const column1 = [bigRectTier, bigRectTier, midRectTier];
const column2 = Array.from({ length: 4 }, () => midRectTier);
const column3 = Array.from({ length: 7 }, () => smallRectTier);
const column4 = [...column1];
const bottomRow = Array.from({ length: 6 }, () => smallRectTier);
const columns = [column1, column2, column3, column4];

/** Pure rendering of the rectangular label sheet — shared by the live designer and the admin preview/print views. */
export function RectangularLabelPreview({ labelData, fontOverride }: RectangularLabelPreviewProps) {
  const canvasFont = fontOverride ?? labelData.font;
  const imageIsUrl =
    labelData.imageUrl?.startsWith('http') ||
    labelData.imageUrl?.startsWith('data:') ||
    labelData.imageUrl?.startsWith('/') ||
    labelData.imageUrl?.startsWith('blob:');

  const nameTextStyle = (fontSize: number): CSSProperties => ({
    color: labelData.textColor,
    fontSize,
    fontWeight: labelData.bold ? 700 : 400,
    fontStyle: labelData.italic ? 'italic' : 'normal',
    textDecoration: labelData.underline ? 'underline' : 'none',
    textAlign: 'center',
  });

  const renderTextBlock = (fontSize: number, spaced = false) => (
    <div className={cn('flex flex-col items-center justify-center min-w-0', spaced && 'gap-1.5')}>
      {!!labelData.firstName && (
        <span className="leading-tight" style={{ ...nameTextStyle(fontSize), width: '100%' }}>
          {labelData.firstName}
        </span>
      )}
      {!!labelData.lastName && (
        <span className="leading-tight" style={{ ...nameTextStyle(fontSize), width: '100%' }}>
          {labelData.lastName}
        </span>
      )}
    </div>
  );

  const renderInlineNameRow = (fontSize: number) => (
    <div className="flex flex-row items-baseline justify-center gap-1 min-w-0">
      {!!labelData.firstName && (
        <span className="leading-tight whitespace-nowrap" style={nameTextStyle(fontSize)}>
          {labelData.firstName}
        </span>
      )}
      {!!labelData.lastName && (
        <span className="leading-tight whitespace-nowrap" style={nameTextStyle(fontSize)}>
          {labelData.lastName}
        </span>
      )}
    </div>
  );

  const previewBackgroundForRect = (colIndex: number, rectIndex: number) => {
    const isCol1Or4 = colIndex === 0 || colIndex === 3;
    if (isCol1Or4) {
      return rectIndex < 2 ? labelData.backgroundColorCol14TopAndBottom : labelData.backgroundColorCol14BottomRect;
    }
    return labelData.backgroundColorCol23;
  };

  return (
    <>
      <div className="flex items-start justify-center min-h-[400px] p-4 gap-4 overflow-x-auto">
        {columns.map((col, colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col gap-2 items-center">
            {col.map((rect, i) => {
              const isSmall = rect === smallRectTier;
              const isBig = rect === bigRectTier;
              const isMid = rect === midRectTier;
              const sizes = rectRenderSizes(rect, labelData.imageSize, labelData.fontSize);
              return (
                <div
                  key={`rect-${colIndex}-${i}`}
                  className={cn(
                    'flex border-gray-300 shadow-lg items-center transition-all rounded-md',
                    rect.chromeClassName,
                    isBig && 'justify-center gap-1',
                    isMid && 'justify-center gap-2',
                    isSmall && 'justify-center gap-1',
                    imageContainerDirectionClass(isBig ? labelData.imagePosition : labelData.compactImagePosition)
                  )}
                  style={{
                    width: `${rect.widthCm}cm`,
                    height: `${rect.heightCm}cm`,
                    backgroundColor: previewBackgroundForRect(colIndex, i),
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
                  {isSmall ? renderInlineNameRow(sizes.fontSize) : renderTextBlock(sizes.fontSize, isMid)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="-mt-2 flex items-center justify-center gap-2">
        {bottomRow.map((rect, i) => {
          const sizes = rectRenderSizes(rect, labelData.imageSize, labelData.fontSize);
          return (
            <div
              key={`bottom-${i}`}
              className={cn(
                'flex border-gray-300 shadow-lg items-center justify-center gap-1 transition-all rounded-md',
                rect.chromeClassName,
                imageContainerDirectionClass(labelData.compactImagePosition)
              )}
              style={{
                width: `${rect.widthCm}cm`,
                height: `${rect.heightCm}cm`,
                backgroundColor: labelData.backgroundColorCol14TopAndBottom,
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
              {renderInlineNameRow(sizes.fontSize)}
            </div>
          );
        })}
      </div>
    </>
  );
}
