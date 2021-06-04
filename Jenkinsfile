pipeline {
    agent any

    tools {
        nodejs 'NodeJS 12.21.0'
    }
   

    environment {
        currentEnvName = envName(env.BRANCH_NAME)
        installNeeded = requireInstall(env.BRANCH_NAME)

        teamlList = 'nelson.baker@gmail.com'

       
    }
    stages {
        stage('Create Environment') {
            steps {
                echo "Current workspace: ${env.WORKSPACE}"
                echo "Current Env: ${currentEnvName}"
                echo "Branch Name: ${env.BRANCH_NAME}"
                echo "Install Required?: ${installNeeded}"
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Build Artifact') {
            steps {
                echo "Install NODE dependencies..."
                
                //sh 'npm install'
            }
        }

        stage('Validate') {
            steps {
                echo "Validate..."
                
                
                
                echo "End Validate"
            }
        }

        stage('Push to remote repo') {
            steps {
                echo "Init Push...."
                script {
                    try { 
                        sh 'git remote add vigafab https://github.com/vigalab/vigafab.git'
                    } catch(err) {
                        echo "Remote repository was added"
                    }
                }
                
                sh 'git remote -v'

                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'GitHub',
                        usernameVariable: 'username',
                        passwordVariable: 'password')
                    ]) {
                        
                        sh "git remote set-url vigafab https://${username}:${password}@github.com/vigalab/vigafab.git"

                        sh 'git remote -v'

                        sh "git push vigafab ${env.BRANCH_NAME}"

                    }
                }
            
                               

                echo "End Push"
            }
        }
    }
    post {
        failure {
            emailext    body: "Resultado Pipeline: ${currentBuild.currentResult}:\nJob ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n\nDetalle: ${env.BUILD_URL}",
                        subject: "Estado ejecucion Jenkins: ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                        to: "${teamlList}"
                        //replyTo: "Vigalab CI<qa@vigalab.com>"
        }
    }

}


def envName(branch) {
    if (branch.startsWith("DEV")) {
        return "desarrollo"
    } else if (branch == 'qa') {
        return "qa"
    } else if (branch == 'main') {
        return "produccion"
    }

}

def requireInstall(branch) {
    def res = 'false'
    if (branch.startsWith("DEV")) {
        res = 'true'
    } else if (branch == 'qa') {
        res = 'true'
    } else if (branch == 'main') {
        res = 'true'
    }
    return res;
}
