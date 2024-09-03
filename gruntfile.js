module.exports = function (grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development:{
                files:{
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            production:{
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html:{
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS', // valor que queremos substituir
                            replacement: './styles/main.css' // valor que queremos colocar
                        },
                        {
                            match: 'ENDERECO_DO_JS', // valor que queremos substituir
                            replacement: './src/scripts/main.js' // valor que queremos colocar
                        }
                    ]
                },
                files: [
                    {
                    expend: true, // expande os arquivos
                    flatten: true, // concatena todos os arquivos em um
                    src: ['src/index.html'], // arquivo que vamos fazer a substituição
                    dest: 'dev/' // arquivo que receberá a substituição
                    }
                ]
            },
            dist:{
                options:{
                    patterns: [
                        {
                        match: 'ENDERECO_DO_CSS', // valor que queremos substituir
                        replacement: '../styles/main.min.css' // valor que queremos colocar
                    },
                    {
                        match: 'ENDERECO_DO_JS', // valor que queremos substituir
                        replacement: './scripts/main.js' // valor que queremos colocar
                    }
                ]
                },
                files: [
                    {
                    expend: true, 
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/' 
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments:true, //remove comentários
                    collapseWhitespace:true, //Todo espaço em branco será apagado
                },
                files:{
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);

}
