import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { getOrders } from "../API/add"
import { Divider } from "native-base"
import OrderDetails from "./OrderScreen/OrderDetails"

export default () => {

    const [orders, setOrders] = useState(null)

    const getOrder = async () => {
        let userr = await AsyncStorage.getItem('emrsive-user')

        // console.log("========= get Cart Items Called ========")
        getOrders(JSON.parse(userr).id).then((res) => {
            setOrders(res.data)
        })
    }

    useEffect(() => {
        getOrder();
    }, [])

    return (
        <ScrollView>
            <View className="flex-1 items-center py-3">
                {
                    orders?.map((item, i) => (
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
                            {/* <OrderDetails heading="Price" value={JSON.parse(item.orderDetails)[0].price} /> */}
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )
}