/**
 * Sizing model for the square label designer — the same idea as circleLabelSizing,
 * adapted for square cells. A square container doesn't need the inscribed-circle
 * correction a circle does: the safe area is just the square itself, minus border
 * and padding.
 *
 * The image size and font size are controlled by a single pair of sliders shared
 * across both square sizes on the sheet (3cm big squares, 2.1cm small squares).
 * Each tier:
 *  - scales the requested size down in proportion to its own side length (the
 *    small squares grow slower than the big ones), and
 *  - hard-caps at the largest size that is guaranteed to fit inside that square,
 *    so once a tier hits its ceiling it stops growing while the other tier (if
 *    not yet at its own ceiling) keeps responding to the slider.
 */

// CSS defines physical units as exactly 96px per inch, 2.54cm per inch — a fixed
// reference, not an approximation of a real screen's DPI.
const CM_TO_PX = 96 / 2.54;

// border-4 on every square = 4px on each side.
const BORDER_PX = 8;

// Share of the square's safe area given to the image vs. the (up to two-line)
// name block, sized so both maxed out simultaneously still fit.
const IMAGE_SHARE = 0.5;
const TEXT_BLOCK_SHARE = 0.42;
const LINE_HEIGHT = 1.2;
const MAX_NAME_LINES = 2;

export interface SquareTier {
  /** Rendered square side length in cm, matching the CSS width/height for that tier. */
  sizeCm: number;
  /** Total padding (both sides) applied to that square, e.g. p-2 = 16. */
  paddingPx: number;
}

export const largeSquareTier: SquareTier = { sizeCm: 3, paddingPx: 16 };
export const smallSquareTier: SquareTier = { sizeCm: 2.1, paddingPx: 16 };

// The larger square is the reference: the slider maps 1:1 onto it until it hits
// its own cap below.
const referenceSizePx = largeSquareTier.sizeCm * CM_TO_PX;

function sizePx(tier: SquareTier): number {
  return tier.sizeCm * CM_TO_PX;
}

/** Side of the safe area inside the square, after border/padding. */
function safeSide(tier: SquareTier): number {
  return Math.max(0, sizePx(tier) - BORDER_PX - tier.paddingPx);
}

export function squareSizeLimits(tier: SquareTier) {
  const side = safeSide(tier);
  const textBlockBudget = side * TEXT_BLOCK_SHARE;
  return {
    maxImageSize: Math.max(8, Math.round(side * IMAGE_SHARE)),
    maxFontSize: Math.max(6, Math.round(textBlockBudget / (MAX_NAME_LINES * LINE_HEIGHT))),
  };
}

/**
 * Given the requested image/font size from the shared sliders, returns the size
 * actually rendered in this square tier.
 */
export function squareRenderSizes(tier: SquareTier, requestedImageSize: number, requestedFontSize: number) {
  const scale = sizePx(tier) / referenceSizePx;
  const { maxImageSize, maxFontSize } = squareSizeLimits(tier);

  return {
    imageSize: Math.min(Math.round(requestedImageSize * scale), maxImageSize),
    fontSize: Math.min(Math.round(requestedFontSize * scale), maxFontSize),
    maxImageSize,
    maxFontSize,
  };
}
