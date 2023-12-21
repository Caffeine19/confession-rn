import { View, Text, ScrollView } from "react-native";

import { useEffect, useMemo, useState } from "react";

import { Divider } from "./components/Divider";
import { StatisticPanel } from "./components/StatisticPanel";

import { supabase } from "./lib/supabaseClient";
import { EntryWithCategory } from "./types/entry";

export default function App() {
  const [entryList, setEntryList] = useState<EntryWithCategory[]>([]);

  const getEntryList = async () => {
    try {
      const { data } = await supabase
        .from("entry")
        .select(
          `id,created_at,amount,type,property,remark,category (label,icon,id)`
        );
      console.log("🚀 ~ file: App.tsx:20 ~ getEntryList ~ data:", data);

      setEntryList(data || []);
    } catch (error) {
      console.log("🚀 ~ file: App.tsx:12 ~ getEntryList ~ error:", error);
    }
  };

  const groupedEntryListByDate = useMemo(
    () =>
      Object.entries(
        entryList.reduce((acc, cur) => {
          const date = new Date(cur.created_at).toLocaleDateString();
          acc[date] = acc[date] || [];
          acc[date].push(cur);
          return acc;
        }, {} as Record<string, EntryWithCategory[]>)
      ).map(([date, entryList]) => {
        return {
          date,
          entryList,
        };
      }),
    [entryList]
  );

  useEffect(() => {
    getEntryList();
  }, []);

  return (
    <View className="p-6 gap-y-4 bg-neutral-950 flex-1 flex flex-col pt-12 overflow-hidden">
      <StatisticPanel></StatisticPanel>
      <Divider type="primary"></Divider>

      <ScrollView>
        {groupedEntryListByDate.map(({ date, entryList }) => (
          <View key={date}>
            <View className="space-y-2">
              <Text className="text-neutral-100 text-lg font-normal">
                {date}
              </Text>
              <View>
                {entryList.map((entry) => (
                  <View className="flex justify-between items-center flex-row">
                    <View className="flex flex-row items-center gap-2">
                      <View></View>
                      <Text className="text-neutral-100 text-lg font-normal">
                        {entry.category?.label}
                      </Text>
                    </View>

                    <Text
                      className={
                        (entry.type === "output"
                          ? "text-guilty-400"
                          : "text-yokatta-300") +
                        " " +
                        "text-base font-normal"
                      }
                    >
                      {(entry.type === "output" ? "-" : "+") +
                        (entry.amount / 100).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
