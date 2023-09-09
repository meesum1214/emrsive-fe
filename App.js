import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './layout/screens/Login';
import SignUp from './layout/screens/SignUp';
import SplashScreen from './layout/screens/SplashScreen';
import DrawerNavigation from './layout/globalComponents/navigation/DrawerNavigation';
import { NativeBaseProvider } from 'native-base';
import CheckoutScreen from './layout/screens/CheckoutScreen';
import MultipleCheckoutScreen from './layout/screens/MultipleCheckoutScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Drawer" component={DrawerNavigation} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="MultipleCheckout" component={MultipleCheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;