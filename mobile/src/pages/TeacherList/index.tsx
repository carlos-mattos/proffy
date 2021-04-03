import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import {
  BorderlessButton,
  RectButton,
  ScrollView,
} from "react-native-gesture-handler";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import styles from "./styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

export default function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState(null);
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [show, setShow] = useState(false);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  function handleDateTimePickerModal(
    event: Event,
    selectedDate: Date | undefined
  ) {
    if (event.type === "set") {
      setShow(Platform.OS === "ios");

      const hour = ("0" + selectedDate?.getHours()).slice(-2);
      const minutes = ("0" + selectedDate?.getMinutes()).slice(-2);
      const formattedHour = hour + ":" + minutes;
      setTime(formattedHour);
    }
    setShow(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <RNPickerSelect
              onValueChange={(value) => setSubject(value)}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return (
                  <Ionicons
                    family={"Ionicons"}
                    name="chevron-down-outline"
                    style={styleSelect.icon}
                    size={20}
                  />
                );
              }}
              value={subject}
              style={{ ...styleSelect }}
              items={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educação física", label: "Educação física" },
                { value: "Física", label: "Física" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
              ]}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <RNPickerSelect
                  onValueChange={(value) => setWeekDay(value)}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return (
                      <Ionicons
                        family={"Ionicons"}
                        name="chevron-down-outline"
                        style={styleSelect.icon}
                        size={20}
                      />
                    );
                  }}
                  value={week_day}
                  style={{ ...styleSelect }}
                  items={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quinta-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Qual o horário</Text>
                <RectButton
                  style={styles.timeButton}
                  onPress={() => setShow(true)}
                >
                  <Feather name="clock" size={20} color="#000" />
                </RectButton>
                {show && (
                  <DateTimePicker
                    testID="datetimepicker"
                    onChange={handleDateTimePickerModal}
                    minuteInterval={1}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    value={new Date()}
                  />
                )}
              </View>
            </View>
            <RectButton onPress={handleFiltersSubmit} style={styles.submit}>
              <Text style={styles.submitText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styleSelect = StyleSheet.create({
  inputIOS: {
    height: 54,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "#ebebeb",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },

  inputAndroid: {
    height: 54,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "#ebebeb",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    flexDirection: "row",
  },

  icon: {
    top: 20,
    right: 5,
  },
});
