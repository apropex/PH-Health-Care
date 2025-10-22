import OpenAI from "openai";
import _env from "..";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: _env.open_router_api,
  /*
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
  */
});

export default openai;
