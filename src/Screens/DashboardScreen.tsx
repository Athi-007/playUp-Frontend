import React from "react";
import { View, Text, Pressable } from "react-native";
import AppHeader from "../components/Header";
import BottomNav from "../components/Footer";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-black">
      <AppHeader />

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold mb-2 text-white">
          Ready to move?
        </Text>
        <Text className="text-zinc-400 mb-6 text-center">
          Start a new activity and keep your streak going.
        </Text>

        <Pressable className="bg-white px-10 py-4 rounded-2xl">
          <Text className="text-black font-bold text-lg">
            Start Activity
          </Text>
        </Pressable>
      </View>

      <BottomNav />
    </View>
  );
}
