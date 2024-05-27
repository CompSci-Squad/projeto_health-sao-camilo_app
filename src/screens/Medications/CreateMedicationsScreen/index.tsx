import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert, Text, Platform, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from "../../../utils/supabase/supbase";


const AddMedicationScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [finalDate, setFinalDate] = useState(new Date());
  const [intervalInMinutes, setIntervalInMinutes] = useState('');
  const [isContinuos, setIsContinuos] = useState(false);


  const handleAddMedication = async () => {
    const { data, error } = await supabase
      .from('medicine')
      .insert([
        {
          name,
          dosage,
          final_date: finalDate.toISOString(),
          interval_in_minutes: parseInt(intervalInMinutes),
          is_continuos: isContinuos,
        },
      ]);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Medicamento adicionado com sucesso!');
      router.push('/'); // Navega de volta para a tela inicial
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosagem"
        value={dosage}
        onChangeText={setDosage}
      />
      <View>
        <Button title="Selecionar Data de Fim" onPress={() => setShowDatePicker(true)} />
        <Text>Data Final: {finalDate.toLocaleString()}</Text>
        {showDatePicker && (
          <DateTimePicker
            value={finalDate}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Intervalo em Minutos"
        value={intervalInMinutes}
        onChangeText={setIntervalInMinutes}
        keyboardType="numeric"
      />
      <View style={styles.switchContainer}>
        <Text>É contínuo?</Text>
        <Switch
          value={isContinuos}
          onValueChange={setIsContinuos}
        />
      </View>
      <Button title="Adicionar Medicamento" onPress={handleAddMedication} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AddMedicationScreen;
