pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    
    triggers {
        // Poll SCM mỗi phút kiểm tra commit mới
        pollSCM('* * * * *')
        
        // Hoặc các option khác:
        // pollSCM('H/2 * * * *')    // Mỗi 2 phút
        // pollSCM('H/5 * * * *')    // Mỗi 5 phút  
        // pollSCM('H * * * *')      // Mỗi giờ
        // pollSCM('H H * * *')      // Mỗi ngày
        
        // Có thể kết hợp với githubPush
        // githubPush()
    }
    
    environment {
        CI = 'true'
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
    
    // Thêm post actions để log polling activity
    post {
        always {
            echo "Build triggered by: ${env.BUILD_CAUSE}"
        }
        changed {
            echo "Repository has changes, build executed"
        }
    }
}