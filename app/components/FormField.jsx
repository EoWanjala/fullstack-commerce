import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-800 font-pmedium">{title}</Text>
      <View className="w-full h-16 bg-white rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center shadow-md">
        <TextInput
        className="flex-1 text-gray-800 font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#161622"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        { ...props }
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {title === "Confirm Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField