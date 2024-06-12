import {
  Box,
  FlatList,
  HStack,
  Heading,
  Spinner,
  Text,
  ScrollView,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import { PostgrestResponse } from "@supabase/supabase-js";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useCallback, useState } from "react";

import HomeDetailsCard from "../../../components/HomeDetailsCard";
import ReturnButton from "../../../components/ReturnButton";
import ScreenContainer from "../../../components/ScreenContainer";
import { getHomeDetailInformation } from "../../../utils/functions/home/getHomeDetailInformation";
import { useUserStore } from "../../../utils/stores/userStore";

const determineText = (text: string) => {
  switch (text) {
    case "HEIGHT":
      return "Altura";
    case "WEIGHT":
      return "Peso";
    case "PRESSURE":
      return "Pressão";
    case "GLUCOSE":
      return "Glicose";
    case "IMC":
      return "IMC";
    default:
      break;
  }
};

const HomeDetailsScreen = () => {
  const { homeDetails: type } = useGlobalSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>();

  const fetchInfo = async () => {
    setIsLoading(true);
    const response = await getHomeDetailInformation(user?.id, type);
    setResults(response.status === 200 ? response.data : null);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchInfo();
    }, []),
  );

  if (isLoading)
    return (
      <HStack space="sm" flex={1} alignItems="center" justifyContent="center">
        <Spinner color="$hospitalGreen" />
        <Text size="md">Aguarde</Text>
      </HStack>
    );
  console.log(results);

  return (
    <ScreenContainer>
      <ReturnButton back={router.back} />
      <Box pb="$5" pt="$2" flex={1} alignItems="center" justifyContent="center">
        <Heading size="xl" p="$4" pb="$2">
          Histórico de {determineText(type as string)}
        </Heading>
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <Box $base-pl={0} $base-pr={0} $sm-pl="$4" $sm-pr="$5" py="$2">
              <HomeDetailsCard type={type as any} info={item} />
            </Box>
          )}
          keyExtractor={(item) => item.created_at.toString()}
        />

        {type !== "IMC" ? (
          <Button
            bgColor="$hospitalGreen"
            borderRadius="$full"
            size="lg"
            onPress={() =>
              router.push({
                pathname: "/createNewRecord",
                params: { type },
              })
            }
          >
            <Icon as={PlusIcon} color="$white" size="md" />
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </ScreenContainer>
  );
};

export default HomeDetailsScreen;
