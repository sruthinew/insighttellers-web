node{
   stage('Build Docker Image'){
     sh 'docker build -t sruthisahaj/my-website:insighttellers-$BUILD_NUMBER .'
   }
   stage('Push Docker Image'){
     withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
        sh "docker login -u sruthisahaj -p ${dockerHubPwd}"
     }
     sh 'docker push sruthisahaj/my-website:insighttellers-$BUILD_NUMBER'
   }
   stage('Run Container on Dev Server'){
     def dockerrm  = 'sudo docker rm -f my-app'  
     def dockerRun = 'sudo docker run -p 80:80 -d --name my-app sruthisahaj/my-website:insighttellers-$BUILD_NUMBER'
     def dockerprune = 'sudo docker system prune -f'
     sshagent(['devops']) {
       sh "ssh -o StrictHostKeyChecking=no ec2-user@15.237.102.187 ${dockerrm}"
       sh "ssh -o StrictHostKeyChecking=no ec2-user@15.237.102.187 ${dockerRun}"
       sh "ssh -o StrictHostKeyChecking=no ec2-user@15.237.102.187 ${dockerprune}"
       
     }
   }
}
