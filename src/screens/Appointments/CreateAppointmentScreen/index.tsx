import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  HStack,
  Icon,
  Input,
  InputField,
  Select,
  SelectInput,
  SelectTrigger,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectPortal,
  SelectContent,
  SelectBackdrop,
  SelectIcon,
  Spinner,
  Text,
  useToast,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { PlusCircleIcon, XCircle } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import CustomToast from "../../../components/CustomToast";
import MaskedInput from "../../../components/MaskedInput";
import ScreenContainer from "../../../components/ScreenContainer";
import { createAppointment } from "../../../utils/functions/appointments/createAppointment";
import { useUserStore } from "../../../utils/stores/userStore";

const CreateAppointmentScreen = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const address = {
      street: data.address.split(",")[0],
      number: data.address.split(",")[1],
    };
    const status = await createAppointment({
      specialty: data.specialty,
      date: data.date,
      time: data.time,
      address,
      userId: user?.id!,
      reminder_type: data.reminderType,
      reminder_value: data.reminderValue,
    });

    if (status === 201) {
      toast.show({
        duration: 4000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="Sucesso"
            message="consulta criada com sucesso"
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
            message="erro ao criar consulta"
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
                    placeholder="Especialidade"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="specialty"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <MaskedInput
                  onChangeText={(text, rawText) => onChange(text)}
                  keyboardType="numeric"
                  placeholder="data"
                  value={value}
                  mask="99/99"
                />
              </FormControl>
            )}
            name="date"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error}>
                <MaskedInput
                  onChangeText={(text, rawText) => onChange(text)}
                  keyboardType="numeric"
                  placeholder="horário"
                  value={value}
                  mask="99:99"
                />
              </FormControl>
            )}
            name="time"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mt="$4">
                <Select onValueChange={onChange} selectedValue={value}>
                  <SelectTrigger
                    variant="rounded"
                    borderColor="$hospitalGreen"
                    borderWidth="$2"
                  >
                    <SelectInput placeholder="Selecione a opção para o lembrete" />
                    <SelectIcon mr="$3">
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {["DAYS", "HOURS"].map((genero) => (
                        <SelectItem
                          label={genero === "DAYS" ? "dias" : "horas"}
                          value={genero}
                          key={genero}
                          mb={genero === "HOURS" ? "$10" : ""}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
            )}
            name="reminderType"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mt="$4">
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                >
                  <InputField
                    placeholder="Quanto tempo de antecedencia?"
                    type="text"
                    keyboardType="numeric"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="reminderValue"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl isInvalid={!!error} mt="$4">
                <Input
                  variant="rounded"
                  borderColor="$hospitalGreen"
                  borderWidth="$2"
                >
                  <InputField
                    placeholder="endereço, numero separado por virgula"
                    type="text"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </Input>
              </FormControl>
            )}
            name="address"
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

export default CreateAppointmentScreen;
