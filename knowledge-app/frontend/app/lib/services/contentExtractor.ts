import axios from "axios";
import * as cheerio from "cheerio";

export async function extractContent(url: string, type: string) {
  try {
    switch (type) {
      case "article":
        return await extractArticle(url);
      case "video":
        return await extractVideo(url);
      default:
        return await extractGeneric(url);
    }
  } catch (error) {
    console.error("Extraction error:", error);
    return {
      title: url,
      content: "",
      metadata: { domain: new URL(url).hostname },
    };
  }
}

async function extractArticle(url: string) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    timeout: 10000,
  });

  const $ = cheerio.load(data);
  $("script, style, nav, footer, iframe, ads").remove();

  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text() ||
    $("h1").first().text() ||
    url;

  const content =
    $("article").text() ||
    $('[role="main"]').text() ||
    $("main").text() ||
    $("body").text();

  const cleanContent = content.replace(/\s+/g, " ").trim().substring(0, 10000);

  const metadata = {
    domain: new URL(url).hostname,
    author:
      $('meta[name="author"]').attr("content") || $('[rel="author"]').text(),
    thumbnail: $('meta[property="og:image"]').attr("content"),
    publishedDate: $('meta[property="article:published_time"]').attr("content"),
    wordCount: cleanContent.split(/\s+/).length,
  };

  return {
    title: title.trim(),
    content: cleanContent,
    metadata,
  };
}

async function extractVideo(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    )?.[1];

    // YouTube title fetch karne ke liye
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title =
      $('meta[property="og:title"]').attr("content") || `YouTube Video`;

    return {
      title,
      content: title,
      metadata: {
        domain: "youtube.com",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId,
      },
    };
  }

  return extractGeneric(url);
}

async function extractGeneric(url: string) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    timeout: 10000,
  });

  const $ = cheerio.load(data);

  return {
    title: $("title").text() || url,
    content: $("body").text().substring(0, 1000),
    metadata: {
      domain: new URL(url).hostname,
      thumbnail: $('meta[property="og:image"]').attr("content"),
    },
  };
}
