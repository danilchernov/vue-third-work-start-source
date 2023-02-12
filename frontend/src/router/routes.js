export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [
      {
        path: "/:id",
        name: "TaskView",
        component: () => import("../views/TaskView.vue"),
        meta: { layout: "AppLayoutMain" },
      },
      {
        path: "/tasks/create",
        name: "TaskCreate",
        component: () => import("../views/TaskCreate.vue"),
        meta: { layout: "AppLayoutMain" },
      },
    ],
  },
];
