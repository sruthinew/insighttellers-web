node{
   stage('Build Docker Image'){
     sh 'docker build -t ni3devops/my-website:insighttellers-$BUILD_NUMBER .'
   }
   stage('Push Docker Image'){
     withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
        sh "docker login -u ni3devops -p ${dockerHubPwd}"
     }
     sh 'docker push ni3devops/my-website:insighttellers-$BUILD_NUMBER'
   }
   stage('Run Container on Dev Server'){
     def dockerrm  = 'sudo docker rm -f my-app'  
     def dockerRun = 'sudo docker run -p 8080:80 -d --name my-app ni3devops/my-website:insighttellers-$BUILD_NUMBER'
     def dockerprune = 'sudo docker system prune -f'
     sshagent(['dev-server']) {
       sh "ssh -o StrictHostKeyChecking=no ec2-user@44.198.124.94 ${dockerrm}"
       sh "ssh -o StrictHostKeyChecking=no ec2-user@44.198.124.94 ${dockerRun}"
       sh "ssh -o StrictHostKeyChecking=no ec2-user@44.198.124.94 ${dockerprune}"
       
     }
   }
}
