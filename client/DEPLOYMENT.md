# 🚀 WandryFi Deployment Guide

This guide will help you deploy the WandryFi frontend to various platforms.

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

1. **Environment Variables Set Up**
   - Copy `.env.example` to `.env.local`
   - Fill in all required values (see Environment Variables section below)

2. **Build Passes Locally**
   ```bash
   npm run build
   ```
   This should complete without errors.

3. **Contract Addresses**
   - Deploy your smart contracts first
   - Update `NEXT_PUBLIC_WANDRYFI_ADDRESS` and `NEXT_PUBLIC_JOURNEY_NFT_ADDRESS`

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_CHAIN_ID` | Blockchain network ID (137 for Polygon, 80002 for Amoy Testnet) | - |
| `NEXT_PUBLIC_WANDRYFI_ADDRESS` | Your deployed WandryFi contract address | Deploy contracts first |
| `NEXT_PUBLIC_JOURNEY_NFT_ADDRESS` | Your deployed Journey NFT contract address | Deploy contracts first |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | [cloud.walletconnect.com](https://cloud.walletconnect.com) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox API token (optional for maps) | [mapbox.com](https://mapbox.com) |

---

## 📦 Deployment Platforms

### Option 1: Vercel (Recommended)

Vercel is the easiest platform for Next.js deployments.

#### Steps:

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**
   ```bash
   cd client
   vercel
   ```

3. **Or Deploy via GitHub**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `client`
   - Add environment variables in Vercel dashboard
   - Click "Deploy"

#### Vercel Configuration:

- **Framework Preset**: Next.js
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 20.x

#### Add Environment Variables in Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local`
4. Make sure to add them for all environments (Production, Preview, Development)

---

### Option 2: Netlify

#### Steps:

1. **Create `netlify.toml` in client directory**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   cd client
   netlify deploy --prod
   ```

3. **Or Deploy via GitHub**
   - Connect your GitHub repository
   - Set build settings
   - Add environment variables
   - Deploy

---

### Option 3: Railway

#### Steps:

1. **Create `railway.json` in client directory**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Deploy**
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo
   - Set root directory to `client`
   - Add environment variables
   - Deploy

---

### Option 4: Self-Hosted (VPS/Cloud)

#### Requirements:
- Node.js 18+ installed
- PM2 or similar process manager

#### Steps:

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd WandryFi_PolygonUpdated-master/client
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   nano .env.local
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "wandryfi" -- start
   pm2 save
   pm2 startup
   ```

5. **Set up Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🔧 Troubleshooting

### Build Error: "Module not found: Can't resolve '@/lib/utils'"

**Solution:**
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

This is usually a caching issue. The path aliases are configured correctly in `tsconfig.json`.

### Build Error: TypeScript errors

**Solution:**
```bash
# Run TypeScript check
npx tsc --noEmit

# Fix any reported errors
```

### Environment Variables Not Working

**Solution:**
- Ensure all `NEXT_PUBLIC_*` variables are set in your deployment platform
- Restart the deployment after adding variables
- Check that variable names match exactly (case-sensitive)

### Wallet Connection Issues

**Solution:**
- Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set correctly
- Get a production project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)
- Don't use the demo project ID in production

### Contract Interaction Errors

**Solution:**
- Verify contract addresses are correct
- Ensure you're on the right network (check `NEXT_PUBLIC_CHAIN_ID`)
- Make sure contracts are deployed and verified

---

## 📊 Performance Optimization

### Before Deploying:

1. **Optimize Images**
   - Use Next.js Image component
   - Configure image domains in `next.config.js`

2. **Enable Caching**
   - Already configured in `next.config.js`

3. **Check Bundle Size**
   ```bash
   npm run build
   # Review the output for large bundles
   ```

---

## 🔒 Security Checklist

- [ ] Use production WalletConnect Project ID
- [ ] Set proper CORS policies
- [ ] Don't commit `.env.local` to git (already in `.gitignore`)
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS on your domain
- [ ] Set up proper CSP headers

---

## 📝 Post-Deployment

1. **Test All Features**
   - Wallet connection
   - Contract interactions
   - Page navigation
   - Responsive design

2. **Monitor Performance**
   - Use Vercel Analytics or similar
   - Check for errors in production

3. **Set Up Domain** (if using custom domain)
   - Configure DNS settings
   - Enable SSL/TLS

---

## 🆘 Need Help?

If you encounter issues:

1. Check the build logs in your deployment platform
2. Verify all environment variables are set
3. Test the build locally first: `npm run build && npm start`
4. Clear cache and rebuild: `rm -rf .next && npm run build`

---

## ✨ Success!

Once deployed, your WandryFi application will be live at your deployment URL. Share it with users and start your travel-to-earn journey! 🌍✈️
