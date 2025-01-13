import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Keyboard } from "react-native";

type Task = {
  title: string;
  description: string;
  status: boolean;
  index: number;
};

type props = {
  oldTask?: Task;
  addTask: (task: Task) => void;
  updateTask: (index: number, task: Task) => void;
  onRequestClose: () => void;
  visible: boolean;
};

export default function CustomModal({
  oldTask,
  addTask,
  updateTask,
  onRequestClose,
  visible,
}: props) {
  const [task, setTask] = useState<Task>(
    oldTask || { title: "", description: "", status: false, index: -1 }
  );
  // const [task, setTask] = useState<Task>(
  //   oldTask || { title: "", description: "" }
  // );

  // if the props change, update the task
  useEffect(() => {
    if (oldTask) {
      setTask(oldTask);
    }
  }, [oldTask]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      {/* <BodyScrollView></BodyScrollView> */}
      {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
      <View style={styles.modalContent}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={styles.button}
              onPress={() => {
                onRequestClose();
                console.log("Cancel Task");
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Text style={styles.title}>Details</Text>

            <Pressable
              style={styles.button}
              onPress={() => {
                console.log("Done Task");
                if (task.title !== "") {
                  if (task.index !== -1) {
                    updateTask(task.index, task);
                  } else {
                    addTask(task);
                  }
                  setTask({
                    title: "",
                    description: "",
                    status: false,
                    index: -1,
                  });
                } else {
                  alert("Task title cannot be empty");
                }
                onRequestClose();
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>

          {/* <Text>Title2</Text> */}
          <TextInput
            style={styles.input}
            placeholder={"Task Title"}
            onChangeText={(text) => setTask({ ...task, title: text })}
            value={task.title}
            autoFocus={task.index === -1}
          />

          {/* <Text>Description</Text> */}
          <TextInput
            style={styles.inputDescription}
            placeholder={"Description"}
            onChangeText={(text) => setTask({ ...task, description: text })}
            multiline={true}
            // numberOfLines={20}
            value={task.description}
            // returnKeyType="done"
            // onSubmitEditing={() => Keyboard.dismiss()} // Ensure keyboard is dismissed
          />
        </ScrollView>
      </View>

      {/* </ScrollView> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    backgroundColor: "#FFF",
    top: "5%",
    padding: 15,
    borderRadius: 10,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "space-between",
    // marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "#f8f8f8",
    alignItems: "center",
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,

    // backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "#007aff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },

  input: {
    height: 60,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    fontSize: 20,
  },
  inputDescription: {
    fontSize: 20,
    height: 400,
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    // width: 250,
    backgroundColor: "#FFF",
    // backgroundColor: "red",
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    // height: 1000,
  },
  scrollView: {
    backgroundColor: "pink",
  },
  container: {
    flex: 1,
  },

  // scrollViewContent: {
  //   flexGrow: 1,
  //   justifyContent: "center",
  // },
});
