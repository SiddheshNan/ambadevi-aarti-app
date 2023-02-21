import React from "react";
import HomeScreen from "./pages/HomeScreen";
import BookletScreen from "./pages/BookletScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ animation: "default" }}
            />
            <Stack.Screen
              name="BookletScreen"
              component={BookletScreen}
              options={{ animation: "default" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
