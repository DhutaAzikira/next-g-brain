export type APIProps = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit;
  cache?: RequestCache
  next?: RequestInit["next"];
};
