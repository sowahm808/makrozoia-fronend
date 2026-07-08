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
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl("/");
  }
}
