import { Stack } from "expo-router";

export default function Home() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Screen
        name="test"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
