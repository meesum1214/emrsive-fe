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
                source={{ uri: 'https://eu6vpnsdhno.exactdn.com/wp-content/uploads/2022/09/Emrsive_logo-6-300x110.png?strip=all&lossy=1&ssl=1' }}
            />
        </View>
    )
}

export default SplashScreen