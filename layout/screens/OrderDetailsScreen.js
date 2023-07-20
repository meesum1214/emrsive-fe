import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { getOrderDetails } from "../API/add";
import { useLayoutEffect, useState } from "react";
import { Divider } from "native-base";

export default ({ route }) => {

    const { order } = route.params;
    const [details, setDetails] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState(null)

    const getDetails = () => {
        getOrderDetails(order.id).then(res => {
            // console.log("Order Details >>>> ", res.data)
            setDetails(res.data)
        })
    }

    useLayoutEffect(() => {
        getDetails()
    }, [])

    const select = (id) => {
        setSelectedId(id)
        let plan = details.find(item => item.id == id)
        // console.log("Selected Plan >>> ", JSON.parse(plan.description))
        setSelectedPlan(JSON.parse(plan.description))
        if (selectedId == id) {
            setSelectedId(null)
        }
    }

    return (
        <View className="flex-1">
            <ScrollView>
                {
                    details?.map(({ Plan, status, id }, i) => (
                        <View key={i} className="mb-2">
                            <View className="bg-primary py-4 px-2 mb-1 flex-row justify-between items-center">
                                <Text className="text-white font-semibold text-xl">{Plan.name} Shopify Plan:</Text>
                                <TouchableOpacity onPress={() => select(id)}>
                                    <Image source={require('../assets/arrow-down.png')} className={`w-5 h-5 ${selectedId && selectedId == id ? "rotate-180" : ""}`} />
                                </TouchableOpacity>
                            </View>

                            {
                                selectedId && selectedId == id &&
                                <View className="p-4 m-2 bg-orange-200 rounded-md">
                                    <View className="flex-row justify-between items-center">
                                        <Text className="font-semibold text-xl">Your Plan:</Text>
                                        <Text className="font-semibold text-lg">{Plan.name} Shopify Plan</Text>
                                    </View>
                                    {/* <View className="flex-row justify-between items-center">
                                        <Text className="font-semibold text-xl">Status:</Text>
                                        <Text className="font-semibold text-lg">{status}</Text>
                                    </View> */}
                                    <Divider my="2" _light={{
                                        bg: "muted.800"
                                    }} />
                                    <View>
                                        <Text className="font-semibold text-xl">Features:</Text>
                                        <View className="">
                                            {
                                                selectedPlan?.map((item, i) => (
                                                    <View key={i} className="flex-row justify-between items-center w-full my-1">
                                                        <Text className="font-semibold text-lg">{item.content.replace(/ \/Done$/, '')}</Text>
                                                        <View className={`rounded-md ${item.content.includes("/Done") ? "bg-green-500" : "bg-gray-600"} w-[80px] h-6 flex-row justify-center items-center`}>
                                                            <Text className="text-white">{item.content.includes("/Done") ? "Completed" : "In Progress"}</Text>
                                                        </View>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}