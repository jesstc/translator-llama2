import ollama from 'ollama'

export async function translateService(text: string, targetLanguage: string): Promise<string> {
  try {
    console.log("--------translating-------")
    const response = await ollama.chat({
        model: 'llama2',
        messages: [{ role: 'user', content: 'translate the following content to ' + targetLanguage + '(You should only response the translated content):' + text }],
      })
    return response.message.content.trim() || '';
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed.");
  }
}