import { Stack } from "expo-router";

import MedicationsHeader from "@/components/MedicationsHeader";

export default function MedicationsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="medicationsHome"
        options={{
          navigationBarHidden: true,
          header: () => <MedicationsHeader />,
        }}
      />
    </Stack>
  );
}
