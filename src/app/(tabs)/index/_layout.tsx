import { Stack } from "expo-router";

export default function Home() {
  return (
    <Stack>
      <Stack.Screen
        name="homeIndex"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
