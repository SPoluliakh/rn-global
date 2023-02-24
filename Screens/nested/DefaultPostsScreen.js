import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require("../../assets/images/profile.jpg")}
          />
        </View>

        <View>
          <Text style={styles.userName}>Sergii Poluliakh</Text>
          <Text style={styles.userEmail}>test@test.com</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image style={styles.postPhoto} source={{ uri: item.post.photo }} />
            <Text style={styles.postTitle}>{item.post.title}</Text>
            <View style={styles.postInfoContainer}>
              <View style={styles.postInfoInnerContainer}>
                <TouchableOpacity
                  style={{ ...styles.postComments, marginRight: 25 }}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
                  <Text style={styles.numberComments}>0</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.postLocation}
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("Map", {
                    coords: {
                      latitude: item.post.location.coords.latitude,
                      longitude: item.post.location.coords.longitude,
                    },
                    place: item.post.place,
                  })
                }
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.locationText}>{item.post.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginVertical: 32,
  },
  avatarContainer: {
    overflow: "hidden",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginRight: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  userName: {
    fontWeight: "bold",
    color: "#212121",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontWeight: "normal",
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
    lineHeight: 13,
  },
  postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 10,
  },
  postTitle: {
    fontWeight: "Medium",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginVertical: 8,
  },
  postInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,
  },
  postInfoInnerContainer: {
    flexDirection: "row",
  },
  postComments: {
    flexDirection: "row",
  },
  numberComments: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
    textDecorationLine: "underline",
  },
});
