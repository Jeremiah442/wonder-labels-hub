import { cn } from '@/lib/utils';
import { imageContainerDirectionClass, type ImagePosition } from '@/components/ImagePositionPicker';
import {
  rectATier,
  rectBTier,
  rectLineRenderFontSize,
  type RectLineTier,
  mixedSquareTier,
  squareRenderSizes,
  mixedCircleTier,
  circleRenderSizes,
} from '@/lib/mixedLabelSizing';

export interface MixedLabelData {
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

interface MixedLabelPreviewProps {
  labelData: MixedLabelData;
  fontOverride?: string;
}

/** Pure rendering of the mixed label sheet — shared by the live designer and the admin preview/print views. */
export function MixedLabelPreview({ labelData, fontOverride }: MixedLabelPreviewProps) {
  const canvasFont = fontOverride ?? labelData.font;
  const imageIsUrl =
    labelData.imageUrl?.startsWith('http') ||
    labelData.imageUrl?.startsWith('data:') ||
    labelData.imageUrl?.startsWith('/') ||
    labelData.imageUrl?.startsWith('blob:');

  const squareSizes = squareRenderSizes(mixedSquareTier, labelData.imageSize, labelData.fontSize);
  const circleSizes = circleRenderSizes(mixedCircleTier, labelData.imageSize, labelData.fontSize);

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

  const renderInlineNameRow = (fontSize: number) => (
    <div className="flex flex-row items-baseline justify-center gap-2 w-full min-w-0">
      {!!labelData.firstName && (
        <span
          className="leading-tight whitespace-nowrap"
          style={{
            color: labelData.textColor,
            fontSize,
            fontWeight: labelData.bold ? 700 : 400,
            fontStyle: labelData.italic ? 'italic' : 'normal',
            textDecoration: labelData.underline ? 'underline' : 'none',
          }}
        >
          {labelData.firstName}
        </span>
      )}
      {!!labelData.lastName && (
        <span
          className="leading-tight whitespace-nowrap"
          style={{
            color: labelData.textColor,
            fontSize,
            fontWeight: labelData.bold ? 700 : 400,
            fontStyle: labelData.italic ? 'italic' : 'normal',
            textDecoration: labelData.underline ? 'underline' : 'none',
          }}
        >
          {labelData.lastName}
        </span>
      )}
    </div>
  );

  const renderRect = (tier: RectLineTier, key: string) => (
    <div
      key={key}
      className={cn('flex border-gray-300 shadow-lg items-center justify-center transition-all rounded-md', tier.chromeClassName)}
      style={{
        width: `${tier.widthCm}cm`,
        height: `${tier.heightCm}cm`,
        backgroundColor: labelData.backgroundColor,
        fontFamily: canvasFont,
      }}
    >
      {renderInlineNameRow(rectLineRenderFontSize(tier, labelData.fontSize))}
    </div>
  );

  const renderSquare = (key: string) => (
    <div
      key={key}
      className={cn(
        'flex border-4 border-gray-300 shadow-lg items-center justify-center gap-1 p-2 transition-all rounded-md',
        imageContainerDirectionClass(labelData.imagePosition)
      )}
      style={{
        width: `${mixedSquareTier.sizeCm}cm`,
        height: `${mixedSquareTier.sizeCm}cm`,
        backgroundColor: labelData.backgroundColor,
        fontFamily: canvasFont,
      }}
    >
      {labelData.imageUrl && imageIsUrl ? (
        <img
          src={labelData.imageUrl}
          alt="Selected image"
          className="object-contain shrink-0"
          style={{ width: squareSizes.imageSize, height: squareSizes.imageSize }}
          draggable={false}
        />
      ) : null}
      {renderTextBlock(squareSizes.fontSize)}
    </div>
  );

  const renderCircle = (key: string) => (
    <div
      key={key}
      className={cn(
        'relative flex border-4 border-gray-300 shadow-lg items-center justify-center gap-1 p-2 transition-all rounded-full',
        imageContainerDirectionClass(labelData.imagePosition)
      )}
      style={{
        width: `${mixedCircleTier.diameterCm}cm`,
        height: `${mixedCircleTier.diameterCm}cm`,
        backgroundColor: labelData.backgroundColor,
        fontFamily: canvasFont,
      }}
    >
      {labelData.imageUrl && imageIsUrl ? (
        <img
          src={labelData.imageUrl}
          alt="Selected image"
          className="object-contain shrink-0"
          style={{ width: circleSizes.imageSize, height: circleSizes.imageSize }}
          draggable={false}
        />
      ) : null}
      {renderTextBlock(circleSizes.fontSize)}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-2">
      {[...Array(4)].map((_, row) => (
        <div key={`row-rect5x1-${row}`} className="flex items-center justify-center gap-2">
          {[...Array(4)].map((_, i) => renderRect(rectATier, `rect5x1-${row}-${i}`))}
        </div>
      ))}
      {[...Array(2)].map((_, row) => (
        <div key={`row-rect4_5x0_6-${row}`} className="flex items-center justify-center gap-2">
          {[...Array(4)].map((_, i) => renderRect(rectBTier, `rect4_5x0_6-${row}-${i}`))}
        </div>
      ))}
      <div className="flex items-center justify-center gap-2">
        {[...Array(7)].map((_, i) => renderSquare(`square-2_5-${i}`))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {[...Array(7)].map((_, i) => renderCircle(`circle-2_5-${i}`))}
      </div>
    </div>
  );
}
