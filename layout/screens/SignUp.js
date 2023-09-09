import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from "../firebase/config"
import { registerUser } from "../API/add"
import { Checkbox, Input } from "native-base"


const SignUp = ({ navigation }) => {

    useEffect(() => {
        const getToken = async () => {
            let token = await AsyncStorage.getItem('emrsiveToken')
            if (token !== null) {
                console.log('Token retrieved successfully: ', token);
                navigation.navigate('Drawer')
            }
        }
        getToken()
    }, [])

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role_id: '2'
    })

    const onSignUp = async () => {
        // console.log(data)
        // lowercase email
        data.email = data.email.toLowerCase()

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((res) => {
                const user = res;
                registerUser(data).then((res) => {
                    // console.log("Response of register APi >>> ", res.token)
                    AsyncStorage.setItem('emrsiveToken', res.token)
                    AsyncStorage.setItem('emrsive-user', JSON.stringify(res.data))
                    navigation.navigate('Drawer')
                }).catch((err) => {
                    console.log("error is registration >>> ", err)
                    Alert.alert(err)
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error from firebase API >>", error.message)
                Alert.alert(error.message)
            });
    }

    return (
        // <SafeAreaView style={styles.backgroundStyle}>

        //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //         <Image
        //             style={styles.tinyLogo}
        //             source={require('../assets/logo.png')}
        //         />
        //     </View>


        //     <View style={{ flex: 2, alignItems: "center" }}>
        //         <View style={styles.sectionContainer}>
        //             <Text style={styles.heading}>Sign Up</Text>

        //             <TextInput
        //                 style={styles.input}
        //                 value={data.firstName}
        //                 placeholderTextColor="gray"
        //                 onChangeText={(e) => setData({ ...data, firstName: e })}
        //                 placeholder="Enter First Name"
        //             />

        //             <TextInput
        //                 style={styles.input}
        //                 value={data.lastName}
        //                 placeholderTextColor="gray"
        //                 onChangeText={(e) => setData({ ...data, lastName: e })}
        //                 placeholder="Enter Last Name"
        //             />

        //             <TextInput
        //                 style={styles.input}
        //                 value={data.email}
        //                 placeholderTextColor="gray"
        //                 onChangeText={(e) => setData({ ...data, email: e })}
        //                 placeholder="Enter Email"
        //             />

        //             <TextInput
        //                 style={styles.input}
        //                 value={data.password}
        //                 placeholderTextColor="gray"
        //                 onChangeText={(e) => setData({ ...data, password: e })}
        //                 secureTextEntry={true}
        //                 placeholder="Enter Password"
        //             />

        //             <TouchableOpacity style={styles.button} onPress={onSignUp}>
        //                 <Text>Sign Up</Text>
        //             </TouchableOpacity>

        //             <View style={styles.shiftLogin}>
        //                 <View>
        //                     <Text>Already have an account? </Text>
        //                 </View>
        //                 <TouchableOpacity onPress={() => navigation.navigate('login')}>
        //                     <Text style={styles.LoginText}>Login</Text>
        //                 </TouchableOpacity>
        //             </View>

        //         </View>
        //     </View>
        // </SafeAreaView>

        <View className="flex-1 bg-primary">
            <Image
                source={require('../assets/login-bg.jpg')}
                className="absolute top-0 left-0 w-full h-1/2 opacity-20"
            />
            <View className="flex-1 justify-center">
                <Image
                    source={require('../assets/logo-white.png')}
                    className="w-60 h-16 mt-10 mx-auto"
                />
            </View>
            <View className="h-[80%] bg-white rounded-t-[35px] p-14 ">
                <View className="flex-1 gap-6">
                    <View>
                        <Text className="text-primary text-4xl font-semibold ">Sign Up</Text>
                        <Text className="text-gray-500 text-lg">Create a fresh account</Text>
                    </View>

                    <View className="">
                        <Text className="text-gray-400 text-lg font-semibold">First Name</Text>
                        <Input
                            variant={"underlined"}
                            className="text-[15px] -mt-2"
                            value={data.firstName}
                            onChangeText={(e) => setData({ ...data, firstName: e })}
                            placeholder="Enter First Name"
                        />
                        <Text className="text-gray-400 text-lg font-semibold mt-2">Last Name</Text>
                        <Input
                            variant={"underlined"}
                            className="text-[15px] -mt-2"
                            value={data.lastName}
                            onChangeText={(e) => setData({ ...data, lastName: e })}
                            placeholder="Enter last Name"
                        />
                        <Text className="text-gray-400 text-lg font-semibold mt-2">Email</Text>
                        <Input
                            variant={"underlined"}
                            className="text-[15px] -mt-2"
                            value={data.email}
                            onChangeText={(e) => setData({ ...data, email: e })}
                            placeholder="Enter Email"
                        />
                        <Text className="text-gray-400 text-lg font-semibold mt-2">Password</Text>
                        <Input
                            secureTextEntry={true}
                            variant={"underlined"}
                            className="text-[15px] -mt-2"
                            value={data.password}
                            onChangeText={(e) => setData({ ...data, password: e })}
                            placeholder="Enter Password"
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <Checkbox isChecked colorScheme="green">
                            Remember
                        </Checkbox>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('login')}
                        >
                            <Text className="text-gray-400">Already have an Account? Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center">
                        <TouchableOpacity
                            onPress={onSignUp}
                            className="bg-primary rounded-full w-56 h-14 justify-center items-center"
                        >
                            <Text className="text-2xl font-semibold text-white">Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#EAEAEA',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tinyLogo: {
        width: 200,
        height: 60,
    },
    sectionContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.96,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    heading: {
        fontSize: 25,
        color: '#4D4D4D',
        fontWeight: 700,
    },
    input: {
        paddingLeft: 8,
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 2,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
    },
    shiftLogin: {
        flexDirection: 'row',
        marginTop: 8
    },
    LoginText: {
        color: 'blue',
    }
})

export default SignUp