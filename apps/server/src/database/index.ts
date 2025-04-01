import {
  createClient,
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { NhostClient } from "@nhost/nhost-js";
import { TABLES_NAMES } from "../constants";

const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
const SUPABASE_URL = process.env.SUPABASE_URL as string;

const DATA_BASE = createClient(SUPABASE_URL, SUPABASE_KEY);

type DateBaseQueryParamsForGet = {
  table: TABLES_NAMES;
  method: "get";
  eq?: [string, unknown];
  limit?: number;
  select?: string;
};
type DateBaseQueryParamsForAdd<T> = {
  table: TABLES_NAMES;
  method: "add";
  item: T;
};
type DateBaseQueryParamsForUpdate<T> = {
  table: TABLES_NAMES;
  method: "update";
  items: T[];
};
type DateBaseQueryParamsForFind = {
  table: TABLES_NAMES;
  method: "find";
  column: string;
  search: { column: string; values: unknown[] };
};

type DateBaseQueryParams<T> =
  | DateBaseQueryParamsForGet
  | DateBaseQueryParamsForAdd<T>
  | DateBaseQueryParamsForFind
  | DateBaseQueryParamsForUpdate<T>;

type DateBaseQueryResponse<T> = Promise<
  PostgrestResponse<T> | null | PostgrestSingleResponse<T[]>
>;

export const queryDatabase = async <T>(
  options: DateBaseQueryParams<T>
): DateBaseQueryResponse<T> => {
  const { method, table } = options;

  switch (method) {
    case "get":
      const { eq, limit, select } = options;
      let query = DATA_BASE.from(table).select(select || "*");
      if (eq && eq.length === 2) {
        query = query.eq(eq[0], eq[1]);
      }
      if (limit) {
        query = query.limit(limit);
      }
      // @ts-ignore
      const getData: PostgrestResponse<T> = await query;
      return getData;

    case "add":
      const { item: addItem } = options;
      const addRes = await DATA_BASE.from(table).insert(addItem).select();
      return addRes as PostgrestResponse<T>;

    case "update":
      const { items: updateItems } = options;
      await DATA_BASE.from(table).upsert(updateItems);
      return null;

    case "find":
      const { column, search } = options;
      const data = await DATA_BASE.from(table)
        .select(column)
        .in(search.column, search.values)
        .order(search.column, { ascending: false });
      const orderedData = {
        ...data,
        data: search.values.map((value) =>
          // @ts-ignore
          data.data?.find((i) => i[search.column] === value)
        ),
      };
      return orderedData as PostgrestSingleResponse<T[]>;
    default:
      return null;
  }
};
