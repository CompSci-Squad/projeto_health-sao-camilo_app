import { Button, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "../components/useColorScheme.web";

const TestPage = () => {
	// const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Test Page</Text>

			<Link href="/user">
				User
			</Link>
		</View>
	);
};
export default TestPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
