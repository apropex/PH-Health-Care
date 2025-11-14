import * as React from "react";

export const inputValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setValue(e.target.value);
};
