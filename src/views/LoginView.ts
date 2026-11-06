import type { SignInCredentials } from "../models/User";

export class LoginView {
  constructor(
    private readonly root: HTMLDivElement,
    private readonly onSubmit: (credentials: SignInCredentials) => Promise<void>,
  ) {}

  render(): void {
    this.root.innerHTML = `
      <main class="login-layout">
        <section class="login-aside" aria-label="Product introduction">
          <a class="brand brand-light" href="#" aria-label="Sit Management home">
            <span class="brand-mark">S</span>
            <span>Sit Management</span>
          </a>
          <div class="aside-copy">
            <span class="eyebrow">YOUR WORK, IN ONE PLACE</span>
            <h1>Make good work<br />move forward.</h1>
            <p>Bring your projects, people, and plans together.</p>
          </div>
          <span class="aside-footnote">Project clarity starts here.</span>
        </section>

        <section class="login-panel">
          <div class="login-card">
            <a class="brand brand-dark" href="#" aria-label="Sit Management home">
              <span class="brand-mark">S</span>
              <span>Sit Management</span>
            </a>
            <h2>Sign in to your workspace</h2>
            <p class="form-intro">Enter your account details to continue.</p>

            <form id="login-form">
              <label for="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                placeholder="Enter your username"
                required
              />
              <label for="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                required
              />
              <p class="form-error" id="login-error" role="alert"></p>
              <button class="button button-primary login-button" type="submit">
                <span>Sign in</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
            <p class="login-note">Sign in with your workspace account.</p>
          </div>
          <span class="copyright">© ${new Date().getFullYear()} Sit Management</span>
        </section>
      </main>
    `;

    this.root
      .querySelector<HTMLFormElement>("#login-form")
      ?.addEventListener("submit", (event) => {
        void this.handleSubmit(event);
      });
  }

  showError(message: string): void {
    const error = this.root.querySelector<HTMLParagraphElement>("#login-error");
    if (error) error.textContent = message;
  }

  private async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const submitButton =
      form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!submitButton) throw new Error("The sign-in button was not found.");

    const formData = new FormData(form);
    const credentials: SignInCredentials = {
      username: String(formData.get("username") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    this.showError("");
    this.setLoading(submitButton, true);

    try {
      await this.onSubmit(credentials);
    } finally {
      if (submitButton.isConnected) this.setLoading(submitButton, false);
    }
  }

  private setLoading(button: HTMLButtonElement, isLoading: boolean): void {
    button.disabled = isLoading;
    const label = button.querySelector("span");
    if (label) label.textContent = isLoading ? "Signing in…" : "Sign in";
  }
}
