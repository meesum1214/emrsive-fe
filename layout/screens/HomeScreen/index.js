import { View, Alert, Text, Dimensions } from 'react-native'
import { useLayoutEffect, useState, useRef } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import React from 'react'
import PlanCard from './PlanCard'
import { getAllPlans } from '../../API/add'
import Carousel from 'react-native-snap-carousel';

const HomeSreen = ({ navigation }) => {
    const { change, setChange } = useState(0)

    const [plans, setPlans] = useState(null)
    const [userId, setUserId] = useState(null)


    const getToken = async () => {

        let token = await AsyncStorage.getItem('emrsiveToken')
        if (token == null) {
            console.log('Token not found.');
            navigation.navigate('login')
            return
        }

        let userr = await AsyncStorage.getItem('emrsive-user')
        setUserId(JSON.parse(userr).id)
    }

    useLayoutEffect(() => {
        getAllPlans().then((res) => {
            setPlans(res.data)
        }).catch((err) => {
            Alert.alert(err)
        })

        getToken()
    }, [])

    const carouselRef = useRef(null);
    const renderItem = ({ item, index }) => {
        return (
            <PlanCard navigation={navigation} planId={item.id} userId={userId} price={item.price} planTitle={item.name} details={JSON.parse(item.description)} change={change} setChange={setChange} />
        );
    }

    const width = Dimensions.get('window').width;

    return (
        <>


            <View className="flex-1 bg-primary items-center">

                <View className="items-center pt-8">
                    <Text className="text-xl font-semibold">Choose Your Plan</Text>
                </View>

                <View className="flex-1">
                    <Carousel
                        ref={carouselRef}
                        data={plans}
                        renderItem={renderItem}
                        sliderWidth={400}
                        itemWidth={320}
                    />

                </View>

            </View>
        </>
    )
}

export default HomeSreen