import {
  Center,
  Heading,
  Box,
  FormControl,
  InputField,
  InputSlot,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
  ButtonText,
  Text,
  Input,
  Button,
  useToast,
  HStack,
  Spinner,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  Image,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";

import CustomToast from "../../components/CustomToast";
import { LoginFormData } from "../../types/loginForm.type";
import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";
import { LoginSchema } from "../../utils/validations/loginForm.validation";

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const imageUri = supabase.storage
    .from("assets")
    .getPublicUrl("logoAppSao-Camilo.jpg").data.publicUrl;

  const onSubmit = async (loginFormData: LoginFormData) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginFormData.email,
      password: loginFormData.password,
    });
    console.log(data);
    if (error) {
      setIsLoading(false);
      toast.show({
        duration: 4000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="login não efetuado"
            message="login não foi efetuado, verifique os dados inseridos"
            action="error"
          />
        ),
      });
    }
    if (data.session) {
      // const { data: userData } = await supabase
      //   .from("user_info")
      //   .select("*")
      //   .eq("auth_user_id", data.user.id)
      //   .single();
      // setUser(userData);
      toast.show({
        duration: 2000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="login efetuado com sucesso"
            message="login foi efetuado com sucesso, em breve você será redirecionado"
            action="error"
          />
        ),
        onCloseComplete: () => {
          setIsLoading(false);
          router.navigate("/(tabs)");
        },
      });
    }
  };

  const onError: SubmitErrorHandler<LoginFormData> = (errors, e) => {
    console.log(JSON.stringify(errors));
  };

  // const autoLogin = () => {
  //   setIsLoading(true);
  //   supabase.auth
  //     .getSession()
  //     .then(({ data }) => {
  //       if (data.session && data.session.expires_at! < Date.now()) return;
  //       if (getUser()?.id === data.session?.user.id) {
  //         toast.show({
  //           duration: 2000,
  //           placement: "top right",
  //           render: () => (
  //             <CustomToast
  //               title="login efetuado com sucesso"
  //               message="login foi efetuado com sucesso, em breve você será redirecionado"
  //               action="error"
  //             />
  //           ),
  //           onCloseComplete: () => {
  //             setIsLoading(false);
  //             router.navigate("/(tabs)");
  //           },
  //         });
  //       }
  //     })
  //     .catch(() => console.log("erro"))
  //     .finally(() => setIsLoading(false));
  // };

  // useEffect(() => {
  //   autoLogin();
  // }, []);

  if (isLoading)
    return (
      <HStack space="sm" flex={1} alignItems="center" justifyContent="center">
        <Spinner color="$hospitalGreen" />
        <Text size="md">Aguarde</Text>
      </HStack>
    );

  return (
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

        <Button
          mt="$6"
          onPress={handleSubmit(onSubmit, onError)}
          bgColor="$hospitalGreen"
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <Button
          mt="$4"
          bgColor="$hospitalGreen"
          onPress={() => router.navigate("/signup")}
        >
          <ButtonText>Cadastro</ButtonText>
        </Button>
      </Box>
    </Center>
  );
};

export default LoginPage;
