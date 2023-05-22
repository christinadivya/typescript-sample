import { IUser } from "../../../interfaces/entity/IUser";

declare global {
  declare namespace Express {
    interface Request {
      user?: IUser;
      token: string;
    }
  }
}
