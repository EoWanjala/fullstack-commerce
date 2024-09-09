import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router'
import {icons} from '../../constants'
import { useSelector } from 'react-redux'



const TabIcon = ({ icon, color, name, focused, cartItemsCount }) => {
    return (
      <View className='items-center justify-center gap-2'>
        <Image
          source={icon}
          resizeMethod='contain'
          tintColor={color}
          className='w-6 h-6'
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
          {name}
        </Text>
        {name === 'Cart' && cartItemsCount > 0 && (
          <View className='absolute top-0 -right-2 bg-red-600 rounded-full w-4 h-4 items-center justify-center'>
            <Text className='text-white text-xs'>{cartItemsCount}</Text>
          </View>
        )}
      </View>
    );
  };
  
  const TabsLayout = () => {
    const cartReducer = useSelector((state) => state.cartReducer);
    const { cartItems } = cartReducer;
   
    const cartItemsCount = Array.isArray(cartItems) ? cartItems.length : 0;

    const userLoginReducer = useSelector((state) => state.userLoginReducer)
    const { loading, error, userInfo } = userLoginReducer
    console.log("User Info", userInfo)
  
    const loginTabTitle = userInfo && userInfo.username ? userInfo.username : "Sign In";
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
          <Tabs.Screen name='home' options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name='Home'
                focused={focused}
              />
            )
          }} />
          <Tabs.Screen name='allproducts' options={{
            headerShown: false,
            title: 'All Products',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name='All Products'
                focused={focused}
              />
            )
          }} />
          <Tabs.Screen name='cart' options={{
            headerShown: false,
            title: 'Cart',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.cart}
                color={color}
                name='Cart'
                focused={focused}
                cartItemsCount={cartItemsCount}  // Pass the count here
              />
            )
          }} />
          <Tabs.Screen name='login' options={{
            headerShown: false,
            title: 'Sign In',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name={loginTabTitle}
                focused={focused}
              />
            )
          }} />
          <Tabs.Screen
            name="product/[category_slug]/[slug]"
            options={{
              tabBarButton: (props) => null,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="signup"
            options={{
              tabBarButton: (props) => null,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="checkout"
            options={{
              tabBarButton: (props) => null,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="verify-payment/[ref]"
            options={{
              tabBarButton: (props) => null,
              headerShown: false,
            }}
          />
        </Tabs>
      </>
    );
  };
  
  export default TabsLayout;
  