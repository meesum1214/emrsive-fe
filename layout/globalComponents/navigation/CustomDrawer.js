import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = (props) => {
    const { state, descriptors, navigation } = props;
    const filteredState = state.routes.filter(
        (route) => route.name !== 'Orders Details'
    );
    const [user, setUser] = useState(null)

    useLayoutEffect(() => {
        const getToken = async () => {
            let userr = await AsyncStorage.getItem('emrsive-user')
            setUser(JSON.parse(userr))
        }
        getToken()
    }, [])

    const onLogout = () => {
        AsyncStorage.removeItem('emrsiveToken')
        AsyncStorage.removeItem('emrsive-user')
        props.navigation.navigate('login')
    }

    return (
        <View className="flex-1 justify-between">
            <View className="items-center justify-center px-3 py-8 bg-primary">
                <View className="flex-row items-center w-[95%]">
                    <View className="rounded-full w-12 h-12 justify-center items-center bg-secondary mr-3">
                        <Text className="text-center text-white font-bold text-lg">{user?.firstName[0].toUpperCase()}</Text>
                    </View>

                    <View>
                        <Text className="text-white font-bold text-lg">{user?.firstName} {user?.lastName}</Text>
                        <Text className="text-white font-semibold">{user?.email}</Text>
                    </View>
                </View>
            </View>

            <DrawerContentScrollView {...props}>
                <View>
                    {filteredState.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.drawerLabel !== undefined
                                ? options.drawerLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate(route.name)}
                                style={styles.drawerItem}
                            >
                                <Text style={styles.drawerLabel}>{label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {/* <DrawerItemList {...props} /> */}
            </DrawerContentScrollView>

            <TouchableOpacity className="bg-gray-400 m-4 rounded-lg p-2"
                onPress={onLogout}
            >
                <Text className="text-center text-white font-semibold text-lg">Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerItem: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    drawerLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default CustomDrawer