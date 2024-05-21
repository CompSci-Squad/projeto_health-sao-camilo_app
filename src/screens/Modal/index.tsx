import {
  Heading,
  Icon,
  Center,
  Button,
  HStack,
  View,
} from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FileUp, Camera as CameraIcon } from "lucide-react-native";
import { useState } from "react";

import Camera from "../../components/Camera";
import DocumentPicker from "../../components/DocumentPickerModal";
import ImagePickerExample from "../../components/ImagePicker";
import ReturnButton from "../../components/ReturnButton";
import { useUserStore } from "../../utils/stores/userStore";

const Modal = () => {
  const params = useLocalSearchParams();
  const [choice, setChoice] = useState<string | null>(null);
  const [content, setContent] = useState<any>();
  const router = useRouter();

  const { originalScreen } = params;
  const choices = [
    {
      name: "document",
      icon: FileUp,
    },
    {
      name: "camera",
      icon: CameraIcon,
    },
  ];

  if (choice === null)
    return (
      <>
        <ReturnButton back={router.back} />
        <View
          flex={1}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading mb="$12">Selecione como deseja subir um arquivo</Heading>
          <HStack space="lg">
            {choices.map((choice) => (
              <Button
                bg="$hospitalGreen"
                size="xl"
                onPress={() => setChoice(choice.name)}
              >
                <Icon as={choice.icon} color="$white" size="xl" />
              </Button>
            ))}
          </HStack>
        </View>
      </>
    );

  return (
    <>
      <ReturnButton back={router.back} />
      <Center flex={1} justifyContent="center" alignContent="center">
        {choice === "document" ? (
          originalScreen === "profile" ? (
            <ImagePickerExample />
          ) : (
            <DocumentPicker content={content} setContent={setContent} />
          )
        ) : (
          <Camera content={content} setContent={setContent} />
        )}
      </Center>
    </>
  );
};

export default Modal;
