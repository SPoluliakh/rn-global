import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Entypo, Octicons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { useSelector } from "react-redux";

const initialState = {
  title: "",
  location: "",
};
export const CreateScreen = ({ navigation }) => {
  const [inputState, setInputState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [location, setLocation] = useState(null);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const { userId, email, name, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const handleKeyboadHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const toggleCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const addFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
    setInputState(initialState);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    try {
      await addDoc(collection(db, "posts"), {
        userId,
        name,
        email,
        avatar,
        photo,
        title: inputState.title,
        place: inputState.location,
        location: location,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const sendPost = () => {
    uploadPostToServer();
    const post = {
      title: inputState.title,
      photo,
      place: inputState.location,
      location,
    };
    navigation.navigate("DefaultPostsScreen", { post });
    setInputState(initialState);
    setPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboadHide}>
      <View style={styles.container}>
        {!isKeyboard && (
          <Camera style={styles.camera} ref={setCamera} type={type} ratio="1:1">
            {photo && (
              <View style={styles.photoContainer}>
                <Image style={styles.photo} source={{ uri: photo }} />
              </View>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.snapContainer}
              onPress={takePhoto}
            >
              <Entypo name="camera" size={28} color="#FF6C00" />
            </TouchableOpacity>
          </Camera>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.toggleCameraBtn}
          onPress={toggleCamera}
        >
          <Octicons name="sync" size={24} color="#F6F6F6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fromGallery} onPress={addFromGallery}>
          <Text style={styles.fromGalleryBtn}>Load photo</Text>
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={"Name..."}
              value={inputState.title}
              onFocus={() => setIsKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, title: value }))
              }
            />
            <View style={styles.locationInputContainer}>
              <SimpleLineIcons
                style={styles.locationIcon}
                name="location-pin"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={styles.locationInput}
                placeholder={"Location..."}
                value={inputState.location}
                onFocus={() => setIsKeyboard(true)}
                onChangeText={(value) =>
                  setInputState((prev) => ({ ...prev, location: value }))
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          disabled={!photo}
          onPress={sendPost}
          activeOpacity={0.6}
          style={styles.sendPostButton}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        {!isKeyboard && (
          <View style={styles.deleteBtnContainer}>
            <TouchableOpacity
              onPress={deletePhoto}
              activeOpacity={0.8}
              style={styles.deleteBtn}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    height: 240,
    position: "relative",
  },
  photoContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 10,
    left: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FF6C00",
  },
  photo: {
    height: 170,
    width: 170,
  },
  snapContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    bottom: "2%",
    transform: [{ translateX: -25 }],
  },
  toggleCameraBtn: {
    position: "absolute",
    top: 200,
    right: "5%",
  },
  fromGallery: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  fromGalleryBtn: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    width: 100,
  },
  form: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
    height: 50,
  },
  sendPostButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  deleteBtnContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    paddingBottom: 15,
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
