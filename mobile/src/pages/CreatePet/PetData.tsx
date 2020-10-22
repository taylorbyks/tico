import React, { useState} from "react";
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import api from "../../services/api";

interface PetDataParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function PetData() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [big, setBig] = useState(false);
  const [puppy, setPuppy] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const route = useRoute();
  const params = route.params as PetDataParams;

  const { navigate } = useNavigation();

  async function handleCreatePet() {
    const { latitude, longitude } = params.position

    const data = new FormData();

    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("name", name);
    data.append("about", about);
    data.append("userName", userName);
    data.append("userNumber", userNumber);
    data.append("big", String(big));
    data.append("puppy", String(puppy));

    images.forEach((image, index) => {
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      } as any);
    });

    await api.post("pets", data);

    navigate("List");
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Precisamos de acesso às suas fotos...");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={(text) => setAbout(text)}
      />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContaier}>
        {images.map((image) => {
          return (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Seus dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={userNumber}
        onChangeText={(text) => setUserNumber(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>É filhote?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={puppy}
          onValueChange={(text) => setPuppy(text)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Voce acha que ficara grande?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={big}
          onValueChange={(text) => setBig(text)}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreatePet}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "SourceSerifPro_700Bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#5C8599",
    fontFamily: "SourceSerifPro_600SemiBold",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#5C8599",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  uploadedImagesContaier: {
    flexDirection: "row",
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#2c9fe7",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#3CDC8C",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "SourceSerifPro_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
});
