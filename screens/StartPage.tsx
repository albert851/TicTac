import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { Colors } from "../util/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface StartPageProps {
  navigation: any;
}

const StartPage: FC<StartPageProps> = ({ navigation }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [playWithX, setPlayWithX] = useState<boolean>(true);
  const [itemsSelect, setItemsSelect] = useState("X");

  function handlePlayWith(index: boolean) {
    if (index) {
      setItemsSelect("X");
      setPlayWithX(true);
    } else {
      setItemsSelect("0");
      setPlayWithX(false);
    }
  }

  const handlePlay = () => {
    navigation.navigate("Game", { name: playerName, player: playWithX });
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondry]}
      style={styles.safeArea}
    >
      <ImageBackground
        source={require("../assets/bg1.jpg")}
        resizeMode="cover"
        style={styles.safeArea}
        imageStyle={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView style={styles.safeArea}>
            <Text style={styles.header}>Player</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputContainerText}>Player Name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={setPlayerName}
                value={playerName}
              />
              <Text
                style={styles.selectedText}
              >{`Play with ${itemsSelect}`}</Text>
              <View style={styles.selectButtons}>
                <Pressable
                  onPress={() => handlePlayWith(true)}
                  style={styles.buttonSelect_X}
                >
                  <Text style={styles.buttonTitle}>Play with X</Text>
                </Pressable>
                <Pressable
                  onPress={() => handlePlayWith(false)}
                  style={styles.buttonSelect_0}
                >
                  <Text style={styles.buttonTitle}>Play with 0</Text>
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
          <Pressable onPress={handlePlay} style={styles.button}>
            <Text style={styles.buttonTitle}>Play</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.15,
  },

  header: {
    fontSize: 30,
    color: Colors.fontPrimary,
  },

  container: {
    backgroundColor: Colors.primary,
    padding: 30,
    marginHorizontal: 30,
    borderRadius: 8,
    marginTop: 50,
    height: 400,
  },

  inputContainer: {
    flex: 1,
    padding: 16,
  },

  inputContainerText: {
    color: Colors.fontPrimary,
  },

  textInput: {
    backgroundColor: Colors.third,
    borderRadius: 8,
    padding: 16,
    color: Colors.fontPrimary,
  },

  selectedText: {
    fontSize: 20,
    color: Colors.fontPrimary,
    marginTop: 10,
  },

  selectButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
  },

  buttonSelect_X: {
    justifyContent: "center",
    alignSelf: "center",
    width: 105,
    padding: 16,
    backgroundColor: Colors.third,
    borderRadius: 8,
  },

  buttonSelect_0: {
    justifyContent: "center",
    alignSelf: "center",
    width: 105,
    padding: 16,
    backgroundColor: Colors.third,
    borderRadius: 8,
  },

  button: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    padding: 16,
    backgroundColor: Colors.secondry,
    borderRadius: 8,
  },

  buttonTitle: {
    color: Colors.fontPrimary,
    textAlign: "center",
  },
});
