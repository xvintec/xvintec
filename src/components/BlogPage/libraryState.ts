// Shared by the server page (reading the URL) and the BlogLibrary client
// component. Kept out of the "use client" file: values exported from there
// reach server code as client references, not the actual objects.

export type SortKey = "new" | "old" | "az";

export type LibraryState = {
  q: string;
  tag: string; // "All" or a tag name
  sort: SortKey;
  page: number;
};

export const DEFAULT_STATE: LibraryState = {
  q: "",
  tag: "All",
  sort: "new",
  page: 1,
};

export const SORT_KEYS: SortKey[] = ["new", "old", "az"];
