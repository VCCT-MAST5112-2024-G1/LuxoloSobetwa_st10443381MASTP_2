import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';

type AddMenuItemProp = StackNavigationProp<RootStackParamList, 'AddMenuItem'>;

export default function AddMenuItemScreen() {
    const [DishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [courseType, setCourseType] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [menuItems, setMenuItems] = useState<Array<{ DishName: string; description: string; price: number; courseType: string }>>([]);

    const navigation = useNavigation<AddMenuItemProp>();

    // Handle adding menu item
    const handleAddMenuItem = () => {
        const newMenuItem = { DishName, description, price, courseType };
        const updatedMenu = [...menuItems, newMenuItem];
        setMenuItems(updatedMenu);
        setDishName('');
        setDescription('');
        setPrice(0);
        setCourseType('');
        setModalVisible(false);
    };

    // Handle deleting a menu item
    const handleDeleteMenuItem = (index: number) => {
        const updatedMenuItems = [...menuItems];
        updatedMenuItems.splice(index, 1); // Remove item at the given index
        setMenuItems(updatedMenuItems);
    };

    const renderMenuItem = ({ item, index }: { item: { DishName: string; description: string; price: number; courseType: string }; index: number }) => (
        <View style={styles.menuItem}>
            <Text style={styles.menuText}><Text style={styles.boldText}>Dish Name:</Text> {item.DishName}</Text>
            <Text style={styles.menuText}><Text style={styles.boldText}>Description:</Text> {item.description}</Text>
            <Text style={styles.menuText}><Text style={styles.boldText}>Price:</Text> ${item.price.toFixed(2)}</Text>
            <Text style={styles.menuText}><Text style={styles.boldText}>Course Type:</Text> {item.courseType}</Text>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => handleDeleteMenuItem(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Input fields for new menu item */}
            <Text style={styles.label}>Dish Name:</Text>
            <TextInput
                placeholder="Dish Name"
                value={DishName}
                onChangeText={setDishName}
                style={styles.input}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
                placeholder="Price"
                value={price.toString()}
                onChangeText={(text) => setPrice(parseFloat(text))}
                style={styles.input}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Course Type:</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.picker}>
                <Text style={styles.pickerText}>{courseType || "Select Course Type"}</Text>
            </TouchableOpacity>

            {/* Modal for selecting course type */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Select Course Type</Text>
                    {['Main Course', 'Starter', 'Dessert'].map((item) => (
                        <TouchableOpacity key={item} onPress={() => {
                            setCourseType(item);
                            setModalVisible(false);
                        }}>
                            <Text style={styles.modalItem}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>

            <Button title="Add Menu Item" onPress={handleAddMenuItem} />

            {/* Display the current menu */}
            <Text style={styles.label}>Current Menu:</Text>
            <FlatList
                data={menuItems}
                keyExtractor={(item, index) => `${item.DishName}-${index}`}
                renderItem={renderMenuItem}
                ListEmptyComponent={<Text style={styles.noItemsText}>No menu items available</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#b2e0f8', // Lighter blue background
    },
    input: {
        
        borderWidth: 2,
        borderColor: '#ffa07a', // Lighter orange border
        padding: 12,
        marginBottom: 12,
        borderRadius: 5, // Rounded corners
        fontSize: 18, // Increase font size for inputs
        fontWeight: 'bold', // Bold text for inputs
    },
    label: {
        fontSize: 18, // Increase label font size
        marginBottom: 8,
        color: 'black', // Label color remains black
        fontWeight: 'bold', // Bold text for labels
    },
    picker: {
        height: 50,
        borderWidth: 2,
        borderColor: '#ffa07a', // changed the colour to light orange
        borderRadius: 5, // Rounded corners for the picker
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    menuItem: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    menuText: {
        fontSize: 16,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    noItemsText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#888',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#FF6347',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
