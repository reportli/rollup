/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    sass: {
      options: {
        compass: true,
        style  : 'compressed'
      },
      dist: {
        files: [
          {
            expand: true, 
            cwd   : '<%= pkg.directories.tmp %>/<%= pkg.directories.sass %>',
            src   : ['*.scss'],
            dest  : '<%= pkg.directories.tmp %>/<%= pkg.directories.css %>',
            ext   : '.css'
          }
        ]
      }
    },

    dustjs: {
      dist: {
        src    : '<%= pkg.directories.tmp %>/<%= pkg.directories.templates %>/**/*.tl',
        dest   : '<%= pkg.directories.tmp %>/<%= pkg.directories.templates %>/compiled_templates.js'
      }
    },

    // requirejs: {
    //   compile: {
    //     options: {
    //       baseUrl       : '<%= pkg.directories.source %>',
    //       mainConfigFile: '<%= pkg.directories.source %>/config/requireConfig.js',
    //       name          : 'main',
    //       out           : "<%= pkg.directories.tmp %>/<%= pkg.directories.frontend %>/rollup.js"
    //     }
    //   }
    // },

    jsdoc : {
      cloud : {
        src: ['<%= pkg.directories.cloud %>'],
        options: {
            destination: '<%= pkg.directories.docs %>/<%= pkg.directories.cloud %>'
        }
      }
    },

    jshint: {
      options: {
        curly  : true,
        eqeqeq : true,
        immed  : true,
        latedef: true,
        newcap : true,
        noarg  : true,
        sub    : true,
        undef  : true,
        unused : true,
        boss   : true,
        eqnull : true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },

    nodeunit: {
      files: ['test/**/*_test.js']
    },

    connect: {
      server: {
        options: {
          port     : 9001,
          base     : '<%= pkg.directories.dist %>',
          keepalive: true
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    },

    clean: {
      dist    : ['<%= pkg.directories.dist %>'],
      temp    : ['<%= pkg.directories.tmp %>'],
      temp_src: [
                  '<%= pkg.directories.tmp %>/<%= pkg.directories.sass %>',
                  '<%= pkg.directories.tmp %>/<%= pkg.directories.templates %>/**/*.tl'
                ],
      docs    : ['<%= pkg.directories.docs %>'],
      lib     : ['<%= pkg.directories.lib %>'],
      deploy  : ['cloud', 'public']
    },

    copy: {
      lib: {
        expand: true,
        cwd   : '<%= pkg.directories.bower %>',
        src   : [
                  'requirejs/require.js',
                  'jquery/jquery.min.js',
                  'dustjs-linkedin/dist/dust-full.min.js',
                  'underscore/underscore-min.js',
                  'backbone/backbone-min.js',
                  'backbone.marionette/lib/backbone.marionette.min.js',
                  'animate.css/animate.min.css'
                ],
        dest  : '<%= pkg.directories.lib %>'
      },
      temp: {
        expand: true,
        src   : ['<%= pkg.directories.frontend %>/**', '<%= pkg.directories.backend %>/**'],
        dest  : '<%= pkg.directories.tmp %>'
      },
      dist: {
        expand: true,
        cwd   : '<%= pkg.directories.tmp %>',
        src   : ['**'],
        dest  : '<%= pkg.directories.dist %>'
      },
      deploy_frontend: {
        expand: true,
        cwd   : '<%= pkg.directories.dist %>/<%= pkg.directories.frontend %>',
        src   : ['**'],
        dest  : 'public'
      },
      deploy_backend: {
        expand: true,
        cwd   : '<%= pkg.directories.dist %>/<%= pkg.directories.backend %>/cloud',
        src   : ['**'],
        dest  : 'cloud'
      }
    },

    shell: {
      options: {
        stderr: false
      },
      deploy: {
        command: 'parse deploy'
      },
      bower_install: {
        command: 'bower install'
      }
    }
  });

  // Official plugins
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Third-party plugins
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-dustjs');

  grunt.registerTask('build_clean', ['clean:temp', 'clean:dist', 'clean:lib']);
  grunt.registerTask('bundle_deploy', ['clean:deploy', 'copy:deploy_frontend', 'copy:deploy_backend']);

  // Documentation
  grunt.registerTask('docs', ['clean:docs', 'jsdoc:cloud']);

  // Pipeline commands
  grunt.registerTask('compile', ['sass', 'dustjs', 'clean:temp_src']);
  grunt.registerTask('build', ['build_clean', 'shell:bower_install', 'copy:lib', 'copy:temp', 'compile', 'copy:dist', 'clean:temp']);
  grunt.registerTask('deploy', ['build', 'bundle_deploy', 'shell:deploy', 'clean:deploy']);
};
