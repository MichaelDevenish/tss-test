import { custom, nullable, string } from "@recoiljs/refine";
import { atom, selector } from "recoil";
import { syncEffect, urlSyncEffect } from "recoil-sync";
import { File, Folder, DocumentType } from "./types";

const documentStoreState = atom<Readonly<Array<File | Folder>>>({
  key: "DocumentStore",
  default: [],
  effects: [
    syncEffect({
      storeKey: "local",
      refine: custom((store: any) => (store?.length > 0 ? store : [])),
    }),
  ],
});

const documentSearchState = atom<Readonly<string | undefined>>({
  key: "DocumentSearch",
  default: undefined,
});

const documentParentState = atom<Readonly<string | null | undefined>>({
  key: "DocumentParent",
  default: null,
  effects: [
    urlSyncEffect({
      storeKey: "url",
      refine: nullable(string()),
      history: "push",
    }),
  ],
});

const filteredDocumentState = selector({
  key: "FilteredDocumentStore",
  get: ({ get }) => {
    const search = get(documentSearchState);
    const parentId = get(documentParentState);

    let list = get(documentStoreState);

    if (search && search !== "") {
      return list.filter((document) => document.name.startsWith(search!));
    }

    return list.filter((document) => (parentId ?? null) === document.parentId);
  },
});

const getTotals = (
  parentId: string,
  list: Readonly<Array<File | Folder>>,
  totals = { files: 0, folders: 0 }
): { files: number; folders: number } => {
  list.forEach((document) => {
    if (document.parentId === parentId) {
      document.type === DocumentType.FILE ? totals.files++ : totals.folders++;
      totals = getTotals(document.id, list, totals);
    }
  });

  return totals;
};

const documentAnalytics = selector({
  key: "DocumentAnalytics",
  get: ({ get }) => {
    const parentId = get(documentParentState);
    let list = get(documentStoreState);

    if (parentId) {
      return getTotals(parentId, list);
    }

    return list.reduce<{ files: number; folders: number }>(
      (acc, document) => {
        document.type === DocumentType.FILE ? acc.files++ : acc.folders++;
        return acc;
      },
      { files: 0, folders: 0 }
    );
  },
});

const getPath = (
  parentId: string,
  list: Readonly<Array<File | Folder>>,
  path: Array<File | Folder> = []
): Array<File | Folder> => {
  const parent = list.find((document) => document.id === parentId);

  if (parent) {
    path.unshift(parent);
    if (parent.parentId) {
      path = getPath(parent.parentId, list, path);
    }
  }

  return path;
};

const documentPath = selector({
  key: "DocumentPath",
  get: ({ get }) => {
    const parentId = get(documentParentState);
    let list = get(documentStoreState);

    if (!parentId) {
      return [];
    }

    return getPath(parentId, list);
  },
});

export {
  filteredDocumentState,
  documentParentState,
  documentSearchState,
  documentStoreState,
  documentAnalytics,
  documentPath,
};
export * from "./types";
