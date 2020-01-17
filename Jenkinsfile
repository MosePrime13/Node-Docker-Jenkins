pipeline {
    agent any 
    stages {
        stage('--clone--') { 
            steps {
                sh "rm -rf Node-Docker-Jenkins"
                sh "git clone https://github.com/MosePrime13/Node-Docker-Jenkins.git"
            }
        }
        stage('--test--') { 
            steps {
                sh "cd Node-Docker-Jenkins/docker-compose-test && docker-compose up -d && docker-compose up -d --force-recreate --no-deps --build nodetest && docker-compose run nodetest && docker-compose down"
            }
        }
        stage('--deploy--') { 
            steps {
                sh "cd Node-Docker-Jenkins/src && ls -la"
            }
        }
    }
}