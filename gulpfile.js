var gulp = require('gulp');  // 引入gulp套件
var concat = require('gulp-concat'); // 引入gulp-concat套件
var uglyfly = require('gulp-uglyfly'); // 引入gulp-uglyfly套件
var sass = require('gulp-sass'); // 引入gulp-sass套件
sass.compiler = require('node-sass');

gulp.task('concat', function() {
  return gulp.src('./source/js/**/*.js')  // 代表資料來源在哪裡
    .pipe(concat('all.js'))
    .pipe(uglyfly())  // 利用uglyfly來將all.js壓縮
    .pipe(gulp.dest('./public/javascripts')) // 代表這個gulp最終要輸出的檔案要輸出到哪裡
})

gulp.task('sass', function () {
  return gulp.src('./source/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/scss'));
});
 
var vendorJS = [
  'bower_components/jquery/dist/jquery.min.js'
]

gulp.task('vendor', function() {
  return gulp.src(vendorJS)  // 代表資料來源在哪裡
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts')) // 代表這個gulp最終要輸出的檔案要輸出到哪裡
})

gulp.task('watch', function () {
  gulp.watch('./source/js/**/*.js', gulp.series('concat'))
  gulp.watch('./source/scss/**/*.scss', gulp.series('sass'))
})
gulp.task('default', gulp.series(['concat', 'sass', 'vendor', 'watch']))