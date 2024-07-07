import DirectEducation from "../../../DB/models/directEducation.model.js"
import Certificate from "../../../DB/models/Certificate.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"

// & ===================================== Add  DirectEducation ===========================
export const AddDirectEducation = async (req,res,next) =>{
    const {directEducationTitle,directEducationURL} = req.body
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
        folder:`${CertificateData.certificateImage.public_id}/${directEducationTitle}`
    })
    const directEducation =  DirectEducation.create({
        directEducationTitle,
        directEducationURL,
        Image:{
            secure_url,
            public_id
        },
        CertificateId:id
    })
    if(!directEducation){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Error in Add Direct Education"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Direct Education Added Successfully",
        data:directEducation
    })
}

// & ===================================== Update  DirectEducation ===========================
export const UpdateDirectEducation = async (req,res,next)=>{
    const {id} = req.params
    const {directEducationTitle,directEducationURL} = req.body

    const directEducationData = await DirectEducation.findById(id)
    if(!directEducationData){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Direct Education Not Found"
        })
    }
    if(req.file){
        await CloudinaryConnection().uploader.destroy(directEducationData.Image.public_id)
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
             folder:`${CertificateData.certificateImage.public_id}/${directEducationTitle}`
        })
        directEducationData.Image.secure_url = secure_url
        directEducationData.Image.public_id = public_id
    }
    if(directEducationTitle && directEducationData.directEducationTitle!==directEducationTitle){
        directEducationData.directEducationTitle = directEducationTitle
    }
    if(directEducationURL && directEducationData.directEducationURL!==directEducationURL){
        directEducationData.directEducationURL = directEducationURL
    }
    const updatedDirectEducation = await directEducationData.save()
    if(!updatedDirectEducation){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Error in Update Direct Education"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Direct Education Updated Successfully",
        data:updatedDirectEducation
    })
}

// & ===================================== Delete  DirectEducation ===========================
export const DeleteDirectEducation = async(req,res,next)=>{
    const {id} = req.params
    const directEducation = await DirectEducation.findById(id)
    if(!directEducation){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Direct Education Not Found"
        })
    }
    await CloudinaryConnection().uploader.destroy(directEducation.Image.public_id)
    await DirectEducation.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"Direct Education Deleted Successfully"
    })
}