# Spotify Integration Setup Guide

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the details:
   - App name: "Portfolio Now Playing"
   - App description: "Display currently playing track on portfolio"
   - Website: Your portfolio URL
   - Redirect URI: `http://localhost:3000/api/spotify/callback` (for development)
5. Save the app

## Step 2: Get Your Credentials

After creating the app, you'll get:

- **Client ID**: Copy this from the app dashboard
- **Client Secret**: Click "Show Client Secret" and copy it

## Step 3: Get a Refresh Token

### Option A: Use the Spotify Token Generator (Easiest)

1. Go to [Spotify Token Generator](https://github.com/spotify/web-api-auth-examples)
2. Clone the repository and run the authorization flow
3. Follow the instructions to get your refresh token

### Option B: Manual Setup

1. Create a simple HTML file with this content:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Spotify Auth</title>
  </head>
  <body>
    <script>
      const clientId = "YOUR_CLIENT_ID";
      const redirectUri = "http://localhost:3000/api/spotify/callback";
      const scope = "user-read-currently-playing";

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

      window.location.href = authUrl;
    </script>
  </body>
</html>
```

2. Replace `YOUR_CLIENT_ID` with your actual client ID
3. Open this file in a browser
4. Authorize the app
5. Copy the `code` parameter from the URL
6. Exchange the code for a refresh token using curl:

```bash
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/api/spotify/callback" https://accounts.spotify.com/api/token
```

## Step 4: Add Environment Variables

Create or update your `.env.local` file:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Go to your About page
3. Play a song on Spotify
4. The "Currently" section should show your currently playing track

## Troubleshooting

- **"Spotify credentials not configured"**: Check your environment variables
- **"Failed to fetch current track"**: Verify your refresh token is valid
- **No track showing**: Make sure you're actively playing music on Spotify

## Security Notes

- Never commit your `.env.local` file to version control
- The refresh token is long-lived but can expire
- Consider implementing token refresh logic for production

## Alternative: Manual Updates

If you prefer not to set up the API, you can manually update the track in the component:

```tsx
// Replace the SpotifyNowPlaying component with:
<div className="space-y-2">
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    <span className="text-neutral-60 text-sm font-medium">Listening to:</span>
  </div>
  <a
    href="https://open.spotify.com/track/your-track-id"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-accent-100 hover:text-accent-200 transition-colors text-sm"
  >
    🎵 Your Song - Artist
  </a>
</div>
```
