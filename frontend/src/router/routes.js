export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "/:id",
        name: "TaskView",
        component: () => import("../views/TaskView.vue"),
      },
    ],
  },
];
