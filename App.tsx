import { View } from "react-native";

import { Divider } from "./components/Divider";
import { StatisticPanel } from "./components/StatisticPanel";

export default function App() {
  return (
    <View className="p-6 gap-4 bg-neutral-950 flex-1 flex flex-col pt-12">
      <StatisticPanel></StatisticPanel>
      <Divider type="primary"></Divider>
    </View>
  );
}
