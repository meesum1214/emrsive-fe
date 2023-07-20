import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getOrders } from "../API/add"
import { Divider } from "native-base"
import OrderDetails from "./OrderScreen/OrderDetails"
import { count } from "../signals/preact"

export default ({ navigation }) => {

    const [orders, setOrders] = useState([])
    const [change, setChange] = useState(0)

    const getOrder = async () => {
        let userr = await AsyncStorage.getItem('emrsive-user')

        // console.log("========= get Cart Items Called ========")
        getOrders(JSON.parse(userr).id).then((res) => {
            setOrders(res.data)
            // console.log("Orders >>>> ", res.data)
        })
    }

    useEffect(() => {
        getOrder();
    }, [count.value, change])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity className="bg-green-300 rounded-full px-2 py-1" onClick={() => {
                setChange(change + 1)
            }}>
                <Text className="font-semibold text-lg">Refresh</Text>
            </TouchableOpacity>
            <View className="flex-1 justify-center items-center w-full py-4">
                {
                    orders.length > 0 ?
                        orders.map((item, i) => (
                            <View key={i} className="w-[95%] bg-orange-200 shadow-2xl rounded-3xl p-4 mb-2">
                                <Text className="text-center text-2xl font-bold">Order Details</Text>
                                <Divider my="2" _light={{
                                    bg: "muted.800"
                                }} _dark={{
                                    bg: "muted.50"
                                }} />
                                <OrderDetails heading="Order ID" value={item.id} />
                                <OrderDetails heading="Email" value={item.email} />
                                <OrderDetails heading="Name" value={`${item.firstName} ${item.lastName}`} />
                                <OrderDetails heading="Company Name" value={item.companyName} />
                                <OrderDetails heading="Country" value={item.country} />
                                <OrderDetails heading="Address" value={item.address} />
                                {item.appartment && <OrderDetails heading="Appartment" value={item.appartment} />}
                                <OrderDetails heading="City" value={item.city} />
                                <OrderDetails heading="State" value={item.state} />
                                <OrderDetails heading="Zop Code" value={item.zipCode} />
                                <OrderDetails heading="Phone Number" value={item.phone} />
                                {item.additionalInfo && <OrderDetails heading="Additional Information" value={item.additionalInfo} />}
                                <OrderDetails heading="Order Status" value={item.orderStatus} />
                                <OrderDetails heading="Price" value={`$${item.orderPrice}`} />
                                <View className="w-full flex-row justify-end mt-2 items-center">
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Orders Details', { order: item })}
                                        className="flex-row items-center bg-black rounded-full px-2 py-1"
                                    >
                                        <Text className="text-white">View More</Text>
                                        <Image source={require('../assets/right-arrow.png')} className="w-3 h-3 ml-2" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                        :
                        <Text className="text-center text-2xl font-bold">No Orders Yet</Text>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        border: "1px solid black",
        alignItems: 'center'
    },
});