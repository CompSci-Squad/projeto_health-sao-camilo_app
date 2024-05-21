import { Stack } from "expo-router";

export default function ExamsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="appointmentsHome"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
