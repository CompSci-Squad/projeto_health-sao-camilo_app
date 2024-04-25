import { Button, Text, View, FlatList, Box } from "@gluestack-ui/themed";
import { format } from "date-fns";
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
    // {
    //   name: "Task 2",
    //   time: "2024-04-25T14:30:00Z",
    //   endDate: "2024-04-25T16:00:00Z",
    // },
    // {
    //   name: "Task 3",
    //   time: "2024-04-26T09:15:00Z",
    //   endDate: "2024-04-26T10:30:00Z",
    // },
  ];
  return (
    <View marginTop="$0">
      <Text
        p="$5"
        bg="$green400"
        color="white"
        textAlign="center"
        fontSize="$lg"
      >
        Medicações
      </Text>
      <Box bg="rgba(128, 128, 128, 0.5)" p="$5" m="$4" rounded="$3xl">
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MedicationsCard
              name={`Nome: ${item.name}`}
              time={`Horario: ${format(new Date(item.time), "dd/MM/yyyy - HH:mm")}`}
              endDate={`Fim: ${format(new Date(item.endDate), "dd/MM/yyyy - HH:mm")}`}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </Box>
    </View>
  );
}
