export const HOBBEE_BROWN = "#32210B";
export const HOBBEE_ORANGE = "#E98F1C";
export const HOBBEE_YELLOW = "#FFCC00";
export const HOBBEE_CREAM = "#FFF3C2";
export const HOBBEE_BLUE = "#1CE9E3";

export const BUTTON_YELLOW = "#FFDB4D";
export const BUTTON_YELLOW_HOVER = "#FFF0B3";
export const BUTTON_RED = "#FF7D66";
export const BUTTON_RED_HOVER = "#FFD4CC";
export const PAPER_BLUE = "#EAFAF9";
export const RADIO_BUTTON_BLUE = "#17C2BC";
export const PAPER_CREAM = "#FFFAE6";

// RFC 5322 Official Standard - Source: http://emailregex.com/
export const MAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // prettier-ignore
export const PASS_REGEX = {
  WEAK: /^(?=.*[A-Z])(?=.*[a-z])((?=.*[^0-9a-zA-Z\s:])|(?=.*[0-9]))[\S]{6,32}$/, // prettier-ignore
  MEDIUM: /^((?=.*[A-Z])(?=.*[a-z])((?=.*[^0-9a-zA-Z\s:])|(?=.*[0-9]))[\S]{10,32}|(?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9a-zA-Z\s:])(?=.*[0-9])[\S]{8,32})$/, // prettier-ignore
  STRONG: /^((?=.*[A-Z])(?=.*[a-z])(?=.*[^0-9a-zA-Z\s:])(?=.*[0-9])[\S]{10,32}|(?=.*[A-Z])(?=.*[a-z])((?=.*[^0-9a-zA-Z\s:])|(?=.*[0-9]))[\S]{15,32})$/, // prettier-ignore
};
export const USERNAME_REGEX = /^[A-Za-z0-9\-_]{4,16}$/; // prettier-ignore
export const GROUPNAME_REGEX = /^\S((?!(\s|_|-){2})[a-zA-Z0-9\-_\x20]){2,22}\S$/; // prettier-ignore

export const ERRORS = {
  weakPassword:
    "Passwords must be at least 6 characters long, contain upper & lower case letters and at least one number or special character",
};

export const SUBSCRIPTION_PLAN = {
  elite: "P-62E82252FP3121819MDZR2EY",
  advanced: "P-6RW02432GE006263HMDZRZZY",
  standard: "P-0MA943175X946230LMDZRZSQ",
};

export const ASCII_BEE =
  "         `..`           ``         \n" +
  "        `.smo.`      `.:so.`       \n" +
  "        .+NNNy.`   `./hNNN+.       \n" +
  "       `.mNNNN/.  `-yNNNNNy.`      \n" +
  "       .:NNNNNy.``-hNNNNNNy.`      \n" +
  "    `` .:NNNNdo...yNNNNNNN/.  ```` \n" +
  "    .. `.dmy/:+s-:NNNNNNNy.:-...`` \n" +
  "    `.` ./:-+yhh-:mdmddms-/yy-.`   \n" +
  " `.` `.``.+syyyy+-::::-:-+syy+.`   \n" +
  " ``````..-osyyyyssshyyyyyhyyy+.`   \n" +
  "     `..oo+syysoosyyhhhhhhhyy:.    \n" +
  "      `.hhhhy/-..+yyyyhhhhhh+.`    \n" +
  "      `.yhhh+.-/+syyyyyhhhh+.`     \n" +
  "       .:hhhsohhyyyyyyyyhy:.`      \n" +
  "        .:yhs/:ohyyyyyso/.`        \n" +
  "         `.....ohhyo+/-.`          \n" +
  "           ````....```             \n";