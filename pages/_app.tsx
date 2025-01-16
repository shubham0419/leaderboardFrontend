
import "../styles/globals.scss";
import Contentlayout from "@/shared/layout-components/layout/content-layout";
import Authenticationlayout from "@/shared/layout-components/layout/authentication-layout";
import Landingpagelayout from "@/shared/layout-components/layout/landingpage-layout";
import Pagelayout from "@/shared/layout-components/layout/page-layout";
import { RecoilRoot } from "recoil";

const layouts :any = {
  Contentlayout: Contentlayout,
  Pagelayout:Pagelayout,
  Landingpagelayout: Landingpagelayout,
  Authenticationlayout: Authenticationlayout,
};

function MyApp({ Component, pageProps }:any) {
  
  const Layout :any  = 
  layouts[Component.layout] || ((pageProps:any) => <Component>{pageProps}</Component>);
  return (
    <RecoilRoot>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
