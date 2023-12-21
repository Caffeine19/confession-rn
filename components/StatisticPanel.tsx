import React, { useState, Fragment } from "react";
import { Text, View } from "react-native";

import { Divider } from "./Divider";

export const StatisticPanel = () => {
  const [statisticOptions] = useState([
    { label: "Expense", value: 4710.27 },
    { label: "Income", value: 1232.39 },
    { label: "Saving", value: 281.27 },
  ]);

  return (
    <View className="bg-cookie-200 rounded-xl px-6 py-3 flex items-stretch flex-row justify-between">
      {statisticOptions.map((statistic, index) => (
        <Fragment key={index}>
          <View>
            <Text className="dark:text-neutral-600 text-base font-medium">
              {statistic.label}
            </Text>
            <Text className="dark:text-neutral-950 text-xl font-bold">
              {statistic.value}
            </Text>
          </View>
          {index !== statisticOptions.length - 1 &&
            (() => <Divider type="secondary" direction="vertical"></Divider>)()}
        </Fragment>
      ))}
    </View>
  );
};
