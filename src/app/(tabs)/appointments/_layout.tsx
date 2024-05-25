import { Stack } from "expo-router";

export default function ExamsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="appointmentsHome"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Screen
        name="appointmentDetails"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Screen
        name="createAppointment"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
