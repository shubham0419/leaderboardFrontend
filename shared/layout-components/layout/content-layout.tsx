
import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { useState } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/footer";
import Backtotop from "../backtotop/backtotop";
import store from "@/shared/redux/store";
import Switcher from "../switcher/switcher";

const Contentlayout = ({ children } :any) => {

	const [lateLoad, setlateLoad] = useState(false);
	const Add = () => {
	  document.querySelector("body")?.classList.remove("error-1");
	  document.querySelector("body")?.classList.remove("landing-body");
	};
	
	useEffect(() => {
	  Add();
	  setlateLoad(true);
	});

	let [MyclassName, setMyClass] = useState("");

	const Bodyclick = () => {
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
			<div style={{display: `${lateLoad ? 'block' : 'none'}`}}>
				<Switcher />
				<div className="page">
					<Sidebar />
					<Header />
					<div className="content">
						<div className="main-content" onClick={Bodyclick}>
							{children}
						</div>
					</div>
					<Footer />
				</div>
				<Backtotop />
				</div>
			</Provider>
		</Fragment>
	);
};

export default Contentlayout;
