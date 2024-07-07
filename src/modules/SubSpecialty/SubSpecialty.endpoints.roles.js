import { systemRoles } from "../../utils/SystemRoles.js";

export const SubSpecialtyRoles = {
    AddSubSpecialty:systemRoles.ADMIN,
    updateSubSpecialty:systemRoles.ADMIN,
    DeleteSubSpecialty:systemRoles.ADMIN,
    GetSubSpecialty:[systemRoles.ADMIN,systemRoles.USER],
}