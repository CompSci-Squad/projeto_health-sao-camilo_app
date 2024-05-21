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
  ScrollView,
  Image,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm, SubmitErrorHandler } from "react-hook-form";

import CustomToast from "../../components/CustomToast";
import MaskedInput from "../../components/MaskedInput";
import ScreenContainer from "../../components/ScreenContainer";
import { SignUpFormData } from "../../types/signupForm.type";
import { signUpUser } from "../../utils/functions/signUpUser";
import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";
import { SignUpSchema } from "../../utils/validations/singupForm.validation";

const SignUpScreen = () => {
  const toast = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  const imageUri = supabase.storage
    .from("assets")
    .getPublicUrl("logoAppSao-Camilo.jpg").data.publicUrl;

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    const response = await signUpUser(data);
    if (response instanceof AuthError) {
      setIsLoading(false);
      toast.show({
        duration: 6000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="login não efetuado"
            message="login não foi efetuado, verifique os dados inseridos"
            action="error"
          />
        ),
      });
    } else if (typeof response === PostgrestError) {
      setIsLoading(false);
      toast.show({
        duration: 6000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="login não efetuado"
            message="login não foi efetuado, verifique os dados inseridos"
            action="error"
          />
        ),
      });
    } else {
      setUser(response);
      toast.show({
        duration: 6000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="cadastro efetuado"
            message="cadastro efetuado com sucesso, aguarde para ser redirecionado a pagina principal"
            action="success"
          />
        ),
        onCloseComplete: () => {
          setIsLoading(false);
          router.navigate("/(tabs)");
        },
      });
    }
  };

  const onError: SubmitErrorHandler<SignUpFormData> = (errors, e) => {
    console.log(JSON.stringify(errors));
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
      <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
        <Center flex={1} justifyContent="center" alignItems="center">
          <Image
            source={{
              uri: imageUri,
            }}
            size="lg"
            alt="logo"
          />
          <Heading>Saúde em suas mãos</Heading>
          <Text mb="$4">Plataforma de autogerenciamento da saúde</Text>
          <Box w="$64">
            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="email"
              rules={{ required: true }}
            />
            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="password"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="name"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
                        {["MALE", "FEMALE", "OTHER"].map((genero) => (
                          <SelectItem
                            label={genero}
                            value={genero}
                            key={genero}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="gender"
              rules={{ required: true }}
            />
            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl isInvalid={!!error}>
                  <MaskedInput
                    type="text"
                    onChangeText={(text, _) => onChange(text)}
                    keyboardType="numeric"
                    placeholder="Altura em cm"
                    value={value}
                    mask="999CM"
                  />

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="height"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl isInvalid={!!error}>
                  <MaskedInput
                    onChangeText={(text, rawText) => onChange(text)}
                    keyboardType="numeric"
                    placeholder="Peso em KG"
                    mask="99kg"
                    value={value}
                  />

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="weight"
              rules={{ required: true }}
            />

            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl isInvalid={!!error}>
                  <MaskedInput
                    type="date"
                    onChangeText={(text, rawText) => onChange(text)}
                    keyboardType="numeric"
                    placeholder="Data de nascimento"
                    value={value}
                    options={{
                      dateFormat: "DD/MM/YYYY",
                    }}
                    mask="99/99/9999"
                  />

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
              name="birthDate"
              rules={{ required: true }}
            />
            <Button
              mt="$6"
              onPress={handleSubmit(onSubmit, onError)}
              bgColor="$hospitalGreen"
              $pressed-bg="$darkHospitalGreen"
            >
              <ButtonText>Cadastrar</ButtonText>
            </Button>
          </Box>
        </Center>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SignUpScreen;
