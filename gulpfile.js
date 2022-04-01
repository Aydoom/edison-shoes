// ОПРЕДЕЛЯЕМ КОНСТАНТЫ
const {src,dest,parallel,series,watch} = require('gulp');

// ПОДКЛЮЧАЕМ МОДУЛИ
// BROWSERSYNC
const browserSync = require('browser-sync').create();

// GULP-CONCAT
const concat = require('gulp-concat');

// GULP-UGLIFY-ES
const uglify = require('gulp-uglify-es').default;

// SASS
const sass = require('gulp-sass')(require('sass'));

// Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Gulp-clean-css
const cleancss = require('gulp-clean-css');

// Gulp-file-includ
const fileinclude = require('gulp-file-include');


// ОПРЕДЕЛЯЕМ ПЕРЕМЕННЫЕ
let srcDir = "#src/";
let distDir = "dist/";

let pa

// ОПРЕДЕЛЯЕМ ЛОГИКУ РАБОЬЫ BROWSERSYNC
function browsersync() {
    browserSync.init({
        server: {baseDir: distDir},
        notify: false,
        online: true
    })
}

// ОБРАБОТКА JS ФАЙЛОВ
function scripts() {
    return src([srcDir + "js/script.js"]) // ФАЙЛ ДЛЯ ОБРАБОТКИ
    .pipe(fileinclude())
    .pipe(concat('script.js'))     // ИТОГОВЫЙ ФАЙЛ
    .pipe(uglify()) // СЖИМАЕМ ФАЙЛ
    .pipe(dest(distDir + 'js/')) // ВЫГРУЖАЕМ ГОТОВЫЙ ФАЙЛ
    .pipe(browserSync.stream())
}

// ОБРАБОТКА SCSS ФАЙЛОВ
function styles() {
    return src([srcDir + 'scss/style.scss'])
    .pipe(sass({outputStyle: "expanded"}))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
    //.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
    .pipe(dest(distDir + 'css/'))
    .pipe(browserSync.stream())
}

// ОБРАБОТКА HTML ФАЙЛЫ
function html() {
    return src([srcDir + '*.html', '!' + srcDir + '_*.html'])
    .pipe(fileinclude())
    .pipe(dest(distDir))
    .pipe(browserSync.stream())
}

// WATCH
function startwatch() {
    watch([srcDir + "blocks/**/*.js", srcDir + "js/*.js"], scripts);
    watch([srcDir + "scss/*.scss", srcDir + "blocks/**/*.scss"], styles);
    watch([srcDir + '*.html', srcDir + '**/*.html'], html);
}

// CREATE SECTION FILES
function block() {
    // SCSS File
    return src(srcDir + 'scss/_empty.scss')
    .pipe(concat(srcDir + 'scss/_block.scss'));
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.block = block;

let build = series(parallel(styles, html));
exports.default = parallel(build, scripts, browsersync, startwatch);