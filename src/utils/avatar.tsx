// utils/avatar.ts
export const buildAvatarUrl = ({
  seed,
  glasses,
  backgroundColor,
}: {
  seed: string;
  glasses: string[];
  backgroundColor: string;
}) => {
  const params = new URLSearchParams({
    seed,
    glasses: glasses.join(","),
    backgroundColor,
  });

  return `https://api.dicebear.com/9.x/notionists-neutral/svg?${params.toString()}`;
};

/**
 * Converts a Dicebear SVG URL to PNG format for React Native compatibility
 * React Native's Image component doesn't support SVG URLs directly
 */
export const convertAvatarUrlToPng = (url: string): string => {
  if (!url) return url;
  // Replace /svg with /png in the URL (works for both svg and png URLs)
  return url.replace('/svg', '/png');
};

/**
 * Parses a Dicebear URL to extract glasses and backgroundColor parameters
 * Returns default values if URL is invalid or parameters are missing
 */
export const parseAvatarUrl = (url: string | undefined): { glasses: string[], backgroundColor: string } => {
  const defaultValues = {
    glasses: ["variant01"] as string[],
    backgroundColor: "ffffff",
  };

  if (!url) return defaultValues;

  try {
    // Handle both SVG and PNG URLs
    const cleanUrl = url.replace('/png', '/svg');
    const urlObj = new URL(cleanUrl);
    const params = new URLSearchParams(urlObj.search);

    const glassesParam = params.get('glasses');
    const backgroundColorParam = params.get('backgroundColor');

    return {
      glasses: glassesParam ? glassesParam.split(',') : defaultValues.glasses,
      backgroundColor: backgroundColorParam || defaultValues.backgroundColor,
    };
  } catch (error) {
    console.warn('Failed to parse avatar URL:', error);
    return defaultValues;
  }
};