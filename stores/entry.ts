import { create } from "zustand";

import { supabase } from "../lib/supabaseClient";

import { Entry, EntryWithCategory } from "../types/entry";

type CreateEntryParams = Pick<
  Entry,
  "amount" | "category" | "property" | "type" | "created_at" | "remark"
>;

interface EntryState {
  entryList: EntryWithCategory[];
  getEntryList: () => void;

  selectedEntry: EntryWithCategory | null;
  setSelectedEntry: (entry: EntryWithCategory | null) => void;

  createEntry: (params: CreateEntryParams) => void;
}

export const useEntryStore = create<EntryState>((set) => ({
  entryList: [],
  getEntryList: async () => {
    try {
      const { data } = await supabase
        .from("entry")
        .select(
          `id,created_at,amount,type,property,remark,category (label,icon,id)`
        );
      console.log("🚀 ~ file: App.tsx:20 ~ getEntryList ~ data:", data);

      set({ entryList: data || [] });
    } catch (error) {
      console.log("🚀 ~ file: App.tsx:12 ~ getEntryList ~ error:", error);
    }
  },

  selectedEntry: null,
  setSelectedEntry: (entry: EntryWithCategory | null) => {
    set({ selectedEntry: entry });
  },

  createEntry: async (params) => {
    try {
      const res = await supabase.from("entry").insert(params);
      console.log("🚀 ~ file: entry.ts:44 ~ useEntryStore ~ res:", res);
      const { error } = res;
      if (error) {
        const { message, code } = error;
        throw new Error(code + "~" + message);
      }
    } catch (error) {
      console.log("🚀 ~ file: entry.ts:48 ~ useEntryStore ~ error:", error);
      throw error;
    }
  },
}));
