import {
  Button,
  View,
  Icon,
  HStack,
  VStack,
  Image,
  ButtonText,
  useToast,
  Spinner,
} from "@gluestack-ui/themed";
import {
  CameraPictureOptions,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import { SwitchCamera, Camera as CameraIcon } from "lucide-react-native";
import React, { useState, useRef } from "react";
import { StyleSheet, Text } from "react-native";

import { User } from "../../types/user.type";
import { uploadProfileImage } from "../../utils/functions/uploadProfileImage";
import { useUserStore } from "../../utils/stores/userStore";
import CustomToast from "../CustomToast";

type CameraProps = {
  content: any;
  setContent: React.Dispatch<any>;
};

const Camera: React.FC<CameraProps> = ({ content, setContent }) => {
  const [facing, setFacing] = useState("back");
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();
  const toast = useToast();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  //   if (!permission.granted) {
  //     // Camera permissions are not granted yet.
  //     return (
  //       <View style={styles.container}>
  //         <Text style={{ textAlign: "center" }}>
  //           We need your permission to show the camera
  //         </Text>
  //         <Button onPress={requestPermission} title="grant permission" />
  //       </View>
  //     );
  //   }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef !== null) {
      const options: CameraPictureOptions = { quality: 0.5, base64: true }; // Adjust image quality (optional)
      const data = await cameraRef?.current?.takePictureAsync(options);
      console.log(data);
      setContent({ uri: data?.uri, base64: data?.base64 });
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

    const response = await uploadProfileImage(content.base64, user!);

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
      setUser({ ...user!, profile_picture_url: response as string });

      console.log("user: ", user);

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
    console.log("user: ", user);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
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
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View flex={1} flexDirection="column-reverse" alignItems="center">
              <HStack space="xl" mb="$10">
                <Button onPress={takePicture} size="xl" bg="$hospitalGreen">
                  <Icon as={CameraIcon} color="$white" size="xl" />
                </Button>
                <Button
                  onPress={toggleCameraFacing}
                  size="xl"
                  bg="$hospitalGreen"
                >
                  <Icon as={SwitchCamera} color="$white" size="xl" />
                </Button>
              </HStack>
            </View>
          </CameraView>
        </View>
      )}
    </>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: 700,
    width: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
