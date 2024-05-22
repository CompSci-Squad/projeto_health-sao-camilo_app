export const classifyIMC = (value: number) => {
  if (value < 16) {
    return { status: "Magreza grave", color: "$red" };
  } else if (value >= 16 && value < 17) {
    return { status: "Magreza moderada", color: "$yellow" };
  } else if (value >= 17 && value < 18.5) {
    return { status: "Magreza leve", color: "$green" };
  } else if (value >= 18.5 && value < 25) {
    return { status: "Saudável", color: "$blue" };
  } else if (value >= 25 && value < 30) {
    return { status: "Sobrepeso", color: "$orange" };
  } else if (value >= 30 && value < 35) {
    return { status: "Obesidade grau I", color: "$red" };
  } else if (value >= 35 && value < 40) {
    return { status: "Obesidade grau II", color: "$red" };
  } else if (value >= 40) {
    return { status: "Obesidade grau III", color: "$red" };
  }
};

export const classifyPressure = (value: number) => {
  if (value < 120) {
    return { status: "Normal", color: "$green" };
  } else if (value >= 120 && value <= 139) {
    return { status: "Pré-hipertensão", color: "$yellow" };
  } else if (value >= 140 && value <= 159) {
    return { status: "Hipertensão 1", color: "$orange" };
  } else if (value >= 160 && value <= 180) {
    return { status: "Hipertensão 2", color: "$orange" };
  } else {
    return { status: "Crise hipertensiva", color: "$red" };
  }
};
