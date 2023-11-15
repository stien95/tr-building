import { useRouter } from "next/router";
import get from "lodash/get";
export default function useLang() {
    const {locale} = useRouter();
    const translations: { [key: string]: any } = {
        es: require("@/lang/es.json"),
        en: require("@/lang/en.json"),
    }

    const getTranslation = (key: string) => {
        const translation = translations[locale || "en"];
        const fallbackTrans = translation["en"];

        if (!fallbackTrans && !translation) {
            return key;
        }

        const translatedTxt = get(translation, key) || get(fallbackTrans, key);

        return translatedTxt || key;
    }
    return {
        t: getTranslation,
        l: locale
    }
}