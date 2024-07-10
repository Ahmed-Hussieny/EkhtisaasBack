import { systemRoles } from "../../utils/SystemRoles.js";

export const endpointsRoles = {
    UPDATEUSER : [systemRoles.USER,systemRoles.ADMIN],
    DELETEUSER:[systemRoles.USER,systemRoles.ADMIN],
    GETUSERDATA:[systemRoles.USER,systemRoles.ADMIN],
    UPDATEPASSWORD:[systemRoles.USER,systemRoles.ADMIN],
    GETALLUSERS:[systemRoles.ADMIN,systemRoles.USER],
    DELETEUSERBYID:[systemRoles.ADMIN],
}