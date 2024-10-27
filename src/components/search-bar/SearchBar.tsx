import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  word: string;
};

const SearchBar = ({ word }: Props) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState(word);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dictionary?q=" + searchText);
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex justify-center">
      <InputGroup width={{ base: "full", md: "400px" }}>
        <Input
          pr="4.5rem"
          placeholder="Search dictionary"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            w="3rem"
            size="sm"
            bgColor="transparent"
            _hover={{ bg: "rgba(0, 0,0, 0.04)" }}
            aria-label="Search dictionary"
            icon={<Search className="w-5 h-5" />}
            type="submit"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
