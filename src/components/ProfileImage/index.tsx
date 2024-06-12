import {
  AddIcon,
  Avatar,
  AvatarImage,
  Box,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { useUserStore } from "../../utils/stores/userStore";
import { supabase } from "../../utils/supabase/supbase";

const ProfileImage = () => {
  const router = useRouter();
  const [profileUrl, setProfileUrl] = useState("");
  const { user } = useUserStore();

  const fetchImage = () => {
    const data = supabase.storage
      .from("user_profile")
      .getPublicUrl(`${user?.id!}/profilePicture.jpeg`).data.publicUrl;
    setProfileUrl(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchImage();
    }, []),
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb="$32">
      {profileUrl ? (
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
                uri: profileUrl,
                cache: "reload",
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
              params: {
                originalScreen: "profile",
              },
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
