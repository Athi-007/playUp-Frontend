import React, { useState } from "react";
import { View, Pressable, Image, SafeAreaView, Modal, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { buildAvatarUrl } from "../utils/avatar";

// Import local asset
const PlayUpLogo = require("../../assets/playUp.jpg");

export default function Header() {
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use backend-provided dicebear URL when available (from signup/login)
  const fallbackAvatarUrl = buildAvatarUrl({
    seed: user?._id || "default",
    glasses: ["variant01"],
    backgroundColor: "ffffff",
  });
  const avatarUrl = user?.profileImage || fallbackAvatarUrl;

  return (
    <SafeAreaView className="bg-black pt-2">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-zinc-800">
        {/* Left: App Icon */}
        <Image
          source={PlayUpLogo}
          className="w-10 h-10 rounded-xl"
          style={{ width: 40, height: 40, borderRadius: 12 }}
          resizeMode="contain"
        />

        {/* Right: User Icon */}
        <Pressable onPress={() => setIsMenuOpen(true)}>
          <Image
            source={{ uri: avatarUrl }}
            className="w-10 h-10 rounded-full border border-zinc-600"
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Pressable>
      </View>

      {/* Profile actions sheet (transfer list style) */}
      <Modal
        transparent
        visible={isMenuOpen}
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setIsMenuOpen(false)}
        >
          <Pressable
            className="bg-zinc-900 rounded-t-3xl px-5 pt-4 pb-8 border-t border-zinc-800"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: avatarUrl }}
                className="w-10 h-10 rounded-full border border-zinc-700 mr-3"
              />
              <View>
                <Text className="text-white font-semibold">
                  {user?.name || "Guest"}
                </Text>
                <Text className="text-zinc-400 text-xs">
                  {user?.email || "Not signed in"}
                </Text>
              </View>
            </View>

            <Pressable
              className="flex-row items-center justify-between py-3 px-3 rounded-2xl bg-zinc-800 mb-2"
              onPress={() => {
                setIsMenuOpen(false);
                navigation.navigate("Profile");
              }}
            >
              <Text className="text-white font-medium">View profile</Text>
              <Text className="text-zinc-400">{">"}</Text>
            </Pressable>

            {/* Placeholder for future items in transfer list */}
            <View className="mt-3">
              <Text className="text-zinc-500 text-xs">
                More actions coming soon
              </Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
