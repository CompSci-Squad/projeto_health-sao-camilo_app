import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";

import styles from "./styles";

const MaskedInput = ({
  type,
  mask,
  value,
  keyboardType,
  onChangeText,
  placeholder,
}: MaskedTextInputProps) => {
  return (
    <MaskedTextInput
      onChangeText={onChangeText}
      type={type}
      mask={mask}
      value={value}
      keyboardType={keyboardType}
      placeholder={placeholder}
      style={styles.container}
    />
  );
};

export default MaskedInput;
