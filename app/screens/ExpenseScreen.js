import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  Modal, StyleSheet, TextInput,
  FlatList, Button, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import coinLogo from '../assets/icons/coin.png';

const ExpenseScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(coinLogo); // Placeholder for image selection logic
  const [selectedExpense, setSelectedExpense] = useState(null); // New state for selected expense

  useEffect(() => {
    const sortedExpenses = expenses.sort((a, b) => 
        new Date(a.paymentDate) - new Date(b.paymentDate)
    );
    setExpenses(sortedExpenses);
  }, [expenses]);

  const handleEditOrDeleteExpense = (id) => {
    const selected = expenses.find(expense => expense.id === id);
    Alert.alert(
      "Edit or Delete Expense",
      "Do you want to edit or delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Edit",
          onPress: () => {
            // Implement your edit logic here
            // Set temporary values in the form for editing
            setExpenseName(selected.name);
            setAmount(selected.amount.toString());
            setPaymentDate(selected.paymentDate);
            setSelectedImage(selected.image);

            setSelectedExpense(selected);
            setModalVisible(true);
            console.log("Edit expense with id:", id);
          }
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Delete Expense",
              "Are you sure you want to delete this expense?",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: () => {
                    setExpenses((currentExpenses) =>
                      currentExpenses.filter((expense) => expense.id !== id)
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


  const handleAddExpense = () => {
    if (selectedExpense) {
      // If there's a selected expense, it means we are editing
      const updatedExpenses = expenses.map(expense => {
        if (expense.id === selectedExpense.id) {
          return {
            ...expense,
            name: expenseName,
            amount: parseFloat(amount),
            paymentDate,
            image: selectedImage,
          };
        }
        return expense;
      });

      setExpenses(updatedExpenses);
      setSelectedExpense(null); // Reset selected expense
    } else {
      // If no selected expense, it means we are adding
      const newExpense = {
        id: expenses.length.toString(),
        name: expenseName,
        amount,
        paymentDate,
        image: selectedImage,
      };

      setExpenses([...expenses, newExpense]);
    }

    // Reset form fields
    setExpenseName('');
    setAmount('');
    setPaymentDate('');
    setSelectedImage(coinLogo);
    setModalVisible(false);
  };

  const closeModal = () => {
    // Reset form fields and selected expense when the modal is closed
    setExpenseName('');
    setAmount('');
    setPaymentDate('');
    setSelectedImage(coinLogo);
    setSelectedExpense(null);

    setModalVisible(false);
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={35} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search for Expense"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            {item.image && <Image source={item.image} style={styles.logo} />}
            <View style={styles.expenseTextContainer}>
              <Text style={styles.paymentDateText}>Due: {item.paymentDate}</Text>
              <Text style={styles.expenseNameText}>{item.name}</Text>
              <Text style={styles.amountText}>${item.amount}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEditOrDeleteExpense(item.id)} style={styles.optionsButton}>
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
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close-circle" size={35} color="red" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Expense Name"
            value={expenseName}
            onChangeText={setExpenseName}
            style={styles.input}
          />
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Payment Date (e.g., 2023-09-15)"
            value={paymentDate}
            onChangeText={setPaymentDate}
            style={styles.input}
          />
          {/* Add image selection logic here */}
          <Button
            title="Save Expense"
            onPress={handleAddExpense}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // Style for the button
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
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ececec',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  expenseTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  paymentDateText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  expenseNameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 14,
    color: '#333',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    marginTop: '50%',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    right: -20, 
    top: -15,
  },
  optionsButton: {
  },
  optionsText: {
  }
});

export default ExpenseScreen;
