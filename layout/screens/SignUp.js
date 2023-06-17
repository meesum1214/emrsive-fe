import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from "../firebase/config"
import { registerUser } from "../API/add"


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
        role_id: '1'
    })

    const onSignUp = async () => {
        // console.log(data)

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
        <SafeAreaView style={styles.backgroundStyle}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={styles.tinyLogo}
                    source={{ uri: 'https://eu6vpnsdhno.exactdn.com/wp-content/uploads/2022/09/Emrsive_logo-6-300x110.png?strip=all&lossy=1&ssl=1' }}
                />
            </View>


            <View style={{ flex: 2, alignItems: "center" }}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>Sign Up</Text>

                    <TextInput
                        style={styles.input}
                        value={data.firstName}
                        onChangeText={(e) => setData({ ...data, firstName: e })}
                        placeholder="Enter First Name"
                    />

                    <TextInput
                        style={styles.input}
                        value={data.lastName}
                        onChangeText={(e) => setData({ ...data, lastName: e })}
                        placeholder="Enter Last Name"
                    />

                    <TextInput
                        style={styles.input}
                        value={data.email}
                        onChangeText={(e) => setData({ ...data, email: e })}
                        placeholder="Enter Email"
                    />

                    <TextInput
                        style={styles.input}
                        value={data.password}
                        onChangeText={(e) => setData({ ...data, password: e })}
                        secureTextEntry={true}
                        placeholder="Enter Password"
                    />

                    <TouchableOpacity style={styles.button} onPress={onSignUp}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.shiftLogin}>
                        <View>
                            <Text>Already have an account? </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={styles.LoginText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
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