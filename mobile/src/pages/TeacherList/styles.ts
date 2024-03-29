import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f7",
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },

  input: {
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBlock: {
    width: "48%",
  },

  timeButton: {
    backgroundColor: "#fff",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  submit: {
    backgroundColor: "#04d361",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
  },

  warningAdvice: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textWarningAdvice: {
    fontSize: 26,
    flex: 1,
    fontFamily: "Archivo_700Bold",
    color: "#a8a8a8",
  },
});

export default styles;
