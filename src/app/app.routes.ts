import { Routes } from "@angular/router";
import { authGuard, guestGuard } from "./guards/auth.guard";
import {
  companyProfileCompleteGuard,
  companyProfileSetupGuard,
} from "./guards/company-profile.guard";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "services",
    loadComponent: () =>
      import("./pages/services/services.component").then(
        (m) => m.ServicesComponent,
      ),
  },
  {
    path: "about",
    loadComponent: () =>
      import("./pages/about/about.component").then((m) => m.AboutComponent),
  },
  {
    path: "technologies",
    loadComponent: () =>
      import("./pages/technologies/technologies.component").then(
        (m) => m.TechnologiesComponent,
      ),
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./pages/contact/contact.component").then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: "login",
    canActivate: [guestGuard],
    loadComponent: () =>
      import("./auth/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "create-account",
    canActivate: [guestGuard],
    loadComponent: () =>
      import("./auth/create-account.component").then(
        (m) => m.CreateAccountComponent,
      ),
  },
  {
    path: "dashboard",
    canActivate: [authGuard, companyProfileCompleteGuard],
    loadComponent: () =>
      import("./pages/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: "company-profile/setup",
    canActivate: [authGuard, companyProfileSetupGuard],
    loadComponent: () =>
      import("./pages/company-profile-setup/company-profile-setup.component").then(
        (m) => m.CompanyProfileSetupComponent,
      ),
  },
  {
    path: "company-profile",
    canActivate: [authGuard, companyProfileCompleteGuard],
    loadComponent: () =>
      import("./pages/company-profile/company-profile.component").then(
        (m) => m.CompanyProfileComponent,
      ),
  },
  { path: "**", redirectTo: "" },
];
