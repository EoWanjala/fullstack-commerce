import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'


const Logo = () => {
  return (
    <View className = 'pt-20 ml-4'>
      <Image
      source={icons.logo}
      className='w-10 h-10 rounded-full'/>
      {/* <Image
      source={icons.logo1}
      className='w-10 h-10 '/> */}
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({})