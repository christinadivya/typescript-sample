import { Request, Response, Router } from "express";
import { validate } from "express-validation";
import * as resHndlr from "../helpers/resHandler";
import JwtAuthenticator from "../middlewares/authentication";
import customerValidation from "../middlewares/validations/customer.validation";
import CustomerService from "../services/customer.service";

export default function customerRoute(
  authenticator: JwtAuthenticator,
  customerService: CustomerService
): Router {
  const customerRouter = Router();
  /**
   *  This Route helps to create the customer data by providers
   */
  customerRouter.post(
    "/sign-up",
    [
      validate(
        customerValidation.customerValidation.register,
        { keyByField: true },
        { abortEarly: false }
      ),
    ],
    async (req: Request, res: Response) => {
      try {
        const result = await customerService.add(req.body);
        resHndlr.sendSuccess(res, result);
      } catch (err) {
        resHndlr.sendError(res, err);
      }
    }
  );
  /**
   *  This Route helps to get the customer data by providers
   */
  customerRouter.get(
    "/",
    [authenticator.authenticateAndAuthorizeToken()],
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.user.id);
        const result = await customerService.get(id);
        resHndlr.sendSuccess(res, result);
      } catch (err) {
        resHndlr.sendError(res, err);
      }
    }
  );
  /**
   * This Route is used to edit the customer details by provider
   */
  customerRouter.put(
    "/",
    [
      authenticator.authenticateAndAuthorizeToken(),
      validate(
        customerValidation.customerValidation.edit,
        { keyByField: true },
        { abortEarly: false }
      ),
    ],
    async (req: Request, res: Response) => {
      try {
        console.log(Number(req.user.id), "***")
        const result = await customerService.edit(req.body, Number(req.user.id));
        resHndlr.sendSuccess(res, result);
      } catch (err) {
        resHndlr.sendError(res, err);
      }
    }
  );
  return customerRouter;
}
