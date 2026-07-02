/**
 * Sizing model for the rectangular label designer.
 *
 * Unlike the circle/square sheets, the rectangle sheet's smallest tier (0.82cm
 * tall) is drastically smaller than its largest (3.16cm tall) — proportionally
 * scaling every tier off the biggest one (as the circle/square models do) would
 * make the smallest tier's text illegibly tiny well before it needed to. So each
 * tier here instead tracks the shared slider 1:1 and relies solely on its own
 * hard cap — the largest size geometrically guaranteed to fit inside that
 * rectangle — to prevent overflow. A tier stops growing the moment it hits its
 * cap while other tiers (not yet capped) keep responding to the slider.
 *
 * Border/padding scale down with the tier: a 4px border reads fine on a 3.16cm
 * rectangle but is disproportionately heavy chrome on a 0.82cm one, and eats
 * into the already-scarce interior space. Whatever border/padding classes are
 * used in the JSX for a given tier must match the values here exactly, or the
 * containment guarantee breaks.
 */

// CSS defines physical units as exactly 96px per inch, 2.54cm per inch — a fixed
// reference, not an approximation of a real screen's DPI.
const CM_TO_PX = 96 / 2.54;

// Share of the rectangle's safe area given to the image vs. the name text,
// sized so both maxed out simultaneously still fit.
const IMAGE_SHARE = 0.6;
const TEXT_BLOCK_SHARE = 0.42;
const LINE_HEIGHT = 1.2;

export interface RectTier {
  /** Rendered width in cm, matching the CSS width for that tier. */
  widthCm: number;
  /** Rendered height in cm, matching the CSS height for that tier. */
  heightCm: number;
  /** Total padding (both sides), e.g. p-2 = 16, p-1 = 8, p-0.5 = 4. Must match the JSX. */
  paddingPx: number;
  /** Total border width (both sides), e.g. border-4 = 8, border-2 = 4. Must match the JSX. */
  borderPx: number;
  /** How many lines the name is rendered as in this tier (2 = stacked, 1 = inline). */
  textLines: 1 | 2;
  /** Tailwind classes for this tier's border and padding, so the JSX can't drift from this model. */
  chromeClassName: string;
}

export const bigRectTier: RectTier = {
  widthCm: 4.94,
  heightCm: 3.16,
  paddingPx: 16,
  borderPx: 8,
  textLines: 2,
  chromeClassName: 'border-4 p-2',
};

export const midRectTier: RectTier = {
  widthCm: 5.03,
  heightCm: 1.96,
  paddingPx: 8,
  borderPx: 4,
  textLines: 2,
  chromeClassName: 'border-2 p-1',
};

export const smallRectTier: RectTier = {
  widthCm: 3.22,
  heightCm: 0.82,
  paddingPx: 4,
  borderPx: 4,
  textLines: 1,
  chromeClassName: 'border-2 p-0.5',
};

function widthPx(tier: RectTier): number {
  return tier.widthCm * CM_TO_PX;
}

function heightPx(tier: RectTier): number {
  return tier.heightCm * CM_TO_PX;
}

function safeWidth(tier: RectTier): number {
  return Math.max(0, widthPx(tier) - tier.borderPx - tier.paddingPx);
}

function safeHeight(tier: RectTier): number {
  return Math.max(0, heightPx(tier) - tier.borderPx - tier.paddingPx);
}

export function rectSizeLimits(tier: RectTier) {
  const sw = safeWidth(tier);
  const sh = safeHeight(tier);
  // The image is roughly square, so it's bounded by whichever dimension is tighter.
  const maxImageSize = Math.max(8, Math.round(Math.min(sw, sh) * IMAGE_SHARE));
  const textBlockBudget = sh * TEXT_BLOCK_SHARE;
  const maxFontSize = Math.max(6, Math.round(textBlockBudget / (tier.textLines * LINE_HEIGHT)));
  return { maxImageSize, maxFontSize };
}

/**
 * Given the requested image/font size from the shared sliders, returns the size
 * actually rendered in this rectangle tier.
 */
export function rectRenderSizes(tier: RectTier, requestedImageSize: number, requestedFontSize: number) {
  const { maxImageSize, maxFontSize } = rectSizeLimits(tier);
  return {
    imageSize: Math.min(Math.round(requestedImageSize), maxImageSize),
    fontSize: Math.min(Math.round(requestedFontSize), maxFontSize),
    maxImageSize,
    maxFontSize,
  };
}
