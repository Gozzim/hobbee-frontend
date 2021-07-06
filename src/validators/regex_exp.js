// RFC 5322 Official Standard - Source: http://emailregex.com/
export const MAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PASS_REGEX = {
    WEAK: /^(?=.*[A-Z])(?=.*[a-z])((?=.*[^0-9a-zA-Z\s:])|(?=.*[0-9]))[\S]{6,32}$/, // 6+ chars with lower- and upper-case chars and 1+ number or special char
    MEDIUM: /^((?=.*[A-Z])(?=.*[a-z])((?=.*[^0-9a-zA-Z\s:])|(?=.*[0-9]))[\S]{10,32}|(?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9a-zA-Z\s:])(?=.*[0-9])[\S]{8,32})$/, // 10+ chars with lower-, upper-case chars, 1+ number or special char Or 8+ chars with all 4 categories
    STRONG: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9a-zA-Z\s:])(?=.*[0-9])[\S]{10,32}$/, // 10+ chars with all 4 categories
}
export const USERNAME_REGEX = /^[A-Za-z0-9\-_]{4,16}$/;
export const GROUPNAME_REGEX = /^\S((?!(\s|_|-){2})[a-zA-Z0-9\-_\x20]){4,16}\S$/;
