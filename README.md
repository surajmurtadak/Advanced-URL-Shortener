# Advanced URL Shortener API

The **Advanced URL Shortener API** provides functionality for creating and managing short URLs, retrieving analytics, and authenticating users using Google OAuth. Below is a detailed guide to the API endpoints and their functionality.

## Endpoints

### 1. Create a Short URL
**POST** `/api/shorten`

Create a new short URL for sharing long URLs easily.

#### Request Body
```json
{
  "longUrl": "https://www.example.com",
  "customAlias": "my-custom-alias",
  "topic": "technology"
}
```

#### Response
```json
{
  "shortUrl": "https://advanced-url-shortener.onrender.com/api/shorten/my-custom-alias",
  "createdAt": "2024-12-28T12:34:56Z"
}
```

### 2. Redirect to Original URL
**GET** `/api/shorten/{alias}`

Redirects to the original URL based on the short URL alias.

#### Parameters
- `alias` (path, string, required): The alias of the short URL.

#### Response
- **302 Found**: Redirects to the original long URL.

