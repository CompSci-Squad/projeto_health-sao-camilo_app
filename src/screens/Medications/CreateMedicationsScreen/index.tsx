import {
  Box,
  Button,
  SelectBackdrop,
  Select,
  SelectContent,
  SelectInput,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectIcon,
  SelectTrigger,
  SelectPortal,
  ChevronDownIcon,
  Center,
  FormControl,
  HStack,
  Icon,
  Input,
  InputField,
  Spinner,
  Text,
  useToast,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { PlusCircleIcon, XCircle } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import CustomToast from "../../../components/CustomToast";
import ScreenContainer from "../../../components/ScreenContainer";
import { createMedications } from "../../../utils/functions/medications/createMedications";
import { useUserStore } from "../../../utils/stores/userStore";

const CreateMedicationScreen = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const status = await createMedications({
      name: data.name,
      dosage: data.dosage,
      interval_in_hours: data.interval_in_minutes,
      final_date: data.final_date,
      is_continuos: data.is_continuos,
      userId: user?.id!,
    });

    if (status === 201) {
      toast.show({
        duration: 4000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="Sucesso"
            message="Medicamento criado com sucesso"
            action="success"
          />
        ),
        onCloseComplete: () => {
          setIsLoading(false);
          router.back();
        },
      });
    } else {
      toast.show({
        duration: 4000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="Erro"
            message="Erro ao criar medicamento"
            action="error"
          />
        ),
        onCloseComplete: () => {
          setIsLoading(false);
        },
      });
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
      <Center flex={1} alignItems="center" justifyContent="center">
        <Box w="$80">
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                >
                  <InputField
                    placeholder="Nome do Medicamento"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="name"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                >
                  <InputField
                    placeholder="Dosagem"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="dosage"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                >
                  <InputField
                    placeholder="Intervalo em Horas"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="interval_in_minutes"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                >
                  <InputField
                    placeholder="Data Final"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="final_date"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <Select onValueChange={onChange} mt="$3">
                  <SelectTrigger
                    variant="rounded"
                    borderColor="$hospitalGreen"
                    borderWidth="$2"
                  >
                    <SelectInput placeholder="É Continuo" />
                    <SelectIcon marginRight="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {["Sim", "Não"].map((genero) => (
                        <SelectItem
                          label={genero}
                          value={genero}
                          key={genero}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
            )}
            name="is_continuos"
            rules={{ required: true }}
          />
        </Box>
        <HStack mt="$12" space="lg">
          <Button onPress={() => router.back()} bgColor="$red">
            <Icon as={XCircle} size="lg" color="$white" />
          </Button>
          <Button onPress={handleSubmit(onSubmit)} bgColor="$hospitalGreen">
            <Icon as={PlusCircleIcon} size="lg" color="$white" />
          </Button>
        </HStack>
      </Center>
    </ScreenContainer>
  );
};

export default CreateMedicationScreen;
