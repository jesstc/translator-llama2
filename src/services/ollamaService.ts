import ollama from 'ollama'

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    console.log("--------translating-------")
    const response = await ollama.chat({
        model: 'llama2',
        messages: [{ role: 'user', content: 'translate the following content to ' + targetLanguage + '(You should only response the translated content):' + text }],
      })
      console.log(response.message.content)
    return response.message.content || '';
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed.");
  }
}