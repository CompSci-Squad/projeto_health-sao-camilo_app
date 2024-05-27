import {
  Button,
  Card,
  HStack,
  Heading,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { ArrowRightCircle } from "lucide-react-native";

type AppointmentCardProps = {
  id: string;
  date: string;
  address: {
    street: string;
    number: string;
  };
  specialty: string;
};

const AppointmentsCard: React.FC<AppointmentCardProps> = ({
  date,
  address,
  specialty,
  id,
}) => {
  const router = useRouter();
  return (
    <Card
      mt="$5"
      width="$80"
      height="$40"
      borderColor="$hospitalGreen"
      borderWidth={2}
      borderRadius="$2xl"
    >
      <HStack flex={1} justifyContent="center" alignItems="center">
        <VStack>
          <Heading>{specialty}</Heading>
          <Heading>
            {dayjs(date).format("DD/MM/YYYY")} as {dayjs(date).format("HH:mm")}
          </Heading>
          <Heading>
            {address.street}, {address.number}
          </Heading>
        </VStack>

        <Button
          onPress={() =>
            router.push({
              pathname: "/(tabs)/appointments/appointmentDetails",
              params: { appointmentId: id },
            })
          }
          ml="$10"
          bgColor="$hospitalGreen"
          borderRadius="$full"
        >
          <Icon as={ArrowRightCircle} color="$white" />
        </Button>
      </HStack>
    </Card>
  );
};

export default AppointmentsCard;
