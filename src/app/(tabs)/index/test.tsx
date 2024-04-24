import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Test() {
  const router = useRouter();
  return (
    <View>
      <Text>Ola mundo</Text>
      <Button title="redirect" onPress={() => router.navigate("/home")} />
    </View>
  );
}
