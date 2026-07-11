import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SessionRouteService {
  private readonly storageKey = "makrozoia:lastSessionUrl";

  getLastSessionUrl(): string | null {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(this.storageKey);
  }

  remember(url: string): void {
    if (typeof localStorage === "undefined" || !this.isSafeSessionUrl(url)) return;
    localStorage.setItem(this.storageKey, url);
  }

  resolveRedirectUrl(returnUrl?: string | null): string {
    const requestedUrl = returnUrl && this.isSafeSessionUrl(returnUrl) ? returnUrl : null;
    return requestedUrl ?? this.getLastSessionUrl() ?? "/dashboard";
  }

  private isSafeSessionUrl(url: string): boolean {
    return url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/login") && !url.startsWith("/create-account");
  }
}
