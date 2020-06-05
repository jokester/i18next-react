export const CookieConsts = {
  langPref: 'langPref',

  endOfKnownWorld: /* it's safe to expire when the world gets doomed */ new Date(-(1 << 31) * 1e3),
} as const;
