import { Feather } from "@expo/vector-icons";
import { Box, FlatList, View, Button, Text } from "@gluestack-ui/themed";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState, useRef } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";

import MedicationsCard from "@/components/MedicationsCard";

type Medication = {
  name: string;
  time: Date;
  endDate: Date;
  dosage: string;
};

const MedicationsHomeScreen = () => {
  const [data, setData] = useState<Medication[]>([
    {
      name: "Medicamento 1",
      time: new Date("2024-04-25T10:40:00Z"),
      endDate: new Date("2024-04-25T12:00:00Z"),
      dosage: "0mg",
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editTime, setEditTime] = useState(new Date());
  const [editEndDate, setEditEndDate] = useState(new Date());
  const [editDosage, setEditDosage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const componentIsMounted = useRef(true);

  const handleAddBox = () => {
    const newData: Medication = {
      name: `Task ${data.length + 1}`,
      time: new Date("2024-04-25T10:00:00Z"),
      endDate: new Date("2024-04-25T11:00:00Z"),
      dosage: "10mg",
    };
    setData([...data, newData]);
  };

  const handleDeleteBox = (name: string) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta caixa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
          setData(data.filter((item) => item.name !== name));
        },
      },
    ]);
  };

  const handleEditBox = (index: number) => {
    setEditIndex(index);
    setEditMode(true);
    const item = data[index];
    setEditName(item.name);
    setEditTime(item.time);
    setEditEndDate(item.endDate);
    setEditDosage(item.dosage);
  };

  const handleTimeChange = (event: Event, selectedDate?: Date) => {
    if (componentIsMounted.current) {
      setShowDatePicker(false);
      if (selectedDate) {
        setEditTime(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event: Event, selectedDate?: Date) => {
    if (componentIsMounted.current) {
      setShowEndDatePicker(false);
      if (selectedDate) {
        setEditEndDate(selectedDate);
      }
    }
  };

  const handleSave = () => {
    const newData = [...data];
    newData[editIndex!] = {
      ...newData[editIndex!],
      name: editName,
      time: editTime,
      endDate: editEndDate,
      dosage: editDosage,
    };
    setData(newData);
    setEditMode(false);
  };

  return (
    <View marginTop="$2">
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleEditBox(index)}>
            <Box
              bg="rgba(128, 128, 128, 0.5)"
              p="$5"
              m="$4"
              rounded="$3xl"
              marginBottom="$2"
            >
              {editMode && editIndex === index ? (
                <View>
                  <TextInput
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Nome"
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text>Horario: {dayjs(editTime).format("HH:mm")}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={editTime}
                      mode="datetime"
                      is24Hour
                      display="default"
                      onChange={handleTimeChange}
                    />
                  )}
                  <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                    <Text>
                      Fim: {dayjs(editEndDate).format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </TouchableOpacity>
                  {showEndDatePicker && (
                    <DateTimePicker
                      testID="endDatePicker"
                      value={editEndDate}
                      mode="datetime"
                      is24Hour
                      display="default"
                      onChange={handleEndDateChange}
                    />
                  )}
                  <TextInput
                    value={editDosage}
                    onChangeText={setEditDosage}
                    placeholder="Dosagem"
                  />
                  <Button onPress={handleSave} bg="#619776" rounded="$full">
                    <Text>Salvar</Text>
                  </Button>
                </View>
              ) : (
                <>
                  <MedicationsCard
                    name={`Nome: ${item.name}`}
                    time={`Horário: ${dayjs(item.time).format("HH:mm")}`}
                    endDate={`Fim: ${dayjs(item.endDate).format("DD/MM/YYYY HH:mm")}`}
                    dosage={`Dosagem: ${item.dosage}`}
                  />
                  <View flexDirection="row" justifyContent="space-between">
                    <Button
                      onPress={() => handleDeleteBox(item.name)}
                      bg="$red"
                      rounded="$full"
                      marginLeft="$2"
                    >
                      <Feather name="trash-2" size={24} color="black" />
                    </Button>
                  </View>
                </>
              )}
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      <View marginTop="$2" alignItems="center">
        <Button onPress={handleAddBox} bg="#619776" rounded="$full">
          <Text>+</Text>
        </Button>
      </View>
    </View>
  );
};

export default MedicationsHomeScreen;
