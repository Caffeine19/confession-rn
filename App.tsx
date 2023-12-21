import { View, Text, ScrollView } from "react-native";

import { useEffect, useMemo, useState } from "react";

import * as Icon from "phosphor-react-native";

import { Divider } from "./components/Divider";
import { StatisticPanel } from "./components/StatisticPanel";

import { supabase } from "./lib/supabaseClient";

import { EntryWithCategory } from "./types/entry";
import { Category } from "./types/category";

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

      <ScrollView className="space-y-4">
        {groupedEntryListByDate.map(({ date, entryList }) => (
          <EntryCard key={date} entryList={entryList} date={date}></EntryCard>
        ))}
      </ScrollView>
    </View>
  );
}

interface EntryCardProps {
  date: string;
  entryList: EntryWithCategory[];
}

const EntryCard: React.FC<EntryCardProps> = ({ date, entryList }) => {
  return (
    <View>
      <View className="space-y-2">
        <Text className="text-neutral-100 text-lg font-normal">{date}</Text>
        <View className="rounded-lg bg-neutral-900">
          {entryList.map((entry, index) => (
            <View
              className={
                "flex justify-between items-center flex-row  py-3 px-3 " +
                (index === entryList.length - 1
                  ? ""
                  : "border-neutral-800 border-b")
              }
              key={entry.id}
            >
              <View className="flex flex-row items-center gap-2">
                <View className="rounded-full bg-cookie-200 flex flex-row items-center justify-center p-1">
                  <PhIcon
                    name={convertIconNameFromIconLabel(
                      entry.category?.icon || ""
                    )}
                  ></PhIcon>
                </View>
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
  );
};

const convertIconNameFromIconLabel = (str: Category["icon"]) => {
  return str
    .split("-")
    .slice(1)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("") as PhIconName;
};

type PhIconName = keyof typeof Icon;

// 'ph-piggy-bank'=>'PiggyBank'
const getIcon = (name: PhIconName) =>
  Icon[name]({ size: 24, color: "#0a0a0a", weight: "fill" });

interface PhIconProps {
  name: PhIconName;
}

const PhIcon: React.FC<PhIconProps> = ({ name }) => getIcon(name);
