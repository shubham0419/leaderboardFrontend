
import React, { Fragment, useEffect } from "react";
import store from "@/shared/redux/store";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Authenticationswitcher from "../switcher/authenticationswitcher";;

const Authenticationlayout = ({ children } :any) => {

    useEffect(() => {
        import("preline");
    }, []);

    return (
        <Fragment>
            <Provider store={store}>
                <HelmetProvider>
                    <Helmet>
                        <html className="h-full"/>
                    </Helmet>
                    <Authenticationswitcher/>
                    {children}
                </HelmetProvider>
            </Provider>
        </Fragment>

    );
};

export default Authenticationlayout;
