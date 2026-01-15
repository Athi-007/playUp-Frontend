import React from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const tabs = [
  { label: "Home", route: "Dashboard", icon: "home-outline" as const },
  { label: "Fitness", route: "Fitness", icon: "fitness-outline" as const },
  { label: "Sports", route: "Sports", icon: "football-outline" as const },
  { label: "Yoga", route: "Yoga", icon: "moon-outline" as const },
  { label: "Test", route: "Test", icon: "flask-outline" as const },
];

export default function BottomNav() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="bg-black" edges={['bottom']}>
      <View className="flex-row justify-around items-center py-3 px-2 border-t border-zinc-800">
        {tabs.map((tab) => (
          <Pressable
            key={tab.route}
            onPress={() => navigation.navigate(tab.route)}
            className="items-center px-3"
          >
            <Ionicons name={tab.icon} size={22} color="#a1a1aa" />
            <Text className="text-zinc-400 text-[10px] mt-1">
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
