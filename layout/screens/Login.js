import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { auth } from "../firebase/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userLogin } from "../API/add"
import axios from "axios"


export default ({ navigation }) => {

  useEffect(() => {
    const getToken = async () => {
      let token = await AsyncStorage.getItem('emrsiveToken')
      if (token !== null) {
        // console.log('Token retrieved successfully: ', token);
        navigation.navigate('Drawer')
      }
    }
    getToken()
  }, [])

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const onLogin = () => {

    if (data.email == '' || data.password == '') {
      Alert.alert("Empty Feild!", "Please fill all the fields")
      return
    }

    // signInWithEmailAndPassword(auth, data.email, data.password)
    //   .then((res) => {
    // const user = res;

    userLogin(data).then((res) => {
      AsyncStorage.setItem('emrsiveToken', res.token)
      AsyncStorage.setItem('emrsive-user', JSON.stringify(res.data))
      return res
    }).then((res) => {
      console.log("Login response >>> ", res)
      navigation.navigate('Drawer')
    }).catch((err) => {
      console.log("error is Login >>> ", err)
      Alert.alert(err)
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
    <SafeAreaView style={styles.backgroundStyle}>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: 'https://eu6vpnsdhno.exactdn.com/wp-content/uploads/2022/09/Emrsive_logo-6-300x110.png?strip=all&lossy=1&ssl=1' }}
        />
      </View>

      <View style={{ flex: 2, alignItems: "center" }}>
        <View style={styles.loginCard}>
          <Text style={styles.heading}>Login</Text>

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

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text>Login</Text>
          </TouchableOpacity>

          <View style={styles.shiftLogin}>
            <View>
              <Text>Don't have an account? </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.LoginText}>Sign Up</Text>
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