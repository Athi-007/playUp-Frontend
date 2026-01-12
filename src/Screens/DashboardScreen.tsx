import React from "react";
import { View, Text, Pressable } from "react-native";
import AppHeader from "../components/Header";
import BottomNav from "../components/Footer";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-white">
      
      <AppHeader />

      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-6">
          Ready to move?
        </Text>

        <Pressable className="bg-black px-10 py-4 rounded-lg">
          <Text className="text-white font-bold text-lg">
            Start Activity
          </Text>
        </Pressable>
      </View>

      <BottomNav />
    </View>
  );
}
