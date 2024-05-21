import {
  AddIcon,
  Avatar,
  AvatarImage,
  Box,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

type ProfileImageProps = {
  profile_url: string | undefined | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profile_url }) => {
  const router = useRouter();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb="$32">
      {profile_url ? (
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
                uri: profile_url,
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
