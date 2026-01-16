import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Services/api";


export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data.data;

      console.log("user:" , user);

      await AsyncStorage.setItem("token", token);
      dispatch(addUser(user));

      navigation.replace("Dashboard");
    } catch (err: any) {
      console.log("Login Error:", err.response?.data || err.message);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  const handleSignup = async () => {
    if (!name || !age || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/signup", {
        name,
        age: Number(age),
        fitnessLevel,
        email,
        password,
      });

      const { token, user } = response.data.data;

      await AsyncStorage.setItem("token", token);
      dispatch(addUser(user));

      navigation.replace("Dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-black">
      <View className="flex-1 justify-center px-6 py-10">
        <View className="bg-zinc-900 rounded-3xl px-6 py-8 shadow-lg border border-zinc-800">
        <Text className="text-3xl font-bold text-center mb-2 text-white">
          {isLoginForm ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text className="text-zinc-400 text-center mb-8">
          {isLoginForm ? 'Sign in to continue' : 'Fill in your details to get started'}
        </Text>

        {!isLoginForm && (
          <>
            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#9CA3AF"
              className="border border-zinc-700 bg-zinc-800 text-white rounded-xl px-4 py-3 mb-3"
            />
            <View className="flex-row gap-x-2">
              <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                className="border border-zinc-700 bg-zinc-800 text-white rounded-xl px-4 py-3 mb-3 flex-1"
              />
              <TextInput
                placeholder="Fitness Level"
                value={fitnessLevel}
                onChangeText={setFitnessLevel}
                placeholderTextColor="#9CA3AF"
                className="border border-zinc-700 bg-zinc-800 text-white rounded-xl px-4 py-3 mb-3 flex-1"
              />
            </View>
          </>
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#9CA3AF"
          className="border border-zinc-700 bg-zinc-800 text-white rounded-xl px-4 py-3 mb-3"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#9CA3AF"
          className="border border-zinc-700 bg-zinc-800 text-white rounded-xl px-4 py-3 mb-2"
        />

        {!!error && (
          <Text className="text-red-400 text-sm mb-4 font-medium">
            ⚠️ {error}
          </Text>
        )}

        <Pressable
          onPress={isLoginForm ? handleLogin : handleSignup}
          disabled={loading}
          className={`py-4 rounded-2xl items-center mb-6 ${
            loading ? 'bg-zinc-700' : 'bg-white'
          }`}
        >
          {loading ? (
            <ActivityIndicator color={loading ? '#E5E7EB' : '#000000'} />
          ) : (
            <Text className="text-black font-bold text-lg">
              {isLoginForm ? 'Login' : 'Sign Up'}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setIsLoginForm(!isLoginForm);
            setError('');
          }}
          className="items-center"
        >
          <Text className="text-zinc-400">
            {isLoginForm ? (
              <Text>
                New user? <Text className="text-white font-bold">Sign up</Text>
              </Text>
            ) : (
              <Text>
                Already have an account?{" "}
                <Text className="text-white font-bold">Login</Text>
              </Text>
            )}
          </Text>
        </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}