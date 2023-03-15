import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/GoodsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "goods",
    component: Home
  },
  {
    path: "/ratings",
    name: "ratings",
    
    component: () =>
      import("../views/RatingView.vue")
  },
  {
    path: "/seller",
    name: "Seller",

    component: () =>
        import("../views/SellerView.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:'link-active',
});

export default router;
