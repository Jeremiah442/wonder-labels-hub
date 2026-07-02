/**
 * Sizing model for the circular label designer.
 *
 * The image size and font size are controlled by a single pair of sliders shared
 * across all three circle sizes on the sheet. Naively applying the same pixel value
 * to every circle overflows the smaller ones, so each circle tier instead:
 *  - scales the requested size down in proportion to its own diameter (smaller
 *    circles grow slower), and
 *  - hard-caps at the largest size that is geometrically guaranteed to fit inside
 *    that circle, so once a tier hits its ceiling it stops growing while larger
 *    tiers (not yet at their own ceiling) keep responding to the slider.
 */

// CSS defines physical units as exactly 96px per inch, 2.54cm per inch — a fixed
// reference, not an approximation of a real screen's DPI.
const CM_TO_PX = 96 / 2.54;

// border-4 on every circle = 4px on each side.
const BORDER_PX = 8;

// Share of the circle's safe inscribed square given to the image vs. the (up to
// two-line) name block, sized so both maxed out simultaneously still fit.
const IMAGE_SHARE = 0.5;
const TEXT_BLOCK_SHARE = 0.42;
const LINE_HEIGHT = 1.2;
const MAX_NAME_LINES = 2;

export interface CircleTier {
  /** Rendered circle diameter in cm, matching the CSS width/height for that row. */
  diameterCm: number;
  /** Total padding (both sides) applied to that circle, e.g. p-2 = 16, p-1 = 8. */
  paddingPx: number;
}

export const largeCircleTier: CircleTier = { diameterCm: 4.5, paddingPx: 16 };
export const mediumCircleTier: CircleTier = { diameterCm: 3.2, paddingPx: 8 };
export const smallCircleTier: CircleTier = { diameterCm: 2.5, paddingPx: 8 };

// The largest circle is the reference: the slider maps 1:1 onto it until it hits
// its own cap below.
const referenceDiameterPx = largeCircleTier.diameterCm * CM_TO_PX;

function diameterPx(tier: CircleTier): number {
  return tier.diameterCm * CM_TO_PX;
}

/** Side of the largest square guaranteed to fit inside the circle, after border/padding. */
function safeInscribedSide(tier: CircleTier): number {
  const safeDiameter = Math.max(0, diameterPx(tier) - BORDER_PX - tier.paddingPx);
  return safeDiameter / Math.SQRT2;
}

export function circleSizeLimits(tier: CircleTier) {
  const side = safeInscribedSide(tier);
  const textBlockBudget = side * TEXT_BLOCK_SHARE;
  return {
    maxImageSize: Math.max(8, Math.round(side * IMAGE_SHARE)),
    maxFontSize: Math.max(6, Math.round(textBlockBudget / (MAX_NAME_LINES * LINE_HEIGHT))),
  };
}

/**
 * Given the requested image/font size from the shared sliders, returns the size
 * actually rendered in this circle tier.
 */
export function circleRenderSizes(tier: CircleTier, requestedImageSize: number, requestedFontSize: number) {
  const scale = diameterPx(tier) / referenceDiameterPx;
  const { maxImageSize, maxFontSize } = circleSizeLimits(tier);

  return {
    imageSize: Math.min(Math.round(requestedImageSize * scale), maxImageSize),
    fontSize: Math.min(Math.round(requestedFontSize * scale), maxFontSize),
    maxImageSize,
    maxFontSize,
  };
}
