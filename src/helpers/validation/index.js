/* ============================================================
  Validation Extensions using Vee-Validate 3x.
  Docs: https://logaretm.github.io/vee-validate/
============================================================ */

import { extend, configure } from "vee-validate"
import {
  required,
  min,
  email,
  numeric,
  digits,
  confirmed,
  regex
} from "vee-validate/dist/rules"

const config = {
  bails: true,
  skipOptional: true,
  mode: "aggressive",
  useConstraintAttrs: true
}

// Sets the options.
configure(config)

const rules = {
  required,
  min,
  numeric,
  email,
  minPassword: min,
  mobileNo: regex,
  abnNo: regex,
  bsbNo: regex,
  postCode: digits,
  confirmed,
  regex
}

const messages = {
  required: "This field is required.",
  mobileNo: "Mobile number must be valid.",
  email: "Please enter a valid email address.",
  numeric: "This field must only contain numbers.",
  postCode: "A postCode must only contain 4 numbers.",
  confirmed: "Your passwords do not match.",
  minPassword: "Password must be at least six characters.",
  abnNo: "Your ABN must be 11 digits.",
  bsbNo: "Your BSB must be 6 digits."
}

export default function ValidationRules() {
  for (let rule in rules) {
    extend(rule, {
      ...rules[rule],
      message: messages[rule]
    })
  }
}
