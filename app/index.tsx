import { Text, ScrollView, View, StyleSheet, Keyboard } from "react-native";
import CustomModal from "@/components/CustomModal";
import Task from "@/components/Task";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

type Task = {
  title: string;
  description: string;
  status: boolean;
  index: number;
};

const dummyTasks: Task[] = [
  {
    title: "Communicate with the professor about the project😥",
    description: "This is the first task",
    status: false,
    index: 0,
  },
  {
    title: "Email the professor about the project😊",
    description: "This is the second task",
    status: false,
    index: 1,
  },
  {
    title: "Finish CS6120 Assignment 1😁",
    description: "This is the third task",
    status: false,
    index: 2,
  },
  {
    title: "Exercise for 60 minutes🏋️",
    description: "This is the fourth task",
    status: false,
    index: 3,
  },
  {
    title: "Read a book for 30 minutes📚",
    description: "This is the fifth task",
    status: false,
    index: 4,
  },
];
export default function Index() {
  // current task
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: false,
    index: 0,
  });
  // all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setTasks(dummyTasks);
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = (task: Task) => {
    // let the keyboard disappear
    Keyboard.dismiss();
    // add the task to the tasks array
    setTasks([...tasks, { ...task, index: tasks[tasks.length - 1].index + 1 }]);
    setTask({ title: "", description: "", status: false, index: -1 });

    dummyTasks.push({ ...task, index: tasks[tasks.length - 1].index + 1 });
    // console.log(task);
  };

  const handleDeleteTask = (index: number) => {
    console.log("Delete Task" + index);
    //wait for 1 sec

    // Copy the tasks array
    // Remove the task at the given index
    let newTasks = tasks.filter((task) => task.index !== index);
    // Update the tasks array
    setTasks(newTasks);
    console.log(newTasks.length);
  };

  const handleUpdateTask = (index: number, updatedTask: Task) => {
    // Copy the tasks array
    // console.log("Update Task" + index);
    // console.log(tasks);
    // Update the task at the given index
    let newTasks = tasks.map((task) =>
      task.index === index ? updatedTask : task
    );
    // Update the tasks array
    // console.log(newTasks);
    setTasks(newTasks);
    setTask({ title: "", description: "", status: false, index: -1 });
  };

  const handleTaskClick2 = (task: Task) => {
    setTask(task);
    console.log(task);
    setModalVisible(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ScrollView style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Task Manager</Text>
        <View style={styles.queryWrapper}>
          <TextInput
            style={styles.input}
            placeholder={"Search"}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View style={styles.items}>
          {filteredTasks.map((task) => {
            return (
              // <TouchableOpacity>
              <Task
                key={task.index}
                task={task}
                deleteTask={handleDeleteTask}
                updateTask={handleUpdateTask}
                editTask={() => handleTaskClick2(task)}
              />
              // </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setTask({ title: "", description: "", status: false, index: -1 });
          }}
        >
          <View style={styles.addWrapper}>
            <Ionicons name="add-circle" size={60} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <CustomModal
        visible={modalVisible}
        addTask={handleAddTask}
        updateTask={handleUpdateTask}
        onRequestClose={() => setModalVisible(false)}
        oldTask={task}
      />

      {/* <EditTask modalVisible={modalVisible} onCloseModal={onCloseModal} /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#E8EAED",
    backgroundColor: "#FAFBFF",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    // Set the height to 80% to make the ScrollView scrollable
    height: "100%",

    // height: "100%",
    // marginBottom: 120,
    borderBlockColor: "red",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 10,
  },

  queryWrapper: {
    // position: "absolute",
    // bottom: 60,
    marginTop: 20,
    paddingVertical: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "100%",
    backgroundColor: "#FFF",
    // borderBottomColor: "red",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    fontSize: 20,
  },
  addWrapper: {
    position: "absolute",
    bottom: 20,
    width: 60,
    height: 60,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {},
});
