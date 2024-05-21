export const changeRouteName = (value: string) => {
  switch (value) {
    case "HOME":
      return "HOME";
    case "EXAMS":
      return "EXAMES";
    case "APPOINTMENTS":
      return "CONSULTAS";
    case "MEDICATIONS":
      return "MEDICAMENTOS";
    default:
      break;
  }
};
