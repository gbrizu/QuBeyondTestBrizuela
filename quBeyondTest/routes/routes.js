import DashboardLayout from "../Layout/DashboardLayout.vue";
import Planets from "../Pages/Planets.vue";

  
let PlanetsMenu = {
  path: "/planets",
  name: "planets",
  component: Planets
};

// let menuPlanets = {
//   meta: {
//     requiresAuth: false
//   },
//   path: "/planets",
//   component: Planets,
//   redirect: "/planets",
// };


const routes = [{
  path: "/",
  component: DashboardLayout,
  redirect: "/planets",
  children: []
},PlanetsMenu];

export default routes;
