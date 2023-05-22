// import { Request, Response, Router } from 'express';
// import { validate } from 'express-validation';
// import { constants } from '../config/constants';
// import i18next from '../config/i18nextConfig';
// import * as resHndlr from '../helpers/resHandler';

// import customExceptions from '../helpers/customExceptions';
// import { ILogoutData } from '../helpers/types';
// import JwtAuthenticator from '../middlewares/authentication';
// import CommonValidation from '../middlewares/common.validation';
// import providerValidation from '../middlewares/validations/provider.validation';
// import UserService from '../services/user.service';

// export default function userRoute(
//   authenticator: JwtAuthenticator,
//   commonValidation: CommonValidation,
//   userService: UserService,
// ): Router {
//   const userRouter = Router();

//   userRouter.post(
//     '/change-password',
//     [
//       authenticator.authenticateAndAuthorizeUserToken(),
//       validate(
//         providerValidation.providerValidation.changePassword,
//         { keyByField: true },
//         { abortEarly: false },
//       ),
//     ],
//     async (req: Request, res: Response) => {
//       try {
//         if (req.role === constants.PROVIDER) {
//           if (req.body.source !== 'web') {
//             throw customExceptions.validationError(i18next.t('INVALID_SOURCE'));
//           }
//           req.body.user_id = req.user.id;
//         } else {
//           if (req.body.source !== 'mobile') {
//             throw customExceptions.validationError(i18next.t('INVALID_SOURCE'));
//           }
//           req.body.user_id = req.customer.id;
//         }

//         const result = await userService.changePassword(req.body);
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );

//   userRouter.post(
//     '/forgot-password-request',
//     [
//       validate(
//         providerValidation.providerValidation.forgotPasswordRequest,
//         { keyByField: true },
//         { abortEarly: false },
//       ),
//     ],
//     async (req: Request, res: Response) => {
//       try {
//         const result = await userService.forgotPasswordRequest(req.body);
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );
//   userRouter.post(
//     '/forgot-password-otp-verification',
//     [
//       validate(
//         providerValidation.providerValidation.forgotPasswordOTPVerification,
//         { keyByField: true },
//         { abortEarly: false },
//       ),
//     ],
//     async (req: Request, res: Response) => {
//       try {
//         const result = await userService.forgotPasswordOTPVerification(
//           req.body,
//         );
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );
//   userRouter.post(
//     '/forgot-password-update',
//     [
//       validate(
//         providerValidation.providerValidation.forgotPasswordUpdate,
//         { keyByField: true },
//         { abortEarly: false },
//       ),
//     ],
//     async (req: Request, res: Response) => {
//       try {
//         const result = await userService.forgotPasswordUpdate(req.body);
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );

//   userRouter.post(
//     '/login',
//     [
//       validate(
//         providerValidation.providerValidation.login,
//         { keyByField: true },
//         { abortEarly: false },
//       ),
//     ],
//     async (req: Request, res: Response) => {
//       try {
//         const result = await userService.login(req.body);
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );
//   userRouter.post(
//     '/logout',
//     [
//       authenticator.authenticateAndAuthorizeUserToken(),
//       validate(
//         providerValidation.providerValidation.logout,
//         { keyByField: true },
//         { abortEarly: false },
//       ),
//     ],
//     async (req: Request, res: Response) => {
//       try {
//         let logoutData: ILogoutData;
//         if (req.body.logout_source === constants.WEB) {
//           logoutData = {
//             user_id: req.user.id,
//             user_array: req.body.user_array || [],
//           };
//         } else {
//           logoutData = {
//             user_id: req.customer.id,
//             user_array: [],
//           };
//         }
//         logoutData.token = req.get('authorization');
//         logoutData.source = req.body.logout_source;
//         const result = await userService.logout(logoutData);
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );
//   userRouter.get(
//     '/activeLogins',
//     [authenticator.authenticateAndAuthorizeUserToken()],
//     async (req: Request, res: Response) => {
//       try {
//         const reqData = {
//           user_id: req.user.id,
//         };
//         const result = await userService.getActiveLogins(reqData);
//         resHndlr.sendSuccess(res, result);
//       } catch (err) {
//         resHndlr.sendError(res, err);
//       }
//     },
//   );
//   return userRouter;
// }
