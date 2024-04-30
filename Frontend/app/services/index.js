
import { AuthService } from "./auth.service";
import { API_ENDPOINT } from "../utils/index";

export const authService = new AuthService(API_ENDPOINT);