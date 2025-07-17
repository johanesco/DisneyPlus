pipeline {
    agent any

    stages {
        stage('Clonar Repositorio') {
            steps {
                git 'https://github.com/johanesco/DisneyPlus.git  ' // Cambia esto por la URL de tu repositorio
            }
        }
        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Ejecutar Pruebas') {
            steps {
                sh 'npx playwright test'
            }
        }
        stage('Archivar Resultados') {
            steps {
                archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Las pruebas se ejecutaron correctamente.'
        }
        failure {
            echo 'Las pruebas fallaron.'
        }
    }
}