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
                    withCredentials([file(credentialsId: 'my-server-key1', variable: 'my-server-key1')]) {
                        sh "cp \$my-server-key1 my-server-key1.pem"
                }
            }
        }
        stage('docker Deploy') {
            steps{
                sh 'chmod 400 my-server-key1.pem'
                sh 'ssh -o StrictHostKeyChecking=no -i my-server-key1.pem ubuntu@44.198.124.94 sudo docker rm -f insighttellers'
                sh 'ssh -o StrictHostKeyChecking=no -i my-server-key1.pem ubuntu@44.198.124.94 sudo docker run --name insighttellers --restart=always -p 80:80 -d $registry:insighttellers-$BUILD_NUMBER'
                sh 'ssh -o StrictHostKeyChecking=no -i my-server-key1.pem ubuntu@44.198.124.94 sudo docker system prune -f'
            }
        }
        stage('Workspace Cleanup') {
            steps{
                cleanWs()
            }
        }
    }
}
