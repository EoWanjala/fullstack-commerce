import { View, Text } from 'react-native'
import React from 'react'

const CategoryScreen = ({ route }) => {
    const { category } = route.params;
  return (
    <View>
      <Text>{category.title}</Text>
    </View>
  )
}

export default CategoryScreen