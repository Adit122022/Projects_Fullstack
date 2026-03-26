import axios from 'axios';
import * as cheerio from 'cheerio';
import pdf from 'pdf-parse';

export async function extractContent(url: string, type: string) {
  switch (type) {
    case 'article':
      return extractArticle(url);
    case 'tweet':
      return extractTweet(url);
    case 'video':
      return extractVideo(url);
    case 'pdf':
      return extractPDF(url);
    default:
      return extractGeneric(url);
  }
}

async function extractArticle(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // Remove unwanted elements
  $('script, style, nav, footer, iframe').remove();

  const title = $('title').text() || 
                $('h1').first().text() || 
                $('meta[property="og:title"]').attr('content') || 
                url;

  const content = $('article').text() || 
                  $('main').text() || 
                  $('body').text();

  const metadata = {
    domain: new URL(url).hostname,
    author: $('meta[name="author"]').attr('content'),
    thumbnail: $('meta[property="og:image"]').attr('content'),
    publishedDate: $('meta[property="article:published_time"]').attr('content'),
    wordCount: content.split(/\s+/).length
  };

  return {
    title: title.trim(),
    content: content.trim().substring(0, 10000), // Limit content
    metadata
  };
}

async function extractTweet(url: string) {
  // For production, use Twitter API
  // This is a simplified version
  return {
    title: 'Tweet',
    content: url,
    metadata: {
      domain: 'twitter.com'
    }
  };
}

async function extractVideo(url: string) {
  // YouTube video extraction
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    
    return {
      title: `YouTube Video ${videoId}`,
      content: url,
      metadata: {
        domain: 'youtube.com',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      }
    };
  }

  return extractGeneric(url);
}

async function extractPDF(url: string) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  const pdfData = await pdf(data);

  return {
    title: pdfData.info?.Title || 'PDF Document',
    content: pdfData.text.substring(0, 10000),
    metadata: {
      domain: new URL(url).hostname,
      wordCount: pdfData.text.split(/\s+/).length
    }
  };
}

async function extractGeneric(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  return {
    title: $('title').text() || url,
    content: $('body').text().substring(0, 1000),
    metadata: {
      domain: new URL(url).hostname
    }
  };
}