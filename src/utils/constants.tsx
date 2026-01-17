export const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL as string;
export const IMAGE_BASE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL as string;

export const STORAGE_KEYS = {
  TOKEN: "token",
};

if (__DEV__) {
  console.log('=== Environment Constants ===');
  console.log('BASE_URL:', BASE_URL);
  console.log('IMAGE_BASE_URL:', IMAGE_BASE_URL);
}

