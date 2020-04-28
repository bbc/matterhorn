pipeline {
    parameters {
      string(name: 'OWNER', defaultValue: 'bad-horses', description: '')
    }
    agent any
    tools {
      nodejs 'LTS'
    }
    options {
        timeout(time: 5, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }
    triggers { cron('@monthly') }
    stages {
      stage('Determine the version') {
          steps {
            script {
              VERSION = sh(returnStdout: true, script: "node -e \"console.log(require('./package.json').version)\"").trim()
            }
          }
        }
        stage("Set the build display name") {
          steps {
            script {
              currentBuild.displayName = "$VERSION"
            }
          }
        }
        stage('Prepare Codebuild') {
          steps {
            dir('ci') {
                sh 'npx cosmos-deploy provision-all-stacks itv-ci-jobs test 1 --tag BBCProject=interactive-tv-shared --tag BBCComponent=matterhorn --tag BBCEnvironment=tools --tag BBCOwner=bad-horses'
            }
          }
        }
        stage('Codebuild') {
            steps {
                sh 'echo "GIT COMMIT = $GIT_COMMIT"'
                ansiColor('xterm') {
                  awsCodeBuild(projectName: 'matterhorn', credentialsId: 'CodeBuild', credentialsType: 'jenkins',
                    region: 'eu-west-1', sourceControlType: 'project', sourceVersion: "$GIT_COMMIT", artifactTypeOverride: "S3",
                    artifactPathOverride: "artifacts/$JOB_NAME/$BUILD_NUMBER", artifactLocationOverride: "test-itv-ci-jobs",
                    artifactNameOverride: "artifacts.zip", artifactPackagingOverride: 'ZIP', gitCloneDepthOverride: '10')
                }
            }
        }
        stage('Deploy to INT') {
          steps {
            build job: 'deploy',
            parameters: [
              string(name: 'VERSION_TAG', value: "$VERSION"),
              string(name: 'ENVIRONMENT', value: "test")
            ],
            wait: false
          }
        }
    }
}
