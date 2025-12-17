import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TimePicker = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <View style={styles.pickerRow}>
      <View style={styles.pickerCol}>
        <Picker
          selectedValue={hour}
          onValueChange={setHour}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <Picker.Item key={i} label={pad2(i)} value={i} />
          ))}
        </Picker>
        <View pointerEvents="none" style={styles.pickerSuffix}>
          <Text style={styles.pickerSuffixText}>小时</Text>
        </View>
      </View>
      <View style={styles.pickerCol}>
        <Picker
          selectedValue={minute}
          onValueChange={setMinute}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <Picker.Item key={i} label={pad2(i)} value={i} />
          ))}
        </Picker>
        <View pointerEvents="none" style={styles.pickerSuffix}>
          <Text style={styles.pickerSuffixText}>分钟</Text>
        </View>
      </View>
      <View style={styles.pickerCol}>
        <Picker
          selectedValue={second}
          onValueChange={setSecond}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <Picker.Item key={i} label={pad2(i)} value={i} />
          ))}
        </Picker>
        <View pointerEvents="none" style={styles.pickerSuffix}>
          <Text style={styles.pickerSuffixText}>秒</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerRow: {
    flexDirection: "row",
    position: "relative",
    marginHorizontal: -18,
    // backgroundColor: 'blue', // 测试用
  },
  pickerCol: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
  },
  picker: {
    flex: 2,
    // backgroundColor: 'skyblue', // 测试用
  },
  pickerItem: {
    color: "#BBBBBD",
    fontSize: 18,
    fontWeight: '800',
    alignItems: "flex-end",
  },
  pickerSuffix: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: 'pink', // 测试用
  },
  pickerSuffixText: {
    color: "#f6f6f6ff",
    fontSize: 18,
    fontWeight: 600,
  },
});

export default TimePicker;
