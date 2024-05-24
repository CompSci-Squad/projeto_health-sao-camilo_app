import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

type StatusBarConfigProps = {
  children: React.ReactNode;
};

const ScreenContainer: React.FC<StatusBarConfigProps> = ({ children }) => {
  const initialize = async () => {
    await NavigationBar.setPositionAsync("absolute");
    NavigationBar.setVisibilityAsync("visible");
    // transparent backgrounds to see through
    await NavigationBar.setBackgroundColorAsync("#ffffff00");
  };

  useFocusEffect(
    useCallback(() => {
      initialize();
    }, []),
  );
  return (
    <>
      <StatusBar style="dark" />
      {children}
    </>
  );
};

export default ScreenContainer;
