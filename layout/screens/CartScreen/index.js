import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Divider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCartItem, emptyCart } from '../../API/add';

const CartScreen = ({ navigation, route }) => {

    const { cartItems } = route.params;

    const [quantity, setQuantity] = useState(1)
    const [items, setItems] = useState([])

    const [userid, setUserid] = useState(null)
    const [state, setState] = useState(0)

    useLayoutEffect(() => {
        const getCart = async () => {

            let userr = await AsyncStorage.getItem('emrsive-user')
            setUserid(JSON.parse(userr).id)
        }

        getCart();
    }, [state])

    const onRemove = (id) => {
        deleteCartItem(id).then((res) => {
            // console.log("ERROR >>>>>>>>>>>>>> ", res)
            Alert.alert(res.message)
            setState(state + 1)
        }).catch((err) => {
            console.log(err)
            Alert.alert(err)
        })
    }

    const emptyFullCart = () => {
        emptyCart(userid).then((res) => {
            Alert.alert(res.message)
            console.log(res)
            setState(state + 1)
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
            Alert.alert(err)
        })
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

                <View className="p-3">
                    <Text className="text-xl font-bold mb-6">ITEMS</Text>
                    {
                        cartItems?.map((item, index) => (
                            <View key={index} className="w-full">
                                <Text className="text-lg text-gray-600 font-bold">{item.Plan.name} Shopify Plan</Text>
                                <View className="w-full flex-row justify-between items-center">
                                    <View className="flex-row items-center">
                                        <TouchableOpacity onPress={() => onRemove(item.id)}>
                                            <Image source={require('../../assets/minus.png')} className="w-6 h-6" />
                                        </TouchableOpacity>
                                        <Text className="text-lg text-gray-600">Quantity: {item.quantity}x</Text>
                                        {/* <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                                            <Image source={require('../../assets/add.png')} className="w-9 h-9" />
                                        </TouchableOpacity> */}
                                    </View>
                                    <Text className="text-lg text-green-700">${item.quantity * item.Plan.price}</Text>
                                </View>
                                <Divider my={3} />
                            </View>
                        ))
                    }
                </View>

                <View className="p-3 flex-row justify-between items-center">
                    <Text className="text-xl font-bold mb-6">Subtotal</Text>
                    <Text className="text-xl font-bold mb-6">${quantity * items[0] ? items[0].price : 0}</Text>
                </View>

                <View className="p-3 items-end mb-16">
                    <TouchableOpacity className="bg-tertiary w-32 rounded-xl h-16 justify-center items-center"
                        onPress={emptyFullCart}
                    >
                        <Text className="text-white text-xl font-bold">Empty Cart</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <TouchableOpacity className="bg-tertiary absolute bottom-0 w-full h-16 justify-center items-center"
                onPress={() => navigation.navigate('Checkout')}
            >
                <Text className="text-white text-2xl font-bold">Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartScreen