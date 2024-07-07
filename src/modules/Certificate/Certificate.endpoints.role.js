import { systemRoles } from "../../utils/SystemRoles.js";

export const CertificateRoles = {
    AddCertificate:[systemRoles.ADMIN],
    updateCertificate:[systemRoles.ADMIN],
    DeleteCertificate:[systemRoles.ADMIN],
    GetCertificate:[systemRoles.ADMIN],
}