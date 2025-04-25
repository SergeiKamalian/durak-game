import { v4 as uuidv4 } from "uuid";

export function generateRoomId(): string {
  const length = 6;
  const digitsOnly = uuidv4().replace(/\D/g, "");
  let code = digitsOnly;
  while (code.length < length) {
    code += uuidv4().replace(/\D/g, "");
  }
  return code.slice(0, length);
}
