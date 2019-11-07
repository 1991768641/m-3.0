const movieView = require('./../views/movie.art');
const movieListView = require('./../views/movie-list.art');
const layoutnavView = require('./../views/layout-nav.art');
const moviesModel = require('./../models/movies');
import indexController from './index';

const BScroll = require('better-scroll');

class Movie {
    constructor() {
        this.list = []
        this.movieIds = []
        this.result1 = ''
        this.num = 12
    }

    renderer(list) {

        let movieListHtml = movieListView({
            list
        })
        let layoutnavhtml = layoutnavView({});
        $('.navlist').html(layoutnavhtml);
        $('.list-container-box .moveslist').html(movieListHtml);
        

        $('.moveslist .movie-item').on('tap', function () {
            let id = $(this).attr('data-movieid');
            $(this).addClass('onread');
            location.hash = `detail/` + id;
        })

        $('.hot-item').on('tap', function () {
            let hotid = $(this).attr('data-page');
            $(this).addClass('active').siblings().removeClass('active');
            location.hash = `${hotid}`;
        });

        $('nav').on('tap', function () {
            let download = $(this).attr('data-load');
            location.hash = `${download}`;
        });

        $('.down-tip').on('tap', function () {
            let download = $(this).attr('data-load');
            location.hash = `${download}`;
        });

        $('.city-entry').on('tap', function () { //跳转到切换城市界面
            let citys = $(this).attr('data-city');
            location.hash = `${citys}`;
        })

        let cityname = window.localStorage.getItem('city');

        $('.city-entry .city').html(cityname);

        $('.switch-entry').on('tap', function () {
            location.hash = 'search';
            window.localStorage.setItem('type','-1');
        });
    }

    async render() {
        indexController.render();
        let that = this;
        let result = await moviesModel.get({});
        let movieHtml = movieView({});
        let $main = $('main');
        $main.html(movieHtml);

        $('head title').html('猫眼电影');
        $('header').html('猫眼电影');


        let list = this.list = result.movieList;
        let movieIds = this.movieIds = result.movieIds;

        this.renderer(list);
        let $imgFoot = $('.foot img');
        let bScroll = new BScroll.default($('.list-move').get(0), {
            probeType: 2
        })

        bScroll.on('scrollEnd', async function () {
            //上拉加载更多
            if (this.maxScrollY >= this.y && that.num <= movieIds.length) {
                $imgFoot.attr('src', '/assets/images/ajax-loader.gif');
                let text = that.num;
                if (that.num < movieIds.length - 12) {
                    that.num = that.num + 12;
                } else {
                    that.num = movieIds.length - that.num + text;
                }

                that.result1 = '';

                for (var i = text; i < that.num; i++) {
                    if (i != that.num - 1) {
                        that.result1 += movieIds[i] + '%2C';
                    } else {
                        that.result1 += movieIds[i];
                    }
                }

                let result = await moviesModel.get2({
                    ids: that.result1
                });

                let list = result.coming;
                that.list = [...that.list, ...list];
                that.renderer(that.list);
                bScroll.scrollBy(0, 40);
                $imgFoot.attr('src', '/assets/images/arrow.png');
                $imgFoot.addClass('down');

                for (let i = 0; i < result.coming.length; i++) {
                    if (result.coming[i].globalReleased == false) {
                        $('.buy .btn').eq(i).addClass('color2');
                    } else {
                        $('.buy .btn').eq(i).addClass('color1');
                    }
                }
            }

        })

        bScroll.on('scroll', function () {
            if (this.y <= -114) {
                $('nav').css('display', 'none');
                $('.down-tip').css('display', 'block');
            } else {
                $('nav').css('display', 'flex');
                $('.down-tip').css('display', 'none');
            }
        })
        that.num = 12;
    }
}
export default new Movie();