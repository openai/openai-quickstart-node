// pages/_document.js

import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: React.Children.toArray([initialProps.styles]),
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>{CssBaseline.flush()}
                    <link rel="stylesheet" href="./tiny-tales.css"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="./tiny-tales.js" async></script>

                </body>
            </Html>
        );
    }
}

export default MyDocument;