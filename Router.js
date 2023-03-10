import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons, Fontisto } from "@expo/vector-icons";
import { RegistationScreen } from "./src/Screens/auth/RegistationScreen/RegistationScreen";
import { LoginScreen } from "./src/Screens/auth/LoginScreen/LoginScreen";
import { PostsScreen } from "./src/Screens/main/PostsScreen";
import { CreateScreen } from "./src/Screens/main/CreateScreen";
import { ProfileScreen } from "./src/Screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRout = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              style={{ color: focused ? "#FF6C00" : "#212121" }}
              size={size}
              color={color}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#333",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Fontisto
              name="user-secret"
              style={{ color: focused ? "#FF6C00" : "#212121" }}
              size={size}
              color={color}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <MainTab.Screen
        options={{
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#333",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="create"
              style={{ color: focused ? "#FF6C00" : "#212121" }}
              size={size}
              color={color}
            />
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
    </MainTab.Navigator>
  );
};
