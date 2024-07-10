import { systemRoles } from "../../utils/SystemRoles.js";

export const MainSpecialtyRoles = {
    AddMainSpecialty:[systemRoles.ADMIN],
    updateMainSpecialty:[systemRoles.ADMIN],
    DeleteMainSpecialty:[systemRoles.ADMIN],
    GetMainSpecialty:[systemRoles.ADMIN,systemRoles.USER],
}