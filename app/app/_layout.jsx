import { StyleSheet, Text, View, Image } from 'react-native';
import { SplashScreen, Tabs, Stack } from 'expo-router';
import { useFonts } from "expo-font";
import { useEffect, useState } from 'react';
import initializeStore from '../store';
import { Provider } from 'react-redux';
import { Drawer } from "expo-router/drawer"
import { listCategories } from '../actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import TabsLayout from './(tabs)/_layout';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [store, setStore] = useState(null);
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        const setupStore = async () => {
            const initializedStore = await initializeStore();
            setStore(initializedStore);
        };

        setupStore();
    }, []);

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!store || !fontsLoaded) {
        return null; // Avoid conditional hooks rendering
    }

    return (
        <Provider store={store}>
            <ReduxApp />
        </Provider>
    );
}    

const ReduxApp = () => {
    const dispatch = useDispatch()
    const categoryListReducer = useSelector((state) => state.categoryListReducer);
    const { categories, loading, error } = categoryListReducer;

    useEffect(() => {
        dispatch(listCategories());
      }, [dispatch]);

      return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      )
}

export default RootLayout;
