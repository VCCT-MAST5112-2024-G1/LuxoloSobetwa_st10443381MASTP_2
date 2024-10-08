import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';
import { useRoute } from '@react-navigation/native';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const route = useRoute<HomeScreenRouteProp>();
    const menuItems = route.params?.menuItems || [];
    const navigation = useNavigation<HomeScreenProp>();

    // Sample data (if no items are passed through navigation)
    const sampleMenu = [
        { courseType: 'Starter', DishName: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing', price: 5.99 },
        { courseType: 'Main Course', DishName: 'Grilled Salmon', description: 'Salmon fillet with garlic butter', price: 12.99 },
        { courseType: 'Dessert', DishName: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 6.99 },
    ];

    // Predefined menu items
    const predefinedMenu = [
        { courseType: 'Starter', DishName: 'Sushi', description: 'Wasabi', price: 8.99 },
        { courseType: 'Main Course', DishName: 'Ribs and Chips', description: 'Crunchy', price: 14.99 },
        { courseType: 'Dessert', DishName: 'Ice Cream and Biscuits', description: 'Crunchy', price: 4.99 },
    ];

    // Filter to get one item per course from menuItems
    const uniqueCourses = ['Starter', 'Main Course', 'Dessert'];
    const filteredMenu = uniqueCourses.map(course =>
        menuItems.find((item: { courseType: string; }) => item.courseType === course) || sampleMenu.find(item => item.courseType === course)
    );

    // Concatenate the predefined menu with the filtered menu
    const combinedMenu = [...predefinedMenu, ...filteredMenu];

    const handleFilterPress = () => {
        alert('Filter button pressed');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./image/cooking.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Menu</Text>

            {/* Filter Button */}
            <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>

            {/* Display each course */}
            <FlatList
                data={combinedMenu}
                keyExtractor={(item, index) => `${item.courseType}-${index}`}
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
        width: 150, // Smaller width for the image
        height: 100, // Smaller height for the image
        marginBottom: 16,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: '#2f4f4f', // Darker color for the title
        textAlign: 'center',
    },
    filterButton: {
        position: 'absolute',
        top: 40, // Adjust based on screen header
        right: 16,
        backgroundColor: '#FF6347', // Button background color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    menuDetails: {
        marginBottom: 24,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    menuText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
    },
});
