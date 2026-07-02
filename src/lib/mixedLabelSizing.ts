/**
 * Sizing model for the mixed label designer's four shapes.
 *
 * The two rectangular rows are text-only (no image, single line — see
 * MixedLabelDesigner's renderInlineNameRow), so their cap is just "does one
 * line of text fit in the box." The squares and circles still combine an
 * image with a stacked two-line name, so they share the same inscribed-area
 * approach as squareLabelSizing/circleLabelSizing: image and text budgets
 * sized so both maxed out simultaneously still fit.
 *
 * Border/padding scale down with the shape's size — a 4px border and p-2
 * padding are fine on the 1cm-tall row but disproportionately heavy chrome
 * on the 0.61cm one, eating into its already-scarce interior. Whatever
 * border/padding classes are used in the JSX must match the values here
 * exactly, or the containment guarantee breaks.
 */

const CM_TO_PX = 96 / 2.54;
const IMAGE_SHARE = 0.5;
const TEXT_BLOCK_SHARE = 0.42;
const LINE_HEIGHT = 1.2;

export interface RectLineTier {
  widthCm: number;
  heightCm: number;
  paddingPx: number;
  borderPx: number;
  chromeClassName: string;
}

export const rectATier: RectLineTier = {
  widthCm: 5,
  heightCm: 1,
  paddingPx: 8,
  borderPx: 8,
  chromeClassName: 'border-4 p-1',
};

export const rectBTier: RectLineTier = {
  widthCm: 4.54,
  heightCm: 0.61,
  paddingPx: 4,
  borderPx: 4,
  chromeClassName: 'border-2 p-0.5',
};

export function rectLineMaxFontSize(tier: RectLineTier): number {
  const heightPx = tier.heightCm * CM_TO_PX;
  const safeHeight = Math.max(0, heightPx - tier.borderPx - tier.paddingPx);
  // Single line, no image to share with, so most of the safe height is usable.
  return Math.max(6, Math.round((safeHeight * 0.85) / LINE_HEIGHT));
}

export function rectLineRenderFontSize(tier: RectLineTier, requestedFontSize: number): number {
  return Math.min(Math.round(requestedFontSize), rectLineMaxFontSize(tier));
}

export interface SquareTier {
  sizeCm: number;
  paddingPx: number;
  borderPx: number;
}

export const mixedSquareTier: SquareTier = { sizeCm: 2.5, paddingPx: 16, borderPx: 8 };

export function squareSizeLimits(tier: SquareTier) {
  const side = Math.max(0, tier.sizeCm * CM_TO_PX - tier.borderPx - tier.paddingPx);
  return {
    maxImageSize: Math.max(8, Math.round(side * IMAGE_SHARE)),
    maxFontSize: Math.max(6, Math.round((side * TEXT_BLOCK_SHARE) / (2 * LINE_HEIGHT))),
  };
}

export function squareRenderSizes(tier: SquareTier, requestedImageSize: number, requestedFontSize: number) {
  const { maxImageSize, maxFontSize } = squareSizeLimits(tier);
  return {
    imageSize: Math.min(Math.round(requestedImageSize), maxImageSize),
    fontSize: Math.min(Math.round(requestedFontSize), maxFontSize),
    maxImageSize,
    maxFontSize,
  };
}

export interface CircleTier {
  diameterCm: number;
  paddingPx: number;
  borderPx: number;
}

export const mixedCircleTier: CircleTier = { diameterCm: 2.5, paddingPx: 16, borderPx: 8 };

export function circleSizeLimits(tier: CircleTier) {
  const safeDiameter = Math.max(0, tier.diameterCm * CM_TO_PX - tier.borderPx - tier.paddingPx);
  const inscribedSide = safeDiameter / Math.SQRT2;
  return {
    maxImageSize: Math.max(8, Math.round(inscribedSide * IMAGE_SHARE)),
    maxFontSize: Math.max(6, Math.round((inscribedSide * TEXT_BLOCK_SHARE) / (2 * LINE_HEIGHT))),
  };
}

export function circleRenderSizes(tier: CircleTier, requestedImageSize: number, requestedFontSize: number) {
  const { maxImageSize, maxFontSize } = circleSizeLimits(tier);
  return {
    imageSize: Math.min(Math.round(requestedImageSize), maxImageSize),
    fontSize: Math.min(Math.round(requestedFontSize), maxFontSize),
    maxImageSize,
    maxFontSize,
  };
}
