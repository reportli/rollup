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
        style: 'compressed'
      },
      dist: {
        files: [
          {
            expand: true, 
            cwd: '<%= pkg.directories.sass %>',
            src: ['*.scss'],
            dest: '<%= pkg.directories.tmp %>/<%= pkg.directories.sass %>',
            ext: '.css'
          }
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
    },

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
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
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
      dist: ['<%= pkg.directories.dist %>'],
      tmp: ['<%= pkg.directories.tmp %>'],
      docs: ['<%= pkg.directories.docs %>']
    },

    copy: {
      temp: {
        expand: true,
        src: ['<%= pkg.directories.app %>', '<%= pkg.directories.cloud %>'],
        dest: '<%= pkg.directories.tmp %>'
      },
      dist: {
        expand: true,
        src: ['<%= pkg.directories.tmp %>'],
        dest: '<%= pkg.directories.dist %>'
      }
    },

    shell: {
      options: {
        stderr: false
      },
      deploy: {
        command: 'parse deploy'
      }
    }
  });

  // Official plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Third-party plugins
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('docs', ['clean:docs', 'jsdoc:cloud'])
  grunt.registerTask('deploy', ['shell:deploy']);
  grunt.registerTask('default', ['clean', 'copy:temp']);
};
