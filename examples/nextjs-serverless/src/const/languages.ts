export enum LangCode {
  en = 'en',
  ja = 'ja',
  zhHanS = 'zh-Hans',
  zhHanT = 'zh-Hant',
}

export const LangMap = new Map([
  [LangCode.zhHanS, { pattern: /^zh-(cn|sg)/i, label: '简体中文' }],
  [LangCode.zhHanT, { pattern: /^zh/i, label: '繁體中文' }],
  [LangCode.en, { pattern: /^en/i, label: 'English' }],
  [LangCode.ja, { pattern: /^ja/i, label: '日本語' }],
] as const);
