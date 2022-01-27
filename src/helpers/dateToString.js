
// a function that return today's date (or other date) with the right format that HTML5 date input excpects to
const dateToString = (date = new Date()) => {
    if (date === "") { // when updating a movie the first render sends empty string
        return "";
    }
    
    if (typeof date === "string"){ // if the date sent is a string
        date = new Date(date);
    }

    const year = date.getFullYear();
    let month = date.getMonth() +1;

    if (month < 10){ 
        month = "0"+month;
    }

    let day = date.getDate();
    if (day < 10){
        day = "0"+day;
    }

    return(`${year}-${month}-${day}`);
}

export default dateToString;