import { View, Text } from "@gluestack-ui/themed";
import React from "react";

type MedicationsCardProps = {
  name: string;
  time: string;
  endDate: string;
  dosage: string;
};

const MedicationsCard: React.FC<MedicationsCardProps> = ({
  time,
  name,
  endDate,
  dosage,
}) => {
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
