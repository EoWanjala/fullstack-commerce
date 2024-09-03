import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router'
import {icons} from '../../../constants'


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

const TabsLayout = () => {
  return (
    <>
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
                // getTabsOptions={(route) => {
                //     if (route.name === "index") {
                //         return {
                //             tabBarButton: () => null,  // Hide the tab for search/[query]
                //         };
                //     }
                //     return {};
                // }}
            >
                <Tabs.Screen name='home' options={{ headerShown: false,
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
            
    </>
  )
}

export default TabsLayout