import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { login } from "../../actions/userActions";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from 'react-redux';
import MyAccount from '../../components/MyAccount';

const SignIn = () => {
  const dispatch = useDispatch();
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { loading, error, userInfo } = userLoginReducer;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    dispatch(login(username, password));
  };

  if (!userInfo) {
    return (
      <SafeAreaView className='h-full bg-white'>
        <ScrollView>
          <View className='w-full flex justify-center h-full px-4 my-6'
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}>
            <Image 
              source={images.apple}
              resizeMode='contain'
              className='w-[200px] h-[200px]' />
            <Text className='text-2xl font-psemibold mt-10'>Log in to Mj's</Text>
            <FormField 
              title='Username'
              value={username}
              handleChangeText={(text) => setUsername(text)} 
            />
            <FormField 
              title='Password'
              value={password}
              handleChangeText={(text) => setPassword(text)} 
              secureTextEntry
            />
            
            {error && <Text className='text-red-500'>{error}</Text>}
            
            <CustomButton 
              title='Sign In'
              onPress={submitHandler} 
              containerStyles='mt-7'
              isLoading={loading}
            />
            
            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-700 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/signup"
                className="text-lg font-psemibold text-secondary"
              >
                <Text>Sign Up</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  return (
    <MyAccount/>
  )
}

export default SignIn;
