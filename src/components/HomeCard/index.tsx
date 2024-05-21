import { Button, Card, Heading, Text } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

type HomeCardProps = {
  info: any;
  text: string;
  type: "PRESSURE" | "WEIGHT" | "HEIGHT" | "GLUCOSE" | "IMC";
};

const HomeCard: React.FC<HomeCardProps> = ({ info, text, type }) => {
  const router = useRouter();
  const determineString = () => {
    if (!info) return null;
    switch (type) {
      case "HEIGHT":
        return `${info}cm`;
      case "WEIGHT":
        return `${info}kg`;
      case "PRESSURE":
        return `${info.numerator} / ${info.denominator}`;
      case "GLUCOSE":
        return `${info}mg/dl`;
      default:
        return info;
    }
  };

  return (
    <Button
      onPress={() => router.navigate(`/(tabs)/${type}`)}
      width="$64"
      bgColor="$transparent"
      height="$32"
      mt="$4"
    >
      <Card
        width="$64"
        height="$32"
        borderColor="$hospitalGreen"
        borderWidth={2}
        borderRadius="$2xl"
      >
        <Heading mb="$1" size="md">
          {text}
        </Heading>
        <Text size="md">{determineString()}</Text>
      </Card>
    </Button>
  );
};

export default HomeCard;
