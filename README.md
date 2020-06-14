i18next-react
-------

A minimal (~130LOC) React binding for [i18next](https://github.com/i18next/i18next).

[![npm version](https://badge.fury.io/js/i18next-react.svg)](https://badge.fury.io/js/i18next-react)

## Features

- Simple
    - actually, the only dependencies are `react` and `i18next`

- Framework / configuration agnostic
    - opinionless about other parts of system, including how to load i18n resources / how to infer and persist locales
    - easier to integrate into an existing app, or opt out

## Non-features (or, limitations)

- Rich API as in react-i18next / next-i18next
- All locale resources need to be loaded before rendering (in both server and browser), this increases bundle size

## Comparison with alternatives

This library is initially made when trying to use `i18next` in a Next.js serverless app.

Before rolling yet another binding, I tried these libraries:

- [isaachinman/next-i18next](https://github.com/isaachinman/next-i18next) has impressively rich features. But it requires some certain app structure, a custom server, and a few middlewares, all of which I had difficulties to comply with.
- [i18next/react-i18next](https://github.com/i18next/react-i18next) was not very simple to use in Next.js SSR (I may be wrong).

## Getting started

1. Install: `npm install --save i18next-react` or `yarn add i18next-react`
2. Define a factory function to provide initialized `i18next` instance
3. Wrap top level component (or, a component where you want to use i18next within) with `<I18NextReactProvider lang={initialLang} factory={i18NextFactory}>`
4. Consume `i18next` API with`useI18n()` or `useI18nLoaded(lang, namespace)` hooks

## Examples

[react-simple](https://github.com/jokester/i18next-react/tree/master/examples/react-simple):

- based on CRA react app
- bundles in en locale
- load zhHans / zhHant / ja locales on demand, with [i18next/i18next-http-backend](https://github.com/i18next/i18next-http-backend)

[nextjs-serverless](https://github.com/jokester/i18next-react/tree/master/examples/nextjs-serverless)

- bundles all locales
- handle language preference in cookie with `getInitialProps` / `getServerSideProps`

## Feedback / Issues / Contributions

If you find anything interesting, feel free to [fill an issue](https://github.com/jokester/i18next-react/issues/new).

Also, I haven't tested but this should be compatible with preact / react-native too. Like to hear if this library works (or doesn't) with them.

## License

MIT
