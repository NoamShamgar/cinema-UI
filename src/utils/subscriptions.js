import {getAllSubscriptions_DAL,getSubscription_DAL,addSubscription_DAL,updateSubscription_DAL,deleteSubscription_DAL,addMovieToSubscription_DAL} from "../DAL/subscriptions";

const getAllSubscriptions_UTIL = async () => {
    return (await getAllSubscriptions_DAL()).data;
}

const getSubscription_UTIL = async (id) => {
    return (await getSubscription_DAL(id)).data;
}

const addSubscription_UTIL = async (subscription) => {
    return (await addSubscription_DAL(subscription)).data;
}

const updateSubscription_UTIL = async (id,subscription) => {
    return (await updateSubscription_DAL(id,subscription)).data;
}

const deleteSubscription_UTIL = async (id) => {
    return (await deleteSubscription_DAL(id)).data;
}

const addMovieToSubscription_UTIL = async (id,subscription) => {
    return (await addMovieToSubscription_DAL(id,subscription)).data;
}

export {getAllSubscriptions_UTIL,getSubscription_UTIL,addSubscription_UTIL,updateSubscription_UTIL,deleteSubscription_UTIL,addMovieToSubscription_UTIL}
