import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../context/theme-provider/ThemeProvider";

const CustomCalendar = ({ screenHeight, tasks = {}, startDate, endDate, selectedDayTrigger }) => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const { theme } = useTheme();

  const handleDateRange = () => {
    const marks = {};
    if (startDate && endDate) {
      const range = {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      };
      const start = new Date(range.start);
      const end = new Date(range.end);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0];
        marks[dateString] = {
          color: dateString === range.start || dateString === range.end ? theme.gradientPurple : theme.gradientRangeInside,
          textColor: "#fff",
          customStyle: dateString === range.start ? "start" : dateString === range.end ? "end" : "inRange",
        };
      }
    }
    return marks;
  };

  const markedDates = useMemo(() => {
    const marks = handleDateRange();
    Object.keys(tasks).forEach((date) => {
      let colors = [];
      if (tasks[date].includes("done")) colors.push(theme.done);
      if (tasks[date].includes("due")) colors.push(theme.due);
      if (tasks[date].includes("rejected")) colors.push(theme.rejected);

      marks[date] = { colors, selected: date === selectedDate };
    });
    return marks;
  }, [tasks, selectedDate]);

  const renderDayComponent = ({ date, marking, _state }) => {
    const isToday = today === date.dateString;
    const isTodayOrSelected = isToday || date.dateString === selectedDate;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(date.dateString);
          selectedDayTrigger(date.dateString);
        }}
      >
        <LinearGradient
          colors={
            isTodayOrSelected
              ? [theme.gradientPurple, theme.gradientBlack]
              : marking?.customStyle
              ? [theme.gradientRangeStart, theme.gradientRangeEnd]
              : ["transparent", "transparent"]
          }
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={[styles.selectedDayContainer, { shadowColor: theme.gradientPurple }]}
        >
          <Text style={{ color: theme.softText }}>{date.day}</Text>
          <View style={styles.lineContainer}>
            {marking?.colors?.map((color, index) => (
              <View key={index} style={[styles.line, { backgroundColor: color }]} />
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.calendarContainer, { backgroundColor: theme.background, maxHeight: screenHeight / 2 }]}>
      <Calendar
        current={today}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markingType="custom"
        markedDates={markedDates}
        dayComponent={renderDayComponent}
        theme={{
          backgroundColor: theme.backgroundLevel2,
          calendarBackground: theme.backgroundLevel2,
          textSectionTitleColor: theme.headerText,
          dayTextColor: theme.softText,
          textDisabledColor: theme.secondaryText,
          arrowColor: theme.text,
          monthTextColor: theme.text,
          indicatorColor: theme.text,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 10,
  },
  selectedDayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  dayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
  },
  lineContainer: {
    flexDirection: "column",
    marginTop: 3,
  },
  line: {
    width: 20,
    height: 3,
    marginVertical: 1,
    borderRadius: 1,
  },
});

export default CustomCalendar;
