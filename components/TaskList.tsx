import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Task from "./Task";

type Task = {
  title: string;
  description: string;
};

type props = {
  oldTask?: Task;
  addTask: (task: Task) => void;
  onRequestClose: () => void;
  visible: boolean;
};

export default function TaskList() {
  return (
    <View></View>
    // <View key={index} onPress={() => handleTaskClick(task)}>
    //   <Task text={task.title} />
    // </View>
  );
}
