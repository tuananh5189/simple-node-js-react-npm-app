pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            // Bind container port 3000 to host port 3000
            args '-p 3000:3000 -u root'
        }
    }
    
    triggers {
        pollSCM('* * * * *')
    }
    
    environment {
        CI = 'true'
        DEPLOY_URL = 'http://localhost:3000'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                // Không kill ngay, để app chạy
                // sh './jenkins/scripts/kill.sh'
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // Đợi app start
                    sleep(10)
                    
                    // Check container internal
                    sh 'curl -f http://localhost:3000 || echo "App not ready yet"'
                    
                    // List running processes
                    sh 'ps aux | grep node || echo "No node processes"'
                }
            }
        }
    }
    
    post {
        always {
            echo "Build triggered by: ${env.BUILD_CAUSE}"
            echo "Current time: ${new Date()}"
        }
        
        success {
            echo "Pipeline completed successfully"
            echo "🔗 Application URL: ${env.DEPLOY_URL}"
            echo "🔍 Check container: docker ps"
            echo "📋 Check logs: docker logs <container_id>"
        }
        
        failure {
            echo "Pipeline failed"
            // Show logs for debugging
            sh 'cat app.log || echo "No app.log found"'
        }
    }
}