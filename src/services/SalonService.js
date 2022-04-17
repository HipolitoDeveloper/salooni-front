import Parse from "parse/react-native";
import { buildSalonObject } from "../factory/SalonFactory";
import { convertToObj } from "../common/converters/GenericConverter";
import { handleError } from "../common/HandleError";

export const SalonObject = Parse.Object.extend("salon");

export const saveSalonParse = async (salonObj) => {
  const { salonName, cnpj, employeeQt } = salonObj;

  const newSalon = new SalonObject();
  newSalon.set("name", salonName);
  newSalon.set("cnpj", cnpj);
  newSalon.set("employee_qt", employeeQt);

  try {
    const savedSalon = await newSalon.save();
    return buildSalonObject(convertToObj(savedSalon));

  } catch (e) {
    throw e;
  }
};

export const updateSalonParse = async (salonObj) => {
  const { id, name, cnpj } = salonObj;

  const newSalon = new SalonObject({ objectId: id });
  newSalon.set("name", name);
  newSalon.set("cnpj", cnpj);

  try {
    const savedSalon = await newSalon.save();
    return buildSalonObject(convertToObj(savedSalon));

  } catch (e) {
    throw e;
  }
};

export const getSalonById = async (salonId) => {
  const SalonQuery = new Parse.Query(SalonObject);
  SalonQuery.equalTo("objectId", salonId);

  try {
    const salon = await SalonQuery.first();
    return buildSalonObject(convertToObj(salon));

  } catch (e) {
    throw e;
  }
};
