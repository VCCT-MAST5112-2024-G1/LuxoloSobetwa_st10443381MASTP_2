import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';
import { useRoute } from '@react-navigation/native';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {

    const route = useRoute<HomeScreenRouteProp>();

    // Get the menu items from the route parameters
    const menuItems = route.params?.menuItems || [];

    const navigation = useNavigation<HomeScreenProp>();

    return (
        <View style={styles.container}>
            <Image 
                source={require('./image/cooking.png')} // Use the local image
                style={styles.image}
            />
            <Text style={styles.title}>Added Menu</Text>

            {/* Display the total number of menu items */}
            <Text style={styles.menuCount}>Total Added Menu Items: {menuItems.length}</Text>

            <FlatList
    data={menuItems}
    keyExtractor={(item, index) => `${item.DishName}-${index}`}
    renderItem={({ item }) => (
        <View style={styles.menuDetails}>
            <Text style={styles.menuText}>
                Dish Name: <Text style={styles.boldText}>{item.DishName}</Text>
            </Text>
            <Text style={styles.menuText}>
                Description: <Text style={styles.boldText}>{item.description}</Text>
            </Text>
            <Text style={styles.menuText}>
                Price: <Text style={styles.boldText}>${item.price.toFixed(2)}</Text>
            </Text>
            <Text style={styles.menuText}>
                Course Type: <Text style={styles.boldText}>{item.courseType}</Text>
            </Text>
        </View>
    )}
/>



            <Button
                title="Add Menu"
                onPress={() => navigation.navigate('AddMenu')}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f8ff', // Light color background
    },
    image: {
        width: '100%',
        height: 200, // Adjust the height as necessary
        marginBottom: 16,
        borderRadius: 10, // Optional: Rounded corners for the image
        resizeMode: 'cover', // Ensure the image covers the area without distortion
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: '#2f4f4f', // Darker color for the title
    },
    menuCount: {
        fontSize: 18,
        marginBottom: 16,
        color: 'green',
    },
    menuDetails: {
        marginBottom: 24,
        padding: 12,
        backgroundColor: '#fff', // White background for menu details
        borderRadius: 8, // Rounded corners
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // For Android shadow
    },
    menuText: {
        fontSize: 18, // Larger font size for the menu text
        color: '#333', // Darker color for readability
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20, // Bigger font size for bold text
        color: '#000',
    },
});