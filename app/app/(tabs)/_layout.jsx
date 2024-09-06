import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router'
import {icons} from '../../constants'
import ProductDetailScreen from './product/[category_slug]/[slug]'

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
                      borderTopWidth: 3,
                      borderTopColor: '#232533',
                  },
              }}
          >
              <Tabs.Screen name='home' options={{ headerShown: false,
                  title: 'Home',
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
              <Tabs.Screen name='cart' options={{ headerShown: false,
                  title:'Cart',
                  tabBarIcon: ({ color, focused }) => (
                      <TabIcon
                      icon={icons.cart}
                      color={color}
                      name='Cart'
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
              
              <Tabs.Screen
                name="product/[category_slug]/[slug]"
                options={{
                tabBarButton: (props) => null, 
                headerShown: false,
                }}
            />
              
          </Tabs>
          
      </>
    );
  };
  

export default TabsLayout