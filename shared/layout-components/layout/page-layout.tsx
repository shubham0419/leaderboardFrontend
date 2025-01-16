
import store from "@/shared/redux/store";
import { Fragment, useEffect, useState } from "react";
import Switcher from "../switcher/switcher";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import Footer from "../footer/footer";
import Backtotop from "../backtotop/backtotop";
import { Provider } from "react-redux";

const Pagelayout = ({children} :any) => {
	
	let [MyclassName , setMyClass] = useState("");

	const Bodyclickk = () => {
		if (localStorage.getItem("Syntoverticalstyles") == "icontext") {
			setMyClass("");
		}
	};
	useEffect(() => {
		import("preline");
        }, []);

	return (
		<Fragment>
			<Provider store={store}>
			
			<Switcher/>
			<div className="page">
				<Sidebar/>
				<Header/>
				<div className="content relative">
					
						{children}
					
				</div>
				<Footer />
			</div>
			<Backtotop />
			</Provider>
		</Fragment>
	);
};

export default Pagelayout;
