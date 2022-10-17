# MDN Scraper


MDN Scraper is a basic API to scrape basic details off of MDN Web Docs and present in a JSON format
.
## Installation

Clone the repository
```bash
git clone https://github.com/lejakewolf/mdn-scraper.git
```

Then just run the Express.JS server
```bash
node server.js
```

## Format

```json
{
  "title": string - Title of the document found
  "mdnURL": string - Link to the document on the official MDN Web Docs
  "syntax": string - Syntax of the searched query
  "description": string - Description of the searched query
  "extendedDescription?": string - Extended description of the searched query (can be null)
}
```