import {
  Button,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  Icon,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Trash } from "lucide-react-native";
import { useCallback, useState } from "react";

import ReturnButton from "../../../components/ReturnButton";
import ScreenContainer from "../../../components/ScreenContainer";
import { deleteAppointment } from "../../../utils/functions/appointments/deleteAppointment";
import { getAppointment } from "../../../utils/functions/appointments/getAppointment";

const AppointmentDetailsScreen = () => {
  const { appointmentId } = useLocalSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchAppointment = async () => {
    setIsLoading(true);
    const response = await getAppointment(appointmentId as string);
    setData(response);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppointment();
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
      <ReturnButton back={router.back} />
      <VStack flex={1} justifyContent="center" alignItems="center" space="lg">
        <Heading
          borderColor="$hospitalGreen"
          borderWidth={2}
          borderRadius="$xl"
          px="$5"
          py="$2"
          bgColor="$white"
        >
          Especialidade: {data.specialty}
        </Heading>

        <HStack space="md">
          <Heading
            borderColor="$hospitalGreen"
            borderWidth={2}
            borderRadius="$xl"
            px="$5"
            py="$2"
            bgColor="$white"
          >
            Dia: {dayjs(data.date).format("DD/MM")}
          </Heading>
          <Heading
            borderColor="$hospitalGreen"
            borderWidth={2}
            borderRadius="$xl"
            px="$2"
            py="$2"
            bgColor="$white"
          >
            Horário: {dayjs(data.date).format("HH:mm")}
          </Heading>
        </HStack>
        <Heading
          borderColor="$hospitalGreen"
          borderWidth={2}
          borderRadius="$xl"
          px="$5"
          py="$2"
          bgColor="$white"
        >
          Aviso com antecedência de {data.reminder_value}{" "}
          {data.reminder_type === "HOURS" ? "horas" : "dias"}
        </Heading>
        <Button
          onPress={() => deleteAppointment(appointmentId as string)}
          borderColor="transparent"
          borderWidth={2}
          borderRadius="$xl"
          px="$5"
          bgColor="$red500"
        >
          <Icon as={Trash} size="lg" color="$white" />
        </Button>
      </VStack>
    </ScreenContainer>
  );
};

export default AppointmentDetailsScreen;
