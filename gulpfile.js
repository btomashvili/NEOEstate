/* eslint import/no-extraneous-dependencies:0 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const gulp = require('gulp')
const rsync = require('gulp-rsync')
const prompt = require('gulp-prompt')
const gulpif = require('gulp-if')
const argv = require('minimist')(process.argv)
const debug = require('debug')('bot')

const DEPLOYMENT = {
  STAGING: {
    HOST: 'ec2-18-217-160-1.us-east-2.compute.amazonaws.com',
    USER: 'ubuntu',
  },
  DEVELOPMENT: {
    HOST: 'ec2-18-217-160-1.us-east-2.compute.amazonaws.com',
    USER: 'ubuntu',
  },
  PRODUCTION: {
    HOST: 'ec2-18-219-229-163.us-east-2.compute.amazonaws.com',
    USER: 'ubuntu',
  },

}

const sourceFolder = './dist/'
const deploymentFoldersSite = [
  sourceFolder,
]


gulp.task('deploy', () => {
  const rsyncPaths = deploymentFoldersSite
  const rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    root: sourceFolder,
    syncDest: true,
    clean: true,
    exclude: [
    //  WE ARE DEPLOYING FULL DIST FOLDER
    //   './node_modules',
    //   '.notes',
    //   '.vscode',
    //   'bot.log',
    ],
  }

  if (argv.production) {
    debug('PRODUCTION HOST ..:::... ', DEPLOYMENT.PRODUCTION.HOST)
    rsyncConf.hostname = DEPLOYMENT.PRODUCTION.HOST
    rsyncConf.username = DEPLOYMENT.PRODUCTION.USER
    rsyncConf.destination = '/home/ubuntu/walkthru_front/' // path where uploaded files go
        // Missing/Invalid Target
  } else if (argv.test) {
    debug('DEVELOPMENT HOST ..:::... ', DEPLOYMENT.STAGING.HOST)
    rsyncConf.hostname = DEPLOYMENT.STAGING.HOST
    rsyncConf.username = DEPLOYMENT.STAGING.USER
    rsyncConf.destination = '/home/ubuntu/walkthru_front/' // path where uploaded files go
  } else {
     // throwError('deploy', gutil.colors.red('Missing or invalid target'))
  }
  // Use gulp-rsync to sync the files
  return gulp.src(rsyncPaths)
        .pipe(gulpif(
            argv.production,
            prompt.confirm({
              message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
              default: false,
            })
        ))
        .pipe(rsync(rsyncConf))
})
