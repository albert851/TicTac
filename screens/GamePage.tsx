import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Colors } from "../util/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface GamePageProps {
  navigation: any;
  route: any;
}

const GamePage: FC<GamePageProps> = ({ navigation, route }) => {
  const { name, player } = route.params;
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [emptyFields, setEmptyFields] = useState<number>(8);
  const [board, setBoard] = useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  const [refItems, setRefItems] = useState<boolean>(false);
  const [computerIndex, setComputerIndex] = useState<string>("");
  const [playerIndex, setPlayerIndex] = useState<string>("");

  const pressField = (index: number) => {
    let newBoard = board;

    if (newBoard[index] === " ") {
      newBoard[index] = playerIndex;

      setBoard(newBoard);
      setEmptyFields((prevState) => prevState - 1);
      checkIfPlayerWin();

      if (emptyFields > 0) {
        computerTurn();
      }
    }
  };

  const computerTurn = () => {
    if (emptyFields > 0) {
      const index = Math.floor(Math.random() * 9);
      let newBoard = board;

      if (newBoard[index] != " ") {
        computerTurn();
      } else {
        newBoard[index] = computerIndex;

        setBoard(newBoard);
        setEmptyFields((prevState) => prevState - 1);
        checkIfPlayerWin();
      }
    }
  };

  const checkIfPlayerWin = () => {
    if (board[0] == board[1] && board[0] == board[2] && board[0] != " ") {
      playerWon(board[0]);
    } else if (
      board[3] == board[4] &&
      board[3] == board[5] &&
      board[3] != " "
    ) {
      playerWon(board[3]);
    } else if (
      board[6] == board[7] &&
      board[6] == board[8] &&
      board[6] != " "
    ) {
      playerWon(board[6]);
    } else if (
      board[0] == board[3] &&
      board[0] == board[6] &&
      board[0] != " "
    ) {
      playerWon(board[0]);
    } else if (
      board[1] == board[4] &&
      board[1] == board[7] &&
      board[1] != " "
    ) {
      playerWon(board[1]);
    } else if (
      board[2] == board[5] &&
      board[2] == board[8] &&
      board[2] != " "
    ) {
      playerWon(board[2]);
    } else if (
      board[0] == board[4] &&
      board[0] == board[8] &&
      board[0] != " "
    ) {
      playerWon(board[0]);
    } else if (
      board[2] == board[4] &&
      board[2] == board[6] &&
      board[2] != " "
    ) {
      playerWon(board[2]);
    } else if (emptyFields == 0) {
      alert("Draw");

      handleNewGame();
    }
  };

  const playerWon = (index: string) => {
    let playerName: string;
    if (name) playerName = name;
    else playerName = "Player";

    if (player) {
      if (index == "X") {
        alert(`${playerName} won`);
        setPlayerScore(playerScore + 1);
      } else {
        alert(`computer won`);
        setComputerScore(computerScore + 1);
      }
    } else {
      if (index == "O") {
        alert(`${playerName} won`);
        setPlayerScore(playerScore + 1);
      } else {
        alert(`computer won`);
        setComputerScore(computerScore + 1);
      }
    }

    handleNewGame();
  };

  const handleReset = () => {
    setComputerScore(0);
    setPlayerScore(0);
  };

  const handleNewGame = async () => {
    setBoard((prevStage) => [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    setEmptyFields((prevState) => 8);
  };

  useEffect(() => {
    if (player) {
      setPlayerIndex("X");
      setComputerIndex("O");
    } else {
      setPlayerIndex("O");
      setComputerIndex("X");
    }
  }, []);

  useEffect(() => {
    if (emptyFields === 8) {
      if (computerIndex == "X") {
        computerTurn();
      }
    }
  }, [computerIndex, board]);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondry]}
      style={styles.safeArea}
    >
      <ImageBackground
        source={require("../assets/bg2.jpg")}
        resizeMode="cover"
        style={styles.safeArea}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.turnText}>
            {name ? `${name} your turn` : "Player your turn"}
          </Text>
          <View style={styles.scores}>
            <Text style={styles.scoresText}>
              {name ? `${name}:` : "Player:"}
            </Text>
            <Text style={styles.scoresText}>{playerScore}</Text>
          </View>
          <View style={styles.scores}>
            <Text style={styles.scoresText}>Computer:</Text>
            <Text style={styles.scoresText}>{computerScore}</Text>
          </View>
          <View style={styles.gameConteiner}>
            <Image
              source={require("../assets/bg3.png")}
              style={styles.gameImage}
            />
            <FlatList
              style={styles.list}
              data={board}
              numColumns={3}
              extraData={refItems}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.itemBox}
                  onPress={() => pressField(index)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.buttons}>
            <Pressable onPress={handleNewGame} style={styles.newGameButton}>
              <Text style={styles.newGameButtonText}>New Game</Text>
            </Pressable>
            <Pressable onPress={handleReset} style={styles.newGameButton}>
              <Text style={styles.newGameButtonText}>Reset Score</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default GamePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.15,
  },

  turnText: {
    margin: 10,
    marginBottom: 20,
    color: Colors.fontPrimary,
    fontSize: 30,
  },

  scores: {
    marginLeft: 30,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  scoresText: {
    color: Colors.fontPrimary,
    fontSize: 20,
  },

  gameConteiner: {
    width: 600,
    height: 450,
    marginBottom: 0,
  },

  gameImage: {
    width: 500,
    height: 500,
    position: "absolute",
    left: -42,
  },

  list: {
    width: 400,
    height: 400,
    marginTop: 60,
    marginLeft: 28,
  },

  itemBox: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    color: Colors.fontsecondry,
    fontSize: 80,
  },

  buttons: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  newGameButton: {
    justifyContent: "center",
    alignSelf: "center",
    width: 150,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },

  newGameButtonText: {
    color: Colors.fontPrimary,
    textAlign: "center",
  },
});
