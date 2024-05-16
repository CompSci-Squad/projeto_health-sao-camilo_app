import { StatusBar } from "expo-status-bar";

type StatusBarConfigProps = {
  children: React.ReactNode;
};

const ScreenContainer: React.FC<StatusBarConfigProps> = ({ children }) => {
  return (
    <>
      <StatusBar style="dark" />
      {children}
    </>
  );
};

export default ScreenContainer;
