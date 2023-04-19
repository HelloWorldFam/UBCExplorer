# UBC Explorer & BCS Dashboard

## Welcome

Hello! Welcome to the BCS Course Selector - the full stack application and repo hosting both the frontend and backend of the [UBCExplorer.io](https://ubcexplorer.io/) Course Search tool and the BCS Explorer / Degree planner [UBCExplorer.io/bcs](https://ubcexplorer.io/bcs)

---

## Intro

UBC Explorer is a product offering two solutions for students aimed at course search and degree planning: UBC Course Explorer and BCS Explorer.


- UBC Course Explorer is a a modern course search tool that enables all students to browse UBC course prerequisites and dependencies.
- BCS Explorer is a modern dashboard with increased functionality related to course search features such as a worklist builder, degree progress tracker, and overview for users to quickly see their stats.

This work is to enable students to be incredibly efficient when course planning and to replace the pdf planner offered to UBC BCS students. The BCS Dashboard has been officially endorsed by the UBC BCS director and is home to over 1k users.

## Contents

- [Intro](#intro)
- [Setup](#setup)
- [Documentation](#documentation)
- [How to Contribute](#how-to-contribute)
- [Code of Conduct](#code-of-conduct)
- [Support](#support)
- [Contributors](#contributors)

## Setup

Our stack consists of React, JavaScript, MaterialUI, MongoDB, Express.js.

### Setting up Local Environment

To set up your local environment, be sure to have the following installed:

- Node.js
- Git

### Clone the GitHub Repo

```
git clone https://github.com/HelloWorldFam/BCS-Course-Selector.git
```

The directory of importance is the `bcs-dashboard`. Change directory into this directory and run the installation script. The `bcs-landing-page` is a separate directory for the landing page specifically found on `ubcexplorer.io/bcs`

```
cd bcs-dashboard
npm run install

# Open another terminal window
cd bcs-dashboard/backend
npm install

# if you want to run the landing page, you will also need to
cd bcs-landing-page
npm install
```

To be able to read/write to the mongoDB database, you will need to add credentials.

- Request access to the test database
- Add credentials to your .env file locally.

```
cd bcs-dashboard/backend

# create a file called: .env
# inside this file, paste your credentials.
# it will look like the following but with the <username> and <password> replaced with your credentials

ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.f6swi.gcp.mongodb.net/?retryWrites=true&w=majority
```

### Running the code locally

To run the code locally, you will need to run both the frontend and the backend and have an `.env` file containing mongoDB read access.

```
cd bcs-dashboard
npm start

# in new terminal window
cd bcs-dashboard/backend
nodemon server
```

You should be able to view the UBC Explorer- Course Search on your localhost.

```
http://localhost:3000

# to view the BCS Explorer, navigate to this url
http://localhost:3000/bcs/start
```

### Deploying to GCP

To deploy to GCP, install the [gcloud CLI](https://cloud.google.com/sdk/docs/install). To authenticate, run `gcloud init`.

Once installed, fill in the `ATLAS_URI` in [`app.yaml`](app.yaml) and run:

```
gcloud app deploy
```

## Documentation

We will have some documentation coming soon.

## How to Contribute

The main purpose of this repository is to continue evolving UBC Explorer. We want to make contributing to this project as easy and transparent as possible, and we are grateful to the community for contributing bugfixes and improvements.

### [Contributing Guidelines](CONTRIBUTING.md)

Read our [**Contributing Guide**](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements.

Check out the issues labeled with `good-first-issue` for bugs/fixes/additions that have limited scope.

## Code of Conduct

We have adopted a [Code of Conduct](CODE_OF_CONDUCT.md).

## Support

If you need help, feel free to join our Discord community and inteact with other UBC Explorer Devs.

[Discord](https://discord.gg/sF8KMPFYu2)

## Contributors
A huge thanks to all the contributors working to maintain the project.
- mrbenc88
- jerry-hall
- scott-m-king
- JamesJHPark
- brendeny
- schung53
