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
