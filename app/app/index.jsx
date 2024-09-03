import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import CustomButton from "../components/CustomButton";
import { ScrollView, Image } from 'react-native';
import Logo from '../components/Logo';
import { images } from '../constants';

const index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View className="flex-1 items-center justify-center px-4">
          <Logo />
          <View className="relative mt-5">
            <Text className="text-4xl text-primary font-pbold text-center">
              Discover Endless Possibilities with{ ' ' }
              <Text className="text-red-600">MJ's</Text>
            </Text>
            <Image
              source={images.path} 
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-lg font-pregular mt-7 text-gray-600 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with MJ's
          </Text>
        </View>
      </ScrollView>
      <CustomButton
            title='Get Started'
            handlePress={() => router.push('/home')}
            containerStyles="w-full mt-7 mb-4 "
          />
    </SafeAreaView>
  );
}

export default index;
