import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ThemeChanger } from "@/shared/redux/action";
import Modalsearch from "../modal-search/modalsearch";
import store from "@/shared/redux/store";
import Link from "next/link";
import { basePath } from "@/next.config";
import { useRecoilValue } from "recoil";
import { mentorDataSelector, studentDataSelector } from "@/recoil/auth.atom";

const Header = ({ local_varaiable, ThemeChanger } :any) => {

    let [storedata, SetStoreData] = useState(local_varaiable);
    const user = useRecoilValue(studentDataSelector);
    const mentor = useRecoilValue(mentorDataSelector);

    //full screen
    function Fullscreen() {
        if (!document.fullscreenElement &&
            !document.fullscreenElement &&
            !document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    useEffect(() => {
        const handleResize = () => {
            const windowObject = window;
            if (windowObject.innerWidth <= 991) {
                // ThemeChanger({ ...local_varaiable, "dataToggled": "close" })
            } else {
                // ThemeChanger({...local_varaiable,"dataToggled":""})
            }
        };
        handleResize(); // Check on component mount
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        SetStoreData(local_varaiable);
    }, [local_varaiable]);

    function menuClose() {
        const theme = store.getState();
        ThemeChanger({ ...theme, "dataToggled": "close" });
    }

    const toggleSidebar = () => {
        const theme = store.getState();
        let sidemenuType = theme.dataNavLayout;
        if (window.innerWidth >= 992) {
          if (sidemenuType === "vertical") {
            let verticalStyle = theme.dataVerticalStyle;
            const navStyle = theme.dataNavStyle;
            switch (verticalStyle) {
              // closed
              case "closed":
                ThemeChanger({ ...theme, "dataNavStyle": "" });
                if (theme.dataToggled === "close-menu-close") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  ThemeChanger({ ...theme, "dataToggled": "close-menu-close" });
                }
                break;
              // icon-overlay
              case "overlay":
                ThemeChanger({ ...theme, "dataNavStyle": "" });
                if (theme.dataToggled === "icon-overlay-close") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  if (window.innerWidth >= 992) {
                    ThemeChanger({ ...theme, "dataToggled": "icon-overlay-close" });
                  }
                }
                break;
              // icon-text
              case "icontext":
                ThemeChanger({ ...theme, "dataNavStyle": "" });
                if (theme.dataToggled === "icon-text-close") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  ThemeChanger({ ...theme, "dataToggled": "icon-text-close" });
                }
                break;
              // doublemenu
              case "doublemenu":
                ThemeChanger({ ...theme, "dataNavStyle": "" });
                if (theme.dataToggled === "double-menu-open") {
                  ThemeChanger({ ...theme, "dataToggled": "double-menu-close" });
                } else {
                  let sidemenu = document.querySelector(".side-menu__item.active");
                  if (sidemenu) {
                    ThemeChanger({ ...theme, "dataToggled": "double-menu-open" });
                    if (sidemenu.nextElementSibling) {
                      sidemenu.nextElementSibling.classList.add("double-menu-active");
                    } else {
  
                      ThemeChanger({ ...theme, "dataToggled": "" });
                    }
                  }
                }
  
                // doublemenu(ThemeChanger);
                break;
              // detached
              case "detached":
                if (theme.dataToggled === "detached-close") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  ThemeChanger({ ...theme, "dataToggled": "detached-close" });
                }
                break;
  
              // default
              case "default":
                ThemeChanger({ ...theme, "dataToggled": "" });
            }
            switch (navStyle) {
              case "menu-click":
                if (theme.dataToggled === "menu-click-closed") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                }
                else {
                  ThemeChanger({ ...theme, "dataToggled": "menu-click-closed" });
                }
                break;
              // icon-overlay
              case "menu-hover":
                if (theme.dataToggled === "menu-hover-closed") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  ThemeChanger({ ...theme, "dataToggled": "menu-hover-closed" });
  
                }
                break;
              case "icon-click":
                if (theme.dataToggled === "icon-click-closed") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  ThemeChanger({ ...theme, "dataToggled": "icon-click-closed" });
  
                }
                break;
              case "icon-hover":
                if (theme.dataToggled === "icon-hover-closed") {
                  ThemeChanger({ ...theme, "dataToggled": "" });
                } else {
                  ThemeChanger({ ...theme, "dataToggled": "icon-hover-closed" });
  
                }
                break;
  
            }
          }
        }
        else {
          if (theme.dataToggled === "close") {
            ThemeChanger({ ...theme, "dataToggled": "open" });
  
            setTimeout(() => {
              if (theme.dataToggled == "open") {
                const overlay = document.querySelector("#responsive-overlay");
  
                if (overlay) {
                  overlay.classList.add("active");
                  overlay.addEventListener("click", () => {
                    const overlay = document.querySelector("#responsive-overlay");
  
                    if (overlay) {
                      overlay.classList.remove("active");
                      menuClose();
                    }
                  });
                }
              }
  
              window.addEventListener("resize", () => {
                if (window.screen.width >= 992) {
                  const overlay = document.querySelector("#responsive-overlay");
  
                  if (overlay) {
                    overlay.classList.remove("active");
                  }
                }
              });
            }, 100);
          } else {
            ThemeChanger({ ...theme, "dataToggled": "close" });
          }
        }
  
      };
    //Dark Model
    const ToggleDark = () => {

        ThemeChanger({
            ...local_varaiable,
            "class": local_varaiable.class == "dark" ? "light" : "dark",
            // "dataHeaderStyles": local_varaiable.dataHeaderStyles == "dark" ? "light" : "dark" ,
            "dataHeaderStyles": local_varaiable.dataHeaderStyles == "dark",
            "dataMenuStyles": local_varaiable.dataNavLayout == 'horizontal' ? local_varaiable.class == 'dark' ? 'light' : 'dark' : "dark"

        });
        const theme = store.getState();

        if (theme.class != "dark") {
            ThemeChanger({
                ...theme,
                "bodyBg": "",
                "darkBg": "",
                "dataHeaderStyles" : "",
            });
            localStorage.setItem("Syntolighttheme", "light");
            localStorage.removeItem("Syntodarktheme");
            localStorage.removeItem("SyntoHeader");
            localStorage.removeItem("SyntoMenu");

        }
       
        else {
            localStorage.setItem("Syntodarktheme", "dark");
            localStorage.removeItem("Syntolighttheme");
        }

    };


    
   
    useEffect(() => {
        const navbar :any = document.querySelector(".header");
        const navbar1:any = document.querySelector(".app-sidebar");
        const sticky = navbar.clientHeight;
        // const sticky1 = navbar1.clientHeight;

        function stickyFn() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky-pin");
                navbar1.classList.add("sticky-pin");
            } else {
                navbar.classList.remove("sticky-pin");
                navbar1.classList.remove("sticky-pin");
            }
        }

        window.addEventListener("scroll", stickyFn);
        window.addEventListener("DOMContentLoaded", stickyFn);

        // Cleanup event listeners when the component unmounts
        return () => {
            window.removeEventListener("scroll", stickyFn);
            window.removeEventListener("DOMContentLoaded", stickyFn);
        };
    }, []);

    
    return (
        <Fragment>
            <header className="header custom-sticky !top-0 !w-full">
                <nav className="main-header" aria-label="Global">
                    <div className="header-content">
                        <div className="header-left">

                            <div className="">
                                <button type="button" className="sidebar-toggle" onClick={() => toggleSidebar()} >
                                    <span className="sr-only">Toggle Navigation</span>
                                    <i className="ri-arrow-right-circle-line header-icon toggle-icon"></i>
                                </button>
                            </div>

                        </div>

                        <div className="responsive-logo">
                            <Link className="responsive-logo-dark" href={"/components/dashboards/sales"} aria-label="Brand">
                                <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/brand-logos/desktop-logo.png`} alt="logo" className="mx-auto" /></Link>
                            <Link className="responsive-logo-light" href={"/components/dashboards/sales"} aria-label="Brand">
                                <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/brand-logos/desktop-dark.png`} alt="logo" className="mx-auto" /></Link>
                        </div>

                        <div className="header-right">
                            <div className="responsive-headernav">
                                <div className="header-nav-right">
                                    <div className="header-theme-mode hidden sm:block" onClick={() => ToggleDark()} >
                                        <Link aria-label="anchor" className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                                            href="#!" data-hs-theme-click-value="dark">
                                            <i className="ri-moon-line header-icon"></i>
                                        </Link>
                                        <Link aria-label="anchor" className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                                            href="#!" data-hs-theme-click-value="light">
                                            <i className="ri-sun-line header-icon"></i>
                                        </Link>
                                    </div>
                                    <div className="header-fullscreen hidden lg:block"
                                        onClick={() => Fullscreen()}
                                    >
                                        <Link aria-label="anchor" href="#!" className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                                            <i className="ri-fullscreen-line header-icon full-screen-open"></i>
                                            <i className="ri-fullscreen-line header-icon fullscreen-exit-line hidden"></i>
                                        </Link>
                                    </div>
                                    <div className="header-profile hs-dropdown ti-dropdown" data-hs-dropdown-placement="bottom-right">
                                        <button id="dropdown-profile" type="button" className="hs-dropdown-toggle ti-dropdown-toggle gap-2 !p-0 !ring-0 !border-0 flex-shrink-0 h-8 w-8 rounded-full !shadow-none focus:ring-gray-400 text-xs dark:focus:ring-white/10">
                                            <img className="inline-block rounded-full ring-2 ring-white dark:ring-white/10"
                                                src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/users/1.jpg`} alt="Image Description" />
                                        </button>

                                        <div className="hs-dropdown-menu ti-dropdown-menu border-0 w-[20rem]" aria-labelledby="dropdown-profile">
                                            <div className="ti-dropdown-header !bg-primary flex">
                                                <div className="ltr:mr-3 rtl:ml-3">
                                                    <img className="avatar shadow-none rounded-full !ring-transparent"
                                                        src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/img/users/1.jpg`} alt="profile-img" />
                                                </div>
                                                <div>
                                                    <p className="ti-dropdown-header-title !text-white">{mentor?mentor.name:user?.name}</p>
                                                    <p className="ti-dropdown-header-content !text-white/50"></p>
                                                </div>
                                            </div>
                                            <div className="mt-2 ti-dropdown-divider">
                                                <Link href="#!" className="ti-dropdown-item">
                                                    <i className="ti ti-user-circle text-lg"></i>
                                                    Profile
                                                </Link>
                                                <Link href="#!" className="ti-dropdown-item">
                                                    <i className="ti ti-adjustments-horizontal text-lg"></i>
                                                    Settings
                                                </Link>
                                                <Link href="#!" className="ti-dropdown-item">
                                                    <i className="ti ti-logout  text-lg"></i>
                                                    Log Out
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="switcher-icon">
                                        <button aria-label="button" type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium  hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-switcher">
                                            <i className="ri-settings-5-line header-icon animate-spin"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Modalsearch />
        </Fragment>
    );
};

const mapStateToProps = (state:any) => ({
    local_varaiable: state
});
export default connect(mapStateToProps, { ThemeChanger })(Header);

