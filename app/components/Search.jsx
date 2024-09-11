import { View, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { icons } from "../constants";

const Search = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    if (search.trim()) {
      router.replace(`/search/${search}`);
      Keyboard.dismiss(); // Dismiss the keyboard
    } else {
      alert('Please enter a search term');
    }
  };

  return (
    <View className='flex items-center justify-center pt-4 mb-4 mx-2'>
      <View className='w-full h-16 bg-gray-50 border-2 border-gray-300 rounded-2xl focus:border-red-400 flex flex-row items-center'>
        <Image
          source={icons.search}
          className='w-6 h-6 ml-2'
          resizeMethod='contain'
          tintColor='#CDCDE0'
        />
        <TextInput
          placeholder="Search for Products"
          className='ml-3 text-lg'
          placeholderTextColor='#7B7B8B'
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSubmit}
          returnKeyType="search" 
        />
      </View>
    </View>
  );
};

export default Search;
