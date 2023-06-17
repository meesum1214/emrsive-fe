import { View, Text, TouchableHighlight, Linking } from 'react-native'
import React from 'react'

const Footer = () => {
    return (
        <View className="flex-row rounded-b-3xl">
            <TouchableHighlight
                onPress={() => Linking.openURL('mailto:Support@emrsive.com')}
                className="bg-secondary items-center w-1/2 p-4 border-r border-r-white"
            >
                <Text className="text-lg text-white font-semibold"> Email Us </Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => Linking.openURL('tel:+923419194919')}
                className="bg-tertiary items-center w-1/2 p-4 border-r border-r-white"
            >
                <Text className="text-lg text-white font-semibold"> Call Us </Text>
            </TouchableHighlight>

        </View>
    )
}

export default Footer