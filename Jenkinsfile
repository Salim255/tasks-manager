/********************************************************************************************
 * JENKINSFILE — FULLY COMMENTED, PEDAGOGICAL, SENIOR‑LEVEL
 * ------------------------------------------------------------------------------------------
 * PURPOSE:
 *   - Build and deploy a full‑stack application consisting of:
 *       1 CLIENT  → React + TypeScript + Vite
 *       2 SERVER  → Node/NestJS backend
 *
 *   - Build ONLY what changed:
 *       - If only client files changed → build client image only
 *       - If only server files changed → build server image only
 *       - If both changed → build both
 *       - If nothing changed → skip builds (but still ensure containers are running)
 *
 *   - Deploy using Docker Compose
 *
 * PHILOSOPHY:
 *   - Keep pipeline deterministic, readable, and safe
 *   - Avoid unnecessary builds → save time, CPU, and registry bandwidth
 *   - Make every step self‑explanatory for future maintainers
 ********************************************************************************************/

pipeline {

    /****************************************************************************************
     * agent any
     * --------------------------------------------------------------------------------------
     * Tells Jenkins to run this pipeline on ANY available agent.
     * If you want to restrict to a specific node, replace "any" with:
     *   agent { label 'docker-node' }
     ****************************************************************************************/
    agent any

    environment {
        CLIENT_IMAGE_NAME = "crawan/tasks-manager-client"
        SERVER_IMAGE_NAME = "crawan/tasks-manager-server" 

        CLIENT_DIR = "client"
        SERVER_DIR = "servers/server"
    }

    stages {

        /************************************************************************************
         * STAGE 1 — CHECKOUT SOURCE CODE
         * ----------------------------------------------------------------------------------
         * Jenkins pulls the latest code from the repository.
         * "checkout scm" automatically uses the same Git repo + branch that triggered the job.
         ************************************************************************************/
        stage('Checkout Source') {
            steps {
                script {
                    echo "Checking out source code..."
                    checkout scm
                }
            }
        }


        /************************************************************************************
         * STAGE 2 — DETECT CHANGED FILES
         * ----------------------------------------------------------------------------------
         * We compare the last commit (HEAD) with the previous commit (HEAD~1).
         * This gives us a list of changed files.
         *
         * WHY THIS MATTERS:
         *   - We only want to build what changed.
         *   - If the client folder changed → rebuild client image.
         *   - If the server folder changed → rebuild server image.
         *
         * NOTE:
         *   - This works perfectly for GitHub, GitLab, Bitbucket, etc.
         ************************************************************************************/
        stage('Detect Changed Folders') {
            steps {
                script {
                    echo "🔍 Detecting changes between last commit and current commit..."

                    // Get list of changed files
                    def changes = sh(
                        script: "git diff --name-only HEAD~1 HEAD",
                        returnStdout: true
                    ).trim()

                    echo "Changed files:\n${changes}"

                    // Boolean flags used later to decide what to build
                    def CLIENT_CHANGED = changes.contains("${CLIENT_DIR}/")
                    def SERVER_CHANGED = changes.contains("${SERVER_DIR}/")

                    // Store them in env vars so other stages can read them
                    env.CLIENT_CHANGED = CLIENT_CHANGED.toString()
                    env.SERVER_CHANGED = SERVER_CHANGED.toString()
                    echo "Client changed? → ${CLIENT_CHANGED}"
                    echo "Server changed? → ${SERVER_CHANGED}"
                }
            }
        }


        /************************************************************************************
         * STAGE 3 — BUILD CLIENT (React + Vite)
         * ----------------------------------------------------------------------------------
         * This stage runs ONLY if the client folder changed.
         * Otherwise, we skip it to save time.
         *
         * The Dockerfile for the client should be inside: /client/Dockerfile
         ************************************************************************************/
         /************************************************************************************
         * 3. BUILD CLIENT
         ************************************************************************************/
        stage('Build Client') {
            when {
                expression { env.CLIENT_CHANGED != "" }
            }
            steps {
                echo "🚀 Building CLIENT image..."

                sh """
                    cd ${CLIENT_DIR}
                    docker build \
                        -t ${ CLIENT_IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${ CLIENT_IMAGE_NAME}:latest \
                        .
                """
            }
        }


        /************************************************************************************
         * STAGE 4 — BUILD SERVER (Node/NestJS)
         * ----------------------------------------------------------------------------------
         * Same logic as the client stage.
         * Build only if server code changed.
         ************************************************************************************/
            /************************************************************************************
         * 4. BUILD SERVER
         ************************************************************************************/
        stage('Build Server') {
            when {
                expression { env.SERVER_CHANGED != "" }
            }
            steps {
                echo "🚀 Building SERVER image..."

                sh """
                    cd ${SERVER_DIR}
                    docker build \
                        -t ${SERVER_IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${SERVER_IMAGE_NAME}:latest \
                        .
                """
            }
        }


        /************************************************************************************
         * 5. DOCKER LOGIN (ONLY IF NEEDED)
         ************************************************************************************/
        stage('Docker Login') {
            when {
                expression {
                    env.CLIENT_CHANGED != "" || env.SERVER_CHANGED != ""
                }
            }
            steps {
                echo "🔐 Logging into Docker Hub..."

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }
        

        /************************************************************************************
         * 6. PUSH IMAGES
         ************************************************************************************/
        stage('Push Images') {
            when {
                expression {
                    env.CLIENT_CHANGED != "" || env.SERVER_CHANGED != ""
                }
            }
            steps {
                script {

                    if (env.CLIENT_CHANGED != "") {
                        echo "📤 Pushing CLIENT image..."
                        sh """
                            docker push ${CLIENT_IMAGE_NAME}:${BUILD_NUMBER}
                            docker push ${CLIENT_IMAGE_NAME}:latest
                        """
                    }

                    if (env.SERVER_CHANGED != "") {
                        echo "📤 Pushing SERVER image..."
                        sh """
                            docker push ${SERVER_IMAGE_NAME}:${BUILD_NUMBER}
                            docker push ${SERVER_IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Prepare environment') { 
            steps { 
                script { 
                    withCredentials([file(credentialsId: 'tasks-server-env', variable: 'BACKEND_ENV')]) {
                        sh '''
                            cat "$BACKEND_ENV" > servers/server/.env
                        '''
                    }

                    withCredentials([file(credentialsId: 'tasks-client-env', variable: 'FRONTEND_ENV')]) {
                        sh '''
                            cat "$FRONTEND_ENV" > client/.env
                        '''
                    }

                    withCredentials([file(credentialsId: 'tasksmanager-db.env', variable: 'DB_ENV')]) {
                        sh '''
                            cp "$DB_ENV" .env
                        '''
                    }
                } 
                
                sh 'ls -la servers/server'
               
            } 
        }

        /************************************************************************************
         * STAGE 5 — DEPLOY USING DOCKER COMPOSE
         * ----------------------------------------------------------------------------------
         * WHY WE ALWAYS RUN THIS:
         *   - Even if nothing changed, we want to ensure containers are running.
         *   - If something changed, compose will pick up the new images.
         *
         * docker compose down:
         *   - Stops and removes old containers
         *
         * docker compose up -d --build:
         *   - Recreates containers
         *   - Uses cached layers unless something changed
         ************************************************************************************/
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "📦 Deploying application using Docker Compose..."

                    sh """
                        # Start/update containers safely
                        docker-compose pull
                        docker compose down -v
                        docker-compose up -d
                    """
                }
            }
        }
    }


    /****************************************************************************************
     * POST ACTIONS
     * --------------------------------------------------------------------------------------
     * These run AFTER the pipeline finishes.
     * Useful for notifications, cleanup, or debugging.
     ****************************************************************************************/
    post {

        always {
            echo "🧹 Cleaning Docker..."
            sh "docker system prune -af || true"

            echo "🧹 Check .env Docker..."
            sh '''
                pwd
                ls -la
                ls -la .env
                docker compose config | head -50
            '''
            echo "🧹 Cleaning workspace..."
            cleanWs()
        }

        success {
            echo "✅ Deployment successful"
        }

        failure {
            echo "❌ Deployment failed"
        }
    }
}
