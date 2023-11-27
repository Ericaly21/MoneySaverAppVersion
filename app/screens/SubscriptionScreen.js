import {
    View, Text, TouchableOpacity,
    Modal, StyleSheet, TextInput,
    FlatList, Button, Image, Alert
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import hboLogo from '../assets/icons/Hbo.png';
  import primeVideoLogo from '../assets/icons/Amazon.png';
  import disneyPlusLogo from '../assets/icons/disney.png';
  import netflixLogo from '../assets/icons/netflix.png';
  import huluLogo from '../assets/icons/hulu.png';
  import appleLogo from '../assets/icons/apple.png';
  import peacockLogo from '../assets/icons/peacock.png';

  const SubscriptionScreen = () => {
      const [modalVisible, setModalVisible] = useState(false);
      const [subscriptions, setSubscriptions] = useState([]);
      const [subscriptionName, setSubscriptionName] = useState('');
      const [cost, setCost] = useState('');
      const [paymentDate, setPaymentDate] = useState('');
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedSubscription, setSelectedSubscription] = useState(null);
  
      useEffect(() => {
          // Sort subscriptions
          const sortedSubscriptions = subscriptions.sort((a, b) => 
              new Date(a.paymentDate) - new Date(b.paymentDate)
          );
          setSubscriptions(sortedSubscriptions);
      }, [subscriptions]);
  

      const handleEditOrDeleteSubscription = (id) => {
        // Prompt user for edit or delete
        const selected = subscriptions.find(subscription => subscription.id === id);
        
        Alert.alert(
          "Edit or Delete Subscription",
          "What would you like to do with this subscription?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Edit",
                onPress: () => {
                  setSelectedSubscription(selected);
                  setSubscriptionName(selected.name);
                  setCost(selected.cost.toString());
                  setPaymentDate(selected.paymentDate);
                  setSelectedSubscription(selected);
                  setModalVisible(true);
                  console.log("Edit subscription with id:", id);
                }
              },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                  // Confirm before deleting
                  Alert.alert(
                    "Delete Subscription",
                    "Are you sure you want to delete this subscription?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          setSubscriptions(currentSubscriptions =>
                            currentSubscriptions.filter(subscription => subscription.id !== id)
                          );
                        }
                      }
                    ]
                  );
                }
              }
            ]
        );
      };

      const handleAddSubscription = () => {
        if (!subscriptionName.trim() || !cost.trim() || !paymentDate.trim()) {
          Alert.alert('Error', 'Please fill out all the fields.');
          return; // Stop the function if any field is empty
        }
        let logo = null;
        if (subscriptionName.toLowerCase().includes('hbo') || subscriptionName.toLowerCase().includes('max')) {
            logo = hboLogo;
        } else if (subscriptionName.toLowerCase().includes('prime') || subscriptionName.toLowerCase().includes('amazon')) {
            logo = primeVideoLogo;
        } else if (subscriptionName.toLowerCase().includes('disney') || subscriptionName.toLowerCase().includes('disney plus')
        || subscriptionName.toLowerCase().includes('disney+')) {
            logo = disneyPlusLogo;
        } else if (subscriptionName.toLowerCase() === 'netflix') {
          logo = netflixLogo;
        } else if (subscriptionName.toLowerCase() === 'hulu') {
          logo = huluLogo;
        }else if (subscriptionName.toLowerCase() === 'apple' || subscriptionName.toLowerCase() === 'apple tv'){
          logo = appleLogo;
        } else if (subscriptionName.toLowerCase() === 'peacock') {
          logo = peacockLogo;
        }
      
        if (selectedSubscription) {
          // Editing an existing subscription
          const updatedSubscriptions = subscriptions.map(subscription => {
            if (subscription.id === selectedSubscription.id) {
              return {
                ...subscription,
                name: subscriptionName,
                cost: parseFloat(cost),
                paymentDate,
                logo // Assign the determined logo here
              };
            }
            return subscription;
          });
      
          setSubscriptions(updatedSubscriptions);
          setSelectedSubscription(null);
        } else {
          // Adding a new subscription
          const newSubscription = {
            id: subscriptions.length.toString(),
            name: subscriptionName,
            cost,
            paymentDate,
            logo // Assign the determined logo here
          };
          setSubscriptions([...subscriptions, newSubscription]);
        }
      
        // Resetting form fields
        setSubscriptionName('');
        setCost('');
        setPaymentDate('');
        setModalVisible(false);
      };
      
      
      const closeModal = () => {
        setSubscriptionName('');
        setCost('');
        setPaymentDate('');
        setModalVisible(false);
      };

      const filteredSubscriptions = subscriptions.filter(subscription =>
        subscription.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Subscriptions</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.addButton}
            >
              <Ionicons name="add-circle" size={35} color="#4169E1" />
            </TouchableOpacity>
          </View>
      
          <TextInput
            placeholder="Search for Subscription"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
      
          <FlatList
            data={filteredSubscriptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.subscriptionItem}>
                {item.logo && <Image source={item.logo} style={styles.logo} />}
                <View style={styles.subscriptionTextContainer}>
                  <Text style={styles.paymentDateText}>Due: {item.paymentDate}</Text>
                  <Text style={styles.subscriptionNameText}>{item.name}</Text>
                  <Text style={styles.costText}>${item.cost}</Text>
                </View>
                <TouchableOpacity onPress={() => handleEditOrDeleteSubscription(item.id)} style={styles.optionsButton}>
                  <Text style={styles.optionsText}>...</Text>
                </TouchableOpacity>
              </View>
            )}
          />
      
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Subscription Form</Text>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Ionicons name="close-circle" size={35} color="red" />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Subscription Name"
                value={subscriptionName}
                onChangeText={setSubscriptionName}
                style={styles.input}
              />
              <TextInput
                placeholder="Cost"
                value={cost}
                onChangeText={setCost}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Payment Date (e.g., 2023-09-15)"
                value={paymentDate}
                onChangeText={setPaymentDate}
                style={styles.input}
              />
              <Button
                title="Save Subscription"
                onPress={handleAddSubscription}
              />
            </View>
          </Modal>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
      closeButton: {
          position: 'absolute',
          right: -20, 
          top: -15, 
      },
      container: {
          flex: 1,
          backgroundColor: 'white',
      },
      header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
      },
      title: {
          fontSize: 22,
          fontWeight: 'bold',
      },
      addButton: {
      },
      modalView: {
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          marginTop: '50%',  // Adjust as needed to position the modal on the screen
          shadowOffset: {
              width: 0,
              height: 2,
          
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
      },
      input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width: '80%',
          borderRadius: 10,
      },
      subscriptionItem: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#ececec',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 10,
      },
      subscriptionTextContainer: {
          marginLeft: 10,
          flex: 1,
      },
      paymentDateText: {
          fontSize: 14,
          color: '#333',
          marginBottom: 4,
      },
      subscriptionNameText: {
          fontSize: 16,
          color: '#333',
          fontWeight: 'bold',
          marginBottom: 4,
      },
      costText: {
          fontSize: 14,
          color: '#333',
      },
      logo: {
          width: 70,
          height: 70,
          resizeMode: 'contain', // will maintain in teh bubble when resizing
      },
      modalHeader: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center', // Align items to center horizontally
          alignItems: 'center',
          marginBottom: 20, // Space between header and input fields
      },
      modalTitle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center', // Center the text
          flex: 1, // Take up the available space
      },
      searchInput: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
      },
  });

  export default SubscriptionScreen;