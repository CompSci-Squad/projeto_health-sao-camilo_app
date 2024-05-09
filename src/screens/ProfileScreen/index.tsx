import {
  Center,
  FormControl,
  ScrollView,
  Input,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  AlertCircleIcon,
  FormControlErrorText,
  Button,
  ButtonText,
  HStack,
  Spinner,
  Text,
  useToast,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm, SubmitErrorHandler } from "react-hook-form";

import CustomToast from "../../components/CustomToast";
import { ProfileFormData } from "../../types/profileForm.type";
import { updateProfile } from "../../utils/functions/updateProfile";
import { uploadProfilePicture } from "../../utils/functions/uploadProfilePicture";
import { useUserStore } from "../../utils/stores/userStore";
import { updateProfileSchema } from "../../utils/validations/updateProfile.validation";

const ProfileScreen = () => {
  const { user, setUser } = useUserStore();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      gender: user?.gender,
      birthDate: user?.birth_date,
    },
  });

  const onSubmit = async (payload: ProfileFormData) => {
    setIsLoading(true);
    try {
      if (!user) {
        toast.show({
          duration: 4000,
          placement: "top right",
          render: () => (
            <CustomToast
              title="usuário não logado"
              message="nenhum usuário esta logado"
              action="error"
            />
          ),
          onCloseComplete: () => {
            setIsLoading(false);
            router.navigate("/login");
          },
        });
      } else {
        const response = await updateProfile(payload, user.id);
        setUser(response);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<ProfileFormData> = (errors, e) => {
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
    <ScrollView contentContainerStyle={{ paddingVertical: 60 }}>
      <Center display="flex" justifyContent="center" alignItems="center">
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

        <Button
          mt="$6"
          onPress={handleSubmit(onSubmit, onError)}
          bgColor="$hospitalGreen"
        >
          <ButtonText>Atualizar</ButtonText>
        </Button>
      </Center>
    </ScrollView>
  );
};

export default ProfileScreen;
