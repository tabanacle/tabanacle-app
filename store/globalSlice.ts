import { StateCreator } from "zustand";
import { GlobalStoreTypes } from "./storeTypes";

export const createGlobalSlice: StateCreator<GlobalStoreTypes> = (set) => ({
  accessTokenState: "idle",
});
