import {
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
} from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import HomeCard from "../../../components/HomeCard";
import ScreenContainer from "../../../components/ScreenContainer";
import { getHomeInformation } from "../../../utils/functions/home/getHomeInformation";
import { useUserStore } from "../../../utils/stores/userStore";

const HomeScreen = () => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState<number | null>();
  const [weight, setWeight] = useState<number | null>();
  const [pressure, setPressure] = useState<any>();
  const [glucose, setGlucose] = useState<number | null>();
  const [imc, setImc] = useState<number>();

  const info = [
    {
      text: "Ultima aferição de glicose",
      value: glucose,
      type: "GLUCOSE",
    },
    {
      text: "Ultima aferição de altura",
      value: height,
      type: "HEIGHT",
    },
    {
      text: "Ultima aferição de peso",
      value: weight,
      type: "WEIGHT",
    },
    {
      text: "Ultima aferição de pressão",
      value: pressure,
      type: "PRESSURE",
    },
    {
      text: "Ultima aferição de IMC",
      value: imc,
      type: "IMC",
    },
  ];

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const responses = (await getHomeInformation(user!.id)) ?? [];
      setGlucose(responses[0]);
      setHeight(responses[1]);
      setWeight(responses[2]);
      setPressure(responses[3]);
      setImc((responses[2] / (responses[1] / 100) ** 2).toFixed(2));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
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
      <Center flex={1} alignItems="center" justifyContent="center">
        {info.map(({ text, value, type }) => (
          <HomeCard text={text} info={value} key={text} type={type} />
        ))}
      </Center>
    </ScreenContainer>
  );
};

export default HomeScreen;
