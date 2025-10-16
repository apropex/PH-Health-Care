//

export const defaultZodError = ({ input, expected }: any) =>
  input ? `invalid type, expected ${expected}` : "Field is required";
