import React from "react";
import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  PieChart,
  Sliders,
  User,
  Users,
} from "react-feather";
import {
  GolfCourse,
  Directions,
  Dashboard,
  Settings as SettingsIcon,
} from "@material-ui/icons";

// Icons
import TimelineIcon from "@material-ui/icons/Timeline";
import ReceiptIcon from "@material-ui/icons/Receipt";

// Landing page component
const LandingPage = async(() => import("../pages/landingpage/LandingPage"));
const ContactPage = async(() => import("../pages/landingpage/Contact/Contact"));

// Getting started component
const GetStartedPage = async(() => import("../pages/getstarted/GetStarted"));

//Privacy Policy
const PrivacyPolicyPage = async(() =>
  import("../pages/privacypolicy/PrivacyPolicy")
);

// Degree progress components
const DegreeTimeline = async(() =>
  import("../pages/degreeprogress/DegreeTimeline")
);
const DegreeOverview = async(() =>
  import("../pages/degreeprogress/DegreeOverview")
);
const DegreeTranscript = async(() =>
  import("../pages/degreeprogress/DegreeTranscript")
);

//Course Selector Components
const CourseSelector = async(() =>
  import("../pages/courseselector/CourseSelector")
);

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const Invoice = async(() => import("../pages/pages/Invoice"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Docs = async(() => import("../pages/docs/Documentation"));
const Changelog = async(() => import("../pages/docs/Changelog"));
const Presentation = async(() => import("../pages/docs/Presentation"));

const landingPageRoutes = {
  id: "Landing Page",
  path: "/bcs",
  component: LandingPage,
  children: null,
};

const contactPageRoutes = {
  id: "Contact Page",
  path: "/contact",
  component: ContactPage,
  children: null,
};

const dashboardsRoutes = {
  id: "Get Started",
  path: "/bcs/start",
  icon: <Sliders />,
  containsHome: true,
  component: GetStartedPage,
  /*
    Note: Uncomment below if you require children componenents 
  */
  // children: [
  //   {
  //     path: "/dashboard/default",
  //     name: "Default",
  //     component: Default
  //   },
  //   {
  //     path: "/dashboard/analytics",
  //     name: "Analytics",
  //     component: Analytics
  //   }
  // ]
};

const courseSelectorRoutes = {
  id: "Course Selector",
  path: "/bcs/courseselector",
  icon: <GolfCourse />,
  component: CourseSelector,
};

const degreeOverview = {
  id: "Degree Overview",
  path: "/bcs/degreeoverview",
  icon: <Directions />,
  component: DegreeOverview,
};

const degreeTimeline = {
  id: "Degree Timeline",
  path: "/bcs/timeline",
  icon: <TimelineIcon />,
  component: DegreeTimeline,
};

const degreeTranscript = {
  id: "Degree Transcript",
  path: "/bcs/transcript",
  icon: <ReceiptIcon />,
  component: DegreeTranscript,
};

const myCoursesRoutes = {
  id: "My Courses",
  path: "/bcs/mycourses",
  icon: <Dashboard />,
  component: Default,
};

const myToDosRoutes = {
  id: "My ToDo's",
  path: "/bcs/mytodos",
  icon: <CheckSquare />,
  component: Tasks,
};

// these Profile and Settings are kinda similar, going to work on Settings for now. SK
const profileRoutes = {
  id: "Profile",
  path: "/profile",
  icon: <User />,
  component: Profile,
  children: null,
};

const settingsRoutes = {
  id: "Account Settings",
  path: "/bcs/settings",
  name: "Account Settings",
  icon: <User />,
  children: null,
  component: Settings,
};

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  header:
    "Everything below this will be removed later. It is just for inspiration",
  icon: <Layout />,
  children: [
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank,
    },
  ],
};

const projectsRoutes = {
  id: "Projects",
  path: "/projects",
  icon: <Briefcase />,
  badge: "8",
  component: Projects,
  children: null,
};

const invoiceRoutes = {
  id: "Invoice",
  path: "/invoice",
  icon: <CreditCard />,
  component: Invoice,
  children: null,
};

const tasksRoutes = {
  id: "Tasks",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "17",
  component: Tasks,
  children: null,
};

const calendarRoutes = {
  id: "Calendar",
  path: "/calendar",
  icon: <CalendarIcon />,
  component: Calendar,
  children: null,
};

//Added routes for MainSearchPage

const mainSearchRoutes = {
  id: "mainSearchRoutes",
  path: "/",
  component: Blank,
  children: null,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
};

const componentsRoutes = {
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars,
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges,
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips,
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs,
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels,
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists,
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus,
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars,
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips,
    },
  ],
};

const formsRoutes = {
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers,
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls,
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects,
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields,
    },
  ],
};

const tablesRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <List />,
  children: [
    {
      path: "/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable,
    },
    {
      path: "/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable,
    },
  ],
};

const iconsRoutes = {
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons,
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons,
    },
  ],
};

const chartRoutes = {
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const mapsRoutes = {
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
    },
  ],
};

const presentationRoutes = {
  id: "Presentation",
  path: "/presentation",
  header: "Docs",
  icon: <Monitor />,
  component: Presentation,
  children: null,
};

const documentationRoutes = {
  id: "Getting Started",
  path: "/documentation",
  icon: <BookOpen />,
  component: Docs,
  children: null,
};

const privacyPolicyRoutes = {
  id: "Privacy Policy",
  path: "/privacyPolicy",
  icon: <BookOpen />,
  component: PrivacyPolicyPage,
  children: null,
};

const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v1.0.7",
  icon: <List />,
  component: Changelog,
  children: null,
};

// This route is not visisble in the sidebar
const privateRoutes = {
  id: "Private",
  path: "/private",
  component: Blank,
  children: null,
};

export const landing = [landingPageRoutes];
export const contact = [contactPageRoutes];

export const dashboard = [
  dashboardsRoutes,
  courseSelectorRoutes,
  degreeOverview,
  degreeTimeline,
  degreeTranscript,
  // myCoursesRoutes,
  // myToDosRoutes,
  // profileRoutes,
  settingsRoutes,
  // pagesRoutes,
  // projectsRoutes,
  // invoiceRoutes,
  // tasksRoutes,
  // calendarRoutes,
  // componentsRoutes,
  // chartRoutes,
  // formsRoutes,
  // tablesRoutes,
  // iconsRoutes,
  // mapsRoutes,
  // presentationRoutes,
  // documentationRoutes,
  // changelogRoutes,
  // privateRoutes,
];

export const auth = [authRoutes];
export const mainSearch = [mainSearchRoutes];
export const privacy = [privacyPolicyRoutes];

export default [
  dashboardsRoutes,
  courseSelectorRoutes,
  degreeOverview,
  degreeTimeline,
  degreeTranscript,

  // myCoursesRoutes,
  // myToDosRoutes,
  // profileRoutes,
  settingsRoutes,
  // pagesRoutes,
  // projectsRoutes,
  // invoiceRoutes,
  // tasksRoutes,
  // calendarRoutes,
  // authRoutes,
  // componentsRoutes,
  // chartRoutes,
  // formsRoutes,
  // tablesRoutes,
  // iconsRoutes,
  // mapsRoutes,
  // presentationRoutes,
  // documentationRoutes,
  // changelogRoutes,
];
