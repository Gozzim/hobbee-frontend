import { MAIL_REGEX, PASS_REGEX, USERNAME_REGEX } from "./regex_exp";

// Requires Email to be lower characters only.
export function isValidEmail(email) {
  return email && typeof email === "string" && MAIL_REGEX.test(email);
}

export function isValidPassword(pass) {
  return pass && typeof pass === "string" && PASS_REGEX.WEAK.test(pass);
}

export function isValidUsername(name) {
  return name && typeof name === "string" && USERNAME_REGEX.test(name);
}

export function getPasswordStrength(pass) {
  if (!pass || typeof pass !== "string") {
    return null;
  }

  if (PASS_REGEX.STRONG.test(pass)) {
    return 4;
  } else if (PASS_REGEX.MEDIUM.test(pass)) {
    return 3;
  } else if (PASS_REGEX.WEAK.test(pass)) {
    return 2;
  }
  return 1;
}
