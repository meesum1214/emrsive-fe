import React, { useLayoutEffect, useState } from 'react'
import HomeSreen from '../../screens/HomeScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import CartScreen from '../../screens/CartScreen';
import Header from '../Header';
import { getCartItems } from '../../API/add';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { count } from '../../signals/preact';
import orderScreen from '../../screens/orderScreen';
import OrderDetailsScreen from '../../screens/OrderDetailsScreen';
// import Loader from '../Loader';
import ReviewsScreen from '../../screens/ReviewsScreen';
// import withLoader from '../withLoader';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    const [totalItems, setTotalItems] = useState(null)
    const [cartItems, setCartItems] = useState(null)
    // const [loaderState, setLoaderState] = useState(true)

    const apiCall = async () => {
        let userr = await AsyncStorage.getItem('emrsive-user')
        userr && getCartItems(JSON.parse(userr).id).then((res) => {
            setTotalItems(res.total)
            setCartItems(res.data)
        })
    }

    useLayoutEffect(() => {
        apiCall()
    }, [count.value])

    return (
        <>
            {/* <Loader state={loaderState} /> */}
            <Drawer.Navigator initialRouteName="Home"
                screenOptions={({ navigation }) => ({
                    header: () => <Header navigation={navigation} total={totalItems} />
                })}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="Home" component={HomeSreen} />
                <Drawer.Screen name="Cart" component={CartScreen} initialParams={{ cartItems }} />
                <Drawer.Screen name="Your Orders" component={orderScreen} />
                <Drawer.Screen name="Orders Details" component={OrderDetailsScreen} />
                <Drawer.Screen name="Our Reviews" component={ReviewsScreen} />
            </Drawer.Navigator>
        </>
    )
}

export default DrawerNavigation