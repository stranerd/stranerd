# Stranerd


## Development Setup

#### For first time running project
```bash
# install dependencies
$ npm install | yarn install
# cd to firebase functions directory
$ cd firebase/functions
# install firebase functions dependencies
$ npm install | yarn install
# cd to root of project
$ cd ../../

# create env.json file
$ touch env.json
# contact dev-lead/admin to collect content for env.json file just created

# make directory for firebase exports
$ mkdir firebase/docs/exports
# create credentials for firebase admin initialization
$ touch firebase/docs/credentials.json
# contact dev-lead/admin to collect contents for credentials.json file just created

```

#### To run project
```bash
# on one bash window, start firebase emulator servers
# NB- This would require the following ports to be free on your machine: 4000, 4400, 5000, 5001, 5002, 5003, 5004, 5005, 5006
$ npm run firebase:start | yarn firebase:start

# on another bash window, start nuxt application server
# NB - This would require port 8080 or whatever port specified in the env.json file to be free on your machine
$ npm run dev | yarn dev

# This step is only required if you plan to work on the firebase functions
# on another bash window, start typescript compiler/watcher for firebase functions
$ npm run firebase:functions:watch | yarn firebase:functions:watch
```

## Development && Commits
```
To begin working on any portion of this application:

1. Fork a copy of the develop branch. This is the central branch, where all hotfixes and features are merged. Always ensure to copy the develop branch as it always contains the latest state of the application
2. Make your necessary changes
3. During commits, the entire codebase is linted to ensure consistent code style
4. During commits, the commit message is required to follow the conventional commit styles to communicate intent of each commit. Further reading can be done at [Conventional Commits](https://conventionalcommits.org/).
5. Once you are satisfied with your changes and you have committed, open a pull request to the development branch
```


## Deployment Setup
```
The deployment process includes steps that deploy code to both Google App Engine and Firebase servers.
To minimize stress on the developers when deploying, the deployment process has been delegated to workflows on Github Actions.
Github Actions fires based on actions performed on different deployment environments.
The current deployment environments include: beta, staging and release/production.
To begin deployment to any of the environments, you need to push a commit to any of the following branches: beta, staging and release.
To push a commit to any of the above stated branches, create a pull request and after a significant code review, it will be merged and released.
```


## Contact
For detailed explanation on how things work or if any error is encountered, contact Kevin Izuchukwu at kevinfizu@gmail.com.
