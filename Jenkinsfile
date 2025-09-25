pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
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
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
    
    // Chỉ một section post duy nhất
    post {
        always {
            echo "Build triggered by: ${env.BUILD_CAUSE}"
            echo "Current time: ${new Date()}"
        }
        changed {
            echo "Repository has changes, build executed"
        }
        success {
            echo "Pipeline completed successfully"
            echo "🔗 Application URL: ${env.DEPLOY_URL}"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}