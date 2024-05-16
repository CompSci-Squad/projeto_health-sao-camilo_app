import {
  AddIcon,
  Avatar,
  AvatarImage,
  Box,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";

type ProfileImageProps = {
  profile_url: string | undefined | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profile_url }) => {
  const router = useRouter();
  const { user } = useUserStore();

  let imageUri;

  useEffect(() => {
    imageUri = supabase.storage
      .from("user_profile")
      .getPublicUrl(user?.profile_picture_url).data.publicUrl;
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb="$32">
      {imageUri ? (
        <Button
          bg="transparent"
          onPress={() =>
            router.push({
              pathname: "/modal",
              params: { originalScreen: "profile" },
            })
          }
        >
          <Avatar
            height={200}
            width={200}
            borderColor="$hospitalGreen"
            borderWidth={2}
          >
            <AvatarImage
              source={{
                uri: imageUri,
              }}
              alt="profile image"
            />
          </Avatar>
        </Button>
      ) : (
        <Button
          borderRadius="$full"
          w="$32"
          h="$32"
          bg="transparent"
          borderWidth={1}
          borderColor="$hospitalGreen"
          onPress={() =>
            router.push({
              pathname: "/modal",
              params: { originalScreen: "profile" },
            })
          }
        >
          <Icon as={AddIcon} />
        </Button>
      )}
    </Box>
  );
};

export default ProfileImage;
