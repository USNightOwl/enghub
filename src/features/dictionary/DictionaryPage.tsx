import SearchBar from "@/components/search-bar/SearchBar";
import WordResult from "@/components/word-result/WordResult";
import { searchWord } from "@/config/api/dictionary/apiDictionary";
import { IWord, IWordNotFound } from "@/types/dictionary";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";

const DictionaryPage = () => {
  const [searchParams] = useSearchParams();
  const [word, setWord] = React.useState<string>("");
  const [wordFound, setWordFound] = React.useState<IWord[]>();
  const [wordNotFound, setWordNotFound] = React.useState<IWordNotFound>();

  React.useEffect(() => {
    if (!searchParams.has("q")) return;
    setWord(searchParams.get("q")!);
    // handle search words
    searchWord(searchParams!.get("q")!)
      .then((res: AxiosResponse) => {
        setWordFound(res.data as IWord[]);
        setWordNotFound(undefined);
      })
      .catch((err) => {
        console.log(err);
        setWordFound(undefined);
        setWordNotFound({
          title: "No Definitions Found",
          message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
          resolution: "You can try the search again at later time or head to the web instead",
        } as IWordNotFound);
      });
  }, [searchParams]);

  return (
    <>
      <VStack>
        <Heading size="lg" textTransform="uppercase">
          Dictionary
        </Heading>
      </VStack>
      <HStack justifyContent="center" marginY="15px">
        <SearchBar word={word} />
      </HStack>
      <WordResult wordFound={wordFound} wordNotFound={wordNotFound} />
    </>
  );
};

export default DictionaryPage;
