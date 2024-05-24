import { View, Text } from "@gluestack-ui/themed";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";

import { supabase } from "../../utils/supabase/supbase";

type MedicationsCardProps = {
  nameId: string;
  time: string;
  endDate: string;
  dosage: string;
  isContinuous: string;
};

const MedicationsCard: React.FC<MedicationsCardProps> = ({
  time,
  nameId,
  endDate,
  dosage,
  isContinuous,
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
      <Text>{isContinuous}</Text>
    </View>
  );
};
export default MedicationsCard;
