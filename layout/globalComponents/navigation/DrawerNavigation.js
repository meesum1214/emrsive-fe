import React, { useLayoutEffect, useState } from 'react'
import HomeSreen from '../../screens/HomeSreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import Header from '../Header';
import { getCartItems } from '../../API/add';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cartlength, count } from '../../signals/preact';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    const [cartItems, setCartItems] = useState(null)
    const [totalItems, setTotalItems] = useState(null)

    useLayoutEffect(() => {
        const apiCall = async () => {
            let userr = await AsyncStorage.getItem('emrsive-user')
            getCartItems(JSON.parse(userr).id).then((res) => {
                console.log("Cart items >> ", typeof res.data)
                setCartItems(res.data)
                setTotalItems(res.total)
            })
        }
        apiCall()
    }, [count.value])

    return (
        <Drawer.Navigator initialRouteName='Home'
            screenOptions={({ navigation }) => ({
                header: () => <Header navigation={navigation} total={totalItems} />
            })}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeSreen} />
            <Drawer.Screen name="Cart" component={CartScreen} initialParams={{ cartItems }} />
            <Drawer.Screen name="Checkout" component={CheckoutScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation