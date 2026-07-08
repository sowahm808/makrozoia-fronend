import { Component, inject } from "@angular/core";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "./services/auth.service";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  template: ` <header class="site-header">
      <a class="brand" routerLink="/"
        ><img class="logo" src="/logo-placeholder.svg" alt="Makrozoia Solutions logo placeholder" /><span>Makrozoia Solutions</span></a
      ><input id="nav-toggle" type="checkbox" /><label
        for="nav-toggle"
        class="menu"
        >☰</label
      >
      <nav>
        <a routerLink="/services" routerLinkActive="active">Services</a
        ><a routerLink="/about" routerLinkActive="active">About</a
        ><a routerLink="/technologies" routerLinkActive="active">Technologies</a
        ><a routerLink="/contact" routerLinkActive="active">Contact</a>
        @if (auth.user$ | async) {
          <a routerLink="/dashboard">Dashboard</a
          ><button class="link-button" (click)="logout()">Logout</button>
        } @else {
          <a routerLink="/login">Login</a
          ><a class="button small" routerLink="/create-account"
            >Create Account</a
          >
        }
      </nav>
    </header>
    <main><router-outlet /></main>
    <footer>
      <div>
        <strong>Makrozoia Solutions LLC</strong>
        <p>
          Software solutions for POCs, MVPs, implementation, migrations,
          modernization, cloud, AI, and architecture.
        </p>
      </div>
      <div>
        <a routerLink="/services">Services</a
        ><a routerLink="/contact">Contact</a
        ><a routerLink="/technologies">Technologies</a>
      </div>
    </footer>`,
})
export class AppComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl("/");
  }
}
