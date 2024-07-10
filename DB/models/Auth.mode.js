import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your First Name"],
    },
    userName: {
        type: String,
        required: [true, "Please provide your Last Name"],
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your Email"]
    },
    password: {
        type: String,
        required: [true, "Please provide your Password"]
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin'],
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['online', 'offline']
    },
    EducationalLevel: {
        type: String,
        required:true,
        enum: ["المرحلة الثانوية" ,
                "مرحلة الدبلوم",
                "مرحلة البكالوريوس",
                "مرحلة الماجستير" ,
                "مرحلة الدكتوراه",]
    },
    Verified: {
        type: Boolean,
        default: false
    },
    Specialization: {
        type: String,
        required:true,
        enum: ["الاتصالات و تقنية المعلومات",
                "إدارة الأعمال",
                "الهندسة",
                "الموارد البشرية",
                "المحاسبة والإدارة المالية",
                "المشتريات وسلاسل الإمداد",
                "العلوم",
                "العلوم الصحية",
                "التأمين وإدارة المخاطر",
                "الصحة والسلامة المهنية",
                "التصميم",
                "الإرشاد المهني",
                "الزراعة وعلوم الأغذية",
                "السياحة والفندقة",
                "العلاقات العامة والإعلام",
                "القانون والحوكمة والالتزام",
                "اللغات والترجمة",
                "العلوم الاجتماعية",
                "نظم المعلومات الجغرافية",]
    },
    EmploymentStatus: {
        type: String,
        required:true,
        enum: ["موظف",
            "باحث عن عمل",
            "طالب",]
    },
    JobTitle: {
        type: String,
        required:true
    },
    otp:{
        type:String
    },
    countOfVisitors:{
        type: Number,
    }
}, {
    timestamps: true
})


const Auth = model('Auth', AuthSchema);
export default Auth