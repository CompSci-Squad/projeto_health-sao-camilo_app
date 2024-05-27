import { Stack } from "expo-router";

export default function ExamsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="examsHome"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Screen
        name="examsDetail"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Screen
        name="createExam"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
