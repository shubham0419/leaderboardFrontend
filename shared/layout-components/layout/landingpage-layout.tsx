
import React, { Fragment, useEffect, useState } from "react";
import { Provider } from "react-redux";
const Landingswitcher = dynamic(() => import("../switcher/landingswitcher"), {ssr: false,});
import store from "@/shared/redux/store";
import Backtotop from "../backtotop/backtotop";
import dynamic from "next/dynamic";

const Landingpagelayout = ({ children } :any) => {
    
  const [lateLoad, setlateLoad] = useState(false);

    useEffect(() => {
        import("preline");
        setlateLoad(true);
      }, []);
	
  return (
    <Fragment>
    <Provider store={store}>
    <div style={{display: `${lateLoad ? 'block' : 'none'}`}}>
      <Landingswitcher/>
   {children}
    <Backtotop/>
    </div>
</Provider>
</Fragment>
  );
};

export default Landingpagelayout;
