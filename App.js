// import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { useRout } from "./Router";

export default function App() {
  const routing = useRout({});
  return <NavigationContainer>{routing}</NavigationContainer>;
}
