import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const ExamDetailsScreen = () => {
  const { examId } = useLocalSearchParams();

  return <Text>test</Text>;
};

export default ExamDetailsScreen;
