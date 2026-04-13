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
                    echo "📥 Checking out source code..."
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
                    def CLIENT_CHANGED = changes.contains("client/")
                    def SERVER_CHANGED = changes.contains("servers/server/")

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
        stage('Build Client (React + Vite)') {
            steps {
                script {
                    if (CLIENT_CHANGED) {
                        echo "🚀 Client changes detected → Building CLIENT Docker image..."

                        sh """
                            cd client
                            docker build -t tasks-manager-client:latest .
                        """
                    } else {
                        echo "⏭ No client changes detected → Skipping client build."
                    }
                }
            }
        }


        /************************************************************************************
         * STAGE 4 — BUILD SERVER (Node/NestJS)
         * ----------------------------------------------------------------------------------
         * Same logic as the client stage.
         * Build only if server code changed.
         ************************************************************************************/
        stage('Build Server (Node/NestJS)') {
            steps {
                script {
                    if (SERVER_CHANGED) {
                        echo "🚀 Server changes detected → Building SERVER Docker image..."

                        sh """
                            cd servers/server
                            docker build -t tasks-manager-server:latest .
                        """
                    } else {
                        echo "⏭ No server changes detected → Skipping server build."
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
                            cat "$DB_ENV" > .env
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
                        docker-compose down --remove-orphans
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
        success {
            echo "🎉 Deployment completed successfully."
        }
        failure {
            echo "❌ Deployment failed — check logs above."
        }
    }
}
