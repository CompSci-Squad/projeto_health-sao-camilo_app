import { Button, Icon } from "@gluestack-ui/themed";
import { ArrowLeftCircle } from "lucide-react-native";

type ReturnButtonProps = {
  back: () => void;
};

const ReturnButton: React.FC<ReturnButtonProps> = ({ back }) => {
  return (
    <Button
      onPress={() => back()}
      borderRadius="$3xl"
      borderWidth={2}
      borderColor="$hospitalGreen"
      width="$12"
      mt="$4"
      ml="$2"
      bgColor="transparent"
    >
      <Icon as={ArrowLeftCircle} />
    </Button>
  );
};

export default ReturnButton;
