import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";

const Checkout = (props) => {
  const {
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
  } = useContext(FormContext);

  const handleFormData = (e) => {
    e.preventDefault();

    const customersData = {
      fullname: nameState.value,
      street: streetState.value,
      postalCode: postalCodeState.value,
      city: cityState.value,
    };
    props.customerInfo(customersData);

    debounceName({ type: "FULLNAME_INPUT", val: "" });
    debounceStreet({ type: "STREET_INPUT", val: "" });
    debouncePostalCode({ tpye: "POSTALCODE_INPUT", val: "" });
    debounceCity({ type: "CITY_INPUT", val: "" });
    isFormValid;
  };

  return (
    <div className="outline outline-2 outline-gray-200 rounded-lg p-5">
      <form>
        <div className="font-semibold text-xl text-red-600">{error}</div>
        <label htmlFor="fullname" className="block my-3">
          FullName:
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="Fullname..."
          value={nameState.value}
          onChange={nameChangeHandler}
          onBlur={validateName}
          className={validationClassesName}
        />
        <label htmlFor="street" className="block my-3">
          Street:
        </label>
        <input
          type="text"
          id="street"
          placeholder="Street..."
          value={streetState.value}
          onChange={streetChangeHandler}
          onBlur={validateStreet}
          className={validationClassesStreet}
        />
        <label htmlFor="postal" className="block my-3">
          Postal code:
        </label>
        <input
          type="text"
          id="postal"
          placeholder="Postal code.."
          value={postalCodeState.value}
          onChange={postalCodeChangeHandler}
          onBlur={validatePostalCode}
          className={validationClassesPostal}
        />
        <label htmlFor="city" className="block my-3">
          City:
        </label>
        <input
          type="text"
          id="city"
          placeholder="City..."
          value={cityState.value}
          onChange={cityChangeHandler}
          onBlur={validateCity}
          className={validationClassesCity}
        />
        <label htmlFor="my-modal-6" className="btn btn-secondary">
          Close
        </label>
        {isFormValid && (
          <button className="btn btn-primary mt-3" onClick={handleFormData}>
            Purchase
          </button>
        )}
      </form>
    </div>
  );
};

export default Checkout;
