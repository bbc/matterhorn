pipeline {
  parameters {
    choice(choices: 'int\ntest\nlive', name: 'ENVIRONMENT', description: '')
    string(name: 'OWNER', defaultValue: 'bad-horses', description: '')
    string(name: 'VERSION_TAG', description: 'The tag to deploy')
  }
  agent any
  tools {
    nodejs 'LTS'
  }
  options {
    timeout(time: 15, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }
  stages {
    stage('Provision Stack Definitions') {
      steps {
        script {
          currentBuild.displayName = "${params.VERSION_TAG} to ${params.ENVIRONMENT} "
          currentBuild.description = "Git tag '${params.VERSION_TAG}' deployed to the ${params.ENVIRONMENT} environment."
        }
        dir('ci') {
          sh 'npm install'
          sh "npx cosmos-deploy deploy matterhorn ${params.ENVIRONMENT} ${params.VERSION_TAG} -d ../pipeline"
        }
      }
    }
  }
  post {
    changed {
      script {
        if (currentBuild.currentResult == 'SUCCESS') {
          slackSend channel: '#team-tv-bad-horse', color: 'good', message: "$JOB_NAME recovered - (<$BUILD_URL|Build>), (<$RUN_DISPLAY_URL|Pipeline>), (<https://github.com/bbc/matterhorn/tags/$VERSION_TAG|Commit>)"
        }
      }
    }
    failure {
      slackSend channel: '#team-tv-bad-horse', color: 'danger', message: "$JOB_NAME failed - (<$BUILD_URL|Build>), (<$RUN_DISPLAY_URL|Pipeline>), (<https://github.com/bbc/matterhorn/tags/$VERSION_TAG|Commit>)"
    }
  }
}
