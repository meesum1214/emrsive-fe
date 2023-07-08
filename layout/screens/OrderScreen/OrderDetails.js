import { Text, View } from "react-native"

export default ({heading, value}) => {
    return (
        <View className="flex-row justify-between my-1">
            <Text className="text-lg">{heading}:</Text>
            <Text className="text-lg font-bold">{value}</Text>
        </View>
    )
}