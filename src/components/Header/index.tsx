import { Button, HStack, Image, Icon, Text } from "@gluestack-ui/themed";
import { useRouter, usePathname } from "expo-router";
import { CircleUserRound } from "lucide-react-native";

import { supabase } from "../../utils/supabase/supbase";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();

  const imageUri = supabase.storage
    .from("assets")
    .getPublicUrl("logoAppSao-Camilo.jpg").data.publicUrl;

  return (
    <HStack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt="$8"
      paddingHorizontal="$4"
      paddingVertical="$4"
      backgroundColor="white"
    >
      <Image
        source={{
          uri: imageUri,
        }}
        size="xs"
        alt="logo"
        borderRadius={6}
      />

      <Text fontWeight="$bold">{pathName.replace("/", "").toUpperCase()}</Text>

      <Button
        backgroundColor="$white"
        onPress={() => router.navigate("/profile")}
      >
        <Icon as={CircleUserRound} size="xl" color="black" />
      </Button>
    </HStack>
  );
};

export default Header;
