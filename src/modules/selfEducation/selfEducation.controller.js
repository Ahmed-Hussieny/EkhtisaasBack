import Certificate from "../../../DB/models/Certificate.model.js"
import SelfEducation from "../../../DB/models/selfEducation.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"

// & ===================================== Add  SelfEducation ===========================
export const AddSelfEducation = async (req,res,next) =>{
    const {selfEducationTitle,selfEducationURL} = req.body
    const {id} = req.params

    const CertificateData = await Certificate.findById(id)
    if(!CertificateData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"لم يتم العثور على الشهادة"
        })
    }
    if(!req.file){
        return res.status(400).json({
            status:400,
            success:false,
            message:"الصورة مطلوبة"
        })
    }
    const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${CertificateData.certificateImage.public_id}/${selfEducationTitle}`
    })
    const selfEducation =  SelfEducation.create({
        selfEducationTitle,
        selfEducationURL,
        Image:{
            secure_url,
            public_id
        },
        CertificateId:id
    })
    if(!selfEducation){
        return res.status(400).json({
            status:400,
            success:false,
            message:"خطأ في إضافة التعليم الذاتي"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"تمت إضافة التعليم الذاتي بنجاح",
        data:selfEducation
    })
}

//& ================================== update SelfEducation ============================
export const UpdateSelfEducation = async (req,res,next)=>{
    const {id} = req.params
    const {selfEducationTitle,selfEducationURL} = req.body

    const selfEducationData = await SelfEducation.findById(id)
    if(!selfEducationData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التعليم الذاتي غير موجود"
        })
    }
    if(req.file){
        await CloudinaryConnection().uploader.destroy(selfEducationData.Image.public_id)
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
             folder:`${selfEducationData.Image.public_id}/${selfEducationTitle}`
        })
        selfEducationData.Image.secure_url = secure_url
        selfEducationData.Image.public_id = public_id
    }
    if(selfEducationTitle && selfEducationData.selfEducationTitle!==selfEducationTitle){
        selfEducationData.selfEducationTitle = selfEducationTitle
    }
    if(selfEducationURL && selfEducationData.selfEducationURL!==selfEducationURL){
        selfEducationData.selfEducationURL = selfEducationURL
    }
    await selfEducationData.save()
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم تحديث التعليم الذاتي بنجاح",
        data:selfEducationData
    })
}

//& ====================== Delete self Education =============================
export const DeleteSelfEducation =async (req,res,next)=>{
    const {id} = req.params;
    const selfEducation = await SelfEducation.findById(id)
    if(!selfEducation){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التعليم الذاتي غير موجود"
        })
    }
    await CloudinaryConnection().uploader.destroy(selfEducation.Image.public_id)
    await SelfEducation.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم حذف التعليم الذاتي بنجاح"
    })
}