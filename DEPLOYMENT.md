# Deployment (publish to jeffersonlcf.github.io)

This repo builds the site and pushes the built `dist/` folder into the separate
`jeffersonlcf/jeffersonlcf.github.io` repo.

## One-time setup

1. Create a GitHub Personal Access Token (fine-grained) with:
   - Repository access: only `jeffersonlcf.github.io`
   - Permissions: Contents -> Read and write
2. In this repo (vue), add a secret:
   - Name: `DEPLOY_TOKEN`
   - Value: the PAT you created
3. Ensure the target repo uses the `master` branch for publishing.

## Deploy

- Push to `master` in this repo to trigger deployment, or run the workflow
  manually in the Actions tab.

## Workflow details

- Workflow file: `.github/workflows/deploy.yml`
- Build: `npm ci` + `npm run build`
- Publish: `dist/` is pushed to `jeffersonlcf/jeffersonlcf.github.io` on `master`

## Troubleshooting

- If only `.nojekyll` is deployed, verify the build step runs and `dist/` is
  created before the publish step.
- Check the Actions log around the deploy step for errors.
