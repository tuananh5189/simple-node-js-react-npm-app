pipeline {
    agent any
    
    triggers {
        pollSCM('* * * * *')
    }
    
    environment {
        CI = 'true'
        DEPLOY_URL = 'http://localhost:3000'
        APP_NAME = 'simple-node-app'
        APP_PORT = '3000'
    }
    
    stages {
        stage('Build & Test') {
            agent {
                docker {
                    image 'node:6-alpine'
                }
            }
            steps {
                sh 'npm install'
                sh './jenkins/scripts/test.sh'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing container
                    sh """
                        docker stop ${env.APP_NAME} || true
                        docker rm ${env.APP_NAME} || true
                    """
                    
                    // Build new image
                    sh "docker build -t ${env.APP_NAME}:latest ."
                    
                    // Run new container
                    sh """
                        docker run -d \
                            --name ${env.APP_NAME} \
                            -p ${env.APP_PORT}:3000 \
                            --restart unless-stopped \
                            ${env.APP_NAME}:latest
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sleep(20)
                    
                    // Test the deployed app
                    sh 'curl -f http://localhost:3000 || echo "App not ready"'
                    
                    // Show container status
                    sh "docker ps | grep ${env.APP_NAME}"
                    
                    // Show container logs
                    sh "docker logs ${env.APP_NAME} --tail 10"
                }
            }
        }
    }
    
    post {
        success {
            echo "🎉 Deployment successful!"
            echo "🔗 Access app at: http://localhost:3000"
            echo "🐳 Container: ${env.APP_NAME}"
        }
        failure {
            echo "❌ Pipeline failed"
            sh "docker logs ${env.APP_NAME} || echo 'No container logs'"
        }
    }
}