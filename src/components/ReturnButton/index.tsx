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
      mt="$8"
      ml="$3"
      bgColor="$hospitalGreen"
      size="md"
    >
      <Icon as={ArrowLeftCircle} size="lg" color="$white" />
    </Button>
  );
};

export default ReturnButton;
