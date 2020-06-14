import JsCookie from 'js-cookie';
import { CookieConsts } from '../const/cookie-keys';
import { LangCode, LangMap } from "../const/languages";
import { parse as parseAcceptLang } from "accept-language-parser";

export function setLangCookie(code: LangCode) {
  JsCookie.set(CookieConsts.langPref, code, {
    expires: CookieConsts.endOfKnownWorld,
    sameSite: 'lax',
  });
}

export function pickLanguage(fallback: LangCode, existedPref?: string, acceptLang?: string): LangCode {
  if ([LangCode.ja, LangCode.en, LangCode.zhHanS, LangCode.zhHanT].includes(existedPref as LangCode)) {
    return existedPref as LangCode;
  }

  for (const specified of parseAcceptLang(acceptLang || ''))
    for (const [code, { pattern }] of LangMap) {
      if (pattern.exec(`${specified.code}-${specified.region}`)) {
        return code;
      }
    }

  return fallback;
}
