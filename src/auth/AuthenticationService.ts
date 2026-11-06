import type { SignInCredentials, WorkspaceUser } from "../models/User";
import { PasswordHasher } from "./PasswordHasher";
import { SessionStore } from "./SessionStore";

export interface AdminAccount {
  user: WorkspaceUser;
  saltHex: string;
  passwordHashHex: string;
  iterations: number;
}

export class AuthenticationService {
  constructor(
    private readonly account: AdminAccount,
    private readonly passwordHasher: PasswordHasher,
    private readonly sessionStore: SessionStore,
  ) {}

  async signIn(credentials: SignInCredentials): Promise<WorkspaceUser | null> {
    const usernameMatches =
      credentials.username.trim().toLowerCase() ===
      this.account.user.username.toLowerCase();

    if (!usernameMatches) return null;

    const passwordHash = await this.passwordHasher.hash(
      credentials.password,
      this.account.saltHex,
      this.account.iterations,
    );

    if (passwordHash !== this.account.passwordHashHex) return null;

    this.sessionStore.start();
    return this.account.user;
  }

  hasActiveSession(): boolean {
    return this.sessionStore.isAuthenticated();
  }

  signOut(): void {
    this.sessionStore.clear();
  }
}
