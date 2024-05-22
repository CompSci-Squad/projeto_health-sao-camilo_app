import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Spinner,
  Text,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from 'expo-intent-launcher';
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import ScreenContainer from "../../../components/ScreenContainer";
import { getExam } from "../../../utils/functions/exams/getExam";

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

  const downloadFile = async () => {
    const filename = "dummy.pdf";
    const result = await FileSystem.downloadAsync(
      data?.exam_url!,
      FileSystem.documentDirectory + data?.exam_file_name!,
    );

    // Log the download result
    console.log(result);

    // Save the downloaded file
    saveFile(result.uri, data?.exam_file_name!, result.headers["content-type"]);
  };

  async function saveFile(uri, filename, mimetype) {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype,
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => console.log(e));
      await openDownloadedFile(uri);
    } else {
      console.log("não deu permissãao");
    }
  }

  const openDownloadedFile = async (uri: string) => {
    try {
      const cUri = await FileSystem.getContentUriAsync(uri);

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "application/pdf",
      });
    } catch (e) {
      console.log(e);
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

  console.log(data?.exam_url);

  if (isLoading)
    return (
      <HStack space="sm" flex={1} alignItems="center" justifyContent="center">
        <Spinner color="$hospitalGreen" />
        <Text size="md">Aguarde</Text>
      </HStack>
    );

  return (
    <ScreenContainer>
      {data && data.exam_url ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Heading>Nome do arquivo: {data.exam_file_name}</Heading>
          <Heading>Data: {dayjs(data.created_at).format("DD/MM/YYYY")}</Heading>
          <Heading>Categoria: {data.category}</Heading>
          <Button onPress={() => downloadFile()}>
            <ButtonText>Download arquivo</ButtonText>
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </ScreenContainer>
  );
};

export default ExamDetailsScreen;
