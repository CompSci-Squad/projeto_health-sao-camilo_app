import { View, Text } from "@gluestack-ui/themed";
import React from "react";

type MedicationsCardProps = {
  name: string;
  time: string;
  endDate: string;
};

const MedicationsCard: React.FC<MedicationsCardProps> = ({
  time,
  name,
  endDate,
}) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{time}</Text>
      <Text>{endDate}</Text>
    </View>
  );
};
export default MedicationsCard;
