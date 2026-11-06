(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();class l{async hash(e,s,t){const a=new TextEncoder,n=await crypto.subtle.importKey("raw",a.encode(e),"PBKDF2",!1,["deriveBits"]),o=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:this.hexToBytes(s),iterations:t},n,256);return this.bytesToHex(new Uint8Array(o))}hexToBytes(e){const s=new Uint8Array(new ArrayBuffer(e.length/2));for(let t=0;t<s.length;t+=1)s[t]=Number.parseInt(e.slice(t*2,t*2+2),16);return s}bytesToHex(e){return Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}}class d{constructor(e=sessionStorage,s="sit-management-authenticated"){this.storage=e,this.storageKey=s}storage;storageKey;isAuthenticated(){return this.storage.getItem(this.storageKey)==="true"}start(){this.storage.setItem(this.storageKey,"true")}clear(){this.storage.removeItem(this.storageKey)}}class p{constructor(e,s,t){this.account=e,this.passwordHasher=s,this.sessionStore=t}account;passwordHasher;sessionStore;async signIn(e){return!(e.username.trim().toLowerCase()===this.account.user.username.toLowerCase())||await this.passwordHasher.hash(e.password,this.account.saltHex,this.account.iterations)!==this.account.passwordHashHex?null:(this.sessionStore.start(),this.account.user)}hasActiveSession(){return this.sessionStore.isAuthenticated()}signOut(){this.sessionStore.clear()}}class u{constructor(e,s){this.root=e,this.onSignOut=s}root;onSignOut;render(e){const s=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}).toUpperCase();this.root.innerHTML=`
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
              <span class="avatar">${this.escapeHtml(e.displayName.slice(0,1))}</span>
              <span class="user-info"><strong>${this.escapeHtml(e.displayName)}</strong><small>${this.escapeHtml(e.role)}</small></span>
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
                <span class="eyebrow">${s}</span>
                <h1>Good to see you, ${this.escapeHtml(e.displayName)} <span class="wave" aria-hidden="true">✦</span></h1>
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
    `,this.root.querySelector("#sign-out")?.addEventListener("click",this.onSignOut)}escapeHtml(e){return e.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]??s)}}class h{constructor(e,s){this.root=e,this.onSubmit=s}root;onSubmit;render(){this.root.innerHTML=`
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
    `,this.root.querySelector("#login-form")?.addEventListener("submit",e=>{this.handleSubmit(e)})}showError(e){const s=this.root.querySelector("#login-error");s&&(s.textContent=e)}async handleSubmit(e){e.preventDefault();const s=e.currentTarget;if(!(s instanceof HTMLFormElement))return;const t=s.querySelector('button[type="submit"]');if(!t)throw new Error("The sign-in button was not found.");const a=new FormData(s),n={username:String(a.get("username")??""),password:String(a.get("password")??"")};this.showError(""),this.setLoading(t,!0);try{await this.onSubmit(n)}finally{t.isConnected&&this.setLoading(t,!1)}}setLoading(e,s){e.disabled=s;const t=e.querySelector("span");t&&(t.textContent=s?"Signing in…":"Sign in")}}class m{constructor(e,s,t){this.authenticationService=e,this.currentUser=t,this.loginView=new h(s,a=>this.handleSignIn(a)),this.dashboardView=new u(s,()=>this.handleSignOut())}authenticationService;currentUser;loginView;dashboardView;start(){if(this.authenticationService.hasActiveSession()){this.showDashboard(this.currentUser);return}this.showLogin()}showLogin(){this.loginView.render()}async handleSignIn(e){try{const s=await this.authenticationService.signIn(e);if(!s){this.loginView.showError("Incorrect username or password.");return}this.showDashboard(s)}catch(s){console.error("Could not verify the sign-in credentials.",s),this.loginView.showError("Sign in is unavailable. Please try again.")}}showDashboard(e){this.dashboardView.render(e)}handleSignOut(){this.authenticationService.signOut(),this.showLogin()}}const i={username:"Admin",displayName:"Admin",role:"Administrator"},g={user:i,saltHex:"d3f48a8bcebfd0afd5a223abc14d76dc",passwordHashHex:"a63e7191267ee43276e4721adaa559350de82f74320b0e125def6a061bcac294",iterations:31e4},c=document.querySelector("#app");if(!c)throw new Error("App root element was not found.");const b=new p(g,new l,new d),w=new m(b,c,i);w.start();
