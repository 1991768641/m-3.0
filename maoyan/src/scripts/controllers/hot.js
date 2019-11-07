import hotView from '../views/hot.art';
import movieView from './../views/movie.art';
import layoutnavView from './../views/layout-nav.art';
import hotexpecteditemView from './../views/hot-expected-item.art';
import hotcomingitemView from './../views/hot-coming-item.art';
import hotModel from './../models/hot';
import indexController from './index';

const Bscroll = require('better-scroll');

class Hot {
    constructor() {
        this.list = []
        this.offset = 0
        this.detailitem = []
        this.movieIds = []
        this.num = 10
        this.result1 = ''
        this.cityid = 1
    }
    renderer(list) {

        let hotexpecteditemhtml = hotexpecteditemView({
            list
        })
        $('.most-expected-list').html(hotexpecteditemhtml);

        $('nav').on('tap', function () {
            let download = $(this).attr('data-load');
            location.hash = `${download}`;
        });
        $('.down-tip').on('tap', function () {
            let download = $(this).attr('data-load');
            location.hash = `${download}`;
        });
        $('.most-expected-list .expected-item').on('tap', function () {
            let id = $(this).attr('data-id');
            location.hash = `detail/` + id;
        });


        $('.city-entry').on('tap', function () {
            let citys = $(this).attr('data-city');
            location.hash = `${citys}`;
        })
        let cityname = window.localStorage.getItem('city');
        $('.city-entry .city').html(cityname);

        $('.switch-entry').on('tap', function () {
            location.hash = 'search';
            window.localStorage.setItem('type', '-1');
        });
    }
    comingitem(detailitem) {
        
        let hotcomingitemhtml = hotcomingitemView({
            detailitem
        })
        $('.coming-list').html(hotcomingitemhtml);

        $('.coming-list .coming-item').on('tap', function () {
            let id = $(this).attr('data-id');
            location.hash = `detail/` + id;
        });
    }

    async render() {
        indexController.render();
        let that = this;
        let html = hotView({});
        let moviehtml = movieView({});
        let layoutnavhtml = layoutnavView({});
        $('main').html(moviehtml);
        $('.navlist').html(layoutnavhtml);
        $('.moveslist').html(html);

        let cityid = this.cityid = window.localStorage.getItem('cityid');
        that.offset = 0;
        let result = await hotModel.get({
            offset: 0,
            cityid: cityid || 1
        })
        let list = this.list = result.coming;

        let res = await hotModel.get1({
            cityid: cityid || 1
        });

        this.renderer(list);
        let movieIdslength = 82;

        let detailitem = this.detailitem = res.coming;

        this.comingitem(detailitem);

        let bScrollcow = new Bscroll.default($('.move-hot').get(0), {
            probeType: 2,
            scrollX: true
        });

        let bScrollrow = new Bscroll.default($('.list-move').get(0), {
            probeType: 2,
        });

        bScrollcow.on('scrollEnd', async function () {
            if (this.x <= this.maxScrollX /*  && that.offset < movieIdslength + 1 */ ) {
                let text = that.offset;
                if (that.offset < movieIdslength - 10) {
                    that.offset = that.offset + 10;
                } else {
                    that.offset = movieIdslength - that.offset + text;
                }
                let result1 = await hotModel.get({
                    offset: that.offset + 1,
                    cityid: cityid || 1
                })
                let list = result1.coming;
                that.list = [...that.list, ...list];
                that.renderer(that.list);
                let length = that.offset;
                $('.most-expected-list').width(85 * length);
            }
        });
        $('.hot-item').eq(0).removeClass('active');
        $('.hot-item').eq(1).addClass('active');

        $('.hot-item').on('tap', function () {
            let hotid = $(this).attr('data-page');
            $(this).addClass('active').siblings().removeClass('active');
            location.hash = `${hotid}`;
        });
        bScrollrow.on('scroll', function () {
            if (this.y <= -114) {
                $('nav').css('display', 'none');
                $('.down-tip').css('display', 'block');
            } else {
                $('nav').css('display', 'flex');
                $('.down-tip').css('display', 'none');
            }
        })
        let movieIds = this.movieIds = res.movieIds;
        bScrollrow.on('scrollEnd', async function () {
            if (this.y <= this.maxScrollY) {
                let text = that.num;
                if (that.num < movieIds.length - 10) {
                    that.num = that.num + 10;
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
                let result = await hotModel.get2({
                    moviesIds: that.result1,
                    cityid: cityid || 1
                });
                let list = result.coming;
                that.detailitem = [...that.detailitem, ...list];
                that.comingitem(that.detailitem);
            }
        });
        that.num = 10;
    }
}

export default new Hot();