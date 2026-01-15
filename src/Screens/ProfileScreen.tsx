// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { buildAvatarUrl, convertAvatarUrlToPng, parseAvatarUrl } from "../utils/avatar";
import BottomNav from "../components/Footer";

export default function ProfileScreen() {
  const user = useSelector((state: any) => state.user);

  // Parse existing profileImage URL or use defaults
  const parsedParams = parseAvatarUrl(user?.profileImage);

  // Build avatar URL from user's saved settings
  const avatarUrl = convertAvatarUrlToPng(
    buildAvatarUrl({
      seed: user?._id?.toString() || "default",
      glasses: parsedParams.glasses,
      backgroundColor: parsedParams.backgroundColor,
    })
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      <View className="flex-1 bg-black">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Header banner with avatar as background accent */}
          <View className="bg-zinc-900 border-b border-zinc-800 pb-6">
            <View className="h-32 w-full overflow-hidden">
              <Image
                key={`bg-${avatarUrl}`}
                source={{ uri: avatarUrl }}
                style={{ width: "100%", height: "100%", opacity: 0.2 }}
                resizeMode="cover"
              />
            </View>

            <View className="px-5 -mt-12 flex-row items-end">
              <Image
                key={`avatar-${avatarUrl}`}
                source={{ uri: avatarUrl }}
                className="w-24 h-24 rounded-3xl border-4 border-black bg-white"
                style={{ backgroundColor: 'white' }}
              />
              <View className="ml-4 flex-1">
                <Text className="text-white text-xl font-bold">
                  {user?.name || "Your profile"}
                </Text>
                <Text className="text-zinc-400 text-xs mt-1">
                  {user?.email || "Update your daily vibe"}
                </Text>
              </View>
            </View>
          </View>

          {/* User activity section */}
          <View className="px-5 mt-5 mb-4">
            <View className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
              <Text className="text-white font-semibold mb-1">Activity</Text>
              <Text className="text-zinc-500 text-xs mb-3">
                Track your workouts, streaks and more.
              </Text>
              <View className="mt-2 rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-700 px-4 py-6 items-center">
                <Text className="text-zinc-400 text-xs mb-1">Under development</Text>
                <Text className="text-zinc-500 text-[11px] text-center">
                  We're building a rich activity timeline for your fitness journey.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </>
  );
}
