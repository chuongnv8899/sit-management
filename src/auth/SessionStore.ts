export class SessionStore {
  constructor(
    private readonly storage: Storage = sessionStorage,
    private readonly storageKey = "sit-management-authenticated",
  ) {}

  isAuthenticated(): boolean {
    return this.storage.getItem(this.storageKey) === "true";
  }

  start(): void {
    this.storage.setItem(this.storageKey, "true");
  }

  clear(): void {
    this.storage.removeItem(this.storageKey);
  }
}
