/* eslint-disable @typescript-eslint/no-explicit-any */

export const makeFormData = (value: [string, any, string?, File?]): FormData => {
  const formData = new FormData();

  formData.append(value[0], JSON.stringify(value[1] ?? ""));
  if (value[2] && value[3]) {
    formData.append(value[2], value[3]);
  }

  return formData;
};
