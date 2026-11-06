import { AuthenticationService } from "./auth/AuthenticationService";
import type { AdminAccount } from "./auth/AuthenticationService";
import { PasswordHasher } from "./auth/PasswordHasher";
import { SessionStore } from "./auth/SessionStore";
import { AppController } from "./controllers/AppController";
import { ADMIN_USER } from "./models/User";
import "./style.css";

const ADMIN_ACCOUNT: AdminAccount = {
  user: ADMIN_USER,
  saltHex: "d3f48a8bcebfd0afd5a223abc14d76dc",
  passwordHashHex:
    "a63e7191267ee43276e4721adaa559350de82f74320b0e125def6a061bcac294",
  iterations: 310_000,
};

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("App root element was not found.");

const authenticationService = new AuthenticationService(
  ADMIN_ACCOUNT,
  new PasswordHasher(),
  new SessionStore(),
);
const controller = new AppController(
  authenticationService,
  root,
  ADMIN_USER,
);

controller.start();
