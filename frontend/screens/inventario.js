import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  Button,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import API from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [nuevoStockInput, setNuevoStockInput] = useState("");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para cargar productos desde el API
  const cargarProductos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No hay token de sesión");
        setLoading(false);
        return;
      }

      const res = await API.get("/productos", {
        headers: { Authorization: `Bearer ${token}` }, // token en headers
      });

      // Validar que exista array de productos
      const productosApi = res.data?.data?.productos;
      if (!productosApi || !Array.isArray(productosApi)) {
        Alert.alert("Error", "No se recibieron productos del API");
        setLoading(false);
        return;
      }

      setProductos(productosApi);
      setFilteredProductos(productosApi);
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert("Error", "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

 // filtrar los productos
  useEffect(() => {
    if (search === "") {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
          p.categoria?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProductos(filtered);
    }
  }, [search, productos]);

  // Función para actualizar stock manualmente
  const actualizarStockManual = async () => {
    const nuevoStock = parseInt(nuevoStockInput);
    if (isNaN(nuevoStock) || nuevoStock < 0) {
      Alert.alert("Error", "Ingrese un número válido");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      await API.put(
        `/productos/${productoSeleccionado.id}`,
        { stock: nuevoStock },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProductoSeleccionado({ ...productoSeleccionado, stock: nuevoStock });
      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoSeleccionado.id ? { ...p, stock: nuevoStock } : p
        )
      );

      Alert.alert("Éxito", "Stock actualizado");
      setNuevoStockInput("");
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert("Error", "No se pudo actualizar el stock");
    }
  };
  // Función para manejar el escaneo de código de barras
  const handleBarCodeScanned = async ({ data }) => {
    try {
      setScanning(false);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No se encontró el token de autenticación");
        return;
      }

      const res = await API.get(`/productos/${data}`, {
        headers: { Authorization: `Bearer ${token}` }, //pasar token 
      });

      const producto = res.data?.data?.producto;
      if (producto) {
        setProductoSeleccionado(producto);
        setNuevoStockInput(producto.stock?.toString() || "");
      } else {
        Alert.alert("Error", "Producto no encontrado");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert("Error", "No se pudo obtener el producto");
    }
  };
  // Función para manejar el botón de escanear
  const handleScanPress = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permiso requerido",
          "Necesitas permitir el uso de la cámara"
        );
        return;
      }
    }
    setScanning(true);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#525FF1" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f1f1f1",
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <MaterialIcons name="search" size={24} color="black" />
        <TextInput
          placeholder="Buscar producto o categoría..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, padding: 10 }}
        />
      </View>

      {/* Lista de productos*/}
      <FlatList
        data={filteredProductos}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setProductoSeleccionado(item)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              {/* ID en círculo */}
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "#19d0ddff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item.id}
                </Text>
              </View>

              {/* Nombre */}
              <Text style={[styles.nombre, { flex: 3 }]}>{item.nombre}</Text>
            </View>

            {/* Fila con categoría y stock */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold", color: "#525FF1", flex: 2 }}>
                {item.categoria}
              </Text>
              <Text style={{ flex: 1, textAlign: "right" }}>
                Stock: {item.stock}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/*Modal de descripcion de productos*/}
      {productoSeleccionado && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.titulo}>{productoSeleccionado.nombre}</Text>
              {productoSeleccionado.imagen && (
                <Image
                  source={{ uri: productoSeleccionado.imagen }}
                  style={{ width: "100%", height: 300, marginBottom: 10 }}
                />
              )}
              <Text style={{ fontWeight: "bold" }}>
                ID: {productoSeleccionado.id}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                Categoría: {productoSeleccionado.categoria}
              </Text>
              <Text>Stock: {productoSeleccionado.stock}</Text>
              <Text>Marca: {productoSeleccionado.marca}</Text>
              <Text>Precio: ${productoSeleccionado.precio}</Text>
              <Text>Descripción: {productoSeleccionado.descripcion}</Text>

              <TextInput
                placeholder="Nuevo stock"
                value={nuevoStockInput}
                onChangeText={setNuevoStockInput}
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.botonActualizar}
                onPress={actualizarStockManual}
              >
                <MaterialIcons name="check" size={24} color="white" />
                <Text style={styles.textoBoton}>Actualizar Stock</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setProductoSeleccionado(null)}>
                <Text style={styles.cerrar}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {/* Botón para escanear código QR */}
      {!scanning && (
        <TouchableOpacity style={styles.boton} onPress={handleScanPress}>
          <MaterialIcons name="qr-code-scanner" size={24} color="white" />
          <Text style={styles.textoBoton}>Escanear QR</Text>
        </TouchableOpacity>
      )}
      {/* Modal de escaneo */}
      {scanning && (
        <Modal visible={scanning} animationType="slide">
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarCodeScanned}
          />
          <Button
            title="Cerrar cámara"
            onPress={() => setScanning(false)}
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              backgroundColor: "#525FF1",
            }}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  nombre: {
    fontWeight: "bold",
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#525FF1",
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 15,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  botonActualizar: {
    backgroundColor: "#525FF1",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  cerrar: { color: "blue", marginTop: 15, textAlign: "center" },
  botonRegresar: {
    backgroundColor: "#888",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
});
