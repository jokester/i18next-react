import * as cookie from 'cookie';
import { CookieConsts } from '../../const/cookie-keys';
import { IncomingMessage, OutgoingMessage } from 'http';
import { LangCode } from '../../const/languages';
import { pickLanguage } from '../../i18n/i18n-pref';

export function pickLanguageForReq(
  req: undefined | IncomingMessage,
  res: undefined | OutgoingMessage,
  fallback: LangCode,
  setCookie: boolean,
): LangCode {
  const cookieInReq = cookie.parse(req?.headers.cookie ?? '');

  const langInCookie = cookieInReq[CookieConsts.langPref];

  const langCode = pickLanguage(fallback, langInCookie, req?.headers['accept-language']);

  if (langCode !== langInCookie && setCookie && res) {
    /**
     * set-cookie so that client can use it
     */
    res.setHeader(
      'set-cookie',
      cookie.serialize(CookieConsts.langPref, langCode, {
        expires: CookieConsts.endOfKnownWorld,
        sameSite: 'lax',
      }),
    );

    console.debug('setting cookie for page', langCode);
  }

  return langCode;
}
