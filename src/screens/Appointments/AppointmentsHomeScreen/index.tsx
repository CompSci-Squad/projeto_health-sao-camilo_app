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

import AppointmentsCard from "../../../components/AppointmentsCard";
import ScreenContainer from "../../../components/ScreenContainer";
import { getAppointments } from "../../../utils/functions/appointments/getAppointments";
import { registerForPushNotificationsAsync } from "../../../utils/pushNotifications";
import { useUserStore } from "../../../utils/stores/userStore";

const AppointmentsHome = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  registerForPushNotificationsAsync();
  const fetchAppointments = async () => {
    setIsLoading(true);
    const response = await getAppointments(user?.id!);
    setData(response ?? null);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      registerForPushNotificationsAsync();
      fetchAppointments();
    }, []),
  );

  console.log(data);

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
            <AppointmentsCard
              date={item.date}
              address={item.address}
              specialty={item.specialty}
              id={item.id}
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
            onPress={() =>
              router.navigate("/(tabs)/appointments/createAppointment")
            }
          >
            <Icon as={PlusIcon} color="$white" size="lg" />
          </Button>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default AppointmentsHome;
