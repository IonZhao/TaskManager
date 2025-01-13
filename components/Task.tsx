import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  Pressable,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";

type Task = {
  title: string;
  description: string;
  status: boolean;
  index: number;
};

type props = {
  task: Task;
  deleteTask: (index: number) => void;
  updateTask: (index: number, task: Task) => void;
  editTask: () => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH / 3;

export default function Task({
  task,
  deleteTask,
  updateTask,
  editTask,
}: props) {
  const translateX = useSharedValue(0);
  //   const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      // translateY.value = e.translationY;
    })
    .onEnd(() => {
      // translateX.value = withSpring(0);
      //   translateY

      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH);
        runOnJS(deleteTask)(task.index);
      } else {
        translateX.value = withSpring(0);
      }
    })
    .simultaneousWithExternalGesture();

  const rstyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome6 name="trash-alt" size={35} color="red" />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.item, rstyle]}>
          <Pressable
            onPress={() => {
              // console.log("Update Task");
              // console.log(task);
              updateTask(task.index, { ...task, status: !task.status });
              // console.log(task);
            }}
            style={styles.iconStatus}
          >
            {task.status === true ? (
              <Fontisto name="checkbox-active" size={24} color="black" />
            ) : (
              <Fontisto name="checkbox-passive" size={24} color="black" />
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              editTask();
              console.log("Edit Task");
            }}
          >
            <Text style={styles.itemText}>{task.title}</Text>
          </Pressable>
        </Animated.View>
      </GestureDetector>
      {/* <View style={styles.circular}></View> */}
      {/* <Text>{text}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,

    // shadow for ios
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 13 },
    shadowRadius: 10,

    padding: 15,
  },
  itemText: {
    // marginLeft: 10,
    // maxWidth: "80%",
    marginHorizontal: 10,
    width: SCREEN_WIDTH * 0.7,
    // paddingVertical: 6,
    fontSize: 16,
    paddingVertical: 11,
    // height: 70,
  },
  iconContainer: {
    height: 50,
    width: 50,
    // backgroundColor: "red",
    borderRadius: 10,
    position: "absolute",
    right: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  iconStatus: {
    // height: 50,
    width: 30,
    // backgroundColor: "red",
    // borderRadius: 10,
    // position: "absolute",
    // right: "10%",
    // justifyContent: "center",
    // alignContent: "center",
  },
});
