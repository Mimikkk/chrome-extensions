export const readArgument = (name: string, fallback?: string) => {
  const argument = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (argument === undefined) {
    if (fallback !== undefined) return fallback;
    throw Error(`Missing argument --${name}`);
  }
  return argument.split("=")[1];
};
