import {
  Button,
  Card,
  HStack,
  Heading,
  VStack,
  Icon,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { MoveRightIcon } from "lucide-react-native";

type ExamCardProps = {
  id: string;
  category: string;
  date: string;
  examFileName: string;
};

const ExamCard: React.FC<ExamCardProps> = ({
  category,
  date,
  examFileName,
  id,
}) => {
  const router = useRouter();
  return (
    <Card
      mt="$5"
      width="$64"
      height="$32"
      borderColor="$hospitalGreen"
      borderWidth={2}
      borderRadius="$2xl"
    >
      <HStack flex={1} justifyContent="center" alignItems="center">
        <VStack>
          <Heading>{dayjs(date).format("DD/MM/YYYY")}</Heading>
          <Heading size="md">{examFileName}</Heading>
          <Heading size="sm">Categoria: {category}</Heading>
        </VStack>
        <Button
          onPress={() =>
            router.push({
              pathname: "/(tabs)/exams/examsDetail",
              params: { examId: id },
            })
          }
          ml="$10"
          bgColor="transparent"
          borderRadius="$full"
          borderWidth={2}
          borderColor="$hospitalGreen"
        >
          <Icon as={MoveRightIcon} />
        </Button>
      </HStack>
    </Card>
  );
};

export default ExamCard;
