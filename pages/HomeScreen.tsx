import {
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";

import { useEffect, useMemo, useState } from "react";

import { EntryWithCategory } from "../types/entry";

import { Divider } from "../components/Divider";
import { StatisticPanel } from "../components/StatisticPanel";
import { EntryCard } from "../components/EntryCard";
import { PhIcon } from "../components/PhIcon";

import { useGoToEntryDetail } from "../hooks/useRoute";

import { useEntryStore } from "../stores/entry";

export const HomeScreen = () => {
  const entryList = useEntryStore((state) => state.entryList);
  const getEntryList = useEntryStore((state) => state.getEntryList);

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

  const goToEntryDetail = useGoToEntryDetail();
  return (
    <SafeAreaView className="flex flex-1">
      <View className="px-6  pb-4 gap-y-3 bg-neutral-950 flex-1 flex flex-col pt-12 overflow-hidden items-stretch">
        <StatisticPanel></StatisticPanel>
        <Divider type="primary"></Divider>

        <ScrollView className="space-y-4">
          {groupedEntryListByDate.map(({ date, entryList }) => (
            <EntryCard key={date} entryList={entryList} date={date}></EntryCard>
          ))}
        </ScrollView>

        <Divider type="primary"></Divider>

        <View className="flex flex-col items-center">
          <TouchableOpacity
            className="rounded-full bg-cookie-200 flex flex-row grow-0 w-fit shrink p-1"
            onPress={() => goToEntryDetail()}
          >
            <PhIcon
              name="Plus"
              color="#0a0a0a"
              weight="regular"
              size={24}
            ></PhIcon>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
