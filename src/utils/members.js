import {getAllMembers_DAL,getMember_DAL,addMember_DAL,updateMember_DAL,deleteMember_DAL,getMemberSubscription_DAL} from "../DAL/members";

const getAllMembers_UTIL = async () => {
    return (await getAllMembers_DAL()).data;
}

const getMember_UTIL = async (id) => {
    try{
        let member = (await getMember_DAL(id)).data;
        delete member.__v
        return member;
   } catch(err) {
       return err;
   }
}

const addMember_UTIL = async (member) => {
    return (await addMember_DAL(member)).data;
}

const updateMember_UTIL = async (id,member) => {
    return (await updateMember_DAL(id,member)).data;
}

const deleteMember_UTIL = async (id) => {
    return (await deleteMember_DAL(id)).data;
}

const getMemberSubscription_UTIL = async (memberId) => {
    try{
        let subscription = (await getMemberSubscription_DAL(memberId)).data;
        delete subscription.__v
        return subscription;
   } catch(err) {
       console.log("in err");
       return err;
   }
}

export {getAllMembers_UTIL,getMember_UTIL,addMember_UTIL,updateMember_UTIL,deleteMember_UTIL,getMemberSubscription_UTIL}
