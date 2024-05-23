import dayjs from "dayjs";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Button, Alert, FlatList, TouchableOpacity } from "react-native";

import { supabase } from "../../utils/supabase/supbase";

import MedicationsCard from "@/components/MedicationsCard";

const MedicationsHomeScreen = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      const { data, error } = await supabase.from("medicine").select("*");

      if (error) {
        Alert.alert("Erro", error.message);
      } else {
        setData(data);
      }
    };

    fetchMedications();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.5)",
                padding: 20,
                margin: 10,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <MedicationsCard
                name={`Nome do Medicamento: ${item.medicine_name_id}`}
                time={`Intervalo: ${item.interval_in_minutes ? `${item.interval_in_minutes} minutos` : "N/A"}`}
                endDate={`Fim: ${dayjs(item.final_date).format("DD/MM/YYYY HH:mm")}`}
                dosage={`Dosagem: ${item.dosage}`}
                isContinuous={`Contínuo: ${item.is_continuous ? "Sim" : "Não"}`}
                isFinished={`Finalizado: ${item.is_finished ? "Sim" : "Não"}`}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Excluir"
                  onPress={() =>
                    Alert.alert(
                      "Excluir",
                      "Tem certeza que deseja excluir este medicamento?",
                    )
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Button title="+" onPress={() => router.push("/createMedications")} />
      </View>
    </View>
  );
};

export default MedicationsHomeScreen;
