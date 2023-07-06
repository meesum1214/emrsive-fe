import { Text, View, TouchableHighlight, Alert } from 'react-native'
import { addToCart } from '../../API/add'
import { count } from '../../signals/preact'

export default ({ navigation, planId, userId, price, planTitle, details, change, setChange }) => {

    const onAddToCart = async () => {
        addToCart({ quantity: 1, plan_id: planId, user_id: userId }).then((res) => {
            // console.log("Cart added Response >> ", res.message)
            Alert.alert("Success!", "Cart Item Added Successfully!")
            count.value = count.value + 1
            setChange(change + 1)
        }).catch((err) => {
            console.log('Error Message >>> ', err)
        })
    }

    const handleGoToCheckout = () => {
        navigation.navigate('Checkout', { planId, userId, price, planTitle, details })
    }

    return (
        <View className="bg-white w-80 rounded-3xl mb-5">

            <View className="bg-primary w-full flex-row items-center justify-between rounded-t-3xl px-3">
                <Text className="text-white py-2 text-xl font-semibold" > {planTitle} Shopify Plan </Text>
                <Text className="text-white py-2 text-xl font-semibold" > ${price} </Text>
            </View>

            <View className="rounded-b-3xl justify-between">
                <View className="p-3 text-xl">
                    {
                        details.map(({ content }, i) => (
                            <Text key={i} className="text-lg leading-9">{content}</Text>
                        ))
                    }
                </View>

                <View className="flex-row rounded-b-3xl">
                    <TouchableHighlight
                        onPress={onAddToCart}
                        className="bg-secondary items-center w-1/2 p-4 border-r border-r-white rounded-bl-3xl"
                    >
                        <Text className="text-lg text-white font-semibold"> Add to Cart </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={handleGoToCheckout}
                        className="bg-tertiary items-center w-1/2 p-4 border-r border-r-white rounded-br-3xl"
                    >
                        <Text className="text-lg text-white font-semibold"> Buy it Now </Text>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
    )
}