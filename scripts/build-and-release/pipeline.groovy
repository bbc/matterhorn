pipeline {
    agent {
        label 'centos7'
    }
    stages {
        stage('Checkout repo') {
            steps {
                git 'git@github.com:bbc/matterhorn.git'   
            }
        }
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
    }
}
