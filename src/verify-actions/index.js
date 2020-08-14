import { required } from "./required";
import { pattern } from "./pattern";

export class VerifyActions {
  static required = required;
  static  pattern = pattern;

  static add(actions) {
    Object.assign(VerifyActions, actions);
  }
}
