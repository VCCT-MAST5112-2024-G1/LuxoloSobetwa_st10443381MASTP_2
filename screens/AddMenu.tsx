import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';

type AddMenuItemProp = StackNavigationProp<RootStackParamList, 'AddMenuItem'>;

export default function AddMenuItemScreen() {
    const [DishName, setDishName] = useState(''); // Updated variable name
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [courseType, setCourseType] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation<AddMenuItemProp>();

    // Handle adding menu item and navigating to Home
    const handleAddMenuItem = (currentMenu: Array<{ DishName: string; description: string; price: number; courseType: string }>) => {
        const newMenuItem = { DishName, description, price, courseType };
        const updatedMenu = [...currentMenu, newMenuItem];

        // Navigate to Home and pass the updated menu array
        navigation.navigate('Home', { menuItems: updatedMenu });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Dish Name:</Text>
            <TextInput
                placeholder="Dish Name"
                onChangeText={newText => setDishName(newText)} // Updated function
                style={styles.input}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                placeholder="Description"
                onChangeText={newText => setDescription(newText)}
                style={styles.input}
                multiline
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
                placeholder="Price"
                onChangeText={newText => setPrice(parseFloat(newText))}
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

            <Button
                title="Add Menu Item"
                onPress={() => {
                    const currentMenu = navigation.getState().routes.find(r => r.name === 'Home')?.params?.menuItems || [];
                    handleAddMenuItem(currentMenu);
                }}
            />
        </View>
    );
}
// css
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
});
