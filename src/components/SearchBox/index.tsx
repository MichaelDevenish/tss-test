import { TextField } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { documentFilterState } from "../../state/Documents";
import { useDebouncedCallback } from "use-debounce";

const SearchBox: React.FC = () => {
  const [filters, setFilters] = useRecoilState(documentFilterState);
  const [value, setValue] = useState<string>(filters.search ?? "");
  useEffect(() => {
    if (!filters.search) {
      setValue("");
    }
  }, [filters.search]);
  const setDebounced = useDebouncedCallback(
    (search) => setFilters({ ...filters, search }),
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
