import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import login from './screens/login';
import Inventario from './screens/inventario';
import HomeScreen from './screens/home';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

const Stack = createStackNavigator();

//funcion de enrutamiento de pantallas
 function MyStack() {
  return (
    <Stack.Navigator>
     <Stack.Screen name="login" component={login} 
       options={{
    headerShown: false, // ocultar el header

  }}
    
   />
    <Stack.Screen 
  name="home" 
  component={HomeScreen} 
  options={({ navigation }) => ({
    title: 'HOME',
    headerStyle: { backgroundColor: '#525FF1' },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
     // Elimina el botón de retroceso
    headerLeft: () => (
      <TouchableOpacity
      
        style={{
          backgroundColor: '#fff',
          width: 80,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}
        onPress={async () => {
          await AsyncStorage.removeItem('token'); // Borra token
          alert('Sesión cerrada');
          navigation.replace('login'); // Regresa al login
        }}
      >
        <MaterialIcons name="logout" size={24} color="#525FF1" />
        <Text style={{ color: '#525FF1', fontSize: 10 }}>Salir</Text>
      </TouchableOpacity>
    ),
  })}
/>




    <Stack.Screen 
  name="inventario" 
  component={Inventario}
  options={({ navigation }) => ({ 
    title: 'INVENTARIO',
    headerStyle: { backgroundColor: '#525FF1' },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        style={{
          backgroundColor: '#fff', 
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
        }}
        onPress={() => navigation.navigate('home')} 
      >
        <MaterialIcons name="arrow-back" size={24} color="#525FF1" />
      </TouchableOpacity>
    ),
  })}
/>

    </Stack.Navigator>

  );
 }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
