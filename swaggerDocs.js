/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Create a short URL
 *     description: Create a new short URL to facilitate easy sharing of long URLs. This API will generate a concise link that redirects to the original URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 description: The original URL to be shortened.
 *                 example: "https://www.example.com"
 *               customAlias:
 *                 type: string
 *                 description: A custom alias for the short URL (if not provided, generate a unique one).
 *                 example: "my-custom-alias"
 *               topic:
 *                 type: string
 *                 description: A category under which the short URL is grouped.
 *                 example: "technology"
 *             required:
 *               - longUrl
 *     responses:
 *       200:
 *         description: A short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: The generated short URL
 *                   example: "https://advanced-url-shortener.onrender.com/api/shorten/my-custom-alias"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp indicating when the short URL was created.
 */

/**
 * @swagger
 * /api/shorten/{alias}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirect to the original URL based on the short URL alias, enabling seamless access to the long URL while tracking user engagement.
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the original long URL
 */

/**
 * @swagger
 * /api/analytics/{alias}:
 *   get:
 *     summary: Get URL analytics
 *     description: Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: URL analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClicks:
 *                   type: integer
 *                   description: Total number of times the short URL has been accessed.
 *                   example: 3
 *                 uniqueUsers:
 *                   type: integer
 *                   description: Number of unique users who accessed the short URL.
 *                   example: 1
 *                 clicksByDate:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2024-12-28
 *                       count:
 *                         type: integer
 *                         description: Number of clicks on that date.
 *                         example: 2
 *                 osType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       osName:
 *                         type: string
 *                         description: The name of the operating system.
 *                         example: Android
 *                       uniqueClicks:
 *                         type: integer
 *                         description: Number of unique clicks for that OS.
 *                         example: 3
 *                       uniqueUsers:
 *                         type: integer
 *                         description: Number of unique users for that OS.
 *                         example: 1
 *                 deviceType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       deviceName:
 *                         type: string
 *                         description: The type of device used.
 *                         example: mobile
 *                       uniqueClicks:
 *                         type: integer
 *                         description: Number of unique clicks for that device type.
 *                         example: 3
 *                       uniqueUsers:
 *                         type: integer
 *                         description: Number of unique users for that device type.
 *                         example: 1
 */

/**
 * @swagger
 * /api/analytics/topic/{topic}:
 *   get:
 *     summary: Get topic-based analytics
 *     description: Retrieve analytics for all short URLs grouped under a specific topic, allowing users to assess the performance of their links based on categories.
 *     parameters:
 *       - in: path
 *         name: topic
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic-based analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClicks:
 *                   type: integer
 *                   description: Total number of clicks across all URLs in the specified topic.
 *                   example: 2
 *                 uniqueUsers:
 *                   type: integer
 *                   description: Number of unique users who accessed URLs in the specified topic.
 *                   example: 1
 *                 clicksByDate:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2024-12-28
 *                       clicks:
 *                         type: integer
 *                         description: Total click counts for all URLs under the topic on that date.
 *                         example: 2
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       shortUrl:
 *                         type: string
 *                         description: The generated short URL.
 *                         example: "https://advanced-url-shortener.onrender.com/api/shorten/my-custom-alias"
 *                       totalClicks:
 *                         type: integer
 *                         description: Total number of clicks for the short URL.
 *                         example: 2
 *                       uniqueUsers:
 *                         type: integer
 *                         description: Number of unique users who accessed the short URL.
 *                         example: 1
 */

/**
 * @swagger
 * /api/analytics/overall:
 *   get:
 *     summary: Get overall analytics
 *     description: Retrieve overall analytics for all short URLs created by the authenticated user, providing a comprehensive view of their link performance.
 *     responses:
 *       200:
 *         description: Overall analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUrls:
 *                   type: integer
 *                   description: Total number of short URLs created by the user.
 *                   example: 2
 *                 totalClicks:
 *                   type: integer
 *                   description: Total number of clicks across all URLs created by the user.
 *                   example: 5
 *                 uniqueUsers:
 *                   type: integer
 *                   description: Total number of unique users who accessed any of the user's short URLs.
 *                   example: 2
 *                 clicksByDate:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2024-12-28
 *                       clicks:
 *                         type: integer
 *                         description: Total click counts for all URLs on that date.
 *                         example: 2
 *                 osType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       osName:
 *                         type: string
 *                         description: The name of the operating system.
 *                         example: Android
 *                       uniqueClicks:
 *                         type: integer
 *                         description: Number of unique clicks for that OS.
 *                         example: 3
 *                       uniqueUsers:
 *                         type: integer
 *                         description: Number of unique users for that OS.
 *                         example: 1
 *                 deviceType:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       deviceName:
 *                         type: string
 *                         description: The type of device used.
 *                         example: mobile
 *                       uniqueClicks:
 *                         type: integer
 *                         description: Number of unique clicks for that device type.
 *                         example: 3
 *                       uniqueUsers:
 *                         type: integer
 *                         description: Number of unique users for that device type.
 *                         example: 1
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth
 *     description: Redirect the user to Google's OAuth 2.0 login page.
 *     responses:
 *       302:
 *         description: Redirect to Google's OAuth 2.0 login page
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handle the callback from Google OAuth 2.0 and authenticate the user.
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The authorization code returned by Google.
 *     responses:
 *       200:
 *         description: User authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     responses:
 *       200:
 *         description: User profile
 */