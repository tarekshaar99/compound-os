import OgImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from "./opengraph-image";

/**
 * Twitter card image - reuses the Open Graph renderer so link previews
 * look identical across platforms. Each `generate*Image` route requires
 * its own config exports (Next.js can't follow re-exports).
 */

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default OgImage;
