import {
  Center,
  Button,
  ButtonText,
  Image,
  VStack,
  HStack,
  Spinner,
  useToast,
} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";

import { uploadProfileImage } from "../../utils/functions/uploadProfileImage";
import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";
import CustomToast from "../CustomToast";

const ImagePickerExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<any>();
  const toast = useToast();
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setContent({
        uri: result.assets[0].uri,
        content: result.assets[0].base64,
      });
    }
  };

  const handleFileUpload = async () => {
    setIsLoading(true);
    if (!user?.id) {
      toast.show({
        duration: 5000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="Usuário não esta logado"
            action="error"
            message="o usuário não esta logado"
          />
        ),
      });
    }
    const response = await uploadProfileImage(content.content, user!);

    if (
      (typeof response === "object" &&
        response !== null &&
        "__isStorageError" in response) ||
      (typeof response === "object" && "error" in response)
    ) {
      toast.show({
        duration: 5000,
        placement: "top right",
        render: () => (
          <CustomToast title="Erro" action="error" message="Erro de storage" />
        ),
      });
      setIsLoading(false);
    } else {
      const publicImageUrl = supabase.storage
        .from("user_profile")
        .getPublicUrl(response! as string).data.publicUrl;
      setUser({ ...user!, profile_picture_url: publicImageUrl! as string });

      toast.show({
        duration: 5000,
        placement: "top right",
        render: () => (
          <CustomToast
            title="Sucesso"
            action="success"
            message="Upload da imagem realizada com sucesso"
          />
        ),
        onCloseComplete: () => {
          router.navigate("/profile");
          setIsLoading(false);
        },
      });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Center flex={1} justifyContent="center" alignItems="center">
      {content ? (
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Image
            source={{ uri: content.uri }}
            width={200}
            height={200}
            borderColor="$hospitalGreen"
            borderWidth={2}
            mb="$10"
            alt="profilePicture"
          />
          <HStack space="lg">
            <Button bgColor="$hospitalGreen" onPress={() => setContent(null)}>
              <ButtonText>Cancelar upload</ButtonText>
            </Button>
            <Button bgColor="$hospitalGreen" onPress={handleFileUpload}>
              <ButtonText>Confirmar upload</ButtonText>
            </Button>
          </HStack>
        </VStack>
      ) : (
        <Button bgColor="$hospitalGreen" onPress={pickImage}>
          <ButtonText>Clique aqui para selecionar uma imagem</ButtonText>
        </Button>
      )}
    </Center>
  );
};

export default ImagePickerExample;
