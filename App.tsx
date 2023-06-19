import { StatusBar } from "expo-status-bar";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StartPage from "./screens/StartPage";
import GamePage from "./screens/GamePage";
import { Colors } from "./util/Colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
          }}>
        <Stack.Screen name="Start" component={StartPage}  />
        <Stack.Screen name="Game" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
