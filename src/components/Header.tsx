import React from "react";
import { View, Pressable, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const PlayUpLogo = require("../../assets/playUp.jpg");

export default function Header() {
  const navigation = useNavigation<any>();
  const user = useSelector((state: any) => state.user);

  let avatarUrl = user?.profileImage;
  console.log("user image" , avatarUrl);


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
            source={{ uri: avatarUrl }}
            className="w-10 h-10 rounded-full border border-zinc-600"
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Pressable>
      </View>
      </SafeAreaView>
    </>
  );
}
