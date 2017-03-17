pipeline {
  agent {
    label 'centos7'
  }
  // The nodejs tool needs to be updated to support Jenkins pipelines
  // However, in order to do that we need to migrate away from the Multijob
  // plugin as it causes a conflict. Until then, we can live with the fact
  // that the CentOS 7 agent has Node 6.9.4 enabled by default
  /*
  tools {
    nodejs 'LTS'
  }
  */
  post {
      failure {
          slackSend color: 'danger', message: "[DEBUG] Matterhorn pipeline build"
      }
  }
  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run the tests') {
      steps {
        sh 'npm test'
          }
      }
    stage('Create a release') {
      steps {
        sh 'npm run release'
      }
    }
  }
}
