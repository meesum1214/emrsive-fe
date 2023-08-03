import { View, Animated, Easing, StyleSheet } from 'react-native'
import React, { useRef, useEffect } from 'react'

export default ({ state }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the animation
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <View className="absolute top-0 w-screen h-screen z-[1000] bg-[#ffffffad] justify-center items-center">
            <Animated.Image
                source={require('../assets/favicon.png')}
                style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        width: 50,
        height: 65,
    },
});