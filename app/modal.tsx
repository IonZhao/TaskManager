import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { router } from "expo-router";
export default function Modal() {
  const [task, setTask] = useState<string>("");
  return (
    <View>
      <View style={styles.modalContent}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("Done Task");
          }}
        >
          <Text style={styles.textStyle}>Done</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            router.back();
            console.log("Cancel Task");
          }}
        >
          <Text style={styles.textStyle}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 20,
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
});
