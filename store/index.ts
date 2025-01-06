import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createGlobalSlice } from "./globalSlice";
import { GlobalStoreTypes } from "./storeTypes";

// eslint-disable-next-line import/prefer-default-export
export const useAppStore = create<GlobalStoreTypes>()(
  devtools((...allStore) => ({
    ...createGlobalSlice(...allStore),
  }))
);
