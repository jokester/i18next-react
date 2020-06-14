import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Head, Main, NextScript } from 'next/document';
import { pickLanguageForReq } from '../src/ssr/middleware/cookie-lang';
import { LangCode } from '../src/const/languages';

interface OurDocumentProps {
  lang: string;
}

export default class CustomDocument extends Document<OurDocumentProps> {
  /**
   * @note only in server
   * @param {DocumentContext} ctx
   * @returns {Promise<OurDocumentProps & DocumentInitialProps>}
   */
  static getInitialProps = async (ctx: DocumentContext) => {
    return {
      ...(await Document.getInitialProps(ctx)),
      lang: pickLanguageForReq(ctx.req, ctx.res, LangCode.en, true),
    } as OurDocumentProps & DocumentInitialProps;
  };

  render() {
    return (
      <html lang={this.props.lang}>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
