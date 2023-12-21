import { useNavigation, type NavigationProp } from "@react-navigation/native";

import type { Route } from "../types/route";

export const useGoToEntryDetail = () => {
  const navigation = useNavigation<NavigationProp<Route>>();
  const goToEntryDetail = (id?: number) => {
    navigation.navigate("EntryDetail", { id });
  };
  return goToEntryDetail;
};

export const useGoToHome = () => {
  const navigation = useNavigation<NavigationProp<Route>>();
  const goToHome = () => {
    navigation.navigate("Home", {});
  };
  return goToHome;
};
