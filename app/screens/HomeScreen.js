import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('Susan'); // Default name set to Susan
  const [items, setItems] = useState([
    { id: '1', title: 'Rent Due in 5 Days' },
    { id: '2', title: 'Hulu Subscription Due Tomorrow' },
    { id: '3', title: 'Disney+ Subscription Due Now' },
  ]);

  const handleDelete = (id) => {
    // Confirm before deleting
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Yes', onPress: () => setItems((prevItems) => prevItems.filter((item) => item.id !== id)) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false}
    );
  };

  const handleEditName = () => {
    // Show a prompt or navigate to another screen for editing the name
    Alert.prompt(
      'Edit Name',
      'Enter your new name:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: (newName) => {
          if (newName.length <= 10) {
            setName(newName);
          } else {
            Alert.alert('Error', 'Name must be 10 characters or less');
          }
        }}
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>Notifications</Text>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome {name}!</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditName}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items} 
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.item}>{item.title}</Text>
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.optionsButtonText}>...</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  header2: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  welcome: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '300',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  item: {
    fontWeight: 'normal',
    fontSize: 18,
  },
  optionsButton: {
    padding: 5,
    borderRadius: 5,
  },
  optionsButtonText: {
    fontSize: 24,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '300',
  },
  editButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#a9a9a9', // Dark grey color
    alignSelf: 'flex-end', // Align to the bottom of the container
    marginBottom: -5, // Adjust the position to align it with the text
  },
});
