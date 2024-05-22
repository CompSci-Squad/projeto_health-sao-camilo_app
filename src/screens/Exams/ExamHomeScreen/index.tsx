import { FlatList, HStack, Spinner, Text, Box } from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import ExamCard from "../../../components/ExamCard";
import ScreenContainer from "../../../components/ScreenContainer";
import { getExams } from "../../../utils/functions/exams/getExams";
import { useUserStore } from "../../../utils/stores/userStore";

const ExamHomeScreen = () => {
  const { user } = useUserStore();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchExams = async () => {
    setIsLoading(true);
    const response = (await getExams(user!.id)) ?? [];
    setData(response);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchExams();
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
            <ExamCard
              id={item?.id}
              key={item.id}
              date={item.created_at}
              category={item.category}
              examFileName={item?.exam_file_name}
            />
          )}
          keyExtractor={(item: any) => item.created_at.toString()}
        />
      </Box>
    </ScreenContainer>
  );
};

export default ExamHomeScreen;
