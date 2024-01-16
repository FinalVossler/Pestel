import { ITranslatedText } from "roottypes";

const getTranslatedText =
  (userPreferenceLanguage: string) =>
  (
    translatedTexts: ITranslatedText[] | undefined | string,
    language: string | undefined = userPreferenceLanguage
  ): string => {
    if (typeof translatedTexts === "string") return translatedTexts;

    if (!translatedTexts) return "";

    const result: ITranslatedText | undefined = translatedTexts.find(
      (el) => el.language === language
    );

    if (result && result.text.trim() !== "<p><br></p>") {
      return result.text;
    } else {
      return translatedTexts.length > 0 ? translatedTexts[0].text : "";
    }
  };

const useGetTranslatedText = (language: string) => {
  return getTranslatedText(language);
};

export default useGetTranslatedText;
