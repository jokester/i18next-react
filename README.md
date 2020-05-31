i18next-react
-------

A simpler (~150LOC) React binding for [i18next](https://github.com/i18next/i18next).

## Features

- Simple
    - actually, the only dependencies are `react` and `i18next`

- Framework / configuration agnostic
    - opinionless about other parts of system, including how to load i18n resources / how to infer and persist locales
    - easier to integrate into an existing app

## Comparison with alternatives

This library is initially made when trying to use `i18next` in a Next.js serverless app.

Before rolling yet another binding, I tried these libraries:

- [next-i18next](https://github.com/isaachinman/next-i18next) has impressively rich features. But it requires a specific app structure, a custom server, and a few middlewares, all of which I found difficult to comply with.
- [i18next/react-i18next](https://github.com/i18next/react-i18next) was not very simple to use in Next.js SSR.

## Getting started

TODO

## Feedback / Issues / Contributions

Feel free to create a issue in github repo.

Also, I haven't tested but this should work with preact / react-native too. If it works or doesn't work, I'm glad to hear.

## License

MIT
