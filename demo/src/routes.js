export default [
	{
		name: "Counter-0",
		path: "/demo-0",
		component: () => import("./demo0/DemoCounter.vue"),
	},
	{
		name: "Counter-1",
		path: "/demo-1",
		component: () => import("./demo1/DemoCounter.vue"),
	},
	{
		name: "Counter-4",
		path: "/demo-4",
		component: () => import("./demo4/DemoCounter.vue"),
	},
	{
		name: "Server",
		path: "/demo-5",
		component: () => import("./demo5/Server.vue"),
	},
];
