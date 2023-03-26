pipeline {
    agent any
    environment{
        registry = "ni3devops/my-website"
        registryCred = "docker-cred"
        dockerImage = ''
    }
    stages {
        stage('Building Dockerimage') {
            steps{
                script {
                    docker.withRegistry( '', registryCred ) {
                        dockerImage = docker.build( registry + ":insighttellers-$BUILD_NUMBER")
                    }
                }
            }
        }
        stage('Pushing Dockerimage Into Dockerhub') {
            steps{
                script {
                    docker.withRegistry( '', registryCred ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused Dockerimage') {
            steps{
                sh "docker rmi $registry:insighttellers-$BUILD_NUMBER"
           }
        }
        
        stage('Secrets Copy') {
            steps{
                withCredentials([file(credentialsId: 'my-website', variable: 'my-website')]) {
                    sh "cp \$my-website my-website"
                }
            }
        }
        stage('docker Deploy') {
            steps{
                sh 'ssh -o StrictHostKeyChecking=no -i my-website ec2-user@44.198.124.94 sudo docker rm -f insighttellers'
                sh 'ssh -o StrictHostKeyChecking=no -i my-website ec2-use@44.198.124.94 sudo docker run --name insighttellers --restart=always -p 80:80 -d $registry:insighttellers-$BUILD_NUMBER'
                sh 'ssh -o StrictHostKeyChecking=no -i my-website ec2-use@44.198.124.94 sudo docker system prune -f'
            }
        }
        stage('Workspace Cleanup') {
            steps{
                cleanWs()
            }
        }
    }
}
