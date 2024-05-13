import { useState } from "react";
import "../App.css";
import FormSection1 from "../components/FormSection1";
import Header from "../components/Header";
import Description from "../components/Description";
import FormStepper from "../components/FormStepper";
import { useSteps } from "@chakra-ui/react";

import NextButton from "../components/NextButton";
import FormSection3 from "../components/FormSection3";
import FormSection4 from "../components/FormSection4";
import FormSection2 from "../components/FormSection2";
import ReviewSection from "../components/ReviewSection";

import QualifiedSection from "../components/QualifiedSection";
import FooterSection from "../components/FooterSection";
import DeniedSection from "../components/DeniedSection";
import FundRequest from "../classes/fund_request";

import { DUserTokenInterface } from "../models/TokenMoodel";
import { PreviousRequest } from "../models/PreviousRequest";

interface Props {
  previousRequest: PreviousRequest | null;
  userToken: DUserTokenInterface | null;
}

function StudentHome({ previousRequest, userToken }: Props) {
  // const [count, setCount] = useState(0);

  const [requestObject, setRequestObject] = useState<FundRequest | null>(null);

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitted2, setIsSubmitted2] = useState(false);
  const [isSubmitted3, setIsSubmitted3] = useState(false);
  const [finish, setFinish] = useState(false);

  let formElements = [
    <FormSection1
      userToken={userToken}
      onSetRequestObject={(requestobj: FundRequest) => {
        setRequestObject(requestobj);
      }}
      requestObject={requestObject}
      submitStatus={isSubmitted}
      onSubmit={(status) => {
        setIsSubmitted(status);
      }}
    ></FormSection1>,
    <FormSection2
      onSetRequestObject={(requestobj: FundRequest) => {
        setRequestObject(requestobj);
      }}
      requestObject={requestObject}
      onSubmit={(status) => {
        setIsSubmitted2(status);
      }}
    ></FormSection2>,
    <FormSection3
      onSetRequestObject={(requestobj: FundRequest) => {
        setRequestObject(requestobj);
      }}
      requestObject={requestObject}
      onFinalSubmit={(status) => {
        setIsSubmitted3(status);
      }}
      onFinish={(finishingStatus) => {
        setFinish(finishingStatus);
      }}
    ></FormSection3>,

    // <FormSection4></FormSection4>,
  ];

  function updateFormSection(index: number) {
    console.log(formElements[index]);
    return formElements[index];
  }

  if (previousRequest != null) {
    return (
      <>
        {" "}
        <Header></Header>
        <ReviewSection
          requestObject={requestObject}
          previousRequest={previousRequest}
          userToken={userToken}
        ></ReviewSection>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <Description></Description>
      {/* This is the way to create the changing stepper */}
      <FormStepper currentStep={activeStep}></FormStepper>
      {updateFormSection(activeStep)}
      {/* <FormSection1></FormSection1> */}
      {(isSubmitted && activeStep == 0) || (isSubmitted2 && activeStep == 1) ? (
        <NextButton
          currrentStep={activeStep}
          onStepperChange={(index) => {
            setActiveStep(index);
            console.log("index: " + index);
          }}
        ></NextButton>
      ) : null}
      {isSubmitted3 && activeStep == 2 ? (
        <ReviewSection
          requestObject={requestObject}
          previousRequest={previousRequest}
          userToken={userToken}
        ></ReviewSection>
      ) : null}
      {/* {activeStep == 2 ? <QualifiedSection></QualifiedSection> : null} */}
      {/* {activeStep == 2 ? <DeniedSection></DeniedSection> : null} */}
      <FooterSection></FooterSection>
    </>
  );
}

export default StudentHome;
