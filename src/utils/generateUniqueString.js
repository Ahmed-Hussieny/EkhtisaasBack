import { customAlphabet } from "nanoid"

const generateUniqueString = (length) =>{
    const nanoId = customAlphabet("123456asdfgh",length | 13);
    return nanoId()
}


export const generateUniqueOtp= (length) =>{
    const nanoId = customAlphabet("123456789",length | 4);
    return nanoId()
}

export default generateUniqueString;