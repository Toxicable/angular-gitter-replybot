import * as marked from 'marked';
import * as cheerio from 'cheerio';


export function getTextOutsideCodeBlocks(message: string): any {
  const tokens = marked.lexer(message);
  const strippedTokens = tokens.filter(token => token.type !== 'code');
  strippedTokens['links'] = tokens['links'];
  const html = marked.parser(strippedTokens);
  return cheerio.load(html).root().text();
}

