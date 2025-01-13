import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="modal"
        options={{
          headerTitle: "Details",
          // title: "Modal",
          // headerShown: false,
          presentation: "modal",

          headerShown: false,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
