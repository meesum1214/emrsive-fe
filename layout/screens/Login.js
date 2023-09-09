import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { auth } from "../firebase/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userLogin } from "../API/add"
import axios from "axios"
import { Box, Button, Checkbox, Input } from "native-base"


export default ({ navigation }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  // useEffect(() => {
  //   const getToken = async () => {
  //     let token = await AsyncStorage.getItem('emrsiveToken')
  //     if (token !== null) {
  //       // console.log('Token retrieved successfully: ', token);
  //       navigation.navigate('Drawer')
  //     }
  //   }
  //   getToken()
  // }, [])

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const onLogin = async () => {

    if (data.email == '' || data.password == '') {
      Alert.alert("Empty Feild!", "Please fill all the fields")
      return
    }

    // lowercase email
    data.email = data.email.toLowerCase()

    // signInWithEmailAndPassword(auth, data.email, data.password)
    //   .then((res) => {
    // const user = res;

    userLogin(data).then((res) => {
      console.log("user Data", res.data)
      AsyncStorage.setItem('emrsiveToken', res.token)
      AsyncStorage.setItem('emrsive-user', JSON.stringify(res.data))
      return res
    }).then((res) => {
      console.log("Login response >>> ", res)
      navigation.navigate('Drawer')
    }).catch((err) => {
      console.log("error is Login >>> ", err)
      Alert.alert("Error", err.response.data.message)
    })



    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log("Error from firebase API >>", error.message)
    //   Alert.alert(error.message)
    // });
  }

  return (
    // <SafeAreaView style={styles.backgroundStyle}>

    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //     <Image
    //       style={styles.tinyLogo}
    //       source={require('../assets/logo.png')}
    //     />
    //   </View>

    //   <View style={{ flex: 2, alignItems: "center" }}>
    //     <View style={styles.loginCard}>
    //       <Text style={styles.heading}>Login</Text>

    //       <TextInput
    //         style={styles.input}
    //         value={data.email}
    //         placeholderTextColor="gray"
    //         onChangeText={(e) => setData({ ...data, email: e })}
    //         placeholder="Enter Email"
    //         />

    //       <TextInput
    //         placeholderTextColor="gray"
    //         style={styles.input}
    //         value={data.password}
    //         onChangeText={(e) => setData({ ...data, password: e })}
    //         secureTextEntry={true}
    //         placeholder="Enter Password"
    //       />

    //       <TouchableOpacity style={styles.button} onPress={onLogin}>
    //         <Text>Login</Text>
    //       </TouchableOpacity>

    //       <View style={styles.shiftLogin}>
    //         <View>
    //           <Text>Don't have an account? </Text>
    //         </View>
    //         <TouchableOpacity onPress={() => navigation.navigate('signup')}>
    //           <Text style={styles.LoginText}>Sign Up</Text>
    //         </TouchableOpacity>
    //       </View>

    //     </View>
    //   </View>
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
      <View className="h-[70%] bg-white rounded-t-[35px] p-14 ">
        <View className="flex-1 gap-4">
          <View>
            <Text className="text-primary text-4xl font-semibold ">Login</Text>
            <Text className="text-gray-500 text-lg">Login to your existing account</Text>
          </View>

          <View className="">
            <Text className="text-gray-400 text-lg font-semibold ">Email</Text>
            <Input
              variant={"underlined"}
              className="text-[15px]"
              value={data.email}
              onChangeText={(e) => setData({ ...data, email: e })}
              placeholder="Enter Email"
            />
            <Text className="text-gray-400 text-lg font-semibold mt-4">Password</Text>
            <Input
              secureTextEntry={true}
              variant={"underlined"}
              className="text-[15px]"
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
              onPress={() => navigation.navigate('signup')}
            >
              <Text className="text-gray-400">Don't have an Account? SignUp</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <TouchableOpacity
              onPress={onLogin}
              className="bg-primary rounded-full w-56 h-14 justify-center items-center"
            >
              <Text className="text-2xl font-semibold text-white">Login</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <Text className="text-gray-500 text-xl">Or Login with</Text>
            <View className="flex-row gap-3 mt-1">
              <View className="bg-[#255bd3] w-16 h-9 rounded-full justify-center items-center">
                <Image
                  source={require('../assets/facebook-app-symbol.png')}
                  className="w-4 h-4"
                />
              </View>

              <View className="bg-[#009bf6] w-16 h-9 rounded-full justify-center items-center">
                <Image
                  source={require('../assets/twitter.png')}
                  className="w-4 h-4"
                />
              </View>

              <View className="bg-[#ff0d25] w-16 h-9 rounded-full justify-center items-center">
                <Image
                  source={require('../assets/social.png')}
                  className="w-4 h-4"
                />
              </View>
            </View>
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
  },
  tinyLogo: {
    width: 200,
    height: 60,
  },
  loginCard: {
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
    // paddingLeft: 8,
    // borderBottomColor: '#A5A5A5',
    // borderBottomWidth: 2,
    // color: '#4D4D4D',
    fontSize: 16,
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