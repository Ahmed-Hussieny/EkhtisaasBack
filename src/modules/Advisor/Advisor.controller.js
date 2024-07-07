import Advisor from "../../../DB/models/Advisor.model.js"
import CloudinaryConnection from "../../utils/cloudinary.js"

//& ======================= Add Advisor ===============================
export const AddAdvisor = async (req,res,next)=>{
    const {name,Description,ExperienceInYears,experienceDescription,
        contentcareer,PriceOfCareerCounselingSession,
        email,linkedIn,X,website,Rate} = req.body

        const isAdvisorExist = await Advisor.findOne({email})
        if(isAdvisorExist){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Advisor already exist"
            })
        }
        if(!req.file){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Image is Required"
            })
        }
        const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/Advisors/${name}`
        })
        const newAdvisor =  Advisor.create({
            name,
            Image:{
            secure_url,
            public_id
        },
            Description,
            ExperienceInYears,
            experienceDescription,
            contentcareer,
            PriceOfCareerCounselingSession,
            email,
            linkedIn,
            X,
            website,
            Rate
        })
    
    if(!newAdvisor){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Failed to Add Advisor"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Advisor Added Successfully",
        data:newAdvisor
    })
}

//& ============================== update Advisor =========================
export const updateAdvisor =async (req,res,next)=>{
    const {id} = req.params
    const {name,Description,ExperienceInYears,experienceDescription,
        contentcareer,PriceOfCareerCounselingSession,
        email,linkedIn,X,website,Rate} = req.body

        const advisor = await Advisor.findById(id)
        if(!advisor){
            return res.status(400).json({
                success:false,
                status:400,
                message:"Advisor Not Found"
            })
        }
        if(name){
            advisor.name = name
        }
        if(Description){
            advisor.Description = Description
        }
        if(ExperienceInYears){
            advisor.ExperienceInYears = ExperienceInYears
        }
        if(experienceDescription){
            advisor.experienceDescription = experienceDescription
        }
        if(contentcareer){
            advisor.contentcareer = contentcareer
        }
        if(PriceOfCareerCounselingSession){
            advisor.PriceOfCareerCounselingSession = PriceOfCareerCounselingSession
        }
        if(email){
            advisor.email = email
        }
        if(linkedIn){
            advisor.linkedIn = linkedIn
        }
        if(X){
            advisor.X = X
        }
        if(website){
            advisor.website = website
        }
        if(Rate){
            advisor.Rate = Rate
        }
        if(req.file){
            await CloudinaryConnection().uploader.destroy(advisor.Image.public_id)
            const { secure_url, public_id } = await CloudinaryConnection().uploader.upload(req.file.path,{
                folder:`${process.env.MAIN_FOLDER}/Advisors/${name}`
            })
            advisor.Image = {
                secure_url,
                public_id
            }
        }
        const updatedAdvisor = await advisor.save()
        return res.status(200).json({
            status:200,
            success:true,
            message:"Advisor Updated Successfully",
            data:updatedAdvisor
        })
}

//& ========================== delete Advisor =============================
export const DeleteAdvisor = async(req,res,next)=>{
    const {id} = req.params;
    const advisor = await Advisor.findById(id)
    if(!advisor){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Advisor Not Found"
        })
    }
    await CloudinaryConnection().uploader.destroy(advisor.Image.public_id)
    await Advisor.findByIdAndDelete(id)
    return res.status(200).json({
        status:200,
        success:true,
        message:"Advisor Deleted Successfully"
    })
}
// & ===================== Get All Advisors =============================
export const GetAllAdvisors = async(req,res,next)=>{
    const advisors = await Advisor.find()
    if(!advisors){
        return res.status(400).json({
            status:400,
            success:false,
            message:"No Advisors Found"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"All Advisors",
        data:advisors
    })
}

//&=================== Get Single Advisors ============================
export const GetSingleAdvisor = async(req,res,next)=>{
    const {id} = req.params
    const advisor = await Advisor.findById(id)
    if(!advisor){
        return res.status(400).json({
            status:400,
            success:false,
            message:"Advisor Not Found"
        })
    }
    return res.status(200).json({
        status:200,
        success:true,
        message:"Single Advisor",
        data:advisor
    })
}
