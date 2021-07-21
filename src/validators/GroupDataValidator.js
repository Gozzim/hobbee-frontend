import {GROUPNAME_REGEX} from "../shared/Constants";

export function isValidGroupname(name) {
    return name && typeof name === "string" && GROUPNAME_REGEX.test(name);
}