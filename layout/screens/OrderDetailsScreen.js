import { Text, View } from "react-native"

export default ({ route }) => {
    const { order } = route.params;
    console.log("Plan >>>> ", order)
    let plans = JSON.parse(order.orderDetails)



    return (
        <View className="flex-1">
            {
                plans?.cartItems?.map(({ Plan }, i) => (
                    <View key={i}>
                        <View className="bg-primary py-4 px-2 mb-1 flex-row justify-between">
                            <Text className="text-white font-semibold text-xl">{Plan.name} Shopify Plan:</Text>
                            <Text className="font-semibold text-lg text-white">{order.orderStatus}</Text>
                        </View>

                        {/* <View>
                        </View> */}
                    </View>
                ))
            }
        </View>
    )
}