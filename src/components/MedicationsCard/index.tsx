import {
  View,
  Text,
  Card,
  HStack,
  VStack,
  Heading,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import dayjs from "dayjs";
import { useFocusEffect } from "expo-router";
import { ArrowRightCircle, Trash2 } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";

import { supabase } from "../../utils/supabase/supbase";

type MedicationsCardProps = {
  id: string;
  name: string;
  interval: number;
  endDate: string;
  dosage: string;
  isContinuos: string;
  fetchMedications: () => Promise<void>;
};

const MedicationsCard: React.FC<MedicationsCardProps> = ({
  id,
  interval,
  name,
  endDate,
  dosage,
  isContinuos,
  fetchMedications,
}) => {
  const handleDelete = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja excluir este medicamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            const { error } = await supabase
              .from("medicine")
              .delete()
              .eq("id", id);

            if (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir o medicamento.");
            } else {
              Alert.alert("Sucesso", "Medicamento excluído com sucesso.");
              fetchMedications();
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <Card
      mt="$5"
      width="$80"
      height="$40"
      borderColor="$hospitalGreen"
      borderWidth={2}
      borderRadius="$2xl"
    >
      <HStack
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        padding="$4"
      >
        <VStack>
          <Heading size="sm" color="$black">
            {name}
          </Heading>
          <Text size="sm" color="$gray700">
            {isContinuos
              ? "Medicamento contínuo"
              : `Data final: ${dayjs(endDate).format("DD/MM/YYYY")} às ${dayjs(endDate).format("HH:mm")}`}
          </Text>
          <Text size="sm" color="$gray700">{`Dosagem: ${dosage}`}</Text>
          <Text
            size="sm"
            color="$gray700"
          >{`Intervalo: ${interval} horas`}</Text>
        </VStack>

        <Button
          onPress={handleDelete}
          position="absolute"
          bottom="$2"
          right="$2"
          bgColor="$red"
          borderRadius="$full"
          width="$10"
          height="$10"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={Trash2} color="$white" />
        </Button>
      </HStack>
    </Card>
  );
};

export default MedicationsCard;
