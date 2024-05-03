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
} from "@gluestack-ui/themed";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, setValue, handleSubmit } = useForm<SignUpFormValues>();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Center flex={1} justifyContent="center" alignItems="center">
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
              placeholder="Nome"
              type="text"
              onChangeText={(text) => setValue("name", text)}
            />
          </Input>

          <Select onValueChange={(text) => setValue("sex", text)}>
            <SelectTrigger
              variant="rounded"
              borderColor="$hospitalGreen"
              borderWidth="$2"
              mt="$3"
            >
              <SelectInput placeholder="Select option" />
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
                {generos.map((genero) => (
                  <SelectItem label={genero} value={genero} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

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
      </Box>
    </Center>
  );
};

export default SignUpScreen;
