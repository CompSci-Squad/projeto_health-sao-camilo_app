import { Button, Text, View, FlatList } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

import MedicationsCard from "@/components/MedicationsCard";

type Medication = {
  name: string;
  time: string;
  endDate: string;
};

export default function MedicationsHome() {
  const data: Medication[] = [
    {
      name: "Task 1",
      time: "2024-04-25T10:40:00Z",
      endDate: "2024-04-25T12:00:00Z",
    },
    {
      name: "Task 2",
      time: "2024-04-25T14:30:00Z",
      endDate: "2024-04-25T16:00:00Z",
    },
    {
      name: "Task 3",
      time: "2024-04-26T09:15:00Z",
      endDate: "2024-04-26T10:30:00Z",
    },
  ];
  return (
    <View>
      <Text>Medicações</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MedicationsCard
            name={item.name}
            time={item.time}
            endDate={item.endDate}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
