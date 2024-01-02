import React, { createContext, useReducer, useState } from "react";

export const FormContext = createContext();

const initialState = {
  value: "",
  isValid: null,
};

const inputDataFormReducer = (state, action) => {
  if (action.type === "FULLNAME_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 3 };
  }
  if (action.type === "FULLNAME_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 3 };
  }
  if (action.type === "STREET_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 6 };
  }
  if (action.type === "STREET_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 6 };
  }
  if (action.type === "POSTALCODE_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 4 };
  }
  if (action.type === "POSTALCODE_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 4 };
  }
  if (action.type === "CITY_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 5 };
  }
  if (action.type === "CITY_BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 5 };
  }
  return { value: "", isValid: false };
};

export const FormContextProvider = (props) => {
  const [nameState, debounceName] = useReducer(
    inputDataFormReducer,
    initialState
  );
  const [streetState, debounceStreet] = useReducer(
    inputDataFormReducer,
    initialState
  );
  const [postalCodeState, debouncePostalCode] = useReducer(
    inputDataFormReducer,
    initialState
  );
  const [cityState, debounceCity] = useReducer(
    inputDataFormReducer,
    initialState
  );
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const nameChangeHandler = (e) => {
    debounceName({ type: "FULLNAME_INPUT", val: e.target.value });
    setIsFormValid(
      e.target.value.trim().length >= 5 &&
        streetState.isValid &&
        postalCodeState.isValid &&
        cityState.isValid
    );
  };

  const validateName = () => {
    debounceName({ type: "FULLNAME_BLUR" });
    if (!nameState.isValid) {
      setIsFormValid(false);
      setError("Name is unvalid! Type valid name.");
    } else {
      setError(false);
    }
  };

  const streetChangeHandler = (e) => {
    debounceStreet({ type: "STREET_INPUT", val: e.target.value });
    setIsFormValid(
      nameState.isValid &&
        e.target.value.trim().length > 6 &&
        postalCodeState.isValid &&
        cityState.isValid
    );
  };

  const validateStreet = () => {
    debounceStreet({ type: "STREET_BLUR" });
    if (!streetState.isValid) {
      setError("Street is not valid! Provide valid street!");
    } else {
      setError(false);
    }
  };

  const postalCodeChangeHandler = (e) => {
    debouncePostalCode({ type: "POSTALCODE_INPUT", val: e.target.value });

    setIsFormValid(
      nameState.isValid &&
        streetState.isValid &&
        e.target.value.trim().length >= 4 &&
        cityState.isValid
    );
  };

  const validatePostalCode = () => {
    debouncePostalCode({ type: "POSTALCODE_BLUR" });
    if (!postalCodeState.isValid) {
      setError("Postal code is invalid!");
    } else {
      setError(false);
    }
  };

  const cityChangeHandler = (e) => {
    debounceCity({ type: "CITY_INPUT", val: e.target.value });
    setIsFormValid(
      nameState.isValid &&
        streetState.isValid &&
        postalCodeState.isValid &&
        e.target.value.trim().length >= 4
    );
  };

  const validateCity = () => {
    debounceCity({ type: "CITY_BLUR" });
    if (!cityState.isValid) {
      setError("City name is invalid!");
    } else {
      setError(false);
    }
  };

  const validationClassesName =
    nameState.isValid === false
      ? "input input-bordered w-full max-w-xs outline outline-2 outline-red-600 focus:outline-none"
      : "input input-bordered w-full max-w-xs focus:outline-none";
  const validationClassesStreet =
    streetState.isValid === false
      ? "input input-bordered w-full max-w-xs outline outline-2 outline-red-600 focus:outline-none"
      : "input input-bordered w-full max-w-xs focus:outline-none";
  const validationClassesPostal =
    postalCodeState.isValid === false
      ? "input input-bordered w-full max-w-xs outline outline-2 outline-red-600 focus:outline-none"
      : "input input-bordered w-full max-w-xs focus:outline-none";
  const validationClassesCity =
    cityState.isValid === false
      ? "input input-bordered w-full max-w-xs outline outline-2 outline-red-600 focus:outline-none"
      : "input input-bordered w-full max-w-xs focus:outline-none";

  return (
    <FormContext.Provider
      value={{
        nameState,
        error,
        validateName,
        nameChangeHandler,
        isFormValid,
        streetState,
        postalCodeState,
        cityState,
        streetChangeHandler,
        validateStreet,
        postalCodeChangeHandler,
        validatePostalCode,
        cityChangeHandler,
        validateCity,
        validationClassesCity,
        validationClassesName,
        validationClassesPostal,
        validationClassesStreet,
        debounceCity,
        debounceName,
        debouncePostalCode,
        debounceStreet,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
