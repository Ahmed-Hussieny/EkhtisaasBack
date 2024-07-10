import SupportSide from "../../../DB/models/supportSide.model.js"
import Certificate from "../../../DB/models/Certificate.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"

// & ===================================== Add  supportSide ===========================
export const AddSupportSide = async (req,res,next) =>{
    const {supportSideTitle , supportSideUrl} = req.body
    const {id} = req.params

    const CertificateData = await Certificate.findById(id)
    if(!CertificateData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Certificate Not Found"
        })
    }
    if(!req.file){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Image is Required"
        })
    }
    const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${CertificateData.certificateImage.public_id}/${supportSideTitle}`
    })
    const supportSide =  SupportSide.create({
        supportSideTitle,supportSideUrl,
        Image:{
            secure_url,
            public_id
        },
        CertificateId:id
    })
    if(!supportSide){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Error in Support Side Education"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Support Side Added Successfully",
        data:supportSide
    })
}

// & ======================== Update supportSide ===========================
export const UpdateSupportSide = async (req,res,next)=>{
    const {id} = req.params
    const {supportSideTitle,supportSideUrl} = req.body

    const supportSideData = await SupportSide.findById(id)
    if(!supportSideData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Support Side Not Found"
        })
    }
    if(req.file){
        await CloudinaryConnection().uploader.destroy(supportSideData.Image.public_id)
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${supportSideData.CertificateId}/${supportSideTitle}`
        })
        supportSideData.Image.secure_url = secure_url
        supportSideData.Image.public_id = public_id
    }
    if(supportSideTitle && supportSideData.supportSideTitle!==supportSideTitle){
        supportSideData.supportSideTitle = supportSideTitle
    }
    if(supportSideUrl){
        supportSideData.supportSideUrl = supportSideUrl
    }


    
    const updatedSupportSide = await supportSideData.save()
    return res.status(200).json({
        status:200,
        success:true,
        message:"Support Side Updated Successfully",
        data:updatedSupportSide
    })
}
//&======================== Delete supportSide =========================
export const DeleteSupportSide = async(req,res,next)=>{
    const {id} = req.params;
    const supportSide = await SupportSide.findById(id)
    if(!supportSide){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Support Side Not Found"
        })
    }
    await CloudinaryConnection().uploader.destroy(supportSide.Image.public_id)
    await SupportSide.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"Support Side Deleted Successfully"
    })
}