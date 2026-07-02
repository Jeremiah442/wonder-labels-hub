import { cn } from '@/lib/utils';
import { imageContainerDirectionClass, type ImagePosition } from '@/components/ImagePositionPicker';
import { largeCircleTier, mediumCircleTier, smallCircleTier, circleRenderSizes } from '@/lib/circleLabelSizing';

export interface CircularLabelData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  imageSize: number;
  imagePosition: ImagePosition;
  textColor: string;
  backgroundColor: string;
  font: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface CircularLabelPreviewProps {
  labelData: CircularLabelData;
  /** Lets the designer's font dropdown preview a hovered font without touching labelData. */
  fontOverride?: string;
}

/** Pure rendering of the circular label sheet — shared by the live designer and the admin preview/print views. */
export function CircularLabelPreview({ labelData, fontOverride }: CircularLabelPreviewProps) {
  const canvasFont = fontOverride ?? labelData.font;
  const imageIsUrl =
    labelData.imageUrl?.startsWith('http') ||
    labelData.imageUrl?.startsWith('data:') ||
    labelData.imageUrl?.startsWith('/') ||
    labelData.imageUrl?.startsWith('blob:');

  const largeSizes = circleRenderSizes(largeCircleTier, labelData.imageSize, labelData.fontSize);
  const mediumSizes = circleRenderSizes(mediumCircleTier, labelData.imageSize, labelData.fontSize);
  const smallSizes = circleRenderSizes(smallCircleTier, labelData.imageSize, labelData.fontSize);

  const renderTextBlock = (fontSize: number) => (
    <div className="flex flex-col items-center justify-center min-w-0">
      {!!labelData.firstName && (
        <span
          className="leading-tight"
          style={{
            color: labelData.textColor,
            fontSize,
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
            fontSize,
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
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] p-4 gap-3">
      <div className="flex items-center justify-center gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={`row1-${i}`}
            className={cn(
              'relative w-[4.5cm] h-[4.5cm] rounded-full border-4 border-gray-300 shadow-lg flex items-center justify-center gap-1 p-2 transition-all',
              imageContainerDirectionClass(labelData.imagePosition)
            )}
            style={{ backgroundColor: labelData.backgroundColor, fontFamily: canvasFont }}
          >
            {labelData.imageUrl && imageIsUrl ? (
              <img
                src={labelData.imageUrl}
                alt="Selected image"
                className="object-contain shrink-0"
                style={{ width: largeSizes.imageSize, height: largeSizes.imageSize }}
                draggable={false}
              />
            ) : null}
            {renderTextBlock(largeSizes.fontSize)}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {[...Array(7)].map((_, i) => (
          <div
            key={`row2-${i}`}
            className={cn(
              'w-[2.5cm] h-[2.5cm] rounded-full border-4 border-gray-300 shadow-lg flex items-center justify-center gap-1 p-1 transition-all',
              imageContainerDirectionClass(labelData.imagePosition)
            )}
            style={{ backgroundColor: labelData.backgroundColor, fontFamily: canvasFont }}
          >
            {labelData.imageUrl && imageIsUrl ? (
              <img
                src={labelData.imageUrl}
                alt="Selected image"
                className="object-contain shrink-0"
                style={{ width: smallSizes.imageSize, height: smallSizes.imageSize }}
                draggable={false}
              />
            ) : null}
            {renderTextBlock(smallSizes.fontSize)}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={`row3-${i}`}
            className={cn(
              'w-[3.2cm] h-[3.2cm] rounded-full border-4 border-gray-300 shadow-lg flex items-center justify-center gap-1 p-1 transition-all',
              imageContainerDirectionClass(labelData.imagePosition)
            )}
            style={{ backgroundColor: labelData.backgroundColor, fontFamily: canvasFont }}
          >
            {labelData.imageUrl && imageIsUrl ? (
              <img
                src={labelData.imageUrl}
                alt="Selected image"
                className="object-contain shrink-0"
                style={{ width: mediumSizes.imageSize, height: mediumSizes.imageSize }}
                draggable={false}
              />
            ) : null}
            {renderTextBlock(mediumSizes.fontSize)}
          </div>
        ))}
      </div>
    </div>
  );
}
