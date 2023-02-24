import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistationScreen = ({ navigation }) => {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [dimentions, setDimentions] = useState(
    () => Dimensions.get("window").width - 20 * 2
  );

  useEffect(() => {
    const countWidchChange = () => {
      const width = Dimensions.get("window").width;
      setDimentions(width - 20 * 2);
    };
    Dimensions.addEventListener("change", countWidchChange);

    return () => Dimensions.removeEventListener("change", countWidchChange);
  }, []);

  const handleSubmit = () => {
    console.log(formData);
    setFormData(initialState);
  };
  const handleChangeKeyboardFlag = () => {
    setIsKeyboard(true);
  };
  const handleKeyboadHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };
  const handle = () => {
    setIsKeyboard(false);
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboadHide}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../../assets/images/Photo.jpg")}
        />

        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "flex-end" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isKeyboard ? 30 : 38,
            }}
          >
            <Text style={styles.text}> Registration</Text>
            <View>
              <TextInput
                style={{ ...styles.input, width: dimentions }}
                textAlign="center"
                placeholder="Login"
                value={formData.login}
                onFocus={handleChangeKeyboardFlag}
                onBlur={handle}
                onChangeText={(value) =>
                  setFormData((prevState) => ({ ...prevState, login: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{ ...styles.input, width: dimentions }}
                textAlign="center"
                placeholder="Email"
                value={formData.email}
                onFocus={handleChangeKeyboardFlag}
                onBlur={handle}
                onChangeText={(value) =>
                  setFormData((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{ ...styles.input, width: dimentions }}
                textAlign="center"
                placeholder="Password"
                secureTextEntry={true}
                value={formData.password}
                onFocus={handleChangeKeyboardFlag}
                onBlur={handle}
                onChangeText={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
            </View>
            {!isKeyboard && (
              <>
                <TouchableOpacity
                  style={{ ...styles.btn, width: dimentions }}
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.textInfo}>
                    Have account alrady? <Text>Sign in</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <View style={styles.imgWrapper}>
              <TouchableOpacity
                style={styles.addPhotoButton}
                activeOpacity={0.7}
              >
                <Text style={styles.addPhotoButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    resizeMode: "cover",
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 62,
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 30,
    fontWeight: "Medium",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    marginHorizontal: 16,
    background: "#E8E8E8",
    height: 40,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontSize: 16,
    color: "#212121",
  },
  btn: {
    marginHorizontal: 16,
    marginTop: 42,
    borderRadius: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "medium",
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "Medium",
    textAlign: "center",
    marginTop: 16,
  },
  imgWrapper: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    left: "50%",
    top: "-4%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  addPhotoButton: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FF6C00",
  },

  addPhotoButtonText: {
    color: "#FF6C00",
  },
});
