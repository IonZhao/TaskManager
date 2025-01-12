import { Text, View, StyleSheet, Keyboard } from "react-native";
import Task from "@/components/Task";
import { Link, router } from "expo-router";

import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function Index() {
  // current task
  const [task, setTask] = useState<string>("");
  // all tasks
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = () => {
    // let the keyboard disappear
    Keyboard.dismiss();
    // add the task to the tasks array
    setTasks([...tasks, task]);
    setTask("");
    // console.log(task);
  };

  const handleCompleteTask = (index: number) => {
    // Copy the tasks array
    let newTasks = [...tasks];
    // Remove the task at the given index
    newTasks.splice(index, 1);
    // Update the tasks array
    setTasks(newTasks);
  };

  const handleUpdateTask = (index: number, text: string) => {
    // Copy the tasks array
    let newTasks = [...tasks];
    // Update the task at the given index
    newTasks[index] = text;
    // Update the tasks array
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* <Task text="Task1 paramasd asdas asdasdasdsdadasdasddssssss" />
          <Task text="Task2" /> */}

          {tasks.map((task, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => router.push("/modal")}
              >
                <Task text={task} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => onAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity> */}

        <Link href="/modal" style={styles.addWrapper}>
          Open modal
        </Link>
      </KeyboardAvoidingView>
      {/* <EditTask modalVisible={modalVisible} onCloseModal={onCloseModal} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
