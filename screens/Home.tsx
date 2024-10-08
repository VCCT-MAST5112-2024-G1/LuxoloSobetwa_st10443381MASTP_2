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

    // Predefined menu with one item per course
    const predefinedMenu = [
        { courseType: 'Starter', DishName: 'Bruschetta', description: 'Toasted baguette with fresh tomatoes and basil', price: 7.50 },
        { courseType: 'Main Course', DishName: 'Beef Lasagna', description: 'Layered pasta with beef and cheese', price: 15.99 },
        { courseType: 'Dessert', DishName: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 8.99 },
    ];

    // Filter to get one item per course from menuItems
    const uniqueCourses = ['Starter', 'Main Course', 'Dessert'];
    const filteredMenu = uniqueCourses.map(course =>
        menuItems.find((item: { courseType: string; }) => item.courseType === course)
    ).filter(Boolean);

    // Combine predefined menu and filtered menu items
    const combinedMenu = [...predefinedMenu, ...filteredMenu];

    // Calculate total number of items including both predefined and additional menu items
    const totalMenuItems = combinedMenu.length;

    const handleFilterPress = () => {
        alert('Filter button pressed');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('./image/cooking.png')}
                style={styles.image}
            />

            {/* Total number of menu items */}
            <Text style={styles.totalItemsText}>Total Menu Items: {totalMenuItems}</Text>

            <Text style={styles.title}>Menu</Text>

            {/* Filter Button */}
            <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>

            {/* Display each course */}
            <FlatList
                data={combinedMenu}
                keyExtractor={(item, index) => `${item.courseType}-${index}`}
                renderItem={({ item, index }) => (
                    <View style={[styles.menuDetails, index < predefinedMenu.length ? styles.predefinedMenu : {}]}>
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
        backgroundColor: '#f0f8ff',
    },
    image: {
        width: 150,
        height: 100,
        marginBottom: 8,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    totalItemsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2f4f4f',
        textAlign: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: '#2f4f4f',
        textAlign: 'center',
    },
    filterButton: {
        position: 'absolute',
        top: 40,
        right: 16,
        backgroundColor: '#FF6347',
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
    predefinedMenu: {
        backgroundColor: '#ffe4b5',
        padding: 6, // Smaller padding for predefined list items
        marginBottom: 8, // Slightly smaller margin
        borderRadius: 6,
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
