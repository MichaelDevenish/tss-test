import { TextField } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { documentSearchState } from "../../state/Documents";
import { useDebouncedCallback } from "use-debounce";

const SearchBox: React.FC = () => {
  const [search, setSearch] = useRecoilState(documentSearchState);
  const [value, setValue] = useState<string>(search ?? "");
  useEffect(() => {
    if (!search) {
      setValue("");
    }
  }, [search]);
  const setDebounced = useDebouncedCallback(
    (search) => setSearch(search),
    1000
  );
  const setSearchText = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDebounced(event.target.value);
      setValue(event.target.value);
    },
    [setDebounced, setValue]
  );

  return (
    <TextField
      id="search"
      label="Search"
      value={value}
      fullWidth
      onChange={setSearchText}
    />
  );
};

export { SearchBox };
