import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCartItem, emptyCart, getCartItems } from '../../API/add';
import { count } from '../../signals/preact';

const CartScreen = ({ navigation, route }) => {

    // const { cartItems } = route.params
    const [cartItems, setCartItems] = useState(null)
    const [userid, setUserid] = useState(null)
    const [state, setState] = useState(0)
    const [subTotal, setSubTotal] = useState(null)

    const getCart = async () => {
        let userr = await AsyncStorage.getItem('emrsive-user')
        setUserid(JSON.parse(userr).id)

        // console.log("========= get Cart Items Called ========")
        getCartItems(JSON.parse(userr).id).then((res) => {
            setCartItems(res.data)
            // console.log("Cart Items >>>> ", res.data)
            setSubTotal(res.data.reduce((a, b) => a + (b['Plan']['price'] * b['quantity']), 0))
        })
    }

    useEffect(() => {
        getCart();
    }, [count.value, state])

    const onRemove = (id) => {
        deleteCartItem(id).then((res) => {
            // console.log("ERROR >>>>>>>>>>>>>> ", res)
            Alert.alert(res.message)
            count.value = count.value + 1
            setState(state + 1)
        }).catch((err) => {
            console.log(err)
            Alert.alert(err)
        })
    }

    const emptyFullCart = () => {
        emptyCart(userid).then((res) => {
            Alert.alert("Success!", res.message)
            console.log("Cart Emty >> ", res)
            setState(state + 1)
            count.value = count.value + 1
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
            Alert.alert(err)
        })
    }

    const handleGoToMultipleCheckout = () => {
        navigation.navigate('MultipleCheckout', { cartItems, subTotal })
    }

    return (
        <View className="flex-1">

            <ScrollView>

                <View className="p-3">
                    <Text className="text-xl font-bold">DELIVERY TIME</Text>
                    <View className="flex-row items-center mt-3">
                        <Image source={require('../../assets/clock.png')} className="w-10 h-10 mr-3" />
                        <Text className="text-lg text-gray-600">ASAP</Text>
                    </View>
                </View>

                <Divider my={2} />

                {
                    cartItems?.length > 0 ?
                        <View>
                            <View className="p-3">
                                <Text className="text-xl font-bold mb-6">ITEMS</Text>
                                {
                                    cartItems?.map((item, index) => (
                                        <View key={index} className="w-full">
                                            <View className="flex-row justify-between mb-2">
                                                <Text className="text-lg text-gray-600 font-bold">{item.Plan.name} Shopify Plan</Text>
                                                <TouchableOpacity onPress={() => onRemove(item.id)}>
                                                    <Image source={require('../../assets/minus.png')} className="w-6 h-6" />
                                                </TouchableOpacity>
                                            </View>
                                            <View className="w-full flex-row justify-between items-center">
                                                <Text className="text-lg text-gray-600">Quantity: {item.quantity}x</Text>
                                                <Text className="text-lg text-green-700">${item.quantity * item.Plan.price}</Text>
                                            </View>
                                            <Divider my={3} />
                                        </View>
                                    ))
                                }
                            </View>

                            <View className="p-3 flex-row justify-between items-center">
                                <Text className="text-xl font-bold mb-6">Subtotal</Text>
                                <Text className="text-xl font-bold mb-6">${subTotal}</Text>
                            </View>

                            <View className="p-3 items-end mb-16">
                                <TouchableOpacity className="bg-tertiary w-32 rounded-xl h-16 justify-center items-center"
                                    onPress={emptyFullCart}
                                >
                                    <Text className="text-white text-xl font-bold">Empty Cart</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        :
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-xl font-bold">Cart is Empty</Text>
                        </View>
                }

            </ScrollView>

            <TouchableOpacity className="bg-tertiary absolute bottom-0 w-full h-16 justify-center items-center"
                onPress={handleGoToMultipleCheckout}
            >
                <Text className="text-white text-2xl font-bold">Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartScreen