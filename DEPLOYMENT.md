# Echelon Deployment Guide

This guide walks you through deploying Echelon to Vercel with CI/CD pipeline.

## Prerequisites

- GitHub account with the Echelon repository
- Vercel account (free tier available at https://vercel.com)
- Supabase project already set up with credentials

## Step 1: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Create a new query and paste the contents of `supabase/migrations/001_init_schema.sql`
4. Execute the query to create all tables and security policies

## Step 2: Create Vercel Project

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Search for and select **DevAnnafi/Echelon**
4. Click **"Import"**

## Step 3: Configure Environment Variables

In the Vercel import screen, add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://frecdfskhmrdigwvcpnx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Replace `<your-anon-key>` with your actual Supabase anonymous key.

## Step 4: Set Up GitHub Secrets for CI/CD

1. Go to your GitHub repository: https://github.com/DevAnnafi/Echelon
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"** and add:

### Required Secrets:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### How to Get These Values:

**VERCEL_TOKEN:**
1. Go to https://vercel.com/account/tokens
2. Click **"Create"**
3. Name it "GitHub CI/CD"
4. Copy and paste into GitHub secrets

**VERCEL_ORG_ID & VERCEL_PROJECT_ID:**
1. After creating the Vercel project, go to project settings
2. In the URL: `https://vercel.com/your-username/echelon/settings`
3. Copy the project ID from the URL or find it in project settings
4. For org ID, use your Vercel username or organization ID

Alternatively, run this locally:
```bash
npx vercel link
```
This will create a `.vercel` folder with your IDs.

## Step 5: Deploy

### Option A: Automatic Deployment (Recommended)
1. Push code to `main` branch
2. GitHub Actions will automatically:
   - Run tests
   - Build the application
   - Deploy to Vercel

### Option B: Manual Deployment
```bash
npm install -g vercel
vercel --prod
```

## Step 6: Verify Deployment

1. Go to your Vercel project dashboard
2. Check the deployment status
3. Once complete, click the domain link to visit your live app
4. Test login with Google OAuth
5. Create a task to verify database connection

## Monitoring & Logs

### GitHub Actions
- Go to **Actions** tab in your repository
- View workflow runs and logs

### Vercel
- Go to **Deployments** in your Vercel project
- Click any deployment to see build logs
- Use **Monitoring** tab for runtime errors

## Troubleshooting

### Build Fails with "Module not found"
```bash
npm install
npm run build
```

### Database Connection Error
- Verify Supabase credentials in environment variables
- Check that database migrations have been run
- Ensure Row Level Security policies are enabled

### OAuth Login Not Working
- Verify Google OAuth is configured in Supabase
- Check redirect URLs match your Vercel domain
- Clear browser cookies and try again

## Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Supabase OAuth redirect URLs with new domain

## Performance Optimization

The CI/CD pipeline includes:
- ✅ Automated testing on Node 18.x and 20.x
- ✅ Type checking
- ✅ Build verification
- ✅ Automatic deployment on main branch
- ✅ GitHub comments with deployment status

## Rollback

If deployment fails:
1. Go to Vercel **Deployments** tab
2. Find the previous successful deployment
3. Click the **...** menu
4. Select **"Promote to Production"**

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `VERCEL_TOKEN` | Yes (for CI/CD) | Vercel authentication token |
| `VERCEL_ORG_ID` | Yes (for CI/CD) | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Yes (for CI/CD) | Vercel project ID |

## Support

For issues:
1. Check GitHub Actions logs
2. Review Vercel deployment logs
3. Verify Supabase database status
4. Check browser console for client-side errors
