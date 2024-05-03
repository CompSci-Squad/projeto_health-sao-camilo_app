import {
  ToastTitle,
  Toast,
  VStack,
  ToastDescription,
} from "@gluestack-ui/themed";
import React from "react";

type CustomToastProps = {
  title: string;
  message: string;
  action: "error" | "warning" | "success" | "info" | "attention";
};

const CustomToast: React.FC<CustomToastProps> = ({
  title,
  message,
  action,
}) => {
  return (
    <Toast variant="solid" mt="$10" action={action}>
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </VStack>
    </Toast>
  );
};

export default CustomToast;
