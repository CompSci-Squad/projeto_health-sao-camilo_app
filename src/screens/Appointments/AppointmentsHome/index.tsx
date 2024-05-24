import { Box, FlatList, HStack, Spinner, Text } from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import ScreenContainer from "../../../components/ScreenContainer";
import { getAppointments } from "../../../utils/functions/appointments/getAppointments";
import { useUserStore } from "../../../utils/stores/userStore";

const AppointmentsHome = () => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const fetchAppointments = async () => {
    setIsLoading(true);
    const response = await getAppointments(user?.id!);
    setData(response ?? null);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
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
        <FlatList />
      </Box>
    </ScreenContainer>
  );
};

export default AppointmentsHome;
