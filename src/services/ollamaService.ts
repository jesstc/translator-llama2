import ollama from 'ollama'

const Models: Record<string, string>  = {
  "Chinese": "請幫我將以下英文文本翻譯成繁體中文，並且回傳的文字僅有翻譯後的繁體中文。英文文本為：",
  "English": "Please translate the following content from Chinese to English. You should only response translated English. The Chinese content is: ",
};

export async function translateService(text: string, targetLanguage: string): Promise<string> {
  try {
    console.log("--------translating-------")
    console.log(Models[targetLanguage] + text)

    const response = await ollama.chat({
        model: 'llama2',
        messages: [{ role: 'user', content: Models[targetLanguage] + text }],
      })
    return response.message.content.trim() || '';
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed.");
  }
}