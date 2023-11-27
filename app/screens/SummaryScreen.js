import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const SummaryScreen = () => {
  const maxValue = 4000;
  const [data, setData] = useState({
    Subscriptions: 115,
    Bills: 1287,
    Saved: 1369,
    MonthlyIncome: 3000,
  });
  const [editMode, setEditMode] = useState(false);

  const getWidth = (value) => {
    const widthPercentage = (value / maxValue) * 100;
    return `${Math.min(widthPercentage, 100)}%`; // Limit the width to a maximum of 100%
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleMonthlyIncomeChange = (newIncome) => {
    setData({ ...data, MonthlyIncome: newIncome });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monthly Breakdown</Text>
      <View style={styles.chartContainer}>
        {Object.keys(data).map((key) => (
          <View key={key} style={styles.barRow}>
            <Text style={styles.keyLabel}>{`${key}: `}</Text>
            <View
              style={[
                styles.bar,
                { width: getWidth(data[key]), backgroundColor: key === 'MonthlyIncome' ? '#4caf50' : '#2196f3' },
              ]}
            />
            <Text style={styles.valueLabel}>{`$${data[key]}`}</Text>
          </View>
        ))}
      </View>
      <View style={styles.details}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Subscriptions</Text>
          <Text style={styles.detailValue}>$115</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Bills</Text>
          <Text style={styles.detailValue}>$1,287</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Saved</Text>
          <Text style={styles.detailValue}>$1,369</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Monthly Income</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={data.MonthlyIncome.toString()}
              onChangeText={(text) => handleMonthlyIncomeChange(text)}
              keyboardType="numeric"
            />
          ) : (
            <>
              <Text style={styles.detailValue}>${data.MonthlyIncome}</Text>
              <TouchableOpacity onPress={handleEditClick} style={styles.editButton}>
                <Text style={styles.editButtonText}>{editMode ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chartContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 200,
    marginTop: 20,
    paddingHorizontal: 20, 
    width: '50%',
  },
  
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196f3',
    marginRight: 5,
  },
  barLabel: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  valueLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, 
  },
  detailBox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  editButton: {
    marginTop: 5,
    backgroundColor: '#a9a9a9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
});

export default SummaryScreen;