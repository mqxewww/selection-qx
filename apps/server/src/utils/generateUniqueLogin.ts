export const generateUniqueLogin = async (
  firstname: string,
  lastname: string,
  callback: (login: string) => Promise<boolean>,
) => {
  const baseLogin = `${firstname.trim().toLowerCase().slice(0, 3)}${lastname.trim().toLowerCase().slice(0, 1)}`;

  let counter = 1;
  let login = `${baseLogin}${counter}`;

  const isTaken = await callback(login);

  while (isTaken) {
    counter++;
    login = `${baseLogin}${counter}`;
  }

  return login;
};
