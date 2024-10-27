import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Button, Heading, HStack, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { CircleStop, Mic } from "lucide-react";
import TextDiff from "./TextDiff";

const SpellCheckPage = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [targetTranscript, setTargetTranscript] = React.useState<string>("");

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&rsquo;t support speech recognition.</span>;
  }

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="mb-5">
      <VStack marginTop={"10px"} marginBottom={"20px"}>
        <Heading size="lg" textTransform="uppercase">
          Spelling check
        </Heading>
      </VStack>
      <HStack flexWrap={"wrap"} gap={"30px"} alignItems={"flex-start"}>
        <VStack w={{ base: "100%", md: "50%" }} gap={"15px"} alignItems={"flex-start"}>
          <VStack gap={"10px"} alignItems={"flex-start"} w="full">
            <Heading size="lg">Target transcript</Heading>
            <Textarea
              width={"full"}
              rows={4}
              minH={"100px"}
              variant={"outline"}
              value={targetTranscript}
              onChange={(e) => setTargetTranscript(e.target.value)}
            />
          </VStack>
          <VStack gap={"10px"} alignItems={"flex-start"} w="full">
            <Heading size="lg">Speech to text</Heading>
            <Textarea width={"full"} rows={4} minH={"200px"} variant={"outline"} isReadOnly value={transcript} />
            {!listening ? (
              <Button
                colorScheme="blue"
                textTransform="uppercase"
                rightIcon={<Mic className="w-5 h-5" />}
                onClick={handleStartListening}
              >
                start recording
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                textTransform="uppercase"
                rightIcon={<CircleStop className="w-5 h-5" />}
                onClick={handleStopListening}
              >
                stop recording
              </Button>
            )}
          </VStack>
        </VStack>
        <div className="flex-1">
          <VStack gap={"10px"} alignItems={"flex-start"} w="full">
            <Heading size="lg">Comparision</Heading>
            <TextDiff text1={targetTranscript.toLowerCase()} text2={transcript.toLowerCase()} />
          </VStack>
        </div>
      </HStack>
    </div>
  );
};

export default SpellCheckPage;
