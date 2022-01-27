import {getAllMovies_DAL,getAllMoviesWithMembersWatched_DAL,getMovie_DAL,addMovie_DAL,updateMovie_DAL,deleteMovie_DAL} from "../DAL/movies";

const getAllMovies_UTIL = async () => {
    return (await getAllMovies_DAL()).data;
}

const getAllMoviesWithMembersWatched_UTIL = async () => {
    return (await getAllMoviesWithMembersWatched_DAL()).data;
}

const getMovie_UTIL = async (id) => {
    try{
         let movie = (await getMovie_DAL(id)).data;
         delete movie.__v
         return movie;
    } catch(err) {
        console.log("in err");
        return err;
    }
}

const addMovie_UTIL = async (movies) => {
    return (await addMovie_DAL(movies)).data;
}

const updateMovie_UTIL = async (id,movies) => {
    return (await updateMovie_DAL(id,movies)).data;
}

const deleteMovie_UTIL = async (id) => {
    return (await deleteMovie_DAL(id)).data;
}

export {getAllMovies_UTIL,getAllMoviesWithMembersWatched_UTIL,getMovie_UTIL,addMovie_UTIL,updateMovie_UTIL,deleteMovie_UTIL}
