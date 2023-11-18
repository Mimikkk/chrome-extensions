export const readArgument = (name: string) => {
  const argument = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (argument === undefined) throw Error(`Missing argument --${name}`);
  return argument.split("=")[1];
};
