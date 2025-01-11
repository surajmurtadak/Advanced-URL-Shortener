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

### 3. Get URL Analytics
**GET** `/api/analytics/{alias}`

Retrieve analytics for a specific short URL.

#### Parameters
- `alias` (path, string, required): The alias of the short URL.

#### Response
```json
{
  "totalClicks": 3,
  "uniqueUsers": 1,
  "clicksByDate": [
    { "date": "2024-12-28", "count": 2 }
  ],
  "osType": [
    { "osName": "Android", "uniqueClicks": 3, "uniqueUsers": 1 }
  ],
  "deviceType": [
    { "deviceName": "mobile", "uniqueClicks": 3, "uniqueUsers": 1 }
  ]
}
```

### 4. Get Topic-Based Analytics
**GET** `/api/analytics/topic/{topic}`

Retrieve analytics for all short URLs under a specific topic.

#### Parameters
- `topic` (path, string, required): The topic of the short URLs.

#### Response
```json
{
  "totalClicks": 2,
  "uniqueUsers": 1,
  "clicksByDate": [
    { "date": "2024-12-28", "clicks": 2 }
  ],
  "urls": [
    {
      "shortUrl": "https://advanced-url-shortener.onrender.com/api/shorten/my-custom-alias",
      "totalClicks": 2,
      "uniqueUsers": 1
    }
  ]
}
```

### 5. Get Overall Analytics
**GET** `/api/analytics/overall`

Retrieve overall analytics for all short URLs created by the authenticated user.

#### Response
```json
{
  "totalUrls": 2,
  "totalClicks": 5,
  "uniqueUsers": 2,
  "clicksByDate": [
    { "date": "2024-12-28", "clicks": 2 }
  ],
  "osType": [
    { "osName": "Android", "uniqueClicks": 3, "uniqueUsers": 1 }
  ],
  "deviceType": [
    { "deviceName": "mobile", "uniqueClicks": 3, "uniqueUsers": 1 }
  ]
}
```

### 6. Google OAuth Authentication
#### Initiate Google OAuth
**GET** `/auth/google`

Redirects the user to Google's OAuth 2.0 login page.

#### Response
- **302 Found**: Redirects to Google's OAuth 2.0 login page.

#### Google OAuth Callback
**GET** `/auth/google/callback`

Handles the callback from Google OAuth and authenticates the user.

#### Parameters
- `code` (query, string, required): The authorization code returned by Google.

#### Response
```json
{
  "user": {
    "id": "123",
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
}
```

### 7. Get User Profile
**GET** `/profile`

Retrieve the profile information of the authenticated user.

#### Response
- **200 OK**: User profile information.

