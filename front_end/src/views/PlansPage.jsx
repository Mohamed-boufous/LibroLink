import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../styles/CreditCard.css";
import { Input } from "@/components/ui/input";
import valid from "card-validator";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PlanCard from "@/components/PlanCard";
import { axiosClient } from "@/api/axios";
import { useStateContext } from "@/context/ContextProvider";
import { useNavigate } from "react-router-dom";
function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.number);

  creditCard.expirationDate = valid.expirationDate(values.expiry);
  creditCard.cvv = valid.cvv(values.cvc);
  creditCard.cardholderName = valid.cardholderName(values.name);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "An unknown error occured. Please try again later";
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvv = false;
  errors.cardValid = true;
  //Card CVV expiration
  if (values.cvc === null || !values.cvc.trim()) {
    errors.message = "Credit card CVC is not complete";
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = "Credit card CVC is invalid";
    errors.cardValid = false;
  }

  //Card Expiration Verification
  if (values.expiry === null || !values.expiry.trim()) {
    errors.message = "Credit card expiration date is not complete";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "Credit card expiration date is invalid";
    errors.cardValid = false;
  }

  //Card Number Verification
  if (values.number === null || !values.number.trim()) {
    errors.message = "Credit card number is not complete";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "Credit card number is invalid";
    errors.cardValid = false;
  }

  //Cardholder Name Verification
  if (values.name === null || !values.name.trim()) {
    errors.message = "Cardholder name is not complete";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "Cardholder name is invalid";
    errors.cardValid = false;
  }

  if (errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
    errors.variant = "success";
    errors.message = "Credit Card is valid";
  }

  return errors;
}
const PlansPage = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [errors, setErrors] = useState({});
  const [offer, setOffer] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const { currentUser,setCurrentUser } = useStateContext();
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let err = validateInfo(state);
    setErrors(err);
    console.log(err.cardValid);
    if (err.cardValid) {
      const formData = {
        cardName: state.name,
        cardNumber: state.number,
        expiry: state.expiry,
        cvv: state.cvc,
        offer: offer,
      };

      console.log(formData);
      console.log(currentUser.id);
       axiosClient.post(`/api/subscribe/${currentUser.id}`, formData).then((res) => {
        console.log(res.data);
        setCurrentUser( { ...currentUser, is_subscribed: 1 });
        navigate(-1);
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-[88.2vh] p-16">
        <div className="flex w-full justify-center h-full space-x-5">
          <div className=" grid grid-cols-2 grid-rows-2 gap-3">
            <PlanCard
              price={119}
              period="1"
              offer={offer}
              setOffer={setOffer}
            />
            <PlanCard
              price={299}
              period="3"
              offer={offer}
              setOffer={setOffer}
            />
            <PlanCard
              price={538}
              period="6"
              offer={offer}
              setOffer={setOffer}
            />
            <PlanCard
              price={989}
              period="12"
              offer={offer}
              setOffer={setOffer}
            />
          </div>
          <div
            className={` flex flex-col justify-around items-center space-y-16 bg-white w-1/3 p-3 rounded-md border`}
          >
            {/* Display card preview component here (if applicable) */}
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none"
                />
                {!errors.cname && submitClicked && (
                  <p className="text-red-500 text-xs italic">
                    Cardholder name is invalid
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className=" w-full appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none"
                />
                {!errors.cnumber && submitClicked && (
                  <p className="text-red-500 text-xs italic">
                    Credit card number is invalid
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <Input
                  type="number"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none w-full" // Ensure full width for expiry
                />
                <Input
                  type="number"
                  name="cvc"
                  placeholder="CVC"
                  maxLength={3}
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="appearance-none px-3 py-2 border border-gray-300 rounded focus:outline-none w-full" // Ensure full width for CVC
                />
              </div>
              <div className="flex justify-between">
                {!errors.cexp && submitClicked && (
                  <p className="text-red-500 text-xs italic">
                    Credit card expiration date is invalid
                  </p>
                )}
                {!errors.ccvv && submitClicked && (
                  <p className="text-red-500 text-xs italic">
                    Credit card CVC is invalid
                  </p>
                )}
              </div>
              <Button
                type="submit"
                onClick={() => setSubmitClicked(true)}
                className=" bg-green-500 w-full text-white py-2 px-4  disabled:cursor-not-allowed rounded-md hover:bg-green-600 disabled:bg-green-500  focus:outline-none"
                {...{ disabled: offer === null }}
              >
                {offer ? "Subscribe Now" : "Choose A Plan First"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlansPage;
/* import React from "react";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PlanCard from "@/components/PlanCard";
export default function PlansPage() {
  return (
    <>
      <div className="flex justify-around mt-10 ">
        <PlanCard price={119} period='1' />
        <PlanCard price={299} period='3'/>
        <PlanCard price={592} period='6'/>
        <PlanCard price={999} period='12'/>
      </div>
    </>
  );
}
 */
