import React, {useState} from "react";
import { 
  Text, StyleSheet, View, TextInput, Image, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, 
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import API from '../services/api';
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // llamada a la API
      const response = await API.post('/auth/login', {
        username: usuario,
        password: password
      });

      // token de autenticación
      const token = response.data.token;
      // Guardar token localmente
    await AsyncStorage.setItem('token', token);


      //Alert.alert('Login Exitoso', `Token: ${token}`);
      Alert.alert('Login Exitoso', '¡Bienvenido!');

      // navegar a la pantalla principal
      navigation.replace('home');

      console.log("Respuesta API:", response.data);

    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.fondo}>
        <ScrollView 
          contentContainerStyle={styles.padre} 
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View>
          <LottieView
            source={require('../assets/Inventory.json')} 
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 9, color: '#333' }}>Iniciar Sesión</Text>

          {/* Tarjeta ligera */}
          <View style={styles.tarjeta}>
            {/* Input Usuario */}
            <View style={styles.cajaTexto}>
              <MaterialIcons name="person" size={24} color="gray" style={styles.icon} />
              <TextInput 
                placeholder="Usuario" 
                style={styles.input} 
                placeholderTextColor="#555"
                value={usuario}
                onChangeText={setUsuario}
              />
            </View>

            {/* Input Contraseña */}
            <View style={styles.cajaTexto}>
              <MaterialIcons name="lock" size={24} color="gray" style={styles.icon} />
              <TextInput 
                placeholder="Contraseña" 
                style={styles.input} 
                secureTextEntry 
                placeholderTextColor="#555"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Botón */}
            <TouchableOpacity style={styles.cajaBoton} onPress={handleLogin}>
              <Text style={styles.textoBoton}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fondo:{
    flex:1,
    backgroundColor:'#f4f6f8ff', 
  },
  padre:{
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40
  },
  profile: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#fff',
  },
  tarjeta:{
      width:'90%',
      padding:25,
      backgroundColor:'#f4f6f8ff', 
      borderRadius:20,
      marginBottom:60,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
  },
  cajaTexto:{
      flexDirection:'row',
      alignItems:'center',
      width:'100%',
      backgroundColor:'#f1efefff', 
      borderRadius:30,
      marginVertical:10,
      paddingHorizontal:15,
      shadowColor:"#000",
      shadowOffset:{width:0, height:1},
      shadowOpacity:0.05,
      shadowRadius:2,
      elevation:2
  },
  icon:{
      marginRight:10
  },
  input:{
      flex:1,
      paddingVertical:15,
      fontSize:16,
      color:'#333'
  },
  cajaBoton:{
      backgroundColor:'#525FF1', 
      paddingVertical:15,
      borderRadius:30,
      width:'100%',
      marginTop:20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
  },
  textoBoton:{
      textAlign:'center',
      color:'#fff',
      fontWeight:'bold',
      fontSize:16,
  }
});
