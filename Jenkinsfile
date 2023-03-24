pipeline {
    agent any
    environment{
        registry = "imbb/firebase-frontend"
        registryCredential = "docker"
        dockerImage = ''
    }
    stages {
        stage('Building Dockerimage') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage = docker.build( registry + ":revamp-$BUILD_NUMBER", "--build-arg BUILD_CMD=$BUILD_CMD -f Dockerfile .")
                    }
                }
            }
        }
        stage('Pushing Dockerimage Into Dockerhub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused Dockerimage') {
            steps{
                sh "docker rmi $registry:revamp-$BUILD_NUMBER"
           }
        }
        stage('Secrets Copy') {
            steps{
                    withCredentials([file(credentialsId: 'imbbpem', variable: 'imbbpem')]) {
                        sh "cp \$imbbpem imbb.pem"
                }
            }
        }
        stage('Kubernetes Deploy') {
            steps{
                sh 'chmod 400 imbb.pem'
                sh 'ssh -o StrictHostKeyChecking=no -i imbb.pem ubuntu@52.38.209.186 sudo docker rm -f firebase-frontend-node-revamp'
                sh 'ssh -o StrictHostKeyChecking=no -i imbb.pem ubuntu@52.38.209.186 sudo docker run --name firebase-frontend-node-revamp --restart=always -p 28080:80 -d $registry:revamp-$BUILD_NUMBER'
                sh 'ssh -o StrictHostKeyChecking=no -i imbb.pem ubuntu@52.38.209.186 sudo docker system prune -f'
            }
        }
        stage('Workspace Cleanup') {
            steps{
                cleanWs()
            }
        }
    }
}
