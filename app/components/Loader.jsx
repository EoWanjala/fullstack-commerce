import { View, Text, ActivityIndicator, Dimensions, Platform } from 'react-native'
import React from 'react'

const Loader = ({ isLoading }) => {
  return (
    <View className="absolute flex justify-center items-center w-full h-full bg-primary/60 z-10"
    style={{
        height:screenHeight,
    }}>
      <ActivityIndicator animating={ isLoading } size={osName === "ios" ? "large" : 50} color="#fff" />
    </View>
  )
}

export default Loader