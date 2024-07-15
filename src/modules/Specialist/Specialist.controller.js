import Specialist from "../../../DB/models/Specialist.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"

//& ======================= Add Specialist ===============================
export const AddSpecialist = async (req,res,next)=>{
    const {name,Description,ExperienceInYears,experienceDescription,
        Services,Category,PriceOfServices,
        email,linkedIn,X,website,Rate} = req.body

        const isSpecialistExist = await Specialist.findOne({email})
        if(isSpecialistExist){
            return res.status(400).json({
                success:false,
                status:400,
                message:"متخصص موجود بالفعل"
            })
        }
        if(!req.file){
            return res.status(400).json({
                success:false,
                status:400,
                message:"الصورة مطلوبة"
            })
        }
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/Specialists/${name}`
        })
        const newSpecialist =  Specialist.create({
            name,
            Image:{
            secure_url,
            public_id
        },
            Description,
            ExperienceInYears,
            experienceDescription,
            Services,
            Category,PriceOfServices,
            email,
            linkedIn,
            X,
            website,
            Rate
        })
    
    if(!newSpecialist){
        return res.status(400).json({
            status:400,
            success:false,
            message:"فشل في إضافة متخصص"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"تمت إضافة المتخصص بنجاح",
        data:newSpecialist
    })
}

//& ============================== update Specialist =========================
export const updateSpecialist =async (req,res,next)=>{
    const {id} = req.params
    const {name,Description,ExperienceInYears,experienceDescription,
        Services,Category,PriceOfServices,
        email,linkedIn,X,website,Rate} = req.body

        const specialist = await Specialist.findById(id)
        if(!specialist){
            return res.status(400).json({
                success:false,
                status:400,
                message:"لم يتم العثور على المتخصص"
            })
        }
        if(name){
            specialist.name = name
        }
        if(Description){
            specialist.Description = Description
        }
        if(ExperienceInYears){
            specialist.ExperienceInYears = ExperienceInYears
        }
        if(PriceOfServices){
            specialist.PriceOfServices = PriceOfServices
        }
        if(experienceDescription){
            specialist.experienceDescription = experienceDescription
        }
        if(Services){
            specialist.Services = Services
        }
        if(Category){
            specialist.Category = Category
        }
        if(email){
            specialist.email = email
        }
        if(linkedIn){
            specialist.linkedIn = linkedIn
        }
        if(X){
            specialist.X = X
        }
        if(website){
            specialist.website = website
        }
        if(Rate){
            specialist.Rate = Rate
        }
        if(req.file){
            await CloudinaryConnection().uploader.destroy(specialist.Image.public_id)
            const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
                folder:`${process.env.MAIN_FOLDER}/Specialists/${name}`
            })
            specialist.Image = {
                secure_url,
                public_id
            }
        }
        const updatedSpecialist = await specialist.save()
        return res.status(200).json({
            status:200,
            success:true,
            message:"تم تحديث المتخصص بنجاح",
            data:updatedSpecialist
        })
}

//& ========================== delete Specialist =============================
export const DeleteSpecialist = async(req,res,next)=>{
    const {id} = req.params;
    const specialist = await Specialist.findById(id)
    if(!specialist){
        return res.status(400).json({
            status:400,
            success:false,
            message:"متخصص غير موجود"
        })
    }
    await CloudinaryConnection().uploader.destroy(specialist.Image.public_id)
    await Specialist.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"تم حذف التخصص بنجاح"
    })
}
// & ===================== Get All Specialists =============================
export const GetAllSpecialists = async(req,res,next)=>{
    const Specialists = await Specialist.find()
    if(!Specialists){
        return res.status(400).json({
            status:400,
            success:false,
            message:"لم يتم العثور على متخصصين"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"جميع المتخصصين",
        data:Specialists
    })
}

//&=================== Get Single Specialists ============================
export const GetSingleSpecialist = async(req,res,next)=>{
    const {id} = req.params
    const specialist = await Specialist.findById(id)
    if(!specialist){
        return res.status(400).json({
            status:400,
            success:false,
            message:"متخصص غير موجود"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"متخصص واحد",
        data:specialist
    })
}
