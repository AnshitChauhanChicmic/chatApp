import { userRoutes } from "./v1/userRoutes";
import { messageRoutes } from "./v1/messageRoutes";

export const Routes = [...userRoutes, ...messageRoutes]