export default [
	{
		name: "Counter-0",
		path: "/counter-0",
		component: () => import("./demo0/DemoCounter.vue"),
	},
	{
		name: "Counter-1",
		path: "/counter-1",
		component: () => import("./demo1/DemoCounter.vue"),
	},
];
