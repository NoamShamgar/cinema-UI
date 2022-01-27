import appStore from "../redux/store";


export default function checkPermissions (required) {
    const loggerUserPerm = appStore.getState().permissions;
    return loggerUserPerm.includes(required) || loggerUserPerm.includes("sys-admin")
}

