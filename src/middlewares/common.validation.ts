// import { NextFunction, Request, Response } from "express";
// import i18next from "../config/i18nextConfig";
// import DropdownTypeDao from "../daos/dropdownType.dao";
// import DropdownValueDao from "../daos/dropdownValue.dao";
// import customExceptions from "../helpers/customExceptions";
// import { IEmail } from "../interfaces/entity/IEmail";
// import { IPhoneNumber } from "../interfaces/entity/IPhoneNumber";
// import { UserRoleIdEnum } from "../interfaces/entity/IUser";

// export default class CommonValidation {
//   dropdownValueDao: DropdownValueDao;
//   dropdownTypeDao: DropdownTypeDao;
//   constructor(
//     dropdownValueDao: DropdownValueDao,
//     dropdownTypeDao: DropdownTypeDao
//   ) {
//     this.dropdownValueDao = dropdownValueDao;
//     this.dropdownTypeDao = dropdownTypeDao;
//   }
//   /** This function used to email unique validation and primary value */
//   emailValidation() {
//     return async (
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ): Promise<void> => {
//       try {
//         const { emails } = req.body;
//         const email_ids = emails.map((emailData: IEmail) => emailData.email);
//         const checkDuplicateEmails = () => {
//           return new Set(email_ids).size !== email_ids.length;
//         };
//         if (checkDuplicateEmails()) {
//           next(customExceptions.validationError(i18next.t("SAME_EMAIL")));
//         }
//         const primary_ids = emails.filter(
//           (emailData: IEmail) => emailData.is_primary === 1
//         );
//         const checkPrimaryEmail = () => {
//           return primary_ids.length > 0;
//         };
//         if (!checkPrimaryEmail()) {
//           next(customExceptions.validationError(i18next.t("PRIMARY_EMAIL")));
//         }
//         next();
//       } catch (err) {
//         next(customExceptions.validationError(err));
//       }
//     };
//   }
//   /**
//    * This function used to unique validation for phone and primary value
//    * @returns - void
//    */
//   phoneValidation() {
//     return async (
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ): Promise<void> => {
//       try {
//         const { phone_numbers } = req.body;
//         const phone_Array = phone_numbers.map(
//           (phoneData: IPhoneNumber) => phoneData.phone
//         );
//         const checkDuplicatePhone = () => {
//           return new Set(phone_Array).size !== phone_Array.length;
//         };
//         if (checkDuplicatePhone()) {
//           next(customExceptions.validationError(i18next.t("SAME_PHONE")));
//         }
//         const primary_ids = phone_numbers.filter(
//           (phoneData: IPhoneNumber) => phoneData.is_primary === 1
//         );
//         const checkPrimaryPhoneNumber = () => {
//           return primary_ids.length > 0;
//         };
//         if (!checkPrimaryPhoneNumber()) {
//           next(customExceptions.validationError(i18next.t("PRIMARY_PHONE")));
//         }
//         next();
//       } catch (err) {
//         next(customExceptions.validationError(err));
//       }
//     };
//   }

//   /**
//    * This function used to validate the password pattern
//    * @returns - void
//    */
//   passwordValidation() {
//     return async (
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ): Promise<void> => {
//       try {
//         // const { password } = req.body;
//         next();
//       } catch (err) {
//         next(customExceptions.validationError(err));
//       }
//     };
//   }

//   checkProviderRole() {
//     return async (
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ): Promise<void> => {
//       try {
//         if (req.user.role_id !== UserRoleIdEnum.provider) {
//           next(
//             customExceptions.validationError(i18next.t("USER_ACCESS_DENIED"))
//           );
//         }
//         next();
//       } catch (err) {
//         next(customExceptions.validationError(err));
//       }
//     };
//   }
// }
