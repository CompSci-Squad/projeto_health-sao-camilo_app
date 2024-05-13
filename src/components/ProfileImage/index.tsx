import {
  AddIcon,
  Avatar,
  AvatarImage,
  Box,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import { User2, User2Icon } from "lucide-react-native";

type ProfileImageProps = {
  profile_url: string | undefined | null;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profile_url }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {profile_url ? (
        <Avatar>
          <AvatarImage
            source={{
              uri: profile_url,
            }}
          />
        </Avatar>
      ) : (
        <Button
          borderRadius="$full"
          w="$32"
          h="$32"
          bg="transparent"
          borderWidth={1}
          borderColor="$hospitalGreen"
        >
          <Icon as={AddIcon} />
        </Button>
      )}
    </Box>
  );
};

export default ProfileImage;
