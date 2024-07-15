import MainSpecialty from "../../../DB/models/MainSpecialty.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"
import SubSpecialty from '../../../DB/models/SubSpecialty.model.js';
import DirectEducation from "../../../DB/models/directEducation.model.js";
import SupportSide from "../../../DB/models/supportSide.model.js";
import SelfEducation from "../../../DB/models/selfEducation.model.js";
import Certificate from "../../../DB/models/Certificate.model.js";


//& ========================= ADD MAIN Specialty ==============================
export const AddMainSpecialty = async(req,res,next) =>{
    const {Title,Description,Type} = req.body

    const isMainExist  =  await MainSpecialty.findOne({Title})
    if(isMainExist){
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الرئيسي موجود بالفعل"
        })
    }
    if(!req.file) return res.status(400).json({
        status:400,
        success:false,
        
message:"يرجى تحميل الصورة"
    })
    const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${process.env.MAIN_FOLDER}/MainSpecialty/${Title}`
    })
    const NewMainSpecialty = await MainSpecialty.create({
        Title,
        Description,
        Type,
        Image:{
            secure_url,
            public_id
        }
    })
    if(!NewMainSpecialty){
        return res.status(400).json({
            status:400,
            success:false,
            message:"فشل في إضافة التخصص الرئيسي"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"تمت إضافة التخصص الرئيسي بنجاح",
        data:NewMainSpecialty
    })
}

//& ========================= UPDATE MAIN Specialty ==============================
export const updateMainSpecialty = async (req,res,next)=>{
    const {id} = req.params
    const {Title,Description} = req.body
    const MainSpecialtyData = await MainSpecialty.findById(id)
    if(!MainSpecialtyData){
        return res.status(400).json({
            status:400,
            success:false,
            
message:"التخصص الرئيسي غير موجود"
        })
    }
    if(req.file){
        await CloudinaryConnection().uploader.destroy(MainSpecialtyData.Image.public_id)
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/MainSpecialty/${Title}`
        })
        MainSpecialtyData.Image.secure_url = secure_url
        MainSpecialtyData.Image.public_id = public_id
    }
    if(Title){
        MainSpecialtyData.Title = Title
    }
    if(Description){
        MainSpecialtyData.Description = Description
    }
    await MainSpecialtyData.save()
    return res.status(200).json({
        status:200,
        success:true,
        
message:"تم تحديث التخصص الرئيسي بنجاح",
        data:MainSpecialtyData
    })
}

//& ========================= DELETE MAIN Specialty ==============================
export const DeleteMainSpecialty = async (req,res,next) => {
    const {id} = req.params
    const MainSpecialtyData = await MainSpecialty.findById(id)
    if(!MainSpecialtyData){
        return res.status(400).json({
            status:400,
            success:false,
            
message:"التخصص الرئيسي غير موجود"
        })
    }
    await CloudinaryConnection().uploader.destroy(MainSpecialtyData.Image.public_id)
    const SubSpecialtyDeleted =await SubSpecialty.find({MainSpecialtyId:id})

    if(SubSpecialtyDeleted){
        SubSpecialtyDeleted.map(async (item)=>{
            await CloudinaryConnection().uploader.destroy(item.Image.public_id)
            
            const CertificateDeleted =await Certificate.find({SubSpecialtyId:item._id})
            if(CertificateDeleted){
                CertificateDeleted.map(async (item2)=>{
                    
                    await CloudinaryConnection().uploader.destroy(item2.certificateImage.public_id)
                    await CloudinaryConnection().uploader.destroy(item2.organizationImage.public_id)
                            const SelfEducationDeleted =await SelfEducation.find({CertificateId:item2._id})
                            if(SelfEducationDeleted){
                                SelfEducationDeleted.map(async (item2)=>{
                                    await CloudinaryConnection().uploader.destroy(item2.Image.public_id)
                                    await SelfEducation.deleteOne({_id:item2._id})
                                }
                                )}
                                const DirectEducationDeleted =await DirectEducation.find({CertificateId:item2._id})
                            if(DirectEducationDeleted){
                                DirectEducationDeleted.map(async (item2)=>{
                                    await CloudinaryConnection().uploader.destroy(item2.Image.public_id)
                                    await DirectEducation.deleteOne({_id:item2._id})
                                }
                                )}
                                const SupportSideDeleted =await SupportSide.find({CertificateId:item2._id})
                            if(SupportSideDeleted){
                                SupportSideDeleted.map(async (item2)=>{
                                    await CloudinaryConnection().uploader.destroy(item2.Image.public_id)
                                    await SupportSide.deleteOne({_id:item2._id})
                                }
                                )}
                    await Certificate.deleteOne({_id:item2._id})
                }
                )}
            await SubSpecialty.deleteOne({_id:item._id})
        }
        )}
    await MainSpecialty.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        
message:"تم حذف التخصص الرئيسي بنجاح"
    })
}
//& ========================= GET MAIN Specialty ==============================
export const GetAllMainSpecialties = async (req,res,next)=>{
    const MainSpecialties = await MainSpecialty.find()
    if(!MainSpecialties){
        return res.status(400).json({
            status:400,
            success:false,
            
message:"التخصص الرئيسي غير موجود"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        
message:"تم العثور على التخصص الرئيسي",
        data:MainSpecialties
    })
}
//& ========================= GET MAIN Specialty ==============================
export const GetSingleMainSpecialty = async (req,res,next)=>{
    const {id} = req.params
    const singleMainSpecialty  = await MainSpecialty.findById(id).populate({ path: 'SubSpecialtyies' })
    if(!singleMainSpecialty) {
        return res.status(400).json({
            status:400,
            success:false,
            message:"التخصص الرئيسي غير موجود"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"التخصص الرئيسي",
        data:singleMainSpecialty
    })
}