
// taking form inputs values and checking them, returning array contains all errors
const checkValidation = (obj) => {
    const errArr = [];
    if (!checkRequired(obj)) { // checking if something is empty
        errArr.push("Fill all fields")
    }

    if(obj.email) {
        if (!checkEmail(obj.email)) { // if there is email, check its format
            errArr.push("Email wrong format")
        }
    }

    const dateToCheck = obj.date || obj.premiered // if there are any dates/premiered fields this will get their vals, if arent, it will be undefined
    if(dateToCheck) {
        if (!preventFutureDates(dateToCheck)) { 
            errArr.push("cannot set future date")
        }
    }

    if (obj.genres && obj.genres.length < 2){ // checking that there are at least 2 genres
        errArr.push(`add some genres (at least ${2-obj.genres.length} more)`)
    }
   
    return errArr;
}


const checkRequired = (obj) => {
    const objVals = Object.values(obj);
    return (!objVals.some(value => !value));
}

const checkEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const preventFutureDates = (date) => { // getting date input values
    const today = new Date();
    const selectedDate = new Date(date);
    return (today > selectedDate) // true = date is fine
}


 export {checkValidation}