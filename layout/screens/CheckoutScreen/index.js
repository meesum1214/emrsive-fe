import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emptyCart, placeOrder } from '../../API/add';
import { count } from '../../signals/preact';

const CheckoutScreen = ({ navigation, route }) => {

    const { price, planTitle } = route.params;

    const [userId, setUserId] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: null,
        cardHolderName: null,
        cvvNumber: null,
    })

    const [orderData, setOrderData] = useState({
        orderDetails: null,
        email: null,
        firstName: null,
        lastName: null,
        companyName: null,
        country: null,
        address: null,
        appartment: null,
        city: null,
        state: null,
        zipCode: null,
        phone: null,
        additionalInfo: null,
        paymentDetails: null,
        user_id: null
    })

    const setData = async () => {
        let userr = await AsyncStorage.getItem('emrsive-user')
        setOrderData({
            ...orderData,
            orderDetails: JSON.stringify({ subTotal: price, planTitle }),
            user_id: JSON.parse(userr).id
        })
        setUserId(JSON.parse(userr).id)
    }

    useEffect(() => {
        setData();
    }, [])

    const validate = () => {
        if (orderData.email == null) {
            Alert.alert("Please enter email address!")
            return
        }
        if (orderData.firstName == null) {
            Alert.alert("Please enter first name!")
            return
        }
        if (orderData.lastName == null) {
            Alert.alert("Please enter last name!")
            return
        }
        if (orderData.companyName == null) {
            Alert.alert("Please enter company name!")
            return
        }
        if (orderData.country == null) {
            Alert.alert("Please enter country!")
            return
        }
        if (orderData.address == null) {
            Alert.alert("Please enter address!")
            return
        }
        if (orderData.city == null) {
            Alert.alert("Please enter city!")
            return
        }
        if (orderData.state == null) {
            Alert.alert("Please enter state!")
            return
        }
        if (orderData.zipCode == null) {
            Alert.alert("Please enter zip code!")
            return
        }
        if (orderData.phone == null) {
            Alert.alert("Please enter phone number!")
            return
        }
        if (orderData.additionalInfo == null) {
            Alert.alert("Please enter additional info!")
            return
        }
        // console.log("Payment Details here ----------------------- ", paymentInfo)
        if (paymentInfo.cardNumber == null || paymentInfo.cardHolderName == null || paymentInfo.cvvNumber == null) {
            Alert.alert("Please complete payment details!")
            return
        }
        onSubmit()
    }


    const onSubmit = () => {
        placeOrder(orderData, paymentInfo).then((res) => {
            Alert.alert("Success!", res.message)
            count.value = count.value + 1
            navigation.navigate('Your Orders')
        }).catch((err) => {
            console.log(err)
            Alert.alert(err.response.data.message)
        })
    }

    return (

        <ScrollView className="p-4">
            <View className="p-4">
                <Text className="text-xl font-bold mb-3">Order Summary</Text>
            </View>

            <View className="p-4 bg-gray-200 flex-row justify-between">
                <Text className="text-xl font-bold">{planTitle} Shopify Plan</Text>
                <Text className="text-xl font-bold">${price}</Text>
            </View>

            <View className="p-4">
                <Text className="text-xl font-bold mb-3">Customer Infornmation</Text>
                <Input
                    rounded={10}
                    backgroundColor="gray.200"
                    placeholder="Email Address*"
                    w="100%"
                    onChangeText={(e) => setOrderData({ ...orderData, email: e })}
                />
            </View>

            <View className="p-4">
                <Text className="text-xl font-bold mb-3">Billing Details</Text>

                <View className="flex-row justify-between">
                    <Input
                        mb={4}
                        rounded={10}
                        backgroundColor="gray.200"
                        placeholder="First Name*"
                        w="49%"
                        onChangeText={(e) => setOrderData({ ...orderData, firstName: e })}
                    />
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Last Name*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, lastName: e })} />
                </View>

                <View className="flex-row justify-between">
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Company Name*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, companyName: e })} />
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Country*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, country: e })} />
                </View>

                <View className="flex-row justify-between">
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Address*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, address: e })} />
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Appartment*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, appartment: e })} />
                </View>

                <View className="flex-row justify-between">
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="City/Town*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, city: e })} />
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="State*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, state: e })} />
                </View>

                <View className="flex-row justify-between">
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Postcode / ZIP*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, zipCode: e })} />
                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Phone*" w="49%" onChangeText={(e) => setOrderData({ ...orderData, phone: e })} />
                </View>
            </View>

            <View className="p-4">
                <Text className="text-xl font-bold mb-3">Additional Information</Text>
                <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Additional Note*" w="100%" onChangeText={(e) => setOrderData({ ...orderData, additionalInfo: e })} />
            </View>

            <View className="p-4">
                <Text className="text-xl font-bold mb-3">Payment</Text>

                <View className="border border-gray-300 rounded-lg">
                    <View className="border border-gray-300 rounded-t-lg bg-gray-200 p-3">
                        <Text className="text-2xl font-semibold mb-3">Credit / Debit Card</Text>
                        <Image source={require('../../assets/card.png')} className="w-28 h-12" />
                    </View>

                    <View className="p-3">
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Card Number*" w="100%" onChangeText={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e })} />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Card Holder Name*" w="100%" onChangeText={(e) => setPaymentInfo({ ...paymentInfo, cardHolderName: e })} />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="CVV*" w="100%" onChangeText={(e) => setPaymentInfo({ ...paymentInfo, cvvNumber: e })} />
                    </View>
                </View>
            </View>

            <View className="p-3 mb-8">
                <TouchableOpacity
                    className="bg-primary h-14 justify-center items-center rounded-lg"
                    onPress={validate}
                >
                    <Text className="text-white text-xl font-bold">Place Order ${price}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default CheckoutScreen