import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'

const Header = ({ navigation, total }) => {
    return (
        <View className="px-6 py-4 bg-secondary flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                    source={require('../assets/burger.png')}
                    className="w-7 h-7"
                />
            </TouchableOpacity>
            <Image
                source={require('../assets/logo.png')}
                className="w-28 h-8"
            />
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="relative">
                <Image
                    source={require('../assets/cart.png')}
                    className="w-5 h-5"
                />
                <View className={`absolute -top-4 -right-4  rounded-full w-8 h-8 p-0 flex items-center justify-center`}>
                    <Text className="text-white text-lg font-bold">  {total} </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header