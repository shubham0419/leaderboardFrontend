import React from "react";

//Svg icons of Dashboard

const Dashboardsvg = <i className="ri-home-8-line side-menu__icon"></i>;

const NestedSvg = <i className="ri-node-tree side-menu__icon"></i>;

const AuthenticationSvg = <i className="ri-error-warning-line side-menu__icon"></i>;

export const MenuItems: any = [
	{
		id: 1, menutitle: "MAIN",
	},

	{
		id: 2, icon: Dashboardsvg, title: "Dashboard", type: "sub", active: false, selected: false, children: [

			{ id: 3, path: "/components/dashboard/sales", type: "link", active: false, selected: false, title: "Sales" },
			{ id: 4, path: "/admin/addmentor", type: "link", active: false, selected: false, title: "Add Mentor" },
			{ id: 5, path: "/admin/institue", type: "link", active: false, selected: false, title: "Add Institue" },
		],
	},
	// {
	// 	menutitle: "LEVELS",
	// },
	// {
	// 	icon: NestedSvg, title: "Nested Menu", type: "sub", active: false, selected: false, children: [

	// 		{ title: "Nested-1", path: "#!", type: "link", active: false, selected: false },

	// 		{
	// 			title: "Nested-2", type: "sub", active: false, selected: false, children: [

	// 				{ type: "link", path: "#!!", active: false, selected: false, title: "Nested-2-1" },
	// 				{ type: "link", path: "#", active: false, selected: false, title: "Nested-2-2" },
	// 				{ type: "link", path: "#", active: false, selected: false, title: "Nested-2-3" },

	// 			]
	// 		},
	// 	]
	// },
	// {
	// 	id: 128, icon: AuthenticationSvg, title: "Authentication", type: "sub", active: false, selected: false, children: [

	// 		{
	// 			id: 160, type: "sub", active: false, selected: false, title: "Error Pages", children: [

	// 				{ id: 161, path: "/components/authentication/error-pages/404-error", type: "link", active: false, selected: false, title: "404 Error" },
	// 			]
	// 		},
	// 	]
	// },

];
export default MenuItems;
