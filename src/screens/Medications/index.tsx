import {
  Box,
  Button,
  FlatList,
  HStack,
  Icon,
  Spinner,
  Text,
} from "@gluestack-ui/themed";
import { useFocusEffect, useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useCallback, useState } from "react";

import { getMedications } from "../../utils/functions/medications/getMedications";
import { useUserStore } from "../../utils/stores/userStore";

import MedicationsCard from "@/components/MedicationsCard";
import ScreenContainer from "@/components/ScreenContainer";

const MedicationsHome = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const fetchMedications = async () => {
    setIsLoading(true);
    const response = await getMedications(user?.id!);
    setData(response ?? null);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedications();
    }, []),
  );

  if (isLoading)
    return (
      <HStack space="sm" flex={1} alignItems="center" justifyContent="center">
        <Spinner color="$hospitalGreen" />
        <Text size="md">Aguarde</Text>
      </HStack>
    );

  return (
    <ScreenContainer>
      <Box flex={1} alignItems="center" justifyContent="center">
        <FlatList
          data={data}
          renderItem={({ item }: { item: any }) => (
            <MedicationsCard
              name={item.name}
              dosage={item.dosage}
              endDate={item.endDate}
              isContinuos={item.isContinuos}
              interval={item.interval_in_minutes / 60}
              id={item.id}
              fetchMedications={fetchMedications}
            />
          )}
          keyExtractor={(item: any) => item.id}
        />
        <Box
          display="flex"
          flexDirection="column-reverse"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            mb="$4"
            bgColor="$hospitalGreen"
            borderRadius="$full"
            onPress={() => router.navigate("/createMedications")}
          >
            <Icon as={PlusIcon} color="$white" size="lg" />
          </Button>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default MedicationsHome;
