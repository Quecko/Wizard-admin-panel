

import banner1 from "assets/img/side-icon/banner1.png";
import banner2 from "assets/img/side-icon/banner2.png";
import banner3 from "assets/img/side-icon/banner3.png";
import banner5 from "assets/img/side-icon/banner5.png";
import Dashboard from "views/dashboard/Dashboard.js";
import UserPage from "views/userflow/User.js";
import UserDetail from "views/userflow/UserDetail.js";
import Ticketdetail from "views/userflow/Ticketdetail.js";
import AddCategory from "views/videos/AddCategory.js";
import Videos from "views/videos/Videos.js";
import VideoDetails from "views/videos/VideoDetail.js";
import Dailychallegne from "views/games/Dailychallegne";
import AddVideo from "views/videos/AddVideo";
import PlayToEarn from "views/games/PlayToEarn";
import Upcoming from "views/games/Upcoming";
import NewsBanner from "views/banner/NewsBanner";
import GameBanner from "views/banner/GameBanner";
import AddGames from "views/games/AddGame";
import GameDetail from "views/games/gamedetail";
import Task from "views/reward/Tasks";
import AddTask from "views/reward/AddTasks";
import ThisWeekReward from "views/reward/ThisWeekRewards";
import ThisWeekRewForm from "views/reward/ThisWeekRForm";
import LeaderBoard from "views/reward/Leaderboards";
import LeaderBoardDetails from "views/reward/LeaderboardDetails";
import Notificationss from "views/notifications/Notifications";
import PushNotification from "views/notifications/PushNotifications";
import Settings from "views/setting/Setting";
import EditProfiles from "views/edit/EditProfile";
import DailyLeaderBoard from "views/games/DailyLeaderboards";
import Alltransaction from "views/all-transaction/Alltransaction";
import AddBanner from "views/banner/AddBanner";
import Faq from "FAQ/Faq";
import CreateFaq from "FAQ/CreateFaq";
import Coin from "Coins/Coin";
import MemeCoin from "MemeCoins/Coin";
import AddCoin from "Coins/AddCoin";
import AddMemeCoin from "MemeCoins/AddCoin";
import AddDaily from "views/games/AddDailychallange";
import Addplayto from "views/games/AddPlay";
import Addupcoming from "views/games/Addupcoming";
import DailyDetail from "views/games/Adddetail";
import PlayDetail from "views/games/Addplaydetail";
import UpcomingDetail from "views/games/Addupcomingdetail";
import Badges from "views/badges/Badges";
import PushBadges from "views/badges/PushBadges";
import Sociallinks from "views/setting/Sociallinks";
import Addsociallinks from "views/setting/Addsociallinks";
import Boltmanagement from "views/Boltmanagement/Boltmanagement";
import Boltcategories from "views/Boltmanagement/Boltcategories";
import Addboltcategory from "views/Boltmanagement/Addboltcategory";
import Subscription from "views/Subscription/Subscription";
import Addsubscription from "views/Subscription/Addsubscription";
import Raffles from "views/Raffles/Raffles";
import Addraffles from "views/Raffles/Addraffles";
import RafflesCategories from "views/Raffles/RafflesCategories";
import AddCategoryRaffle from "views/Raffles/AddCategoryRaffle";
import AddProductRaffle from "views/Raffles/AddProductRaffle";
import OtherBanner from "views/banner/OtherBanner";
import Products from "views/Products/Products";
import Addproducts from "views/Products/Addproducts";
import Newcategory from "views/Newcategory/Newcategory";
import Addnewcategory from "views/Newcategory/Addnewcategory";
import Orders from "views/Orders/Orders";
import Gift from "views/Gifts/Gift";
import AdminUser from "adminUsers/AdminUser";
import AddAdminUser from "adminUsers/AddAdminUser";
import Rolemanagement from "adminUsers/Rolemanagement";
import Addrolemanagement from "adminUsers/Addrolemanagement";
import Ambassadors from "views/Ambassadors/Ambassadors";
import Claimambassadors from "views/Ambassadors/Claimambassadors";
import Leaderboarddetailsnew from "views/reward/Leaderboarddetailsnew";
import Steakleaderboard from "views/reward/Steakleaderboard";
import Streakrewards from "views/reward/Streakrewards";
import Leaderboards from "views/Leaderboards/Leaderboards";
import Launchpad from "views/Launchpad/Launchpad";
import Launchpaddetails from "views/Launchpad/Launchpaddetails";
import Ambassadorsclaimrewards from "views/Ambassadors/Ambassadorsclaimrewards";
import Stakingleaderboards from "views/Stakingleaderboards/Stakingleaderboards";
import Mysteryboxreward from "views/Mysteryboxreward/Mysteryboxreward";
import Onboarding from "views/setting/Onboarding";
import Addonboarding from "views/setting/Addonboarding";
import Support from "views/Support/Support";
import Supporticketdetail from "views/Support/Supporticketdetail";
import Calendar from "views/Calendar/Calendar";
import Collections from "views/Collections/Collections";
import Nfts from "views/Nfts/Nfts";
import Applications from "views/Applications/Applications";



var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    image: banner1,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/alltransaction",
    name: "All Transaction",
    component: Alltransaction,
    layout: "/admin",
  },
  {
    path: "/userpage",
    name: "Users",
    image: banner2,
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/userdetail",
    name: "User / Detail",
    image: banner5,
    component: UserDetail,
    layout: "/admin",
  },
  {
    path: "/ticketdetail",
    name: "Ticket Detail",
    image: banner5,
    component: Ticketdetail,
    layout: "/admin",
  },


  //ADMINUSERS
  {
    path: "/allAdmins",
    name: "AllUserAdmin",
    // image: banner3,
    component: AdminUser,
    layout: "/admin",
  },
  {
    path: "/AddAdminUser",
    name: "UsersAdmin / Add User Admin",
    // image: banner3,
    component: AddAdminUser,
    layout: "/admin",
  },
  {
    path: "/EditAdminUser/:id",
    name: "UsersAdmin / Edit User Admin",
    // image: banner3,
    component: AddAdminUser,
    layout: "/admin",
  },

  //rolemanagement
  {
    path: "/allroles",
    name: "Add Role Management",
    // image: banner3,
    component: Rolemanagement,
    layout: "/admin",
  },
  {
    path: "/editrolemanagement/:id",
    name: " Admin Role / Edit",
    // image: banner3,
    component: Addrolemanagement,
    layout: "/admin",
  },
  {
    path: "/addrolemanagement",
    name: " Admin Role / Add role",
    // image: banner3,
    component: Addrolemanagement,
    layout: "/admin",
  },

  {
    path: "/allAdminUsers",
    name: "AdminUsers",
    image: banner2,
    component: AdminUser,
    layout: "/admin",
  },

  {
    path: "/addAdmin",
    name: "AdminUser / AddUser",
    image: banner5,
    component: AddAdminUser,
    layout: "/admin",
  },
  {
    path: "/editAdmin/:id",
    name: "AdminUser / EditUser",
    image: banner5,
    component: AddAdminUser,
    layout: "/admin",
  },



  {
    path: "/videos",
    name: "Videos",
    image: banner3,
    component: Videos,
    layout: "/admin",
  },
  {
    path: "/addcategory",
    name: "Course",
    // image: banner3,
    component: AddCategory,
    layout: "/admin",
  },
  {
    path: "/videodetail/:id",
    name: "Video / Details",
    // image: banner3,
    component: VideoDetails,
    layout: "/admin",
  },
  {
    path: "/editvideos/:id",
    name: "Videos / Edit Video",
    // button:"Add Videos",
    // image: banner3,
    component: AddVideo,
    layout: "/admin",
  },
  {
    path: "/addvideos",
    name: "Videos / Add Video",
    button: "Add Videos",
    // image: banner3,
    component: AddVideo,
    layout: "/admin",
  },
  {
    path: "/dailychallegne",
    name: "Daily Challegne",
    // image: banner3,
    component: Dailychallegne,
    layout: "/admin",
  },
  {
    path: "/playtoearn",
    name: "Play To Earn",
    // image: banner3,
    component: PlayToEarn,
    layout: "/admin",
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    // image: banner3,
    component: Upcoming,
    layout: "/admin",
  },

  // End Side bar Routes

  // Start Add Forms Pages Routes
  {
    path: "/addgame",
    name: "Games / Add Game",
    // image: banner3,
    component: AddGames,
    layout: "/admin",
  },
  {
    path: "/editplaytoearn/:id",
    name: "Games / Edit Play to Earn",
    // image: banner3,
    component: Addplayto,
    layout: "/admin",
  },
  {
    path: "/addplaytoearn",
    name: "Games / Add Play to Earn",
    // image: banner3,
    component: Addplayto,
    layout: "/admin",
  },
  {
    path: "/editupcoming/:id",
    name: "Games / Edit Upcoming",
    // image: banner3,
    component: Addupcoming,
    layout: "/admin",
  },
  {
    path: "/addupcoming",
    name: "Games / Add Upcoming",
    // image: banner3,
    component: Addupcoming,
    layout: "/admin",
  },
  {
    path: "/editdailychallange/:id",
    name: "Games / Edit Daily Challanges",
    component: AddDaily,
    layout: "/admin",
  },
  {
    path: "/adddailychallange",
    name: "Games / Add Daily Challanges",
    component: AddDaily,
    layout: "/admin",
  },

  // Start Detal Forms Pages Routes
  {
    path: "/gamedetail",
    name: "Games / DetailPage",
    component: GameDetail,
    layout: "/admin",
  },
  {
    path: "/DailyChallangeDetail/:id",
    name: "Games / Daily DetailPage",
    component: DailyDetail,
    layout: "/admin",
  },
  {
    path: "/Detail/PlayToEarn/:id",
    name: "Games / Play To Earn DetailPage",
    component: PlayDetail,
    layout: "/admin",
  },
  {
    path: "/Detail/Upcoming/:id",
    name: "Games / Upcoming DetailPage",
    component: UpcomingDetail,
    layout: "/admin",
  },

  // End Detal Forms Pages Routes
  {
    path: "/dailyleaderboard",
    name: "Daily Challange",
    // image: banner3,
    component: DailyLeaderBoard,
    layout: "/admin",
  },
  {
    path: "/newsbanner",
    name: "Banner / News Banner",
    // image: banner3,
    component: NewsBanner,
    layout: "/admin",
  },
  {
    path: "/EditBanners/:id",
    name: "Banner / Edit Banner",
    // image: banner3,
    component: AddBanner,
    layout: "/admin",
  },
  {
    path: "/addBanners",
    name: "Banner / Add Banner",
    // image: banner3,
    component: AddBanner,
    layout: "/admin",
  },
  {
    path: "/gamebanner",
    name: "Banner / Game Banner",
    // image: banner3,
    component: GameBanner,
    layout: "/admin",
  },
  {
    path: "/task",
    name: "Task",
    // image: banner3,
    component: Task,
    layout: "/admin",
  },

  {
    path: "/addtask/:id",
    name: "Reward / Add Task",
    // image: banner3,
    component: AddTask,
    layout: "/admin",
  },

  {
    path: "/Leaderboarddetailsnew",
    name: " Leaderboard / details",
    // image: banner3,
    component: Leaderboarddetailsnew,
    layout: "/admin",
  },
  {
    path: "/Leaderboarddetailsnew",
    name: "Leaderboard / details",
    // image: banner3,
    component: Leaderboarddetailsnew,
    layout: "/admin",
  },
  {
    path: "/Steakleaderboard",
    name: "Steak leaderboard",
    // image: banner3,
    component: Steakleaderboard,
    layout: "/admin",
  },



  {
    path: "/addtask",
    name: "Reward / Add Task",
    // image: banner3,
    component: AddTask,
    layout: "/admin",
  },
  {
    path: "/Faq",
    name: "FAQs",
    // image: banner3,
    component: Faq,
    layout: "/admin",
  },
  {
    path: "/Coins",
    name: "Coins",
    // image: banner3,
    component: Coin,
    layout: "/admin",
  },
  {
    path: "/collections",
    name: "Collections",
    // image: banner3,
    component: Collections,
    layout: "/admin",
  },
  {
    path: "/nfts",
    name: "NFTs",
    // image: banner3,
    component:Nfts,
    layout: "/admin",
  },

  
  {
    path: "/AddCoins",
    name: "Coins / Add Coin",
    // image: banner3,
    component: AddCoin,
    layout: "/admin",
  },
  {
    path: "/EditCoins/:id",
    name: "Coins / Add Coin",
    // image: banner3,
    component: AddCoin,
    layout: "/admin",
  },
  {
    path: "/MemeCoins",
    name: "Meme Coins",
    // image: banner3,
    component: MemeCoin,
    layout: "/admin",
  },
  {
    path: "/AddMemeCoins",
    name: "Meme Coins / Add Coin",
    // image: banner3,
    component: AddMemeCoin,
    layout: "/admin",
  },
  {
    path: "/EditMemeCoins/:id",
    name: "Meme Coins / Add Coin",
    // image: banner3,
    component: AddMemeCoin,
    layout: "/admin",
  },
  {
    path: "/AddFaq",
    name: "FAQs / Add FAQ ",
    // image: banner3,
    component: CreateFaq,
    layout: "/admin",
  },
  {
    path: "/EditFaq/:id",
    name: "FAQs / EDIT FAQ ",
    // image: banner3,
    component: CreateFaq,
    layout: "/admin",
  },
  {
    path: "/thisweekreward",
    name: "Ads Rewards",
    // image: banner3,
    component: ThisWeekReward,
    layout: "/admin",
  },
  {
    path: "/Streakrewards",
    name: "Streak Rewards",
    // image: banner3,
    component: Streakrewards,
    layout: "/admin",
  },
  {
    path: "/Leaderboards",
    name: "Leaderboards",
    // image: banner3,
    component: Leaderboards,
    layout: "/admin",
  },
  {
    path: "/launchpad",
    name: "Launchpad",
    // image: banner3,
    component: Launchpad,
    layout: "/admin",
  },
  {
    path: "/launchpaddetails/:id",
    name: "Launchpad details",
    // image: banner3,
    component: Launchpaddetails,
    layout: "/admin",
  },


  {
    path: "/thisweekrewardform",
    name: "Reward / This Week Reward",
    // image: banner3,
    component: ThisWeekRewForm,
    layout: "/admin",
  },
  {
    path: "/leaderboard",
    name: "Rewards / LeaderBoard",
    // image: banner3,
    component: LeaderBoard,
    layout: "/admin",
  },
  {
    path: "/leaderboardDetails/:id",
    name: "Leaderboard / Details",
    // image: banner3,
    component: LeaderBoardDetails,
    layout: "/admin",
  },
  {
    path: "/notification",
    name: "Push Notifications",
    // image: banner3,
    component: Notificationss,
    layout: "/admin",
  },
  {
    path: "/sendnotification",
    name: "Push Notifications / Send Notification",
    // image: banner3,
    component: PushNotification,
    layout: "/admin",
  },
  {
    path: "/badges",
    name: "add badges",
    // image: banner3,
    component: Badges,
    layout: "/admin",
  },
  {
    path: "/sendbadges",
    name: "add badges / Send Badges",
    // image: banner3,
    component: PushBadges,
    layout: "/admin",
  },
  {
    path: "/sendbadgesss/:id",
    name: "add badges / Send Badges",
    // image: banner3,
    component: PushBadges,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Settings",
    // image: banner3,
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/onboarding",
    name: "On boarding",
    // image: banner3,
    component: Onboarding,
    layout: "/admin",
  },
  {
    path: "/addonboarding",
    name: "On boarding",
    // image: banner3,
    component: Addonboarding,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support",
    // image: banner3,
    component: Support,
    layout: "/admin",
  },
  {
    path: "/supporticketdetail",
    name: "Support/Ticket Details",
    // image: banner3,
    component: Supporticketdetail,
    layout: "/admin",
  },

  {
    path: "/calendar",
    name: "Calendar",
    // image: banner3,
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/editprofile",
    name: "Edit Profile",
    // image: banner3,
    component: EditProfiles,
    layout: "/admin",
  },
  {
    path: "/sociallinks",
    name: "Social Links",
    // image: banner3,
    component: Sociallinks,
    layout: "/admin",
  },
  {
    path: "/addsociallinks",
    name: "Social Links/Add",
    // image: banner3,
    component: Addsociallinks,
    layout: "/admin",
  },
  {
    path: "/boltmanagement",
    name: "Bolt Management",
    // image: banner3,
    component: Boltmanagement,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Edit Categories",
    // image: banner3,
    component: Boltcategories,
    layout: "/admin",
  },
  {
    path: "/addboltcategory",
    name: "Add Categories",
    // image: banner3,
    component: Addboltcategory,
    layout: "/admin",
  },
  {
    path: "/subscription",
    name: "Subscription",
    // image: banner3,
    component: Subscription,
    layout: "/admin",
  },
  {
    path: "/addsubscription/:id",
    name: "Add Subscription",
    // image: banner3,
    component: Addsubscription,
    layout: "/admin",
  },
  {
    path: "/raffles",
    name: "Raffles",
    // image: banner3,
    component: Raffles,
    layout: "/admin",
  },
  {
    path: "/addraffles/:id",
    name: "Add Raffles",
    // image: banner3,
    component: Addraffles,
    layout: "/admin",
  },
  {
    path: "/rafflescategory",
    name: "Raffles categories",
    // image: banner3,
    component: RafflesCategories,
    layout: "/admin",
  },
  {
    path: "/addcategoryraffle/:id",
    name: "Categories",
    // image: banner3,
    component: AddCategoryRaffle,
    layout: "/admin",
  },
  {
    path: "/addproductraffle",
    name: "Categories",
    // image: banner3,
    component: AddProductRaffle,
    layout: "/admin",
  },
  {
    path: "/otherbanner",
    name: "Other Banner",
    // image: banner3,
    component: OtherBanner,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    // image: banner3,
    component: Products,
    layout: "/admin",
  },
  {
    path: "/addproducts/:id",
    name: "Add Products",
    // image: banner3,
    component: Addproducts,
    layout: "/admin",
  },
  {
    path: "/newcategory",
    name: "Category",
    // image: banner3,
    component: Newcategory,
    layout: "/admin",
  },
  {
    path: "/addnewcategory/:id",
    name: "Add Category",
    // image: banner3,
    component: Addnewcategory,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    // image: banner3,
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/gifts",
    name: "Gifts",
    // image: banner3,
    component: Gift,
    layout: "/admin",
  },
  {
    path: "/ambassadors",
    name: "Ambassadors Applications",
    component: Ambassadors,
    layout: "/admin",
  },
  {
    path: "/applications",
    name: " Applications",
    component: Applications,
    layout: "/admin",
  },
  {
    path: "/claimambassadors",
    name: "Ambassadors Claims",
    component: Claimambassadors,
    layout: "/admin",
  },
  {
    path: "/claimreward",
    name: "Ambassadors Claims Rewards",
    component: Ambassadorsclaimrewards,
    layout: "/admin",
  },

  {
    path: "/stakingleaderboard",
    name: "staking Leaderboard",
    // image: banner3,
    component: Stakingleaderboards,
    layout: "/admin",
  },

  {
    path: "/mysteryboxreward",
    name: "Mystery Box Reward",
    // image: banner3,
    component: Mysteryboxreward,
    layout: "/admin",
  },






];


export default routes;
