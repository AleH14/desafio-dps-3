
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet ,
  Image
} from 'react-native';  
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>Bienvenido al Sistema de Inventario</Text>
      <Text style={styles.subtitle}> "La organización es la clave del éxito"</Text>
     <LottieView
        source={require('../assets/Data.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />

      {/* Tarjeta para ir al Inventario */}
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('inventario')}
      >
        <MaterialIcons name="inventory" size={60} color="#525FF1" />
        <Text style={styles.cardText}>Inventario</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 90
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#525FF1', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  card: {
    width: '80%',
    backgroundColor: '#f1f4ff',
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    fontWeight: '600'
  }
});
