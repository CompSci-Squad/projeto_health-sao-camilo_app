import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

import { supabase } from "../../../utils/supabase/supbase";

export default function Home() {
  const router = useRouter();
  return (
    <View>
      <Text>Home</Text>
      <Button title="sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
