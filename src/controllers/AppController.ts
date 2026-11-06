import type { SignInCredentials, WorkspaceUser } from "../models/User";
import { AuthenticationService } from "../auth/AuthenticationService";
import { DashboardView } from "../views/DashboardView";
import { LoginView } from "../views/LoginView";

export class AppController {
  private readonly loginView: LoginView;
  private readonly dashboardView: DashboardView;

  constructor(
    private readonly authenticationService: AuthenticationService,
    root: HTMLDivElement,
    private readonly currentUser: WorkspaceUser,
  ) {
    this.loginView = new LoginView(root, (credentials) =>
      this.handleSignIn(credentials),
    );
    this.dashboardView = new DashboardView(root, () => this.handleSignOut());
  }

  start(): void {
    if (this.authenticationService.hasActiveSession()) {
      this.showDashboard(this.currentUser);
      return;
    }

    this.showLogin();
  }

  private showLogin(): void {
    this.loginView.render();
  }

  private async handleSignIn(credentials: SignInCredentials): Promise<void> {
    try {
      const user = await this.authenticationService.signIn(credentials);

      if (!user) {
        this.loginView.showError("Incorrect username or password.");
        return;
      }

      this.showDashboard(user);
    } catch (cause) {
      console.error("Could not verify the sign-in credentials.", cause);
      this.loginView.showError("Sign in is unavailable. Please try again.");
    }
  }

  private showDashboard(user: WorkspaceUser): void {
    this.dashboardView.render(user);
  }

  private handleSignOut(): void {
    this.authenticationService.signOut();
    this.showLogin();
  }
}
