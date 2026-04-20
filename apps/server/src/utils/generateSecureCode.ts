export const generateSecureCode = () => {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);

  return (100000 + (randomValues[0] % 900000)).toString();
};
