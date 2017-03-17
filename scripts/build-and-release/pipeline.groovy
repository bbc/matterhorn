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
    environment {
        MATTERHORN_VERSION = sh(returnStdout: true, script: 'node -e "console.log(require(\'./package.json\').version)"')
        COSMOS_CERT = '/etc/pki/tls/private/client_crt_key.pem'
    }
    // Commenting out slackSend until we can get an integration token
    /*
    post {
        success {
            slackSend channel: 'matterhorn', color: 'green', message: "Matterhorn pipeline build succeeded"
        }
        failure {
            slackSend channel: 'matterhorn', color: 'red', message: "Matterhorn pipeline build failed"
        }
    }
    */
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
        stage('List releases') {
            steps {
                sh 'cosmos releases matterhorn | grep $MATTERHORN_VERSION'
            }
        }
        stage('Create a release') {
            when {
                expression { env.IS_TAGGED_COMMIT != "" }
            }
            steps {
                sh 'npm run release'
            }
        }
    }
}
