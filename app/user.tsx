import { StyleSheet } from 'react-native'
import { Link } from "expo-router"
import { View, Text } from "../components/Themed"

const User = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Testando</Text>
            <Link href='/'>teste</Link>
        </View>
    )
}

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


export default User