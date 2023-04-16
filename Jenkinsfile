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
   stage('Run Container on Dev Server'){
     def dockerrm  = 'sudo docker rm -f my-app'  
     def dockerRun = 'sudo docker run -p 80:80 -d --name my-app sahajsruthi/my-website:insighttellers-$BUILD_NUMBER'
     def dockerprune = 'sudo docker system prune -f'
     sshagent(['contabo']) {
       sh "ssh -o StrictHostKeyChecking=no root@31.220.78.147 ${dockerrm}"
       sh "ssh -o StrictHostKeyChecking=no root@31.220.78.147 ${dockerRun}"
       sh "ssh -o StrictHostKeyChecking=no root@31.220.78.147 ${dockerprune}"
       
     }
   }
}
