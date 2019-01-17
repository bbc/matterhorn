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
        stage('Prepare Codebuild') {
          steps {
            dir('ci') {
                sh 'npm install'
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
              string(name: 'ENVIRONMENT', value: "int")
            ],
            wait: false
          }
        }
    }
    post {
      changed {
        script {
          if (currentBuild.currentResult == 'SUCCESS') {
            slackSend channel: '#team-tv-bad-horse', color: 'good',
                message:
                    "$JOB_NAME recovered - (<$BUILD_URL|Build>), (<$RUN_DISPLAY_URL|Pipeline>), (<https://github.com/bbc/matterhorn/commit/$GIT_COMMIT|Commit>)"
          }
        }
      }
      failure {
        slackSend channel: '#team-tv-bad-horse', color: 'danger',
            message:
                "$JOB_NAME failed - (<$BUILD_URL|Build>), (<$RUN_DISPLAY_URL|Pipeline>), (<https://github.com/bbc/matterhorn/commit/$GIT_COMMIT|Commit>)"
      }
      always {
        sh 'echo "In always block.."' // a block cannot be empty
        // Deal with artifacts here.
        //sh "aws s3 cp s3://test-itv-ci-jobs/artifacts/$JOB_NAME/$BUILD_NUMBER results --recursive"
        //sh "unzip results/artifacts.zip"
      }
    }
}
