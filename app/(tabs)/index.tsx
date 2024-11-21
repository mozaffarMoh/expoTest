import { Text, StyleSheet, View } from "react-native";
import { squaresArray } from "../../constants/squaresArray";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function HomeScreen() {
  const [operator, setOperator]: any = React.useState(null);
  const [isNumberTurn, setIsNumberTurn] = React.useState(true);
  const [numbers, setNumbers] = React.useState([0]);
  const [fullNumber, setFullNumber]: any = React.useState("0");
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult]: any = React.useState(0);

  const showSymbol = (item: any) => {
    if (item === "erase") {
      return <TabBarIcon name="arrow-back" size={20} />;
    } else {
      return <Text style={styles.symbolText}>{item}</Text>;
    }
  };

  const calcResult = () => {
    const num = Number(fullNumber);
    switch (operator) {
      case "+":
        result === 0
          ? setResult(Number(numbers.slice(-1)) + num)
          : setResult((prev: any) => prev + num);
        break;
      case "-":
        result === 0
          ? setResult(Number(numbers.slice(-1)) - num)
          : setResult((prev: any) => prev - num);
        break;
      case "x":
        result === 0
          ? setResult(Number(numbers.slice(-1)) * num)
          : setResult((prev: any) => prev * num);
        break;
      case "/":
        result === 0
          ? setResult(Number(numbers.slice(-1)) / num)
          : setResult((prev: any) => prev / num);
        break;

      default:
        null;
    }

    setShowResult(true);
    setFullNumber("0");
  };

  const calcPercent = () => {
    const num = Number(fullNumber);
    const lastValue = Number(numbers.slice(-1));
    if (result === 0) {
      setResult((lastValue * num) / 100);
    } else {
      setResult((prev: any) => (prev * num) / 100);
    }
    setShowResult(true);
    setFullNumber("0");
  };

  const calcSquared = () => {
    const num = Number(fullNumber);
    if (result === 0) {
      setResult(num ** 2);
    } else {
      setResult((prev: any) => prev ** 2);
    }
    setShowResult(true);
  };

  const calcdivisionByOne = () => {
    const num = Number(fullNumber);
    result === 0 ? setResult(1 / num) : setResult((prev: any) => 1 / prev);
    setShowResult(true);
  };

  const calcSqrt = () => {
    const num = Number(fullNumber);
    result === 0
      ? setResult(Math.sqrt(num))
      : setResult((prev: any) => Math.sqrt(prev));
    setShowResult(true);
  };

  const clearAll = () => {
    setFullNumber("0");
    setNumbers([0]);
    setOperator(null);
    setResult(0);
    setShowResult(false);
  };

  const handleClick = (e: any) => {
    const key = e.nativeEvent.key;
    if (key) {
      let keyCodeAsNumber = Number(key);
      let keyCodeAsString = String(key);

      if (key === "+" || key === "-" || key === "*" || key === "/") {
        key === "*" ? setOperator("x") : setOperator(key);
        setIsNumberTurn(false);
      } else if ((keyCodeAsNumber >= 0 && keyCodeAsNumber <= 9) || key == ".") {
        if (isNumberTurn) {
          setShowResult(false);
          if (
            (key == "." && !fullNumber.includes(".")) ||
            keyCodeAsString != "."
          ) {
            setFullNumber((prev: any) => prev + keyCodeAsString);
          }

          if (fullNumber[0] == "0") {
            setFullNumber(keyCodeAsString);
          }
        }
      } else if (key == "Enter" || key == "=") {
        calcResult();
      } else if (key == "Delete") {
        clearAll();
      } else if (key == "Backspace") {
        if (fullNumber !== "0") {
          setFullNumber(fullNumber.slice(0, fullNumber.length - 1));
        }
      }
    } else {
      const innerHTML = e.target.innerHTML;
      if ((innerHTML >= 0 && innerHTML <= 9) || innerHTML == ".") {
        if (isNumberTurn) {
          setShowResult(false);
          if (
            (innerHTML == "." && !fullNumber.includes(".")) ||
            innerHTML !== "."
          ) {
            setFullNumber((prev: any) => prev + innerHTML);
          }
          if (fullNumber[0] == "0") {
            setFullNumber(innerHTML);
          }
        }
      } else if (innerHTML == "+/-") {
        setFullNumber(-fullNumber);
      } else if (innerHTML == "=") {
        calcResult();
      } else if (innerHTML == "C" || innerHTML == "CE") {
        clearAll();
      } else if (innerHTML.includes("path")) {
        if (fullNumber !== "0") {
          setFullNumber(fullNumber.slice(0, fullNumber.length - 1));
        }
      } else if (innerHTML == "%") {
        calcPercent();
      } else if (innerHTML == "1/x") {
        calcdivisionByOne();
      } else if (innerHTML == "x²") {
        calcSquared();
      } else if (innerHTML == "2√x") {
        calcSqrt();
      } else {
        setOperator(innerHTML);
        setIsNumberTurn(false);
      }
    }
  };
  const handlePress = (item: any) => {
    if ((item >= 0 && item <= 9) || item == ".") {
      if (isNumberTurn) {
        setShowResult(false);
        if ((item == "." && !fullNumber.includes(".")) || item !== ".") {
          setFullNumber((prev: any) => (prev === "0" ? item : prev + item));
        }
      }
    } else if (item == "+/-") {
      setFullNumber((prev: any) => (-prev).toString());
    } else if (item == "=") {
      calcResult();
    } else if (item == "C" || item == "CE") {
      clearAll();
    } else if (item == "erase") {
      if (fullNumber !== "0") {
        setFullNumber(fullNumber.slice(0, -1) || "0");
      }
    } else if (item == "%") {
      calcPercent();
    } else if (item == "1/x") {
      calcdivisionByOne();
    } else if (item == "x²") {
      calcSquared();
    } else if (item == "2√x") {
      calcSqrt();
    } else {
      setOperator(item);
      setIsNumberTurn(false);
    }
  };

  React.useEffect(() => {
    if (fullNumber.length == 0) {
      setFullNumber("0");
    }
  }, [fullNumber.length]);

  React.useEffect(() => {
    if (!isNumberTurn) {
      setNumbers((prev) => [...prev, Number(fullNumber)]);
      setFullNumber("0");
      setIsNumberTurn(true);
    }
  }, [isNumberTurn]);

  const showResultOrFullNumber = () => {
    let resultString = String(result);
    if (showResult) {
      if (resultString.length > 12) {
        return resultString.slice(0, 12) + "...";
      } else if (resultString === "Infinity") {
        resultString = "Cannot divide by zero";
        return resultString;
      } else {
        return resultString;
      }
    } else {
      return fullNumber;
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.app}>
        <View style={styles.result}>
          {operator && result != "Infinity" && (
            <View style={styles.flexEnd}>
              <Text style={styles.resultText}>
                {result ? result : numbers.slice(-1)}
              </Text>
              <Text style={styles.resultText}>{operator}</Text>
            </View>
          )}
          <View style={styles.flexEndItemsEnd}>
            {result == "Infinity" ? (
              <Text style={styles.resultInfinity}>
                {showResultOrFullNumber()}
              </Text>
            ) : (
              <Text style={styles.resultNumber}>
                {showResultOrFullNumber()}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.squares}>
          {squaresArray.map((item: any, index: number) => (
            <TouchableOpacity
              style={[styles.square, item == "=" && styles.equalBg]}
              key={index}
              onPress={() => handlePress(item)}
            >
              {showSymbol(item)}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles: any = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "rgb(2, 49, 21)",
    alignItems: "center",
    justifyContent: "center",
  },
  result: {
    width: 380,
    height: 120,
    textAlign: "right",
    fontSize: 30,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
  resultText: {
    fontSize: 17,
    color: "rgb(211, 209, 209)",
  },
  resultInfinity: {
    fontSize: 20,
    color: "white",
  },
  resultNumber: {
    fontSize: 24,
    color: "white",
  },
  squares: {
    width: 380,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    width: 91,
    height: 65,
    backgroundColor: "#f5f5f5",
    color: "darkblue",
    borderRadius: 10,
    margin: 2,
    fontWeight: "300",
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  equalBg: {
    backgroundColor: "#a3fc1e",
  },
  flexEnd: {
    alignItems: "flex-end",
  },
  flexEndItemsEnd: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
