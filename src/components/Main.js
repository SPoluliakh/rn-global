import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRout } from "../../Router";

import { useEffect } from "react";
import { authCurrent } from "../redux/auth/authOperations";

export function Main() {
  const stateChange = useSelector((state) => {
    return state.auth.stateChange;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCurrent());
  }, []);

  const routing = useRout(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
