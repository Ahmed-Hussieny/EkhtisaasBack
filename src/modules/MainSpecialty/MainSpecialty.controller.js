import MainSpecialty from "../../../DB/models/MainSpecialty.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"


//& ========================= ADD MAIN Specialty ==============================
export const AddMainSpecialty = async(req,res,next) =>{
    const {Title,Description,Type} = req.body

    const isMainExist  =  await MainSpecialty.findOne({Title})
    if(isMainExist){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Main Specialty Already Exist"
        })
    }
    if(!req.file) return res.status(400).json({
        status:400,
        success:false,
        
message:"Please Upload Image"
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
            message:"Failed to Add Main Specialty"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Main Specialty Added Successfully",
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
            
message:"Main Specialty Not Found"
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
        const isMainExist  =  await MainSpecialty.findOne({Title})
        if(isMainExist){
            return res.status(400).json({
                status:400,
                success:false,
                message:"Main Specialty Already Exist"
            })
        }
    }
    if(Description){
        MainSpecialtyData.Description = Description
    }
    await MainSpecialtyData.save()
    return res.status(200).json({
        status:200,
        success:true,
        
message:"Main Specialty Updated Successfully",
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
            
message:"Main Specialty Not Found"
        })
    }
    await CloudinaryConnection().uploader.destroy(MainSpecialtyData.Image.public_id)
    await MainSpecialty.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        
message:"Main Specialty Deleted Successfully"
    })
}
//& ========================= GET MAIN Specialty ==============================
export const GetAllMainSpecialties = async (req,res,next)=>{
    const MainSpecialties = await MainSpecialty.find()
    if(!MainSpecialties){
        return res.status(400).json({
            status:400,
            success:false,
            
message:"Main Specialty Not Found"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        
message:"Main Specialty Found",
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
            message:"Main Specialty Not Found"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Main Specialty Found",
        data:singleMainSpecialty
    })
}