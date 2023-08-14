import { View, ScrollView, Alert, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { useLayoutEffect, useState, useRef } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import React from 'react'
import PlanCard from './PlanCard'
import Footer from '../../globalComponents/Footer'
import { getAllPlans } from '../../API/add'
import { Image } from 'react-native-svg'
import Carousel from 'react-native-snap-carousel';
// import withLoader from '../globalComponents/withLoader'

const HomeSreen = ({ navigation }) => {
    // const { setLoaderState } = route.params
    const { change, setChange } = useState(0)

    const [plans, setPlans] = useState(null)
    const [userId, setUserId] = useState(null)


    const getToken = async () => {
        // setIsLoadingFunc(true);

        // setTimeout(() => {
        //     setIsLoadingFunc(false);
        // }, 2000); // Simulate 2 seconds loading time
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
            // console.log(res.data)
            // setLoaderState(false)
        }).catch((err) => {
            Alert.alert(err)
        })

        getToken()
    }, [])

    const [entries, setEntries] = useState([
        { title: 'Item 1' },
        { title: 'Item 2' },
        { title: 'Item 3' },
        // ...other items
    ]);

    const carouselRef = useRef(null);
    const renderItem = ({ item, index }) => {
        return (
            <PlanCard navigation={navigation} planId={item.id} userId={userId} price={item.price} planTitle={item.name} details={JSON.parse(item.description)} change={change} setChange={setChange} />

            // <View style={styles.slide}>
            //     <Text style={styles.title}>{item.name}</Text>
            // </View>
        );
    }

    return (
        <>
            {/* <ScrollView>
                <View className="flex-1 items-center pt-8">

                    {
                        plans?.map(({ id, name, description, price }, i) => {
                            let dec = JSON.parse(description)
                            return (
                                <PlanCard key={i} navigation={navigation} planId={id} userId={userId} price={price} planTitle={name} details={dec} change={change} setChange={setChange} />
                            )
                        })
                    }
                </View>
            </ScrollView>
            <Footer /> */}


            {/* <ImageBackground source={require('../../assets/bg.jpg')} className="flex-1"> */}
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

                {/* <TouchableOpacity className="active:bg-blue-500 mt-8 bg-white rounded-full w-56 h-12 flex-row justify-center items-center shadow-md">
                    <Text className="text-primary text-lg font-semibold">GET NOW</Text>
                </TouchableOpacity> */}
            </View>
            {/* </ImageBackground> */}
        </>
    )
}

export default HomeSreen