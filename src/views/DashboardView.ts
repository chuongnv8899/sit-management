import type { WorkspaceUser } from "../models/User";

export class DashboardView {
  constructor(
    private readonly root: HTMLDivElement,
    private readonly onSignOut: () => void,
  ) {}

  render(user: WorkspaceUser): void {
    const dateLabel = new Date()
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();

    this.root.innerHTML = `
      <main class="dashboard-shell">
        <aside class="sidebar">
          <a class="brand brand-dark sidebar-brand" href="#" aria-label="Sit Management home">
            <span class="brand-mark">S</span>
            <span>Sit Management</span>
          </a>
          <span class="nav-caption">WORKSPACE</span>
          <nav class="main-nav" aria-label="Main navigation">
            <a class="nav-item nav-item-active" href="#overview" aria-current="page">
              <span class="nav-icon" aria-hidden="true">▦</span> Overview
            </a>
            <a class="nav-item nav-item-muted" href="#projects" aria-disabled="true">
              <span class="nav-icon" aria-hidden="true">▣</span> Projects
              <span class="nav-badge">Soon</span>
            </a>
            <a class="nav-item nav-item-muted" href="#tasks" aria-disabled="true">
              <span class="nav-icon" aria-hidden="true">☷</span> Tasks
              <span class="nav-badge">Soon</span>
            </a>
          </nav>
          <div class="sidebar-bottom">
            <div class="user-card">
              <span class="avatar">${this.escapeHtml(user.displayName.slice(0, 1))}</span>
              <span class="user-info"><strong>${this.escapeHtml(user.displayName)}</strong><small>${this.escapeHtml(user.role)}</small></span>
              <button class="icon-button" id="sign-out" type="button" aria-label="Sign out" title="Sign out">↗</button>
            </div>
          </div>
        </aside>

        <section class="dashboard-main">
          <header class="topbar">
            <span class="breadcrumb">Workspace <span>/</span> Overview</span>
            <span class="status-pill"><span></span> All changes saved</span>
          </header>
          <div class="page-content">
            <div class="page-heading">
              <div>
                <span class="eyebrow">${dateLabel}</span>
                <h1>Good to see you, ${this.escapeHtml(user.displayName)} <span class="wave" aria-hidden="true">✦</span></h1>
                <p>Here’s what’s happening across your workspace.</p>
              </div>
              <button class="button button-primary" type="button" disabled title="Coming soon">
                <span aria-hidden="true">＋</span> New project
              </button>
            </div>

            <section class="stats-grid" aria-label="Workspace summary">
              <article class="stat-card">
                <div class="stat-top"><span>Active projects</span><span class="stat-icon violet">▣</span></div>
                <strong>0</strong><small>No projects yet</small>
              </article>
              <article class="stat-card">
                <div class="stat-top"><span>Open tasks</span><span class="stat-icon blue">☷</span></div>
                <strong>0</strong><small>Nothing on your plate</small>
              </article>
              <article class="stat-card">
                <div class="stat-top"><span>Completed</span><span class="stat-icon green">✓</span></div>
                <strong>0</strong><small>Great things start here</small>
              </article>
            </section>

            <section class="projects-panel">
              <div class="panel-heading">
                <div><h2>Projects</h2><p>Your team’s work at a glance.</p></div>
                <button class="text-button" type="button" disabled>View all <span aria-hidden="true">→</span></button>
              </div>
              <div class="empty-state">
                <div class="empty-illustration" aria-hidden="true">
                  <span class="empty-paper">▤</span><span class="empty-spark">✦</span>
                </div>
                <h3>Your next big thing starts here</h3>
                <p>Create a project to bring your goals, tasks, and team together.</p>
                <button class="button button-secondary" type="button" disabled title="Coming soon">
                  <span aria-hidden="true">＋</span> Create your first project
                </button>
              </div>
            </section>
            <p class="dashboard-footer">Your workspace is ready when you are.</p>
          </div>
        </section>
      </main>
    `;

    this.root
      .querySelector<HTMLButtonElement>("#sign-out")
      ?.addEventListener("click", this.onSignOut);
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[character] ?? character;
    });
  }
}
