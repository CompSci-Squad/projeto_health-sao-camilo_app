import { Box, FlatList, HStack, Heading, Spinner, Text } from "@gluestack-ui/themed";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { getHomeDetailInformation } from "../../../utils/functions/home/getHomeDetailInformation";
import { useUserStore } from "../../../utils/stores/userStore";
import { ScrollView } from "react-native";
import { PostgrestResponse } from '@supabase/supabase-js'

const HomeDetailsScreen = () => {
  const { homeDetails: type } = useGlobalSearchParams();
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
    <ScrollView>
      <Box py="$10">
        <Heading size="xl" p="$4" pb="$3">
          Histórico de {}
        </Heading>
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="$1"
              borderColor="$trueGray800"
              $dark-borderColor="$trueGray100"
              $base-pl={0}
              $base-pr={0}
              $sm-pl="$4"
              $sm-pr="$5"
              py="$2"
            >
              <HStack space="md" justifyContent="space-between">
                <Avatar size="md">
                  <AvatarImage source={{ uri: item.avatarUrl }} />
                </Avatar>
                <VStack>
                  <Text
                    color="$coolGray800"
                    fontWeight="$bold"
                    $dark-color="$warmGray100"
                  >
                    {item.fullName}
                  </Text>
                  <Text color="$coolGray600" $dark-color="$warmGray200">
                    {item.recentText}
                  </Text>
                </VStack>
                <Text
                  fontSize="$xs"
                  color="$coolGray800"
                  alignSelf="flex-start"
                  $dark-color="$warmGray100"
                >
                  {item.timeStamp}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </ScrollView>
  );
};

export default HomeDetailsScreen;
