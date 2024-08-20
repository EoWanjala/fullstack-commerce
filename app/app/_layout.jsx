import { StyleSheet, Text, View, Image } from 'react-native';
import { SplashScreen, Tabs } from 'expo-router';
import { useFonts } from "expo-font";
import { useEffect, useState } from 'react';
import initializeStore from '../store';
import { Provider } from 'react-redux';
import { icons } from "../constants"
import { router } from 'expo-router';
import Search from '../components/Search';
import Logo from '../components/Logo';


SplashScreen.preventAutoHideAsync();

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image
            source={icon}
            resizeMethod='contain'
            tintColor={color}
            className = 'w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs`} style={{ color:color }}>{name}</Text>
        </View>
    )
}

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
            <Logo/>
            <Search />
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFC107",
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#2C2C2C',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                    }
                }}
                getTabsOptions={(route) => {
                    if (route.name === "search/[query]") {
                        return {
                            tabBarButton: () => null,  // Hide the tab for search/[query]
                        };
                    }
                    return {};
                }}
            >
                <Tabs.Screen name='index' options={{ headerShown: false,
                    title:'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.home}
                        color={color}
                        name='Home'
                        focused={focused}/>
                    )
                 }} />
                <Tabs.Screen name='allproducts' options={{ headerShown: false,
                    title:'All Products',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.bookmark}
                        color={color}
                        name='All Products'
                        focused={focused}/>
                    )
                 }} />
                 <Tabs.Screen name='login' options={{ headerShown: false,
                    title:'Sign In',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.profile}
                        color={color}
                        name='Sign In'
                        focused={focused}/>
                    )
                 }} />
                 <Tabs.Screen name='contact' options={{ headerShown: false,
                    title:'Contact Us',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                        icon={icons.plus}
                        color={color}
                        name='Contact Us'
                        focused={focused}/>
                    )
                 }} />
            </Tabs>
        </Provider>
    );
};

export default RootLayout;
