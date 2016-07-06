/**
 * 实现的功能有：
 * 1. 压缩js
 * 2. js代码检测
 * 3. 压缩css
 * 4. 压缩html
 * 5. 编译sass
 * 6. 编译less
 * 7. 更改文件自动刷新
 * 8. css 和 js 加 md5 后缀
 * 9. 清空目标文件夹
 *
 */
var gulp         = require('gulp');
var gutil        = require('gulp-util');                    // 工具类
var uglify       = require('gulp-uglify');					// 压缩js
var watchPath    = require('gulp-watch-path');              // 监控更改的文件
var combiner     = require('stream-combiner2');             // 容错处理
var minifycss    = require('gulp-minify-css');				// 压缩css
var sass         = require('gulp-ruby-sass');				// 编译sass
var less         = require('gulp-less');					// 编译less
var rename       = require('gulp-rename');                  // 文件重命名
var concat       = require('gulp-concat');                  // 文件合并
var imagemin     = require('gulp-imagemin');                // 压缩图片
var browserSync  = require('browser-sync');					// 自动刷新浏览器
var htmlmin      = require('gulp-htmlmin');					// 压缩html
var jshint       = require('gulp-jshint');                  // js代码检测
var clean        = require('gulp-clean');                   // 清空文件夹
var jade         = require('gulp-jade');                    // 编译jade
var rev          = require('gulp-rev');						// 加md5后缀
var revCollector = require('gulp-rev-collector');           


// 错误处理
var handleError = function(err) {
	var colors = gutil.colors;
	gutil.log('\n');
	gutil.log(colors.red('Error!'));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: ' + colors.red(err.lineNumber));
	gutil.log('message: ' + err.message);
	gutil.log('plugin: ' + colors.yellow(err.plugin));
};


// 文件路径
var filePath = {
	js: {
		src: 'static/src/js/**/*.js',
		dest: 'static/dist/js',
		rev: 'static/dist/rev/js'
	},
	css: {
		src: 'static/src/sass/**/*.scss',
		dest: 'static/dist/css',
		rev: 'static/dist/rev/css'
	},
	image: {
		src: 'static/src/images/**/*',
		dest: 'static/dist/images/'
	},
	fonts: {
		src: 'static/src/sass/fonts/**/*',
		dest: 'static/dist/fonts/'
	},
	html: {
		src: 'static/src/**/*.html',
		dest: 'static/dist/'
	}
};


// 压缩js
gulp.task('uglifyjs', function(){
	var combined = combiner.obj([
		gulp.src(filePath.js.src),
		jshint(),
		jshint.reporter('default'),
		concat('main.js'),
		uglify(),
		rename({ suffix: '.min'}),
		rev(),
		gulp.dest(filePath.js.dest),
		rev.manifest(),
		gulp.dest(filePath.js.rev)
	]);

	combined.on('error', handleError);
});


gulp.task('watchjs', function(){
	gulp.watch(filePath.js.src, function(event){
		var paths = watchPath(event, 'src/', 'dist/');

		var combined = combiner.obj([
			gulp.src(paths.srcPath),
			jshint(),
			jshint.reporter('default'),
			uglify(),
			rename({ suffix: '.min'}),
			gulp.dest(paths.distDir)
		]);

		combined.on('error', handleError);
	});
});


// browserSync
gulp.task('browserSync', function(){
	browserSync({
		server : {
			baseDir: 'dist'
		}
	});
});


// 编译sass
gulp.task('sass', function(){

	sass(filePath.css.src)
	.on('error', function(err){
		gutil.error('Error!' + err.message);
	})
	.pipe(rename({ suffix: '.min'}))
	.pipe(minifycss())
	.pipe(rev())
	.pipe(gulp.dest(filePath.css.dest))
	.pipe(rev.manifest())
	.pipe(gulp.dest(filePath.css.rev));
});


gulp.task('watchsass', function(){
	gulp.watch(filePath.css.src, function(event){
		var paths = watchPath(event, 'static/src/sass/', 'static/dist/css/');

		sass(paths.srcPath)
		.on('error', function(err){
			gutil.error('Error!' + err.message);
		})
		.pipe(rename({ suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.distDir))
		.pipe(browserSync.reload({
			stream: true
		}))
	});
});

// 编译less
gulp.task('less', function(){
	gulp.src('static/less/global.less')
		.pipe(less())
		.on('error', function(err){
			gutil.error('Error!' + err.message);
		})
		.pipe(rename({ suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(filePath.css.dest))
});


// 处理字体
gulp.task('fonts', function(){
	gulp.src(filePath.fonts.src)
		.pipe(gulp.dest(filePath.fonts.dest));
});


// 处理图片
gulp.task('image', function(){
	gulp.src(filePath.image.src)
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(filePath.image.dest))
});


// 压缩html
gulp.task('html', function(){
	gulp.src(['static/dist/rev/**/*.json', filePath.html.src])
		.pipe(revCollector())
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(filePath.html.dest));
});


gulp.task('watchhtml', function(){
	gulp.watch('static/src/**/*.html', function(event){
		var paths = watchPath(event, 'static/src/', 'static/dist/');

		gulp.src(paths.srcPath)
			.pipe(htmlmin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest(paths.distDir))
			.pipe(browserSync.reload({
				stream: true
			}))
	});
});


// 清空dist文件夹
gulp.task('clean', function(){
	gulp.src('static/dist/*')
		.pipe(clean());
});


// 开发
gulp.task('default', ['browserSync'], function(){
	gulp.start('watchjs', 'watchsass', 'watchhtml');
});


// 版本打包
gulp.task('release', function(){
	gulp.start('uglifyjs', 'image', 'fonts', 'sass', 'html');
	console.log('success');
});


// less
gulp.task('pub', function() {
	gulp.watch('./less/**/*.less', ['less']);
});
