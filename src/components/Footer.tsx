import React from "react";
import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const tabs = [
  { label: "Dashboard", route: "Dashboard" },
  { label: "Fitness", route: "Fitness" },
  { label: "Sports", route: "Sports" },
  { label: "Yoga", route: "Yoga" },
  { label: "Test", route: "Test" },
];

export default function BottomNav() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-row justify-around py-3 border-t border-zinc-800 bg-black">
      {tabs.map((tab) => (
        <Pressable
          key={tab.route}
          onPress={() => navigation.navigate(tab.route)}
        >
          <Text className="text-zinc-300 font-medium">
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
