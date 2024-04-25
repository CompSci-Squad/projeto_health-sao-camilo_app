import {
  Text,
  Heading,
  Center,
  Box,
  FormControl,
  Input,
  InputField,
  InputSlot,
  Button,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
  InputIcon,
  VStack,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

export default () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, setValue, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

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
        <Button mt="$4" bgColor="$hospitalGreen">
          <ButtonText>Cadastro</ButtonText>
        </Button>
      </Box>
    </Center>
  );
};
