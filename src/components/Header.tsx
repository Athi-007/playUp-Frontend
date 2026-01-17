import React, { useMemo } from "react";
import { View, Pressable, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
const PlayUpLogo = require("../../assets/playUp.jpg");
import { buildAvatarUrl, convertAvatarUrlToPng } from "../utils/editAvatar";
import { IMAGE_BASE_URL } from "../utils/constants";

export default function Header() {
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state.user);

  // Force re-render when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, [user])
  );

  let profileUrl = user?.profileUrl;
  console.log("Header user:", user);
  console.log("Header profileUrl (raw):", profileUrl);
  console.log("Header profileType:", user?.profileType);
  console.log("Header IMAGE_BASE_URL:", IMAGE_BASE_URL);

  // If it's an uploaded image
  if (user?.profileType === "uploaded") {
    if (typeof profileUrl === 'string') {
      if (profileUrl?.startsWith("http")) {
        // Already has full URL
        profileUrl = profileUrl;
      } else {
        // Prepend backend URL
        profileUrl = `${IMAGE_BASE_URL}${profileUrl}`;
      }
    }
  }
  // If it's a DiceBear avatar
  else if (user?.profileType === "avatar" && user?.avatarConfig?.seed) {
    const builtUrl = buildAvatarUrl({
      seed: user.avatarConfig.seed,
      glasses: user.avatarConfig.glasses || ["variant01"],
      backgroundColor: user.avatarConfig.backgroundColor || "ffffff",
    });
    profileUrl = convertAvatarUrlToPng(builtUrl);
  }
  // Fallback: if no profileType but has avatarConfig
  else if (!profileUrl && user?.avatarConfig?.seed) {
    const builtUrl = buildAvatarUrl({
      seed: user.avatarConfig.seed,
      glasses: user.avatarConfig.glasses || ["variant01"],
      backgroundColor: user.avatarConfig.backgroundColor || "ffffff",
    });
    profileUrl = convertAvatarUrlToPng(builtUrl);
  }
  // Last resort: build from user ID
  else if (!profileUrl && user?._id) {
    const builtUrl = buildAvatarUrl({
      seed: user._id,
      glasses: ["variant01"],
      backgroundColor: "ffffff",
    });
    profileUrl = convertAvatarUrlToPng(builtUrl);
  }

  console.log("Header profileUrl (final):", profileUrl);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView className="bg-black" edges={['top']}>
        <View className="flex-row items-center justify-between px-4 py-3">
          <Image
            source={PlayUpLogo}
            className="w-10 h-10 rounded-xl"
            style={{ width: 40, height: 40, borderRadius: 12 }}
            resizeMode="contain"
          />

          <Pressable onPress={() => navigation.navigate("Profile")}> 
            <Image
              source={{ uri: profileUrl || "" }}
              className="w-10 h-10 rounded-full border border-zinc-600"
              style={{ width: 40, height: 40, borderRadius: 20 }}
              onError={(error) => console.log("Image load error:", error)}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}