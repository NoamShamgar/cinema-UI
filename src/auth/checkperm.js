import appStore from "../redux/store";

// checking if a specific permission is exist
export default function checkPermissions (required) {
    const loggedInUserPerm = appStore.getState().permissions;
    return loggedInUserPerm.includes(required) || loggedInUserPerm.includes("sys-admin")
}

