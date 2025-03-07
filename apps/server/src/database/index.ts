import { createClient, PostgrestResponse } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
const SUPABASE_URL = process.env.SUPABASE_URL as string;

const DATA_BASE = createClient(SUPABASE_URL, SUPABASE_KEY);

type DateBaseQueryParamsForGet = {
  table: string;
  method: "get";
  eq?: [string, unknown];
  limit?: number;
};
type DateBaseQueryParamsForAdd<T> = {
  table: string;
  method: "add";
  item: T;
};

type DateBaseQueryParams<T> =
  | DateBaseQueryParamsForGet
  | DateBaseQueryParamsForAdd<T>;

export const queryDatabase = async <T>(
  options: DateBaseQueryParams<T>
): Promise<PostgrestResponse<T> | null> => {
  const { method, table } = options;

  switch (method) {
    case "get":
      const { eq, limit } = options;
      let query = DATA_BASE.from(table).select("*");
      if (eq && eq.length === 2) {
        query = query.eq(eq[0], eq[1]);
      }
      if (limit) {
        query = query.limit(limit);
      }
      const getData: PostgrestResponse<T> = await query;
      return getData;

    case "add":
      const { item } = options;
      await DATA_BASE.from(table).insert(item);
      return null;

    default:
      return null;
  }
};
