import { ru, TranslationKey } from '../locales/ru';

export const useTranslation = () => {
    const t = (key: TranslationKey): string => {
        return ru[key] || key;
    };

    return { t };
};
