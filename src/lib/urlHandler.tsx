import got from "got";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function scrap_data(url: string) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  const html = await got(url).text();
  const $ = cheerio.load(html);

  const title =
    $("title").text().trim() ||
    $('meta[property="og:title"]').attr("content") ||
    "Undefined Title";

  const description =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    "Undefined Description";

  const image =
    $('meta[property="og:image"]').attr("content") ||
    $("img").first().attr("src");

  const logo =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href");

  const makeAbsoluteUrl = (relativeUrl: string | undefined) => {
    if (!relativeUrl) return "Undefined";
    try {
      return new URL(relativeUrl, url).href;
    } catch {
      return relativeUrl;
    }
  };

  return {
    title,
    description,
    image: makeAbsoluteUrl(image),
    logo: makeAbsoluteUrl(logo),
  };
}

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, 
// });

export async function categorise(
    url: string,
    record: { title?: string; description?: string },
    categories: string[]
    ) {
    const default_categories = ['Facebook', 'Youtube', 'Others', 'X']
    // const all_categories = [...default_categories, ...categories];
    const all_categories = default_categories;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
        You are a classifier.  
        URL: ${url}  
        Title: ${record.title || "N/A"}  
        Description: ${record.description || "N/A"}  

        Choose the **single most relevant** category from this list:  
        ${all_categories.join(", ")}

        Return ONLY the category name.
    `;

    // const response = await openai.responses.create({
    //     model: "gpt-4.1-mini",
    //     input: prompt,
    // });

    const result = await model.generateContent(prompt);

    const category = result.response.text();
    return category || "Others";
}

function getHostname(url : string) {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    let hostname = new URL(url).hostname;
    if (hostname.startsWith("www.")) hostname = hostname.slice(4);
    return hostname;
  } catch {
    return "";
  }
}


