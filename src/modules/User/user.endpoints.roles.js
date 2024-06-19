import { systemRoles } from "../../utils/SystemRoles.js";

export const endpointsRoles = {
    UPDATEUSER : [systemRoles.USER,systemRoles.TECHNICIAN,systemRoles.ADMIN,systemRoles.SUPERADMIN],
    DELETEUSER:[systemRoles.USER,systemRoles.TECHNICIAN,systemRoles.ADMIN,systemRoles.SUPERADMIN],
    GETUSERDATA:[systemRoles.USER,systemRoles.TECHNICIAN,systemRoles.ADMIN,systemRoles.SUPERADMIN],
    UPDATEPASSWORD:[systemRoles.USER,systemRoles.TECHNICIAN,systemRoles.ADMIN,systemRoles.SUPERADMIN],
    GETALLUSERS:[systemRoles.ADMIN,systemRoles.SUPERADMIN],
    DELETEUSERBYID:[systemRoles.ADMIN,systemRoles.SUPERADMIN],
}