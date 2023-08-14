import { View, Image } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => navigation.navigate('Drawer'), 1700)
    }, [])

    return (
        <View className="flex-1 justify-center items-center bg-tertiary">
            <Image
                className="w-60 h-20"
                source={require('../assets/logo.png')}
            />
        </View>
    )
}

export default SplashScreen