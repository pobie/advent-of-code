export async function getQuestionDescription(path: string): Promise<string> {
  const response = await fetch(path);
  return await response.text();
}
