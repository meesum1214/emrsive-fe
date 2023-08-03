import { View, ScrollView, Alert, Text } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import React from 'react'
import PlanCard from './HomeScreen/PlanCard'
import Footer from '../globalComponents/Footer'
import { getAllPlans } from '../API/add'
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

    return (
        <>
            <ScrollView>
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
            <Footer />
        </>
    )
}


export default HomeSreen