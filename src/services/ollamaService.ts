import ollama from 'ollama'

const Models: Record<string, string>  = {
  "Chinese": "請幫我將以下英文文本翻譯成繁體中文，並且只回傳翻譯結果，不需要任何額外的說明或解釋。英文文本為：",
  "English": "Please help me translate the following Chinese text into English and only return the translation result without any additional explanations or interpretations. The Chinese content is: ",
};

export async function translateService(text: string, targetLanguage: string): Promise<string> {
  try {
    const response = await ollama.generate({
        model: 'llama2',
        prompt: Models[targetLanguage] + text,
      })

    return response.response.trim() || '';
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Translation failed.");
  }
}