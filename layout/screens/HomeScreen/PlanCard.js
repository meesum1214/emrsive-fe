import { Text, View, TouchableHighlight, Alert } from 'react-native'
import { addToCart } from '../../API/add'
import { count } from '../../signals/preact'

export default (props) => {

    const onAddToCart = () => {

        addToCart({quantity: 1, plan_id: props.planId, user_id: props.userId}).then((res) => {
            Alert.alert("Success!", res.message)
            console.log('API Response >>> ', res)
            count.value = count.value + 1
            props.setChange(props.change + 1)
        }).catch((err) => {
            // Alert.alert("Error")
            console.log('Error Message >>> ', err)
            count.value = count.value + 1
        })

        // props.navigation.navigate('Cart')
    }


    return (
        <View className="bg-white w-80 rounded-3xl mb-5">

            <View className="bg-primary w-full flex-row items-center justify-between rounded-t-3xl px-3">
                <Text className="text-white py-2 text-xl font-semibold" > {props.planTitle} Shopify Plan </Text>
                <Text className="text-white py-2 text-xl font-semibold" > ${props.price} </Text>
            </View>

            <View className="rounded-b-3xl justify-between">
                <View className="p-3 text-xl">
                    {
                        props.details.map(({ content }, i) => (
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
                        onPress={() => props.navigation.navigate('Checkout')}
                        className="bg-tertiary items-center w-1/2 p-4 border-r border-r-white rounded-br-3xl"
                    >
                        <Text className="text-lg text-white font-semibold"> Buy it Now </Text>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
    )
}