import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

import { supabase } from "../../../utils/supabase/supbase";

const AddMedicationScreen = () => {
  const router = useRouter();
  const [dosage, setDosage] = useState("");
  const [finalDate, setFinalDate] = useState(new Date());
  const [isContinuous, setIsContinuous] = useState(false);
  const [medicineNameId, setMedicineNameId] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [medicationNames, setMedicationNames] = useState<any>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || finalDate;
    setShowDatePicker(false);
    setShowTimePicker(true); // Show the time picker next
    setFinalDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || finalDate;
    setShowTimePicker(false);
    setFinalDate(currentTime);
  };

  const handleAddMedication = async () => {
    const { data, error } = await supabase.from("medicine").insert([
      {
        dosage,
        final_date: finalDate.toISOString(),
        is_continuous: isContinuous,
        medicine_name_id: medicineNameId,
        is_finished: isFinished,
      },
    ]);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert("Sucesso", "Medicamento adicionado com sucesso!");
      router.push("/"); // Navega de volta para a tela inicial
    }
  };

  const fetchAllMedicationsName = async () => {
    setIsLoading(true);
    const { status, data } = await supabase
      .from("medicine_name")
      .select("name");

    if (status !== 200) {
      Alert.alert("Erro", "Não foi possível obter os nomes dos medicamentos");
    } else {
      setMedicationNames(data);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllMedicationsName();
    }, []),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={medicationNames}
        onChangeText={setMedicationNames}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosagem" // criar um select para essa area
        value={dosage}
        onChangeText={setDosage}
      />
      <View>
        <Button
          title="Selecionar a Data e Hora de Fim"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={finalDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={finalDate}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
      <Text style={styles.selectedDateText}>
        Data de Fim: {finalDate.toLocaleDateString()}{" "}
        {finalDate.toLocaleTimeString()}
      </Text>
      <View style={styles.checkboxContainer}>
        <Button
          title={`Terminado: ${isFinished ? "Sim" : "Não"}`}
          onPress={() => setIsFinished(!isFinished)}
        />
        <Button
          title={`Contínuo: ${isContinuous ? "Sim" : "Não"}`}
          onPress={() => setIsContinuous(!isContinuous)}
        />
      </View>
      <Button title="Adicionar Medicamento" onPress={handleAddMedication} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  selectedDateText: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddMedicationScreen;
