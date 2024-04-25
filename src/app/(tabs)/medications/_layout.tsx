import { Stack } from "expo-router";

export default function MedicationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="medicationsHome"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
