import { Button, HStack } from "@chakra-ui/react";

interface Props {
  currrentStep: number;
  onStepperChange: (index: number) => void;
}

const NextButtonAdmin = ({ onStepperChange, currrentStep }: Props) => {
  return (
    <HStack>
      <Button
      className="nextButton"
        marginTop={"10px"}
        _hover={{ 
            bgColor: "#000000",
            color: "white" }}
        onClick={() => {
          if (currrentStep < 4) {
            currrentStep += 1;
          }

          onStepperChange(currrentStep);
          window.scrollTo({ top: 50 });
        }}
        style={{
          fontFamily: "'Outfit', sans-serif", // Use the custom font
        }}
        //marginLeft={"0%"}
        marginBottom={{ base: "10%", md: "4%" }}
        letterSpacing={"3px"}
        borderRadius={"30px"}
        width={"100px"}
        height={"40px"}
        variant={"outline"}
        colorScheme="#092636"
        //bg={"#5588A3"}
        //bgGradient={"linear(to-b  , #5588A3, #092636)"}
        color={"#092636"}
        fontWeight={"500"}
        fontSize={"14"}
      >
        NEXT
        {/* {currrentStep == 2 ? "SUBMIT" : "NEXT"} */}
      </Button>
    </HStack>
  );
};

export default NextButtonAdmin;