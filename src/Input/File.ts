export async function readFile(path: string): Promise<string> {
  const response = await fetch(path);
  return await response.text();
}

export async function readFileAsArray(
  path: string,
  separator: string = '\n'
): Promise<Array<string>> {
  const fileContent = await readFile(path);
  return fileContent.split(separator).filter((value) => value !== '');
}

export async function readFileAsNumericArray(
  path: string,
  separator: string = '\n'
): Promise<Array<number>> {
  return await (await readFileAsArray(path, separator)).map((value) => +value);
}

export async function readFileAsInputsArray(
  path: string,
  separator: string = '\n'
): Promise<Array<[string, number]>> {
  return (await readFileAsArray(path, separator)).map((value) => {
    const subArray = value.split(' ');
    let inputs: [string, number] = [subArray[0], +subArray[1]];
    return inputs;
  });
}
