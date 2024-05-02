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
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import CustomToast from "../../components/CustomToast";
import { LoginFormData } from "../../types/loginForm.type";
import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";
import { LoginSchema } from "../../utils/validations/loginForm.validation";

const LoginPage = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["session"],
    queryFn: () => supabase.auth.getSession(),
  });

  const {
    mutate,
    data: loginData,
    isPending,
  } = useMutation({
    mutationFn: (loginFormData: LoginFormData) => {
      return supabase.auth.signInWithPassword({
        email: loginFormData.email,
        password: loginFormData.password,
      });
    },
  });

  const router = useRouter();
  const toast = useToast();
  const { getUser, setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const { register, setValue, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (loginFormData: LoginFormData) => {
    mutate(loginFormData);
    if (loginData?.error) {
      toast.show({});
    }
    if (loginData?.data.session) {
      setUser(loginData.data.user);
      toast.show({
        duration: 2000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="login efetuado com sucesso"
            message="login foi efetuado com sucesso, em breve você será redirecionado"
            action="success"
          />
        ),
        onCloseComplete: () => router.navigate("/tabs"),
      });
    }
  };

  const autoLogin = () => {
    if (getUser()?.id === data?.data.session?.user.id) {
      router.navigate("/tabs");
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  if (isLoading || isFetching || isPending)
    return (
      <HStack space="sm">
        <Spinner color="$hospitalGreen" />
        <Text size="md">Aguarde</Text>
      </HStack>
    );

  return (
    <Center flex={1} justifyContent="center" alignItems="center">
      {/* <Image /> */}
      <Heading>Saúde em suas mãos</Heading>
      <Text mb="$4">Plataforma de autogerenciamento da saúde</Text>
      <Box w="$64">
        <FormControl
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}
          size="md"
        >
          <Input
            variant="rounded"
            borderColor="$hospitalGreen"
            borderWidth="$2"
          >
            <InputField
              placeholder="Email"
              type="text"
              onChangeText={(text) => setValue("email", text)}
            />
          </Input>

          <Input
            variant="rounded"
            borderColor="$hospitalGreen"
            borderWidth="$2"
            mt="$3"
          >
            <InputField
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              onChangeText={(text) => setValue("password", text)}
            />
            <InputSlot pr="$3" onPress={() => setShowPassword(!showPassword)}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$black"
              />
            </InputSlot>
          </Input>
        </FormControl>
        <Button
          mt="$6"
          onPress={handleSubmit(onSubmit)}
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
