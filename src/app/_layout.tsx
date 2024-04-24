import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router/stack";

export default function AppLayout() {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
