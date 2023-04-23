node{
   stage('Build Docker Image'){
     sh 'docker build -t sahajsruthi/my-website:insighttellers-$BUILD_NUMBER .'
   }
   stage('Push Docker Image'){
     withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
        sh "docker login -u sahajsruthi -p ${dockerHubPwd}"
     }
     sh 'docker push sahajsruthi/my-website:insighttellers-$BUILD_NUMBER'
   }
}
  
