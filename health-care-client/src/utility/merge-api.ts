//

export default function mergeApi(...apis: (string | number)[]): string {
  const givenLink = apis.join("/");
  const baseLink = process.env.NEXT_PUBLIC_API_URL;

  if (!baseLink) {
    throw new Error("Base API URL is not defined in environment variables.");
  }

  return `${baseLink}${givenLink}`;
}
