export interface WorkspaceUser {
  username: string;
  displayName: string;
  role: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export const ADMIN_USER: WorkspaceUser = {
  username: "Admin",
  displayName: "Admin",
  role: "Administrator",
};
