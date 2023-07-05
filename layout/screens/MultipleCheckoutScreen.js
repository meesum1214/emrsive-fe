import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Input } from 'native-base'

const MultipleCheckoutScreen = ({ navigation, route }) => {

    const { cartItems } = route.params;
    console.log("Cart Items >>> ", cartItems)

    return (
        <View className="pb-20">

            <ScrollView className="p-4">
                <View className="p-4">
                    <Text className="text-xl font-bold mb-3">Order Summary</Text>
                </View>

                <View className="p-4 bg-gray-200 flex-row justify-between">
                    <Text className="text-xl font-bold">{cartItems[0].Plan.name} Shopify Plan</Text>
                    <Text className="text-xl font-bold">${cartItems[0].Plan.price}</Text>
                </View>

                <View className="p-4">
                    <Text className="text-xl font-bold mb-3">Customer Infornmation</Text>

                    <Input rounded={10} backgroundColor="gray.200" placeholder="Email Address*" w="100%" />
                </View>

                <View className="p-4">
                    <Text className="text-xl font-bold mb-3">Billing Details</Text>

                    <View className="flex-row justify-between">
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="First Name*" w="49%" />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Last Name*" w="49%" />
                    </View>

                    <View className="flex-row justify-between">
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Company Name*" w="49%" />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Country*" w="49%" />
                    </View>

                    <View className="flex-row justify-between">
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Address*" w="49%" />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Appartment*" w="49%" />
                    </View>

                    <View className="flex-row justify-between">
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="City/Town*" w="49%" />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="State*" w="49%" />
                    </View>

                    <View className="flex-row justify-between">
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Postcode / ZIP*" w="49%" />
                        <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Phone*" w="49%" />
                    </View>
                </View>

                <View className="p-4">
                    <Text className="text-xl font-bold mb-3">Additional Information</Text>

                    <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Additional Note*" w="100%" />
                </View>

                <View className="p-4">
                    <Text className="text-xl font-bold mb-3">Payment</Text>

                    <View className="border border-gray-300 rounded-lg">
                        <View className="border border-gray-300 rounded-t-lg bg-gray-200 p-3">
                            <Text className="text-2xl font-semibold mb-3">Credit / Debit Card</Text>

                            <Image source={require('../assets/card.png')} className="w-28 h-12" />
                        </View>

                        <View className="p-3">
                            <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Card Number*" w="100%" />
                            <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="Card Holder Name*" w="100%" />
                            <Input mb={4} rounded={10} backgroundColor="gray.200" placeholder="CVV*" w="100%" />
                        </View>
                    </View>
                </View>

                <View className="p-3 mb-2">
                    <TouchableOpacity className="bg-primary h-14 justify-center items-center rounded-lg">
                        <Text className="text-white text-xl font-bold">Place Order ${cartItems[0].Plan.price}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default MultipleCheckoutScreen