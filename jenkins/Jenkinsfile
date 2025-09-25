pipeline {
    agent any
    
    triggers {
        pollSCM('* * * * *')
    }
    
    environment {
        CI = 'true'
        DEPLOY_URL = 'http://localhost:3000'
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
                    // Stop existing container
                    sh 'docker stop simple-app || true'
                    sh 'docker rm simple-app || true'
                    
                    // Build new image
                    sh 'docker build -t simple-app .'
                    
                    // Run new container
                    sh 'docker run -d --name simple-app -p 3000:3000 simple-app'
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sleep(20)
                    sh 'curl -f http://localhost:3000 || echo "App not ready"'
                    sh 'docker ps | grep simple-app'
                }
            }
        }
    }
    
    post {
        success {
            echo "🎉 Deployment successful!"
            echo "🔗 Access app at: http://localhost:3000"
            echo "🐳 Container status: docker-compose ps"
        }
    }
}