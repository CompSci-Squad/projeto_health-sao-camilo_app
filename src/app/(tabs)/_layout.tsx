import { AntDesign, Entypo } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import Header from "../../components/Header";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#619776",
        header: () => <Header />,
      }}
      safeAreaInsets={{ bottom: 50, top: 100 }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" size={24} color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: "Exames",
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="medicinebox" size={24} color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: "Medicamentos",
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
          tabBarShowLabel: true,
          tabBarLabel: "Agendamentos",
        }}
      />
    </Tabs>
  );
}
