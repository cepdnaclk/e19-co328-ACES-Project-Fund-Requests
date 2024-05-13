import { Button, HStack, Text } from "@chakra-ui/react";

interface Props {
  currrentStep: number;
  onStepperChange: (index: number) => void;
}

const NextButton = ({ onStepperChange, currrentStep }: Props) => {
  return (
    <HStack>
      <Button
        marginTop={"10px"}
        _hover={{ bgColor: "#5588A3" }}
        onClick={() => {
          if (currrentStep < 4) {
            currrentStep += 1;
          }

          onStepperChange(currrentStep);
          window.scrollTo({ top: 500 });
        }}
        style={{
          fontFamily: "'Outfit', sans-serif", // Use the custom font
        }}
        marginLeft={"10%"}
        marginBottom={{ base: "5%", md: "2%" }}
        letterSpacing={"5px"}
        borderRadius={"30px"}
        width={"149px"}
        height={"49px"}
        bgGradient={"linear(to-b  , #5588A3, #092636)"}
        color={"white"}
        fontWeight={"600"}
        fontSize={"18"}
      >
        {currrentStep == 2 ? "SUBMIT" : "NEXT"}
      </Button>
      <Text color={"#5588A3"} fontSize={"sm"}>
        {" "}
        Once you click "NEXT" you can't come back!
      </Text>
    </HStack>
  );
};

export default NextButton;
