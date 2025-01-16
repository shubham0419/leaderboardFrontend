
import React from "react";
import Head from "next/head";
import favicon from "../../../public/assets/img/brand-logos/favicon.ico";

const Seo = ({title} :any) => {

  let i = `Synto - ${title}`;

  return (
    <Head>
      <title>{i}</title>
      <link href={favicon.src} rel="icon"></link>
      <meta name="description" content="Synto - Nextjs Admin &amp; Dashboard Template" />
      <meta name="author" content="Spruko Technologies Private Limited" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="tailwind nextjs, dashboard tailwind, tailwind admin, nextjs tailwind, tailwind in nextjs, admin dashboard tailwind, tailwind dashboards, tailwind template admin, tailwind and nextjs, admin panel, template dashboard, admin dashboard template, admin panel template"></meta>
    </Head>
  );
};

export default Seo;
