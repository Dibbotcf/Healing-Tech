import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Cookies } from "./pages/Cookies";
import { Quality } from "./pages/Quality";
import { Regulatory } from "./pages/Regulatory";
import { News } from "./pages/News";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: NotFound,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "terms", Component: Terms },
      { path: "privacy", Component: Privacy },
      { path: "cookies", Component: Cookies },
      { path: "quality", Component: Quality },
      { path: "regulatory", Component: Regulatory },
      { path: "news", Component: News },
      { path: "*", Component: NotFound },
    ],
  },
]);