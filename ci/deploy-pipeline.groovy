pipeline {
  parameters {
    choice(choices: 'test\nlive', name: 'ENVIRONMENT', description: '')
    string(name: 'OWNER', defaultValue: 'sea-otter', description: '')
    string(name: 'VERSION_TAG', description: 'The tag to deploy')
  }
  agent any
  tools {
    nodejs 'LTS'
  }
  options {
    timeout(time: 25, unit: 'MINUTES')
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
          sh "npx cosmos-deploy deploy matterhorn ${params.ENVIRONMENT} ${params.VERSION_TAG} -d ../pipeline"
        }
      }
    }
  }
}
