export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const padId = (id: string | number) => {
  let stringId: string;

  if (typeof id === "number") {
    stringId = id.toString();
  } else {
    stringId = id;
  }

  return stringId.padStart(5, "0");
};
