import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { useEffect, useState } from "react";

export function useQueryState<T extends ParsedUrlQueryInput>() {
  const router = useRouter();
  const [query, setQuery] = useState<T>(router.query as T);

  useEffect(() => {
    setQuery(router.query as T);
  }, [router.pathname, router.query]);

  const setQueryParams = (query: T) => {
    router.push({ pathname: router.pathname, query });
  };

  return [query, setQueryParams] as [typeof query, typeof setQueryParams];
}
