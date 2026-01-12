// screens/ProfileScreen.tsx
import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { buildAvatarUrl } from "../utils/avatar";
import { BASE_URL } from "../utils/constants";

export default function ProfileScreen() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [glasses, setGlasses] = useState(["variant01"]);
  const [bg, setBg] = useState("ffffff");

  const avatarUrl = buildAvatarUrl({
    seed: user._id,
    glasses,
    backgroundColor: bg,
  });

  const saveProfile = async () => {
    const res = await axios.patch(
      `${BASE_URL}/profile/edit`,
      { profileImage: avatarUrl },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Image
        source={{ uri: avatarUrl }}
        style={{ width: 120, height: 120, alignSelf: "center" }}
      />

      <Text className="text-xl font-bold text-center mt-4">
        {user.name}
      </Text>

      <View className="flex-row justify-center gap-3 mt-6">
        {["variant01", "variant02", "variant03"].map((g) => (
          <Pressable
            key={g}
            onPress={() => setGlasses([g])}
            className="px-4 py-2 border"
          >
            <Text>{g}</Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row justify-center gap-3 mt-4">
        {["ffffff", "000000", "e5e7eb"].map((c) => (
          <Pressable
            key={c}
            onPress={() => setBg(c)}
            className="w-8 h-8 border"
            style={{ backgroundColor: `#${c}` }}
          />
        ))}
      </View>

      <Pressable
        onPress={saveProfile}
        className="bg-black py-3 rounded-lg mt-8"
      >
        <Text className="text-white text-center font-bold">
          Save Profile
        </Text>
      </Pressable>
    </View>
  );
}
