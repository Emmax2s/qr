import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";
import { Animals } from "./pages/Animals";
import { Visit } from "./pages/Visit";
import { ZooMap } from "./pages/ZooMap";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminAnimals } from "./pages/admin/AdminAnimals";
import { AdminUsers } from "./pages/admin/AdminUsers";

export const router = createBrowserRouter([
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "animales", Component: AdminAnimals },
      { path: "usuarios", Component: AdminUsers },
    ],
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "animales", Component: Animals },
      { path: "visita", Component: Visit },
      { path: "mapa", Component: ZooMap },
      { path: "contacto", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
