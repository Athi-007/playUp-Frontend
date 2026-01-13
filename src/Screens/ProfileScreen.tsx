// screens/ProfileScreen.tsx
import React, { useState } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { buildAvatarUrl } from "../utils/avatar";
import api from "../Services/api";

export default function ProfileScreen() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [glasses, setGlasses] = useState<string[]>(["variant01"]);
  const [bg, setBg] = useState("ffffff");

  const avatarUrl = buildAvatarUrl({
    seed: user?._id || "default",
    glasses,
    backgroundColor: bg,
  });

  const saveProfile = async () => {
    const res = await api.patch("/profile/editProfile", {
      profileImage: avatarUrl,
    });

    dispatch(addUser(res.data.data));
  };

  return (
    <ScrollView className="flex-1 bg-black" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header banner with avatar as background accent */}
      <View className="bg-zinc-900 border-b border-zinc-800 pb-6">
        <View className="h-32 w-full overflow-hidden">
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: "100%", height: "100%", opacity: 0.2 }}
            resizeMode="cover"
          />
        </View>

        <View className="px-5 -mt-12 flex-row items-end">
          <Image
            source={{ uri: avatarUrl }}
            className="w-24 h-24 rounded-3xl border-4 border-black"
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

      {/* View profile style selection card */}
      <View className="px-5 mt-5">
        <View className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <Text className="text-zinc-300 text-sm font-semibold mb-2">
            Choose your avatar style
          </Text>
          <Text className="text-zinc-500 text-xs mb-4">
            Pick glasses and background to customise your Dicebear avatar. Changes update the preview and header background instantly.
          </Text>

          <Text className="text-zinc-400 text-xs mb-2">Glasses</Text>
          <View className="flex-row gap-3 mb-4">
            {["variant01", "variant02", "variant03"].map((g) => {
              const active = glasses.includes(g);
              return (
                <Pressable
                  key={g}
                  onPress={() => setGlasses([g])}
                  className={`px-4 py-2 rounded-2xl border ${
                    active ? "border-white bg-zinc-800" : "border-zinc-700 bg-zinc-900"
                  }`}
                >
                  <Text className={active ? "text-white text-xs" : "text-zinc-300 text-xs"}>
                    {g}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-zinc-400 text-xs mb-2">Background</Text>
          <View className="flex-row gap-3 mb-4">
            {["ffffff", "000000", "e5e7eb"].map((c) => {
              const active = bg === c;
              return (
                <Pressable
                  key={c}
                  onPress={() => setBg(c)}
                  className={`w-8 h-8 rounded-full border ${
                    active ? "border-white" : "border-zinc-700"
                  }`}
                  style={{ backgroundColor: `#${c}` }}
                />
              );
            })}
          </View>

          <Pressable
            onPress={saveProfile}
            className="bg-white py-3 rounded-2xl mt-2"
          >
            <Text className="text-black text-center font-bold text-sm">
              Save profile style
            </Text>
          </Pressable>
        </View>
      </View>

      {/* User activity section like daily.dev card */}
      <View className="px-5 mt-5">
        <View className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
          <Text className="text-white font-semibold mb-1">Activity</Text>
          <Text className="text-zinc-500 text-xs mb-3">
            Track your workouts, streaks and more.
          </Text>
          <View className="mt-2 rounded-2xl bg-zinc-950/60 border border-dashed border-zinc-700 px-4 py-6 items-center">
            <Text className="text-zinc-400 text-xs mb-1">Under development</Text>
            <Text className="text-zinc-500 text-[11px] text-center">
              We’re building a rich activity timeline for your fitness journey.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
