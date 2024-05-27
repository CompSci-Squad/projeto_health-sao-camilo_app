import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Text,
  Spinner,
  Button,
  ButtonText,
  Heading,
  useToast,
} from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import CustomToast from "../../../components/CustomToast";
import ReturnButton from "../../../components/ReturnButton";
import ScreenContainer from "../../../components/ScreenContainer";
import { createNewRecord } from "../../../utils/functions/home/createNewRecord";
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

const CreateNewRecordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  const toast = useToast();

  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await createNewRecord(
      user?.id as any,
      type as any,
      data.value,
    );
    if (response?.status === 201) {
      toast.show({
        duration: 3000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="Registro criado com sucesso"
            action="success"
            message=""
          />
        ),
        onCloseComplete: () => {
          setIsLoading(false);
          router.back();
        },
      });
    }
    setIsLoading(false);
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
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading>Adicione um novo registro de {determineText(type)}</Heading>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error} w="$32">
              <Input
                variant="rounded"
                borderColor="$hospitalGreen"
                borderWidth="$2"
                mt="$3"
              >
                <InputField
                  placeholder="Valor"
                  type="text"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="numeric"
                />
              </Input>
            </FormControl>
          )}
          name="value"
          rules={{ required: true }}
        />

        <HStack>
          <Button mt="$6" onPress={() => router.back()} bgColor="$red500">
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button
            mt="$6"
            onPress={handleSubmit(onSubmit)}
            bgColor="$hospitalGreen"
          >
            <ButtonText>Adicionar registro</ButtonText>
          </Button>
        </HStack>
      </Box>
    </ScreenContainer>
  );
};

export default CreateNewRecordScreen;
