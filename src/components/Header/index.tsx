import {
  Button,
  HStack,
  Image,
  Icon,
  Text,
  Avatar,
  AvatarImage,
} from "@gluestack-ui/themed";
import { usePathname, useRouter } from "expo-router";
import { CircleUserRound } from "lucide-react-native";

import { changeRouteName } from "../../utils/functions/changeRouteName";
import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useUserStore();

  const imageUri = supabase.storage
    .from("assets")
    .getPublicUrl("logoAppSao-Camilo.png").data.publicUrl;

  const userUri = supabase.storage
    .from("user_profile")
    .getPublicUrl(`${user?.id!}/profilePicture.jpeg`).data.publicUrl;

  return (
    <HStack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="$4"
      paddingBottom="$4"
      paddingTop="$8"
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

      <Text fontWeight="$bold" ml="$8">
        {changeRouteName(pathName.toUpperCase().split("/")[1])}
      </Text>

      <Button
        backgroundColor="$white"
        onPress={() => router.navigate("/profile")}
      >
        {user?.profile_picture_url ? (
          <Avatar
            height={40}
            width={40}
            borderColor="$hospitalGreen"
            borderWidth={2}
          >
            <AvatarImage
              source={{
                uri: userUri,
                cache: "reload",
              }}
              alt="profile image"
            />
          </Avatar>
        ) : (
          <Icon as={CircleUserRound} size="xl" color="black" />
        )}
      </Button>
    </HStack>
  );
};

export default Header;
