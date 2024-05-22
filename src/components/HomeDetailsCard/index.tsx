import { Card, HStack, Heading, VStack } from "@gluestack-ui/themed";
import dayjs from "dayjs";

import { classifyIMC } from "../../utils/functions/home/classifiers";

type HomeDetailsCardProps = {
  type: "HEIGHT" | "WEIGHT" | "PRESSURE" | "GLUCOSE" | "IMC";
  info: any;
};

const HomeDetailsCard: React.FC<HomeDetailsCardProps> = ({ type, info }) => {
  console.log(info);
  if (type === "HEIGHT") {
    return (
      <Card borderColor="$hospitalGreen" borderWidth={2}>
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Heading>{dayjs(info.created_at).format("DD/MM/YYYY")}</Heading>
          <HStack>
            <Heading>Altura: {info.value}cm</Heading>
          </HStack>
        </VStack>
      </Card>
    );
  } else if (type === "WEIGHT") {
    return (
      <Card borderColor="$hospitalGreen" borderWidth={2}>
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Heading>{dayjs(info.created_at).format("DD/MM/YYYY")}</Heading>
          <HStack>
            <Heading>Peso: {info.value}kg</Heading>
          </HStack>
        </VStack>
      </Card>
    );
  } else if (type === "IMC") {
    return (
      <Card borderColor={classifyIMC(info.value)?.color} borderWidth={2}>
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Heading>{dayjs(info.created_at).format("DD/MM/YYYY")}</Heading>
          <HStack space="md">
            <Heading>IMC: {info.value}</Heading>
            <Heading>Status: {classifyIMC(info.value)?.status}</Heading>
          </HStack>
        </VStack>
      </Card>
    );
  } else if (type === "GLUCOSE") {
    return (
      <Card>
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Heading>{dayjs(info.created_at).format("DD/MM/YYYY")}</Heading>
          <HStack>
            <Heading>Glicose: {info.value}</Heading>
          </HStack>
        </VStack>
      </Card>
    );
  }
};

export default HomeDetailsCard;
