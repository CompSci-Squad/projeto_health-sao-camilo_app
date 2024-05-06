import {
  Center,
  Text,
  Heading,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  FormControl,
  Box,
  Button,
  ButtonText,
  EyeOffIcon,
  EyeIcon,
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
  Icon,
  ChevronDownIcon,
  HStack,
  Spinner,
  useToast,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Gender } from "../../types/gender.enum";
import { SignUpFormData } from "../../types/signupForm.type";
import { useUserStore } from "../../utils/stores/userStore";
import { SignUpSchema } from "../../utils/validations/singupForm.validation";

const SignUpScreen = () => {
  const toast = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getUser, setUser } = useUserStore();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: any) => {
    

  };

  if (isLoading)
    return (
      <HStack space="sm" flex={1} alignItems="center" justifyContent="center">
        <Spinner color="$hospitalGreen" />
        <Text size="md">Aguarde</Text>
      </HStack>
    );
  return (
    <Center flex={1} justifyContent="center" alignItems="center">
      <Heading>Saúde em suas mãos</Heading>
      <Text mb="$4">Plataforma de autogerenciamento da saúde</Text>
      <Box w="$64">
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
                  placeholder="Email"
                  type="text"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </Input>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="email"
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
                mt="$3"
              >
                <InputField
                  placeholder="Senha"
                  type={showPassword ? "text" : "password"}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                <InputSlot
                  pr="$3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$black"
                  />
                </InputSlot>
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="password"
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
                mt="$3"
              >
                <InputField
                  placeholder="Nome"
                  type="text"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </Input>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="name"
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
                  <SelectInput placeholder="Select option" />
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
                    {Object.values(Gender).map((genero) => (
                      <SelectItem label={genero} value={genero} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="gender"
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
                mt="$3"
              >
                <InputField
                  placeholder="Altura em cm"
                  type="text"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </Input>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="height"
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
                mt="$3"
              >
                <InputField
                  placeholder="Peso em kg"
                  type="text"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </Input>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="weight"
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
                mt="$3"
              >
                <InputField
                  placeholder="data de nascimento"
                  type="text"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </Input>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
          name="birthDate"
          rules={{ required: true }}
        />

        <Button
          mt="$6"
          onPress={handleSubmit(onSubmit)}
          bgColor="$hospitalGreen"
        >
          <ButtonText>Login</ButtonText>
        </Button>
      </Box>
    </Center>
  );
};

export default SignUpScreen;
