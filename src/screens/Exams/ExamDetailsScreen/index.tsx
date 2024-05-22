import { Box, HStack, Heading, Spinner, Text } from "@gluestack-ui/themed";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import ScreenContainer from "../../../components/ScreenContainer";
import { getExam } from "../../../utils/functions/exams/getExam";
import dayjs from "dayjs";

const ExamDetailsScreen = () => {
  const { examId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    category: string | null;
    created_at: string;
    exam_file_name: string | null;
    exam_url: string | null;
    id: string;
    user_id: string | null;
  } | null>();

  const fetchExam = async () => {
    setIsLoading(true);
    const response = await getExam(examId as string);
    setData(response);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchExam();
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
    <ScreenContainer>{data && data.exam_url ? (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading>Nome do arquivo: {data.exam_file_name}</Heading>
        <Heading>Data: {dayjs(data.created_at).format('DD/MM/YYYY')}</Heading>
        <Heading>Categoria: {data.category}</Heading>
        
      </Box>
    ) : <></>}</ScreenContainer>
  );
};

export default ExamDetailsScreen;
