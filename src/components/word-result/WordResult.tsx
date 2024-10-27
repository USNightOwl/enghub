import { Volume2 } from "lucide-react";
import { Box, Code, Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { IWord, IWordNotFound } from "@/types/dictionary";

type Props = {
  wordFound: IWord[] | undefined;
  wordNotFound: IWordNotFound | undefined;
};

const WordResult = ({ wordFound, wordNotFound }: Props) => {
  return (
    <>
      {wordFound && (
        <>
          <VStack alignItems="flex-start" gap="0px">
            <Heading marginY="5px">{wordFound[0].word}</Heading>
            {wordFound[0].phonetics
              .filter((e) => e.audio != "")
              .map((phonetic, index) => (
                <HStack key={`sound${index}`} alignItems="center" gap="16px">
                  <IconButton
                    aria-label="audio button"
                    icon={<Volume2 className="text-cyan-800" />}
                    bg="transparent"
                    _hover={{ bg: "rgba(0, 0, 0, 0.04)" }}
                    onClick={() => new Audio(phonetic.audio).play()}
                  />
                  <Text>
                    <Code fontSize="1em">{phonetic.text}</Code>
                  </Text>
                </HStack>
              ))}
          </VStack>
          {wordFound.map((wordFound, index) => (
            <VStack key={index} gap={"32px"} alignItems="flex-start" marginTop={"20px"}>
              {wordFound.meanings.map((meaning, index) => (
                <VStack key={`meaning${index}`} gap={"16px"} alignItems="flex-start">
                  <Heading size="lg" color={"blue.900"}>
                    {meaning.partOfSpeech}
                  </Heading>
                  {meaning.definitions.map((definition, index) => (
                    <Box key={`definition${index}`} gap={"16px"}>
                      <Text>{definition.definition}</Text>
                      {definition.example && (
                        <HStack alignItems={"flex-start"}>
                          <Text fontWeight="bold" color="blue.900">
                            Example:
                          </Text>
                          <Text>{definition.example}</Text>
                        </HStack>
                      )}
                    </Box>
                  ))}
                </VStack>
              ))}
            </VStack>
          ))}
        </>
      )}
      {wordNotFound && (
        <VStack alignItems="flex-start" gap={"10px"} marginY={"40px"}>
          <Heading variant="h1">{wordNotFound.title}</Heading>
          <VStack alignItems="flex-start" gap={"4px"}>
            <Text variant="subtitle1">{wordNotFound.message}</Text>
            <Text variant="subtitle1">{wordNotFound.resolution}</Text>
          </VStack>
        </VStack>
      )}
    </>
  );
};

export default WordResult;