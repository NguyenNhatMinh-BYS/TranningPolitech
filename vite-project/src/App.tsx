import "./App.css";

import Login from "./pages/login-page/Login";

import LandingPage from "./pages/landing-page/LandingPage";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import NoticeDetail from "./pages/announcement-detail/AnnouncementDetail";
import AnnouncementPage from "./pages/announcement-page/AnnouncementPage";
import FacilityPage from "./pages/facility-page/FacilityPage";
import ContentPage from "./pages/content-page/ContentPage";
import Campaign from "./pages/campaign-page/Campaign";
import CampainDetail from "./pages/campaign-detail/CampainDetail";
import LivingLabPage from "./pages/living-lab-page/LivingLabPage";
import LivingLabDetail from "./pages/living-lab-detail/LivingLabDetail";
import Introduce from "./pages/introduce-page/Introduce";
import AnnouncementEdit from "./pages/announcement-edit/AnnouncementEdit";
import ContentEdit from "./pages/content-edit/ContentEdit";
import CampaignEdit from "./pages/campaign-edit/CampaignEdit";
import Freeboard from "./pages/freebroad-page/Freeboard";
import FreeBoardEdit from "./pages/freeboard-edit/FreeBoardEdit";
import LivingLabEdit from "./pages/living-lab-edit/LivingLabEdit";
import FreeBoardDetail from "./pages/freeboard-detail/FreeBoardDetail";
import FreeBoardCreateUser from "./pages/freeboard-create-user/FreeBoardCreateUser";
import AdminAuth from "./component/Auth/AdminAuth";
import ManagerUser from "./pages/manager-user/ManagerUser";
import NormalAuth from "./component/Auth/NormalAuth";

import { routes } from "./utils/constants";
import BaseLayout from "./layout/BaseLayout";
function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path={routes.DEFAULT}>
          <Route path={routes.DEFAULT} element={<LandingPage />} />

          <Route path="*" element={<LandingPage />}></Route>
          <Route path={routes.INTRODUCTION} element={<Introduce />} />
          <Route path={routes.ANNOUNCEMENT} element={<AnnouncementPage />} />
          <Route path={routes.ANNOUNCEMENT_DETAIL} element={<NoticeDetail />} />

          <Route path={routes.FACILITY} element={<FacilityPage />} />
          <Route path={routes.LIVING_LAB} element={<LivingLabPage />} />
          <Route
            path={routes.LIVING_LAB_DETAIL}
            element={<LivingLabDetail />}
          />

          <Route path={routes.CONTENT} element={<ContentPage />} />

          <Route path={routes.CAMPAIGN} element={<Campaign />} />
          <Route path={routes.CAMPAIGN_DETAIL} element={<CampainDetail />} />

          <Route path={routes.FREE_BOARD} element={<Freeboard />} />
          <Route
            path={routes.FREE_BOARD_DETAIL}
            element={<FreeBoardDetail />}
          />

          <Route
            path={routes.FREE_BOARD_CREATE_USER}
            element={<FreeBoardCreateUser />}
          />
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<Register />} />

          <Route path={routes.FREE_BOARD_EDIT} element={<FreeBoardEdit />} />
          {/* normal  */}
          <Route element={<NormalAuth />}>
            <Route
              path={routes.LIVING_LAB_CREATE}
              element={<LivingLabEdit />}
            />
            <Route path={routes.LIVING_LAB_EDIT} element={<LivingLabEdit />} />

            {/* admin  */}
            <Route element={<AdminAuth />}>
              <Route
                path={routes.ANNOUNCEMENT_EDIT}
                element={<AnnouncementEdit />}
              />
              <Route
                path={routes.ANNOUNCEMENT_CREATE}
                element={<AnnouncementEdit />}
              />
              <Route
                path={routes.LIVING_LAB_EDIT}
                element={<LivingLabEdit />}
              />
              <Route
                path={routes.LIVING_LAB_CREATE}
                element={<LivingLabEdit />}
              />
              <Route path={routes.CONTENT_EDIT} element={<ContentEdit />} />
              <Route path={routes.CONTENT_CREATE} element={<ContentEdit />} />
              <Route path={routes.CAMPAIGN_EDIT} element={<CampaignEdit />} />
              <Route path={routes.CAMPAIGN_CREATE} element={<CampaignEdit />} />
              <Route
                path={routes.FREE_BOARD_CREATE}
                element={<FreeBoardEdit />}
              />
              <Route path={routes.USER_MANAGEMENT} element={<ManagerUser />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
