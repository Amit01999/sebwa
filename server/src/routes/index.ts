import { Router } from "express";

import healthRoutes from "./health.routes.js";
import publicPagesRoutes from "./public.pages.routes.js";
import publicNavigationRoutes from "./public.navigation.routes.js";
import publicSettingsRoutes from "./public.settings.routes.js";
import publicFragmentsRoutes from "./public.fragments.routes.js";
import publicFormsRoutes from "./public.forms.routes.js";

import adminAuthRoutes from "./admin.auth.routes.js";
import adminPagesRoutes from "./admin.pages.routes.js";
import adminNavigationRoutes from "./admin.navigation.routes.js";
import adminSettingsRoutes from "./admin.settings.routes.js";
import adminMediaRoutes from "./admin.media.routes.js";
import adminFragmentsRoutes from "./admin.fragments.routes.js";
import adminSubmissionsRoutes from "./admin.submissions.routes.js";
import adminUsersRoutes from "./admin.users.routes.js";
import adminDashboardRoutes from "./admin.dashboard.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/pages", publicPagesRoutes);
router.use("/navigation", publicNavigationRoutes);
router.use("/settings", publicSettingsRoutes);
router.use("/fragments", publicFragmentsRoutes);
router.use("/forms", publicFormsRoutes);

router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/pages", adminPagesRoutes);
router.use("/admin/navigation", adminNavigationRoutes);
router.use("/admin/settings", adminSettingsRoutes);
router.use("/admin/media", adminMediaRoutes);
router.use("/admin/fragments", adminFragmentsRoutes);
router.use("/admin/submissions", adminSubmissionsRoutes);
router.use("/admin/users", adminUsersRoutes);
router.use("/admin/dashboard", adminDashboardRoutes);

export default router;
