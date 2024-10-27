import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Button, Heading, HStack, Input, Text, VStack, Image, Box, Grid } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const LearnThroughImagesPage = () => {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const textInputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isModelLoading, setIsModelLoading] = React.useState(false);
  const [model, setModel] = React.useState<mobilenet.MobileNet | null>(null);
  const [history, setHistory] = React.useState<string[]>([]);
  const [imageURL, setImageURL] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<
    | {
        className: string;
        probability: number;
      }[]
    | undefined
  >([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value);
    setResults([]);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files!.length > 0) {
      const url = URL.createObjectURL(files![0]);
      setImageURL(url);
    } else {
      setImageURL(null);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  React.useEffect(() => {
    if (imageURL && !history.includes(imageURL)) {
      setHistory([imageURL, ...history]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL]);

  React.useEffect(() => {
    loadModel();
  }, []);

  const identify = async () => {
    if (isModelLoading) return;
    textInputRef.current!.value = "";
    const results = await model?.classify(imageRef.current!);
    setResults(results);
    console.log(results);
  };

  return (
    <div>
      <VStack marginTop={"10px"} marginBottom={"20px"}>
        <Heading size="lg" textTransform="uppercase">
          Image identification
        </Heading>
      </VStack>
      <div className="flex flex-wrap gap-3 items-center">
        <div>
          <input
            type="file"
            accept="image/*"
            className="w-0 h-0 hidden opacity-0"
            onChange={uploadImage}
            ref={fileInputRef}
          />
          <Button colorScheme="blue" onClick={triggerUpload}>
            Upload Image
          </Button>
        </div>
        <Text fontWeight="medium">OR</Text>
        <Input placeholder="Paste image URL" className="max-w-[450px]" ref={textInputRef} onChange={handleOnChange} />
      </div>
      {imageURL && (
        <div>
          <VStack alignItems={"flex-start"} gap={"20px"} marginTop={"12px"} marginBottom={"6px"}>
            <VStack alignItems={"flex-start"}>
              <Box>
                <Image
                  src={imageURL}
                  alt="Upload Preview"
                  ref={imageRef}
                  width={"full"}
                  height={"400px"}
                  objectFit={"cover"}
                />
              </Box>
              <Button colorScheme="blue" onClick={identify} isLoading={isModelLoading}>
                {isModelLoading ? "Model Loading..." : "Identify image"}
              </Button>
            </VStack>
            {results && results.length > 0 && (
              <VStack gap="10px" alignItems={"flex-start"}>
                {results.map((result, index) => {
                  // Splitting className by ","
                  const classNames = result.className.split(",");

                  return (
                    <VStack
                      alignItems={"flex-start"}
                      padding={"10px"}
                      borderWidth="1px"
                      borderColor={"#333"}
                      width={"full"}
                      key={result.className}
                      bg={index === 0 ? "#333" : "transparent"}
                      color={index === 0 ? "white" : "#333"}
                    >
                      <HStack flexWrap={"wrap"} alignItems={"flex-start"}>
                        {classNames.map((className, i) => (
                          <Link
                            to={`/dictionary?q=${className.trim()}`}
                            target="_blank"
                            key={i}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <Heading
                              fontSize={"xl"}
                              textTransform={"uppercase"}
                              display={"inline-block"}
                              _hover={{ color: index === 0 ? "yellow" : "blue" }}
                            >
                              {className.trim()}
                              {i !== classNames.length - 1 && ", "}
                            </Heading>
                          </Link>
                        ))}
                      </HStack>
                      <span className="confidence">
                        Confidence level: {(result.probability * 100).toFixed(2)}%{" "}
                        {index === 0 && <span className="bg-white text-[#333] px-1">Best Guess</span>}
                      </span>
                    </VStack>
                  );
                })}
              </VStack>
            )}
          </VStack>
        </div>
      )}
      {history.length > 0 && (
        <VStack
          marginTop={"30px"}
          bg={"blue.200"}
          paddingX={"10px"}
          paddingY={"20px"}
          gap={"10px"}
          alignItems={"flex-start"}
        >
          <Heading size={"lg"}>Recent images</Heading>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(5, 1fr)" }} gap={"0px"}>
            {history.map((image, index) => {
              return (
                <div key={`${image}${index}`}>
                  <img
                    src={image}
                    alt="Recent Prediction"
                    onClick={() => setImageURL(image)}
                    className="h-[200px] w-full object-cover cursor-pointer"
                  />
                </div>
              );
            })}
          </Grid>
        </VStack>
      )}
    </div>
  );
};

export default LearnThroughImagesPage;
