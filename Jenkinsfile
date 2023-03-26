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
        stage('Run Container on Dev Server') {
            steps {
                script {
                    sshagent(['dev-server']) {
                        sh 'sudo docker rm -f my-app || true'
                        sh "sudo docker run -p 8080:80 -d --name my-app ni3devops/my-website:insighttellers-${env.BUILD_NUMBER}"
                        sh 'sudo docker system prune -f'
                    }
                }
            }
        }
        stage('Workspace Cleanup') {
            steps{
                cleanWs()
            }
        }
    }
}
