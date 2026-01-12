import React from "react";
import { View, Pressable, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { buildAvatarUrl } from "../utils/avatar";

// Import local asset
const PlayUpLogo = require("../../assets/playUp.jpg");

export default function Header() {
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state.user);

  // Default values if user is not loaded
  const seed = user?._id || "default";
  // We can default to same glass/bg as profile or just generic defaults for the header icon
  const glasses = ["variant01"];
  const backgroundColor = "ffffff";

  const avatarUrl = buildAvatarUrl({
    seed,
    glasses,
    backgroundColor,
  });

  return (
    <SafeAreaView className="bg-white pt-2">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        {/* Left: App Icon */}
        <Image
          source={PlayUpLogo}
          className="w-10 h-10 rounded-full"
          style={{ width: 40, height: 40, borderRadius: 20 }}
          resizeMode="cover"
        />

        {/* Right: User Icon */}
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: avatarUrl }}
            className="w-10 h-10 rounded-full border border-gray-200"
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
