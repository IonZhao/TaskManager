import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

type Task = {
  title: string;
  description: string;
  status: string;
};

type props = {
  task?: Task;
  addTask: (task: Task) => void;
};

export default function Modal({ addTask }: props) {
  const params = useLocalSearchParams();

  const [task, setTask] = useState<Task>({
    title: params.title || "",
    description: params.description || "",
    status: params.status || "",
  });

  return (
    <View>
      {/* <Stack.Screen
        // component={Modal}
        options={{
          // title: "Task",
          headerTitle: "NewList",
        }}
      /> */}
      {/* <Pressable
        style={styles.button}
        onPress={() => {
          console.log("Done Task");
        }}
      >
        <Text style={styles.textStyle}>Done</Text>
      </Pressable> */}
      {/* <Text style={styles.textStyle}>Cancel</Text> */}
      {/* <BodyScrollView></BodyScrollView> */}
      {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
      <View style={styles.modalContent}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={styles.button}
              onPress={() => {
                router.back();
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
                addTask(task);
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
            autoFocus={task.title === ""}
          />

          {/* <Text>Description</Text> */}
          <TextInput
            style={styles.inputDescription}
            placeholder={"Description"}
            onChangeText={(text) => setTask({ ...task, description: text })}
            multiline={true}
            // numberOfLines={20}
            value={task.description}
            returnKeyLabel="Done"
          />
        </ScrollView>
      </View>

      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    // backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    // backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "blue",
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
  },
  inputDescription: {
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
