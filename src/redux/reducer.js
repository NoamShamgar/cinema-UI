function reducer (state={},action) {

    switch (action.type) {
        case "LOGIN":
            sessionStorage.setItem("redux-backup",JSON.stringify(action.payload))
            return action.payload;
       
            case "LOGOUT":
                sessionStorage.removeItem("redux-backup")
            return {};

        default:
            return state
    }
}

export default reducer;