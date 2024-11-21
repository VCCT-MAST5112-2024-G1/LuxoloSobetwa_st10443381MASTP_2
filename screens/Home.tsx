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

    const averagePrice = combinedMenu.reduce((total, item) => total + item.price, 0) / combinedMenu.length;

    const courseTypes = ['Starter', 'Main Course', 'Dessert'];
    const averagePriceByCourse = courseTypes.map((courseType) => {
        const items = combinedMenu.filter((item) => item.courseType === courseType);
        const avgPrice = items.reduce((total, item) => total + item.price, 0) / items.length || 0;
        return { courseType, averagePrice: avgPrice };
    });

    const filteredMenu = selectedFilter
        ? combinedMenu.filter((item) => item.courseType === selectedFilter)
        : combinedMenu;

    const handleFilterToggle = () => {
        setShowFilters(!showFilters);
        setSelectedFilter(null);
    };

    const handleFilterSelect = (courseType) => {
        setSelectedFilter(courseType);
    };

    const handleAddMenuPress = () => {
        navigation.navigate('AddMenu');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./image/cooking.png')}
                style={styles.image}
            />

            <Text style={styles.totalItemsText}>Total Menu Items: {combinedMenu.length}</Text>

            {!showFilters && (
                <>
                    <Text style={styles.averagePriceText}>
                        Overall Average Price: ${averagePrice.toFixed(2)}
                    </Text>
                    <View style={styles.averagePriceByCourse}>
                        {averagePriceByCourse.map(({ courseType, averagePrice }) => (
                            <Text key={courseType} style={styles.averagePriceCourseText}>
                                {courseType} Average: ${averagePrice.toFixed(2)}
                            </Text>
                        ))}
                    </View>
                </>
            )}

            <TouchableOpacity style={styles.filterButton} onPress={handleFilterToggle}>
                <Text style={styles.filterButtonText}>{showFilters ? 'Close Filters' : 'Filter'}</Text>
            </TouchableOpacity>

            {showFilters && (
                <View style={styles.filterSection}>
                    <Text style={styles.filterTitle}>Filter by Course</Text>
                    <View style={styles.filterContainer}>
                        {courseTypes.map((courseType) => (
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

            <FlatList
                data={filteredMenu}
                keyExtractor={(item, index) => `${item.courseType}-${index}`}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.menuDetails,
                            selectedFilter
                                ? styles.filteredMenu // Apply green background to filtered menu
                                : styles.originalMenu, // White background for original menu
                        ]}
                    >
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
    averagePriceByCourse: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    averagePriceCourseText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4b0082',
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
        borderRadius: 8,
    },
    originalMenu: {
        backgroundColor: '#ffffff', // White for original menu
    },
    filteredMenu: {
        backgroundColor: '#e6ffe6', // Light green for filtered menu
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
