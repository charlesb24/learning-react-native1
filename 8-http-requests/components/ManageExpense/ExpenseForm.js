import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';
import { convertToISOString, getFormattedDate } from '../../util/date';
import { Colors } from '../../constants/styles';

export default function ExpenseForm({ defaultValues, submitLabel, onCancel, onSubmit }) {
  const [ inputs, setInputs ] = useState({
    amount: {
      value: defaultValues?.amount.toFixed(2).toString() ?? '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? '',
      isValid: true,
    },
  });

  function handleChangeInput(field, value) {
    setInputs(prevValues => ({
      ...prevValues,
      [field]: { value, isValid: true },
    }));
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(convertToISOString(inputs.date.value)),
      description: inputs.description.value.trim(),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(prevValues => ({
        amount: { value: prevValues.amount.value, isValid: amountIsValid },
        date: { value: prevValues.date.value, isValid: dateIsValid },
        description: { value: prevValues.description.value, isValid: descriptionIsValid },
      }));

      return;
    }

    onSubmit(expenseData);
  }

  const formIsValid =
    inputs.amount.isValid
    && inputs.date.isValid
    && inputs.description.isValid;

  return (
    <>
      <View style={ styles.container }>

        <Text style={ styles.title }>Expense Details</Text>

        <View style={ styles.inputRow }>
          <Input
            label="Amount"
            isValid={ inputs.amount.isValid }
            style={ styles.rowInput }
            inputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: handleChangeInput.bind(this, 'amount'),
              value: inputs.amount.value,
            }}
          />

          <Input
            label="Date"
            isValid={ inputs.date.isValid }
            style={ styles.rowInput }
            inputConfig={{
              placeholder: 'MM-DD-YYYY',
              maxLength: 10,
              onChangeText: handleChangeInput.bind(this, 'date'),
              value: inputs.date.value,
            }}
          />
        </View>

        <Input
          label="Description"
          isValid={ inputs.description.isValid }
          inputConfig={{
            multiline: true,
            onChangeText: handleChangeInput.bind(this, 'description'),
            value: inputs.description.value,
          }}
        />

      </View>

      <View style={ styles.errorContainer }>
        { !formIsValid && <Text style={ styles.errorText }>Invalid Input! Please check the fields and fix any errors.</Text> }
      </View>

      <View style={ styles.buttonContainer }>
        <Button onPress={ onCancel } style={ styles.button } flat={ true }>Cancel</Button>
        <Button onPress={ handleSubmit } style={ styles.button }>{ submitLabel }</Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorContainer: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.error50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});