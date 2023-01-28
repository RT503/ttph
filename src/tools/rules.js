export function notEmptyStr (str) {
  return (str !== undefined) && (str !== null) && (str !== '');
}

export const notEmptyRule = (v) => {
  return notEmptyStr(v) || 'Обязательное поле';
};

export const intRule = (v) => {
  const asInt = parseInt(v);
  const asFloat = parseFloat(v);
  if (isNaN(asInt))
    return 'Значение должно быть числом';
  if (asInt !== asFloat)
    return 'Значение должно быть целым';
  return true;
};

export const positiveIntRule = (v) => {
  const asInt = parseInt(v);
  if (asInt <= 0)
    return 'Значение должно быть больше нуля';
  return true;
};
