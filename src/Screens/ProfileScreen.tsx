import React, { useState } from "react";
import { View, Text, Image, ScrollView, StatusBar, Pressable, Modal, FlatList, ActivityIndicator, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import BottomNav from "../components/Footer";
import { buildAvatarUrlPng, GLASSES_VARIANTS, AvatarConfig } from "../utils/editAvatar";
import api from "../Services/api";
import { addUser } from "../utils/userSlice";
import { IMAGE_BASE_URL } from "../utils/constants";


export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const [modalType, setModalType] = useState<"initial" | "avatar" | null>(null);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(
    user?.avatarConfig || {
      seed: "6969dddfbca277935d695367",
      glasses: ["variant01"],
      backgroundColor: "ffffff",
    }
  );
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const previewUrl = React.useMemo(() => {
    if (user?.profileType === "uploaded" && typeof user?.profileUrl === 'string') {
      return user?.profileUrl?.startsWith('http') 
        ? user?.profileUrl 
        : `${IMAGE_BASE_URL}${user?.profileUrl}`;
    }
    return buildAvatarUrlPng(avatarConfig);
  }, [user?.profileType, user?.profileUrl, avatarConfig]);

  const handleProfileImagePress = () => {
    setModalType("initial");
  };

  const handleUploadFromGallery = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setUploadProgress(0);
        const formData = new FormData();
        formData.append('profileImage', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'profile-image.jpg',
        } as any);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          }
        };

        const response = await api.post("/user/upload-profile-image", formData, config);

        if (response.data.success) {
          const imageUrl = response.data.data.profileUrl.startsWith('http')
            ? response.data.data.profileUrl
            : `${IMAGE_BASE_URL}${response.data.data.profileUrl}`;

          const updatedUser = {
            ...user,
            profileUrl: imageUrl,
            profileType: "uploaded",
            avatarConfig: user.avatarConfig
          };
          dispatch(addUser(updatedUser));
          setModalType(null);
          Alert.alert("Success", "Profile image uploaded successfully!");
        }
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert("Error", error?.response?.data?.message || "Failed to upload image");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleGlassesChange = (variant: string) => {
    setAvatarConfig((prev: AvatarConfig) => ({
      ...prev,
      glasses: [variant],
    }));
  };

  const handleSaveAvatar = async () => {
    try {
      setLoading(true);

      const response = await api.patch("/user/update-avatar", {
        avatarConfig,
      });

      if (response.data.success) {
        const profileUrl = typeof response.data.data.profileUrl === 'string'
          ? response.data.data.profileUrl
          : buildAvatarUrlPng(response.data.data.avatarConfig);

        const updatedUser = {
          ...user,
          avatarConfig: {
            seed: response.data.data.avatarConfig.seed,
            glasses: response.data.data.avatarConfig.glasses,
            backgroundColor: response.data.data.avatarConfig.backgroundColor,
          },
          profileUrl: profileUrl,
          profileType: "avatar"
        };
        dispatch(addUser(updatedUser));
        setModalType(null);
        Alert.alert("Success", "Avatar updated successfully!");
      }
    } catch (error: any) {
      console.error("Avatar update error:", error);
      Alert.alert("Error", "Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View className="flex-1 bg-black">
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="bg-zinc-900 border-b border-zinc-800 pb-6">
            <View className="h-32 w-full overflow-hidden">
              <Image
                source={{ uri: previewUrl }}
                style={{ width: "100%", height: "100%", opacity: 0.2 }}
                resizeMode="cover"
              />
            </View>

            <View className="px-5 -mt-12 flex-row items-end justify-between">
              <View className="flex-row items-end flex-1">
                <Pressable onPress={handleProfileImagePress} className="relative">
                  <Image
                    source={{ uri: previewUrl }}
                    className="w-24 h-24 rounded-3xl border-4 border-black bg-white"
                    style={{ width: 96, height: 96, borderRadius: 24 }}
                  />
                  <View className="absolute bottom-0 right-0 bg-white rounded-full p-2">
                    <Ionicons name="pencil" size={16} color="black" />
                  </View>
                </Pressable>

                <View className="ml-4 flex-1">
                  <Text className="text-white text-xl font-bold">
                    {user?.name || "Your profile"}
                  </Text>
                  <Text className="text-zinc-400 text-xs mt-1">
                    {user?.email}
                  </Text>
                  <Text className="text-zinc-500 text-xs mt-1">
                    Level: <Text className="text-white capitalize">{user?.fitnessLevel}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="px-5 mt-5 mb-4">
            <View className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
              <Text className="text-white font-semibold mb-1">Activity</Text>
              <Text className="text-zinc-500 text-xs mb-3">
                Track your workouts, streaks and more.
              </Text>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={modalType === "initial"}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalType(null)}
        >
          <View className="flex-1 bg-black/80 justify-end">
            <View className="bg-zinc-900 rounded-t-3xl border-t border-zinc-800 p-6">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg font-bold">Change Profile Picture</Text>
                <Pressable onPress={() => setModalType(null)}>
                  <Ionicons name="close" size={24} color="white" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => setModalType("avatar")}
                className="bg-white rounded-2xl py-4 px-5 mb-3 flex-row items-center"
              >
                <Ionicons name="image-outline" size={20} color="black" style={{ marginRight: 12 }} />
                <View>
                  <Text className="text-black font-bold">Choose from App</Text>
                  <Text className="text-zinc-600 text-xs">DiceBear avatars with glasses</Text>
                </View>
              </Pressable>

              <Pressable
                onPress={handleUploadFromGallery}
                disabled={loading}
                className={`rounded-2xl py-4 px-5 flex-row items-center ${loading ? 'bg-zinc-700' : 'bg-zinc-800'}`}
              >
                <Ionicons name="cloud-upload-outline" size={20} color="white" style={{ marginRight: 12 }} />
                <View className="flex-1">
                  <Text className="text-white font-bold">Upload from Gallery</Text>
                  <Text className="text-zinc-400 text-xs">Use your own photo</Text>
                </View>
                {loading && <ActivityIndicator color="white" />}
              </Pressable>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <View className="mt-4">
                  <View className="bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <View
                      style={{ width: `${uploadProgress}%` }}
                      className="bg-white h-full"
                    />
                  </View>
                  <Text className="text-zinc-400 text-xs mt-2">{uploadProgress}%</Text>
                </View>
              )}
            </View>
          </View>
        </Modal>

        <Modal
          visible={modalType === "avatar"}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalType(null)}
        >
          <View className="flex-1 bg-black/80">
            <View className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-h-[90%]">
              <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              
                <View className="flex-row justify-between items-center px-5 py-4 border-b border-zinc-800">
                  <Text className="text-white text-lg font-bold">Customize Avatar</Text>
                  <Pressable onPress={() => setModalType(null)}>
                    <Ionicons name="close" size={24} color="white" />
                  </Pressable>
                </View>

                <View className="items-center py-6">
                  <Image
                    source={{ uri: buildAvatarUrlPng(avatarConfig) }}
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                  />
                </View>

                <View className="px-5 mb-6">
                  <Text className="text-white text-sm font-semibold mb-3">Glasses Style ({GLASSES_VARIANTS.length} options)</Text>
                  <FlatList
                    data={GLASSES_VARIANTS}
                    numColumns={5}
                    scrollEnabled={false}
                    columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => handleGlassesChange(item)}
                        className={`flex-1 aspect-square rounded-lg items-center justify-center border-2 ${
                          avatarConfig.glasses[0] === item
                            ? "border-white bg-zinc-800"
                            : "border-zinc-700 bg-zinc-900"
                        }`}
                      >
                        <Image
                          source={{
                            uri: buildAvatarUrlPng({
                              seed: avatarConfig.seed,
                              glasses: [item],
                              backgroundColor: avatarConfig.backgroundColor,
                            }),
                          }}
                          style={{ width: 40, height: 40, borderRadius: 20 }}
                        />
                      </Pressable>
                    )}
                    keyExtractor={(item) => item}
                  />
                </View>

                <View className="px-5 gap-3 mb-4">
                  <Pressable
                    onPress={handleSaveAvatar}
                    disabled={loading}
                    className={`py-4 rounded-2xl items-center ${
                      loading ? "bg-zinc-700" : "bg-white"
                    }`}
                  >
                    <Text className="text-black font-bold text-base">
                      {loading ? "Saving..." : "Save Avatar"}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setModalType(null)}
                    className="py-4 rounded-2xl items-center border border-zinc-700"
                  >
                    <Text className="text-white font-semibold">Cancel</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <BottomNav />
      </View>
    </>
  );
}