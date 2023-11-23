import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const SummaryScreen = () => {
  const maxValue = 4000;
  const [data, setData] = useState({
    subscriptions: 79,
    bills: 1287,
    saved: 229,
    monthlyIncome: 4000,
  });
  const [editMode, setEditMode] = useState(false);

  const getWidth = (value) => (value / maxValue) * 100 + '%';

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleMonthlyIncomeChange = (newIncome) => {
    setData({ ...data, monthlyIncome: newIncome });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monthly Breakdown</Text>

      <View style={styles.chartContainer}>
        {Object.keys(data).map((key) => (
          <View key={key} style={styles.barRow}>
            <View
              style={[
                styles.bar,
                { width: getWidth(data[key]), backgroundColor: key === 'monthlyIncome' ? '#4caf50' : '#2196f3' },
              ]}
            >
              <Text style={styles.barLabel}>{key === 'monthlyIncome' ? `$${data[key]}` : ''}</Text>
            </View>
            <Text style={styles.valueLabel}>{key !== 'monthlyIncome' ? `$${data[key]}` : ''}</Text>
          </View>
        ))}
      </View>

      <View style={styles.details}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Subscriptions</Text>
          <Text style={styles.detailValue}>$79</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Bills</Text>
          <Text style={styles.detailValue}>$1,287</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Saved</Text>
          <Text style={styles.detailValue}>$229</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Monthly Income</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={data.monthlyIncome.toString()}
              onChangeText={(text) => handleMonthlyIncomeChange(text)}
              keyboardType="numeric"
            />
          ) : (
            <>
              <Text style={styles.detailValue}>${data.monthlyIncome}</Text>
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
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 20,
    borderRadius: 10,
    marginRight: 10,
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
    marginTop: 10, // Add spacing between the rows
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