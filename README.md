# BCS-Course-Selector

### Setting Up Development Environment:

`npm run install`

### Deploying to GCP

To deploy to GCP, install the [gcloud CLI](https://cloud.google.com/sdk/docs/install). To authenticate, run `gcloud init`.

Once installed, fill in the `ATLAS_URI` in [`app.yaml`](app.yaml) and run:

```
gcloud app deploy
```
