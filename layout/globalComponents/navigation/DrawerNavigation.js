import React, { useLayoutEffect, useState } from 'react'
import HomeSreen from '../../screens/HomeSreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import CartScreen from '../../screens/CartScreen';
// import CheckoutScreen from '../../screens/CheckoutScreen';
import Header from '../Header';
import { getCartItems } from '../../API/add';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { count } from '../../signals/preact';
import orderScreen from '../../screens/orderScreen';
// import MultipleCheckoutScreen from '../../screens/MultipleCheckoutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    const [totalItems, setTotalItems] = useState(null)
    const [cartItems, setCartItems] = useState(null)

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
        <Drawer.Navigator initialRouteName="Home"
            screenOptions={({ navigation }) => ({
                header: () => <Header navigation={navigation} total={totalItems} />
            })}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeSreen} />
            <Drawer.Screen name="Cart" component={CartScreen} initialParams={{ cartItems }} />
            <Drawer.Screen name="Your Orders" component={orderScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation