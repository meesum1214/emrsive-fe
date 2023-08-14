import { Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import { addToCart } from '../../API/add'
import { count } from '../../signals/preact'
import React, { useEffect, useState } from 'react'

export default ({ navigation, planId, userId, price, planTitle, details, change, setChange }) => {



    const onAddToCart = async () => {
        addToCart({ quantity: 1, plan_id: planId, user_id: userId }).then((res) => {
            // console.log("Cart added Response >> ", res.message)
            Alert.alert("Success!", "Cart Item Added Successfully!")
            count.value = count.value + 1
            setChange(change + 1)
        }).catch((err) => {
            console.log('Error Message >>> ', err)
        })
    }

    const handleGoToCheckout = () => {
        navigation.navigate('Checkout', { planId, userId, price, planTitle, details })
    }

    return (
        <View className="flex-1 items-center">
            <View className="bg-white w-[320px] h-[400px] mt-[50px] overflow-hidden rounded-3xl">
                <ScrollView>
                    <View className="items-center">

                        {
                            planId == 1 ?
                                <Image
                                    source={require(`../../assets/verify.png`)}
                                    className="w-[120px] h-[120px] mt-4"
                                />
                                :
                                planId == 2 ?
                                    <Image
                                        source={require(`../../assets/vip.png`)}
                                        className="w-[120px] h-[120px] mt-4"
                                    />
                                    :
                                    <Image
                                        source={require(`../../assets/premium-quality.png`)}
                                        className="w-[120px] h-[120px] mt-4"
                                    />
                        }

                        <Text className="text-black py-2 text-xl font-semibold" > {planTitle} Shopify Plan </Text>
                        <Text className="text-black py-2 text-6xl font-semibold" > ${price} </Text>

                    </View>

                    <View className="rounded-b-3xl h-full justify-between">
                        <View className="p-3 text-xl text-center">
                            {
                                details.map(({ content }, i) => (
                                    <Text key={i} className="text-lg text-center text-gray-400 leading-[40px]">{content}</Text>
                                ))
                            }
                        </View>

                        {/* <View className="flex-row rounded-b-3xl">
                    <TouchableHighlight
                        onPress={onAddToCart}
                        className="bg-secondary items-center w-1/2 p-4 border-r border-r-white rounded-bl-3xl"
                    >
                        <Text className="text-lg text-white font-semibold"> Add to Cart </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    onPress={handleGoToCheckout}
                        className="bg-tertiary items-center w-1/2 p-4 border-r border-r-white rounded-br-3xl"
                        >
                        <Text className="text-lg text-white font-semibold"> Buy it Now </Text>
                        </TouchableHighlight>
                    </View> */}
                    </View>

                </ScrollView>
            </View>

            <View className="flex-row mt-8">
                <TouchableOpacity
                    onPress={onAddToCart}
                    className="bg-white rounded-full w-32 h-12 flex-row justify-center items-center shadow-md mr-3">
                    <Text className="text-primary text-lg font-semibold">ADD TO CART</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleGoToCheckout}
                    className="bg-secondary rounded-full w-32 h-12 flex-row justify-center items-center shadow-md">
                    <Text className="text-white text-lg font-semibold">BUY IT NOW</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}