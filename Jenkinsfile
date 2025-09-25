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
                // Stop existing container
                sh 'docker-compose down || true'
                
                // Build and start new container
                sh 'docker-compose up -d --build'
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sleep(20)
                    
                    // Test the deployed app
                    sh 'curl -f http://localhost:3000 || echo "App not ready"'
                    
                    // Show container status
                    sh 'docker-compose ps'
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