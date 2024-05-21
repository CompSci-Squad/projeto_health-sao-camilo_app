import { Card, Heading, Text } from "@gluestack-ui/themed";

type HomeCardProps = {
  info: any;
  text: string;
  type: "PRESSURE" | "WEIGHT" | "HEIGHT" | "GLUCOSE";
};

const HomeCard: React.FC<HomeCardProps> = ({ info, text, type }) => {
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
    <Card
      width="$64"
      mt="$6"
      borderColor="$hospitalGreen"
      borderWidth={2}
      borderRadius="$2xl"
    >
      <Heading mb="$1" size="md">
        {text}
      </Heading>
      <Text size="md">{determineString()}</Text>
    </Card>
  );
};

export default HomeCard;
