import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Spinner,
  Text,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import ReturnButton from "../../../components/ReturnButton";
import ScreenContainer from "../../../components/ScreenContainer";
import { useUserStore } from "../../../utils/stores/userStore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createExam } from "../../../utils/functions/exams/createExam";

const CreateExamScreen = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [exam, setExam] = useState<any>(null);

  const { control, handleSubmit } = useForm();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.canceled) {
      setIsLoading(false);
      return;
    }

    try {
      const fileUri = result.assets[0].uri;
      const base64String = await readPdfAsBase64(fileUri);
      setExam({ base64: base64String, name: result.assets[0].name });
      setIsLoading(false);
      console.log("Base64 encoded PDF:", base64String);
    } catch (error) {
      console.error("Error reading PDF:", error);
    }
  };

  const readPdfAsBase64 = async (fileUri: string) => {
    const readFile = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return readFile;
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await createExam(
        user?.id!,
        data.category,
        exam.base64,
        exam.name,
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
      <Center
        flex={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl>
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                  mt="$3"
                >
                  <InputField
                    placeholder="Categoria"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="category"
            rules={{ required: true }}
          />

          <Button onPress={() => pickDocument()}>
            <ButtonText>Selecionar arquivo do exame</ButtonText>
          </Button>

          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Upload exame</ButtonText>
          </Button>
        </Box>
      </Center>
    </ScreenContainer>
  );
};

export default CreateExamScreen;
