
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuItems from "../sidebar/nav";

const Modalsearch = () => {
  //Search functionality
  const [_show, setShow] = useState("false");

  const handleClose = () => setShow("false");

  const [show1, setShow1] = useState<any>("false");
  const [InputValue, setInputValue] = useState("");
  const [show2, setShow2] = useState<any>("false");
  const [searchcolor, setsearchcolor] = useState("text-dark");
  const [searchval, setsearchval] = useState("Type something");
  const [NavData, setNavData] = useState([]);

  useEffect(() => {
    const clickHandler = (_event: any) => {
      const searchResult = document.querySelector(".search-result");
      if (searchResult) {
        searchResult.classList.add("hidden");
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  const myfunction = (inputvalue: string) => {
    document.querySelector(".search-result")?.classList.remove("hidden");

    const i: any = [];
    const allElement2: any = [];

    MenuItems.forEach((mainLevel:any) => {
      if (mainLevel.children) {
        setShow1(true);
        mainLevel.children.forEach((subLevel:any) => {
          i.push(subLevel);
          if (subLevel.children) {
            subLevel.children.forEach((subLevel1: any) => {
              i.push(subLevel1);
              if (subLevel1.children) {
                subLevel1.children.forEach((subLevel2: any) => {
                  i.push(subLevel2);
                });
              }
            });
          }
        });
      }
    });
    for (let allElement of i) {
      if (allElement.title.toLowerCase().includes(inputvalue.toLowerCase())) {
        if (
          allElement.title.toLowerCase().startsWith(inputvalue.toLowerCase())
        ) {
          setShow2(true);
          allElement2.push(allElement);
        }
      }
    }
    if (!allElement2.length || inputvalue === "") {
      if ({ inputvalue } + "/" === "") {
        setShow2(false);
        setsearchval("Type something");
        setsearchcolor("text-dark");
      }
      if (!allElement2.length) {
        setShow2(false);
        setsearchcolor("text-danger");
        setsearchval("There is no component with this name");
      }
    }
    setNavData(allElement2);
  };

  const ModalData = [
    { id: 1, class: "Team", icon: "user-line", path: "/components/pages/team/" },
    { id: 2, class: "Forms", icon: "file-text-line", path: "/components/forms/form-elements/" },
    { id: 3, class: "Maps", icon: "map-pin-line", path: "/components/maps/leaflet-maps/" },
    { id: 4, class: "Widgets", icon: "server-line", path: "/components/widgets/widgets" },
  ];

  const Alertdata =[
    {id:1, class:"Notifications", path:"/components/advance-ui/notifications/"},
    {id:2, class:"Alerts", path:"/components/component/alerts/"},
    {id:3, class:"Tables", path:"/components/basic-ui/table/basic-tables/"},
  ];
  const [allData, setAllData] = useState(ModalData);

  function handleRemove(id: number) {
      const newList = allData.filter((idx) => idx.id !== id);
      setAllData(newList);
  }

  const [allData1, setAllData1] = useState(Alertdata);

  function handleRemove1(id: number) {
      const newList = allData1.filter((idx) => idx.id !== id);
      setAllData1(newList);
  }
  return (
    <div
      id="search-modal"
      className="hs-overlay ti-modal hidden"
      // show={show}
      onClick={handleClose}
    >
      <div className="ti-modal-box">
        <div className="ti-modal-content">
          <div className="ti-modal-body">
            <div className="header-search">
              <label htmlFor="icon" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="search-btn">
                  <i className="ri ri-search-2-line search-btn-icon"></i>
                </div>
                <input
                  id="icon"
                  name="icon"
                  className="py-2 ltr:pl-11 rtl:pr-11 ti-form-input focus:z-10"
                  type="search"
                  defaultValue={InputValue}
                  autoComplete="off"
                  onChange={(ele) => {
                    myfunction(ele.target.value);
                    setInputValue(ele.target.value);
                  }}
                  placeholder="Search"
                />
                <div className="voice-search">
                  <i className="ri ri-mic-2-line voice-btn-icon"></i>
                </div>
                <div className="search-dropdown">
                  <i className="ri ri-more-2-line search-dropdown-btn-icon"></i>
                </div>
              </div>
            </div>
            {show1 ? (
              <div className="box search-result relative z-[9] search-fix  border border-gray-200 dark:border-white/10 mt-1 w-100">
                <div className="box-header">
                  <h6 className="box-title me-2 text-break">
                    Search result of {InputValue}
                  </h6>
                </div>
                <div className="box-body p-2 flex flex-col max-h-[250px] overflow-auto">
                  {show2 ? (
                    NavData.map((e: any) => (
                      <div
                        key={Math.random()}
                        className="ti-list-group gap-x-3.5 bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white"
                      >
                        <Link
                          href={`${e.path}/`}
                          className="search-result-item"
                          onClick={() => {
                            setShow1("false"), setInputValue("");
                          }}
                        >
                          {e.title}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <b className={`${searchcolor} `}>{searchval}</b>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="mt-5 ">
              <p className="font-semibold text-[13px] text-gray-400 dark:text-gray-200 mb-2">
                Are You Looking For...
              </p>

              <div>
                {allData.map((idx) => (
                  <div key={idx.id} className="badge me-2 rounded-sm bg-secondary/20 text-secondary relative header-box">
                    <Link
                      href="#!"
                      className="w-full my-auto items-center flex space-x-2 rtl:space-x-reverse"
                    >
                      <span className="inline-block text-secondary mr-1">
                        <i className={`ri ri-${idx.icon} text-sm`}></i>
                      </span>
                      {idx.class}
                    </Link>
                    <Link onClick={() => handleRemove(idx.id)}
                      href="#!"
                      className="header-remove-btn flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-secondary hover:bg-secondary hover:text-secondary focus:outline-none focus:bg-secondary focus:text-white"
                    >
                      <span className="sr-only">Remove badge</span>
                      <svg
                        className="h-4 w-4 hover:fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                      </svg>
                    </Link>
                  </div>
                ))}
                  
              </div>

            </div>

            <div className="mt-5">
              <p className="font-semibold text-sm text-gray-500 mb-2">
                Recent Search :
              </p>
              {allData1.map((idx) => (
 <div className="p-2 border dark:border-white/10 rounded-sm flex items-center text-gray-500 mb-1 relative header-box" key={Math.random()}>
 <Link
   href="#!"
   className="w-full my-auto items-center flex"
 >
   <span className="text-sm">{idx.class}</span>
 </Link>
 <a onClick={() => handleRemove1(idx.id)}
   aria-label="anchor"
   href="#!"
   className="ltr:ml-auto rtl:mr-auto flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-gray-500 focus:outline-none header-remove-btn"
 >
   <i className="ri-close-line"></i>
 </a>
</div>
              ))}
            </div>
          </div>
          <div className="ti-modal-footer">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="ti-btn-group !py-1 ti-btn-soft-primary dark:border-white/10"
              >
                Search
              </button>
              <button
                type="button"
                className="ti-btn-group !py-1 ti-btn-primary dark:border-white/10"
              >
                Clear Recents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modalsearch;
