import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { register } from '../../actions/userActions';
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { images } from "../../constants";

const signup = () => {
    const dispatch = useDispatch()
    const userRegisterReducer = useSelector((state)=>state.userRegisterReducer)
    const { loading, error, userInfo } = userRegisterReducer;

    useEffect(() =>{
        if(userInfo){
            router.replace('/home')
        }
    }, [router, userInfo])

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [place, setPlace] = useState("")
    const [zipcode, setZipcode] = useState("")

    const submitHandler = (e) => {
        if (password !== confirmPassword) {
          setMessage("Passwords do not match!");
        } else {
          dispatch(register(username, firstName, lastName, email, password, confirmPassword, address, phone, place, zipcode));
        }
      };
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
          className='w-[150px] h-[150px]' />
        <Text className='text-2xl font-psemibold mt-10'>Log in to Mj's</Text>
        <FormField 
          title='Username'
          value={username}
          handleChangeText={(text) => setUsername(text)} 
        />
        <FormField 
          title='First Name'
          value={firstName}
          handleChangeText={(text) => setFirstName(text)} 
        />
        <FormField 
          title='Last Name'
          value={lastName}
          handleChangeText={(text) => setLastName(text)} 
        />
        <FormField 
          title='Email'
          value={email}
          handleChangeText={(text) => setEmail(text)} 
        />
        <FormField 
          title='Address'
          value={address}
          handleChangeText={(text) => setAddress(text)} 
        />
        <FormField 
          title='Place'
          value={place}
          handleChangeText={(text) => setPlace(text)} 
        />
        <FormField 
          title='Phone Number'
          value={phone}
          handleChangeText={(text) => setPhone(text)} 
        />

        <FormField 
          title='Zip Code'
          value={zipcode}
          handleChangeText={(text) => setZipcode(text)} 
        />
        <FormField 
            title='Password'
            value={password}
            handleChangeText={(text) => setPassword(text)} 
            secureTextEntry
        />
        <FormField 
            title='Confirm Password'
            value={confirmPassword}
            handleChangeText={(text) => setConfirmPassword(text)} 
            secureTextEntry
        />
        
        {error && <Text className="bg-red-500 text-white p-3 rounded mb-5 text-center">{error}</Text>}
        {message && <Text className="bg-red-500 text-white p-3 rounded mb-5 text-center">{message}</Text>}
        
        <CustomButton 
          title='Sign In'
          onPress={submitHandler} 
          containerStyles='mt-7'
          isLoading={loading}
        />
        
        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-700 font-pregular">
            Already have an account?
          </Text>
          <Link
            href="/login"
            className="text-lg font-psemibold text-secondary"
          >
            <Text>Sign In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default signup