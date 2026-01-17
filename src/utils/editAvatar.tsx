export const generateRandomSeed = (): string => {
  return Math.random().toString(36).substring(2, 26);
};

export const buildAvatarUrl = ({
  seed,
  glasses = ["variant01"],
  backgroundColor = "ffffff",
}: {
  seed: string;
  glasses?: string[];
  backgroundColor?: string;
}): string => {
  const params = new URLSearchParams();
  
  params.append("seed", seed);
  params.append("backgroundColor", backgroundColor);
  
  if (glasses && glasses.length > 0) {
    params.append("glasses", glasses[0]);
  }

  return `https://api.dicebear.com/9.x/notionists-neutral/svg?${params.toString()}`;
};

export const convertAvatarUrlToPng = (url: string | null): string | null => {
  if (!url) return null;
  return url.replace("/svg?", "/png?");
};

export const buildAvatarUrlPng = ({
  seed,
  glasses = ["variant01"],
  backgroundColor = "ffffff",
}: {
  seed: string;
  glasses?: string[];
  backgroundColor?: string;
}): string => {
  const params = new URLSearchParams();
  
  params.append("seed", seed);
  params.append("backgroundColor", backgroundColor);
  
  if (glasses && glasses.length > 0) {
    params.append("glasses", glasses[0]);
  }

  return `https://api.dicebear.com/9.x/notionists-neutral/png?${params.toString()}`;
};

export const GLASSES_VARIANTS = [
  "variant01",
  "variant02",
  "variant03",
  "variant04",
  "variant05",
  "variant06",
  "variant07",
  "variant08",
  "variant09",
  "variant10",
];

export const BACKGROUND_COLORS = [
  { name: "White", value: "ffffff" },
  { name: "Black", value: "000000" },
  { name: "Blue", value: "0066ff" },
  { name: "Red", value: "ff0000" },
  { name: "Green", value: "00cc00" },
  { name: "Purple", value: "9900ff" },
  { name: "Orange", value: "ff9900" },
  { name: "Pink", value: "ff00ff" },
  { name: "Cyan", value: "00ffff" },
  { name: "Yellow", value: "ffff00" },
  { name: "Gray", value: "808080" },
  { name: "Brown", value: "8B4513" },
];

export interface AvatarConfig {
  seed: string;
  glasses: string[];
  backgroundColor: string;
}

export const validateAvatarConfig = (config: any): config is AvatarConfig => {
  return (
    typeof config.seed === "string" &&
    Array.isArray(config.glasses) &&
    config.glasses.every((g: any) => typeof g === "string") &&
    typeof config.backgroundColor === "string"
  );
};