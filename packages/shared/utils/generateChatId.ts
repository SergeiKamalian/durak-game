const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
import { v5 as uuidv5 } from "uuid";

export function getChatId(id1: number, id2: number): string {
  const sortedIds = [id1, id2].sort().join(NAMESPACE);
  return uuidv5(sortedIds, NAMESPACE);
}
