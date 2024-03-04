import { Pressable, StyleSheet } from 'react-native'
import { View, Text } from "../components/Themed"
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from '../components/useColorScheme.web';

const TestPage = () => {
    const colorScheme = useColorScheme();

    return (
        <>
        <Stack.Screen name="index" options={{
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}/>
        <View style={styles.container}>
            <Text style={styles.title}>Test Page</Text>
        </View>
        </>
    )
}
export default TestPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });