import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('beginner'); // Added missing state
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
      setError('');
      
      console.log("Requesting:", `${BASE_URL}/auth/login`);
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      }, {
        withCredentials: true
      });

      dispatch(addUser(response?.data?.data));
      navigation.replace('Dashboard');
    } catch (err: any) {
      
      console.log("Login Error:", err.response?.data || err.message);
      setError(err?.response?.data?.message || 'Login failed');
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
      setError('');


      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        name,
        age: Number(age),
        fitnessLevel,
        email,
        password,
      });

      dispatch(addUser(response.data.data));
      navigation.replace('Dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="flex-1 justify-center px-6 py-10">
        <Text className="text-3xl font-bold text-center mb-2">
          {isLoginForm ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text className="text-gray-500 text-center mb-8">
          {isLoginForm ? 'Sign in to continue' : 'Fill in your details to get started'}
        </Text>

        {!isLoginForm && (
          <>
            <TextInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:border-black"
            />
            <View className="flex-row gap-x-2">
              <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                className="border border-gray-300 rounded-lg px-4 py-3 mb-3 flex-1"
              />
              <TextInput
                placeholder="Fitness Level"
                value={fitnessLevel}
                onChangeText={setFitnessLevel}
                className="border border-gray-300 rounded-lg px-4 py-3 mb-3 flex-1"
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
          className="border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:border-black"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-3 mb-2 focus:border-black"
        />

        {!!error && (
          <Text className="text-red-500 text-sm mb-4 font-medium">
            ⚠️ {error}
          </Text>
        )}

        <Pressable
          onPress={isLoginForm ? handleLogin : handleSignup}
          disabled={loading}
          className={`py-4 rounded-lg items-center mb-6 ${loading ? 'bg-gray-400' : 'bg-black'}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">
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
          <Text className="text-gray-600">
            {isLoginForm ? (
              <Text>New user? <Text className="text-black font-bold">Sign up</Text></Text>
            ) : (
              <Text>Already have an account? <Text className="text-black font-bold">Login</Text></Text>
            )}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}