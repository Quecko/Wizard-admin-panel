import banner1 from "assets/img/side-icon/banner1.png";
import banner2 from "assets/img/side-icon/banner2.png";
import Dashboard from "views/dashboard/Dashboard.js";
import Login from "components/login/Login";

import Collections from "views/Collections/Collections";
import Nfts from "views/Nfts/Nfts";
import Leaderboards from "views/Leaderboards/Leaderboards";
import Launchpad from "views/Launchpad/Launchpad";
import Calendar from "views/Calendar/Calendar";
import EditProfiles from "views/edit/EditProfile";
import Ambassadors from "views/Ambassadors/Ambassadors";
import Applications from "views/Applications/Applications";
import CollectionApplications from "views/CollectionApplications/CollectionApplications";
import Creators from "views/Creators/Creators";
import Fees from "views/Fees/Fees";

var routes = [
  {
    path: "/dashboard",
    name: "Hi! Admin",
    image: banner1,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/creators",
    name: "Creators",
    image: banner2,
    component: Creators,
    layout: "/admin",
  },

  {
    path: "/collections",
    name: "Collections",
    component: Collections,
    layout: "/admin",
  },
  {
    path: "/nfts",
    name: "FEES",
    component: Nfts,
    layout: "/admin",
  },
  {
    path: "/Leaderboards",
    name: "Leaderboards",
    component: Leaderboards,
    layout: "/admin",
  },
  {
    path: "/launchpad",
    name: "Launchpads",
    component: Launchpad,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/editprofile",
    name: "Edit Profile",
    component: EditProfiles,
    layout: "/admin",
  },
  // {
  //   path: "/ambassadors",
  //   name: "Ambassadors Applications",
  //   component: Ambassadors,
  //   layout: "/admin",
  // },
  {
    path: "/applications",
    name: "Launchpad Applications",
    component: Applications,
    layout: "/admin",
  }, 
  {
    path: "/collectionapplications",
    name: "Collection Applications",
    component: CollectionApplications,
    layout: "/admin",
  }, 
  {
    path: "/fees",
    name: "Fees",
    component: Fees,
    layout: "/admin",
  }, 
];

export default routes;
