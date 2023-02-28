import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { DefaultPostsScreen } from "../nested/DefaultPostsScreen";
import { MapScreen } from "../nested/MapScreen";
import { CommentsScreen } from "../nested/CommentsScreen";
import { authLogout } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authLogout());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#333",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
