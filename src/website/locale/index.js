import get from "lodash/get";
import * as en from "./en.json";

const useLocale = (key: string): string => get(en, key, key.toString());

export default useLocale;
