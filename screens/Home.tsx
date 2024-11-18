import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const predefinedMenu = [
        { courseType: 'Starter', DishName: 'Bruschetta', description: 'Toasted baguette with fresh tomatoes and basil', price: 7.50 },
        { courseType: 'Main Course', DishName: 'Beef Lasagna', description: 'Layered pasta with beef and cheese', price: 15.99 },
        { courseType: 'Dessert', DishName: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 8.99 },
    ];

    const additionalMenu = [
        { courseType: 'Starter', DishName: 'Garlic Bread', description: 'Crispy bread with garlic butter', price: 5.50 },
        { courseType: 'Main Course', DishName: 'Grilled Chicken', description: 'Juicy grilled chicken with herbs', price: 12.99 },
        { courseType: 'Dessert', DishName: 'Cheesecake', description: 'Rich and creamy cheesecake', price: 9.50 },
    ];

    const combinedMenu = [...predefinedMenu, ...additionalMenu];

    // Calculate the average price
    const averagePrice =
        combinedMenu.reduce((total, item) => total + item.price, 0) / combinedMenu.length;

    // Filter menu based on selected course type
    const filteredMenu = selectedFilter
        ? combinedMenu.filter((item) => item.courseType === selectedFilter)
        : combinedMenu;

    const handleFilterToggle = () => {
        setShowFilters(!showFilters); // Toggle the filter section
        setSelectedFilter(null); // Reset filter when opening filter section
    };

    const handleFilterSelect = (courseType) => {
        setSelectedFilter(courseType); // Set selected filter
    };

    const handleAddMenuPress = () => {
        navigation.navigate('AddMenu'); // Navigate to the "Add Menu" screen
    };

    return (
        <View style={styles.container}>
            {/* Header Image */}
            <Image
                source={require('./image/cooking.png')}
                style={styles.image}
            />

            {/* Total Items and Average Price */}
            <Text style={styles.totalItemsText}>Total Menu Items: {combinedMenu.length}</Text>
            <Text style={styles.averagePriceText}>
                Average Price: ${averagePrice.toFixed(2)}
            </Text>

            {/* Filter Button */}
            <TouchableOpacity style={styles.filterButton} onPress={handleFilterToggle}>
                <Text style={styles.filterButtonText}>{showFilters ? 'Close Filters' : 'Filter'}</Text>
            </TouchableOpacity>

            {/* Filter Section */}
            {showFilters && (
                <View style={styles.filterSection}>
                    <Text style={styles.filterTitle}>Filter by Course</Text>
                    <View style={styles.filterContainer}>
                        {['Starter', 'Main Course', 'Dessert'].map((courseType) => (
                            <TouchableOpacity
                                key={courseType}
                                style={[
                                    styles.filterOption,
                                    selectedFilter === courseType && styles.selectedFilterOption,
                                ]}
                                onPress={() => handleFilterSelect(courseType)}
                            >
                                <Text
                                    style={[
                                        styles.filterOptionText,
                                        selectedFilter === courseType && styles.selectedFilterOptionText,
                                    ]}
                                >
                                    {courseType}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilter === null && styles.selectedFilterOption,
                            ]}
                            onPress={() => setSelectedFilter(null)}
                        >
                            <Text
                                style={[
                                    styles.filterOptionText,
                                    selectedFilter === null && styles.selectedFilterOptionText,
                                ]}
                            >
                                Show All
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Display Menu Items */}
            <FlatList
                data={filteredMenu}
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
                ListEmptyComponent={<Text style={styles.noItemsText}>No items available</Text>}
            />

            {/* Add Menu Button */}
            <View style={styles.addMenuButtonContainer}>
                <Button title="Add Menu" onPress={handleAddMenuPress} color="#FF6347" />
            </View>
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
        marginBottom: 16,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    totalItemsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2f4f4f',
        textAlign: 'center',
        marginBottom: 8,
    },
    averagePriceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8b0000',
        textAlign: 'center',
        marginBottom: 16,
    },
    filterButton: {
        alignSelf: 'flex-end',
        marginBottom: 8,
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 8,
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    filterSection: {
        padding: 16,
        backgroundColor: '#fff5ee',
        borderRadius: 8,
        marginBottom: 16,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2f4f4f',
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    filterOption: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FF6347',
        margin: 4,
    },
    selectedFilterOption: {
        backgroundColor: '#32CD32',
    },
    filterOptionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    selectedFilterOptionText: {
        color: '#fff',
    },
    menuDetails: {
        marginBottom: 16,
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
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    noItemsText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
    },
    addMenuButtonContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
});
