import { View, Text } from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { supabase } from "../../utils/supabase/supbase";
import { Alert } from "react-native";

type MedicationsCardProps = {
  nameId: string;
  time: string;
  endDate: string;
  dosage: string;
};

const MedicationsCard: React.FC<MedicationsCardProps> = ({
  time,
  nameId,
  endDate,
  dosage,
}) => {
  const [name, setName] = useState();

  const fetchMedicineName = async () => {
    const { data, error } = await supabase
      .from("medicine_name")
      .select("name")
      .eq("id", nameId)
      .single();

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      setName(name);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicineName();
    }, []),
  );

  return (
    <View>
      <Text>{name}</Text>
      <Text>{time}</Text>
      <Text>{endDate}</Text>
      <Text>{dosage}</Text>
    </View>
  );
};
export default MedicationsCard;
