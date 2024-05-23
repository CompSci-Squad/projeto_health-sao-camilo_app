import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import ReturnButton from "../../../components/ReturnButton";
import ScreenContainer from "../../../components/ScreenContainer";
import { getExam } from "../../../utils/functions/exams/getExam";
import { supabase } from "../../../utils/supabase/supbase";

const ExamDetailsScreen = () => {
  const { examId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<{
    category: string | null;
    created_at: string;
    exam_file_name: string | null;
    exam_url: string | null;
    id: string;
    user_id: string | null;
  } | null>();
  const [exam, setExam] = useState<{ uri: string; contentType: string }>();

  const downloadFile = async () => {
    setIsLoading(true);
    const result = await FileSystem.downloadAsync(
      data?.exam_url!,
      FileSystem.documentDirectory + data?.exam_file_name!,
    );

    openFile(result.uri, result.headers["content-type"]);
  };

  const openFile = async (uri: string, contentType: string) => {
    try {
      const cUri = await FileSystem.getContentUriAsync(uri);

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: contentType,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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
    <ScreenContainer>
      <ReturnButton back={router.back} />
      {data && data.exam_url ? (
        <VStack flex={1} alignItems="center" justifyContent="center" space="lg">
          <Heading
            borderColor="$hospitalGreen"
            borderWidth={2}
            borderRadius="$xl"
            px="$5"
            py="$2"
            bgColor="$white"
          >
            Nome do arquivo: {data.exam_file_name}
          </Heading>
          <Heading
            borderColor="$hospitalGreen"
            borderWidth={2}
            borderRadius="$xl"
            px="$5"
            py="$2"
            bgColor="$white"
          >
            Data: {dayjs(data.created_at).format("DD/MM/YYYY")}
          </Heading>
          <Heading
            borderColor="$hospitalGreen"
            borderWidth={2}
            borderRadius="$xl"
            px="$5"
            py="$2"
            bgColor="$white"
          >
            Categoria: {data.category}
          </Heading>
          <Button
            onPress={() => downloadFile()}
            borderColor="$hospitalGreen"
            borderWidth={2}
            borderRadius="$xl"
            px="$5"
            bgColor="$hospitalGreen"
          >
            <ButtonText>Abrir exame</ButtonText>
          </Button>
        </VStack>
      ) : (
        <></>
      )}
    </ScreenContainer>
  );
};

export default ExamDetailsScreen;
