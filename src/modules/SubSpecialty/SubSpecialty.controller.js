import Certificate from "../../../DB/models/Certificate.model.js"
import MainSpecialty from "../../../DB/models/MainSpecialty.model.js"
import SubSpecialty from "../../../DB/models/SubSpecialty.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"
import SelfEducation from '../../../DB/models/selfEducation.model.js';
import DirectEducation from '../../../DB/models/directEducation.model.js';
import SupportSide from '../../../DB/models/supportSide.model.js';

//& ========================== ADD SubSpecialty =============================
export const AddSubSpecialty = async (req,res,next)=>{
    const {Title ,Description,MainTitle} = req.body
    console.log(MainTitle);
    const isSubExist  =  await SubSpecialty.findOne({Title})
    if(isSubExist){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الفرعي موجود بالفعل"
        })
    }
    const MainSpecialtyData = await MainSpecialty.findOne({Title:MainTitle})
    if(!MainSpecialtyData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"فشل في العثور على التخصص الرئيسي"
        })
    }


    if(!req.file) return res.status(400).json({
        status:400,
        success:false,
        message:"يرجى تحميل الصورة"
    })
    const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${process.env.MAIN_FOLDER}/MainSpecialty/${MainSpecialtyData.Title}/SubSpecialty/${Title}`
    })
    const NewMainSpecialty = await SubSpecialty.create({
        Title,
        Description,
        MainTitle,
        Image:{
            secure_url,
            public_id
        },
        MainSpecialtyId:MainSpecialtyData._id,
    })
    if(!NewMainSpecialty){
        return res.status(400).json({
            status:400,
            success:false,
            message:"فشل في إضافة التخصص الفرعي"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"تمت إضافة التخصص الفرعي بنجاح",
        data:NewMainSpecialty
    })
}


//& ========================= UPDATE SUB Specialty ==============================
export const updateSubSpecialty = async (req,res,next)=>{
    const {id} = req.params
    const {Title,Description,MainTitle,MainSpecialtyId} = req.body

    const SubSpecialtyData = await SubSpecialty.findById(id)
    if(!SubSpecialtyData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الفرعي غير موجود"
        })
    }
    if(req.file){
        await CloudinaryConnection().uploader.destroy(SubSpecialtyData.Image.public_id)
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
             folder:`${process.env.MAIN_FOLDER}/MainSpecialty/${MainTitle}/SubSpecialty/${Title}`
        })
        SubSpecialtyData.Image.secure_url = secure_url
        SubSpecialtyData.Image.public_id = public_id
    }
    if(Title && SubSpecialtyData.Title!==Title){
        SubSpecialtyData.Title = Title
        const isMainExist  =  await SubSpecialty.findOne({Title})
        if(isMainExist){
            return res.status(400).json({
                status:400,
                success:false,
                message:"التخصص الفرعي موجود بالفعل"
            })
        }
    }
    if(MainTitle){
        SubSpecialtyData.MainTitle = MainTitle
        const MainSpecialtyData = await MainSpecialty.findOne({Title:MainTitle})
        if(!MainSpecialtyData){
            return res.status(400).json({
                status:400,
                success:false,
                message:"التخصص الرئيسي غير موجود"
            })
        }
        SubSpecialtyData.MainSpecialtyId = MainSpecialtyData._id
    }
    if(Description){
        SubSpecialtyData.Description = Description
    }
    await SubSpecialtyData.save()
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم تحديث التخصص الفرعي بنجاح",
        data:SubSpecialtyData
    })
}


//& ========================= DELETE SUB Specialty ==============================
export const DeleteSubSpecialty = async (req,res,next) => {
    const {id} = req.params
    const subSpecialtyData = await SubSpecialty.findById(id)
    if(!subSpecialtyData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الرئيسي غير موجود"
        })
    }
    await CloudinaryConnection().uploader.destroy(subSpecialtyData.Image.public_id)
    const CertificateDeleted =await Certificate.find({SubSpecialtyId:id})
    if(CertificateDeleted){
        CertificateDeleted.map(async (item)=>{
            await CloudinaryConnection().uploader.destroy(item.certificateImage.public_id)
            await CloudinaryConnection().uploader.destroy(item.organizationImage.public_id)
                                const SelfEducationDeleted =await SelfEducation.find({CertificateId:item._id})
                    if(SelfEducationDeleted){
                        SelfEducationDeleted.map(async (item2)=>{
                            await CloudinaryConnection().uploader.destroy(item2.Image.public_id)
                            await SelfEducation.deleteOne({_id:item2._id})
                        }
                        )}
                        const DirectEducationDeleted =await DirectEducation.find({CertificateId:item._id})
                    if(DirectEducationDeleted){
                        DirectEducationDeleted.map(async (item2)=>{
                            await CloudinaryConnection().uploader.destroy(item2.Image.public_id)
                            await DirectEducation.deleteOne({_id:item2._id})
                        }
                        )}
                        const SupportSideDeleted =await SupportSide.find({CertificateId:item._id})
                    if(SupportSideDeleted){
                        SupportSideDeleted.map(async (item2)=>{
                            await CloudinaryConnection().uploader.destroy(item2.Image.public_id)
                            await SupportSide.deleteOne({_id:item2._id})
                        }
                        )}
            await Certificate.deleteOne({_id:item._id})
        }
        )}
    await SubSpecialty.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم حذف التخصص الفرعي بنجاح"
    })
}

//& ========================= GET ALL SUB Specialty ==============================
export const GetAllSubSpecialties = async (req,res,next)=>{
    const SubSpecialties = await SubSpecialty.find()
    if(!SubSpecialties){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الفرعي غير موجود"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم العثور على التخصص الفرعي",
        data:SubSpecialties
    })
}
//& ========================= GET SINGLE SUB Specialty ==============================
export const GetSingleSubSpecialty = async (req,res,next)=>{
    const {id} = req.params
    const singleSubSpecialty  = await SubSpecialty.findById(id).populate({path:'Certificates'})
    if(!singleSubSpecialty) {
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الفرعي غير موجود"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم العثور على التخصص الفرعي",
        data:singleSubSpecialty
    })
}