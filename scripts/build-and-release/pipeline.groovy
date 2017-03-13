node {
    stage('Checkout repo') {
        git 'git@github.com:bbc/matterhorn.git'
    }
  }
}
