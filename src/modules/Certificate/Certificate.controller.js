import Certificate from "../../../DB/models/Certificate.model.js";
import SubSpecialty from "../../../DB/models/SubSpecialty.model.js";
import CloudinaryConnection from "../../utils/cloudinary.js";
//& =========================== Add certificate ========================
export const AddCertificate = async (req, res, next) => {
    const {
        certificateName, organizationName, Description,
        Specialties, JobTitle, Prerequisites, scientificMethods,
        SupportedLanguages, NumberOfTests,
        CertificateValidityPeriod,
        trainingCost,
        testCost, totalCost,
        SubSpecialtyId,Level
    } = req.body;
    const Certificatee = await Certificate.findOne({certificateName});
        if (Certificatee) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "This Certificate Exist before"
            });
        }
    console.log(req.body);
    const subSpecialty = await SubSpecialty.findById(SubSpecialtyId);
        if (!subSpecialty) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "SubSpecialty not found"
            });
        }
        
        
        const uploadImage = async (image, folderPath) => {
            if (!image) return null;
            const result = await CloudinaryConnection().uploader.upload(image.path, {
                folder: folderPath
            });
            return {
                secure_url: result.secure_url,
                public_id: result.public_id
            };
        };

        const certificateFolderPath = `${subSpecialty.Image.public_id}/Certificates/${certificateName}`;

        
        const certificateImage = await uploadImage(req.files['certificateImage'][0], certificateFolderPath);
        const organizationImage = await uploadImage(req.files['organizationImage'][0], certificateFolderPath);
        
        const newCertificate = await Certificate.create({
            certificateImage: certificateImage,
            certificateName: certificateName,
            organizationImage: organizationImage,
            organizationName: organizationName,
            Description: Description,
            Specialties: Specialties,
            JobTitle: JobTitle,
            Prerequisites: Prerequisites,
            scientificMethods: scientificMethods,
            SupportedLanguages: SupportedLanguages,
            NumberOfTests: NumberOfTests,
            CertificateValidityPeriod: CertificateValidityPeriod,
            trainingCost: trainingCost,
            testCost: testCost,
            totalCost: totalCost,
            SubSpecialtyId: SubSpecialtyId,
            Level
        });

        if (!newCertificate) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Failed to Add Certificate"
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Certificate Added Successfully",
            data: newCertificate
        });
};
//& =========================== Get All certificate ========================
export const GetAllCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find()
            .populate([{ path: 'directEducations' }, { path: 'selfEducations' }, { path: 'supportSides' }]);

        if (!certificates || certificates.length === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Certificates not found"
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "All Certificates",
            data: certificates
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
//& =========================== Get Single certificate ========================
export const GetSinglecertificate = async (req, res, next) => {
    const {id} = req.params
    try {
        const certificates = await Certificate.findById(id)
            .populate([{ path: 'directEducations' }, { path: 'selfEducations' }, { path: 'supportSides' }]);

        if (!certificates || certificates.length === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Certificates not found"
            });
        }

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Certificate",
            data: certificates
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


// &================================= Update Certificate ========================
export const UpdateCertificate = async (req, res, next) => {
    const { id } = req.params;
    const {
        certificateName, organizationName, Description,
        Specialties, JobTitle, Prerequisites, scientificMethods,
        SupportedLanguages, NumberOfTests,
        CertificateValidityPeriod,
        trainingCost,
        testCost, totalCost,
        SubSpecialtyId,Level
    } = req.body;
    const certificate = await Certificate.findById(id);
    if(!certificate){
        return res.status(404).json({
            status:404,
            success:false,
            message:"Certificate not found"
        });
    }
    const subSpecialty = await SubSpecialty.findById(SubSpecialtyId);
    if (!subSpecialty) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: "SubSpecialty not found"
        });
    }
    const uploadImage = async (image, folderPath) => {
        if (!image) return null;
        const result = await CloudinaryConnection().uploader.upload(image.path, {
            folder: folderPath
        });
        return {
            secure_url: result.secure_url,
            public_id: result.public_id
        };
    };
    const certificateFolderPath = `${subSpecialty.Image.public_id}/Certificates/${certificateName}`;
    
    if(certificateName){
        certificate.certificateName = certificateName;
    }
    if(organizationName){
        certificate.organizationName = organizationName;
    }
    if(req.files['certificateImage']){
        await CloudinaryConnection().uploader.destroy(certificate.certificateImage.public_id)
        const certificateImage = await uploadImage(req.files['certificateImage'][0], certificateFolderPath);
        certificate.certificateImage = certificateImage;
    }
    if(req.files['organizationImage']){
        await CloudinaryConnection().uploader.destroy(certificate.organizationImage.public_id)
        const organizationImage = await uploadImage(req.files['organizationImage'][0], certificateFolderPath);
        certificate.organizationImage = organizationImage;
    }
    if(Description){
        certificate.Description = Description;
    }
    if(Specialties){
        certificate.Specialties = Specialties;
    }
    if(JobTitle){
        certificate.JobTitle = JobTitle;
    }
    if(Prerequisites){
        certificate.Prerequisites = Prerequisites;
    }
    if(scientificMethods){
        certificate.scientificMethods = scientificMethods;
    }
    if(SupportedLanguages){
        certificate.SupportedLanguages = SupportedLanguages;
    }
    if(NumberOfTests){
        certificate.NumberOfTests = NumberOfTests;
    }
    if(CertificateValidityPeriod){
        certificate.CertificateValidityPeriod = CertificateValidityPeriod;
    }
    if(trainingCost){
        certificate.trainingCost = trainingCost;
    }
    if(testCost){
        certificate.testCost = testCost;
    }
    if(totalCost){
        certificate.totalCost = totalCost;
    }
    if(SubSpecialtyId){
        certificate.SubSpecialtyId = SubSpecialtyId;
    }
    if(Level){
        certificate.Level = Level;
    }
    await certificate.save();
    return res.status(200).json({
        status:200,
        success:true,
        message:"Certificate Updated Successfully",
        data:certificate
    });
}

// &================================= Delete Certificate ========================
export const DeleteCertificate = async(req,res,next)=>{
    const {id} = req.params;
    const certificate = await Certificate.findById(id)
    if(!certificate){
        return res.status(400).json({
            status:400,
            success:false,
            message:"certificate Not Found"
        })
    }
    await CloudinaryConnection().uploader.destroy(certificate.certificateImage.public_id)
    await CloudinaryConnection().uploader.destroy(certificate.organizationImage.public_id)
    await Certificate.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"Certificate Deleted Successfully"
    })
}
