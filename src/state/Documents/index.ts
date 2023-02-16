import { atom, selector } from "recoil";
import { File, Folder } from "./types";

const documentStoreState = atom<Array<File | Folder>>({
  key: "DocumentStore",
  default: [],
});

const documentFilterState = atom<{ search?: string; parentId?: string }>({
  key: "DocumentFilter",
  default: { search: undefined, parentId: undefined },
});

const filteredDocumentState = selector({
  key: "FilteredDocumentStore",
  get: ({ get }) => {
    const filter = get(documentFilterState);
    let list = get(documentStoreState);

    if (filter.search && filter.search !== "") {
      return list.filter((document) =>
        document.name.startsWith(filter.search!)
      );
    }

    if (filter.parentId) {
      list = list.filter((document) => filter.parentId === document.parentId);
    }

    return list;
  },
});

export { filteredDocumentState, documentFilterState, documentStoreState };
export * from "./types";
