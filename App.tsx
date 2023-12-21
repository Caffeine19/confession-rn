import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./pages/HomeScreen";
import { EntryDetailScreen } from "./pages/EntryDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View className="bg-neutral-950 flex-1">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EntryDetail"
            component={EntryDetailScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
