import cinemaView from './../views/cinema.art'
import cinemanavView from './../views/cinema-nav.art';
import closetabView from './../views/close-tab.art';
const cinemaModel = require('./../models/cinemas');
import indexController from './index';
const Bscroll = require('better-scroll');

class Cinema {

    constructor() {
        this.list = []
        this.num = 0
        this.cityid=1
        this.citylist=[]
        this.citylisy1=[]
    }
    closeTab(citylist,citylist1){
        let closetabhtml= closetabView({
            citylist,
            citylist1
        })
        $('.cinema-city-list').html(closetabhtml);
        var flag=true;
        $('.allcity').on('tap',function(){
            if(flag){
                $('.close-tab').show();
            }
            else{
                $('.close-tab').hide();
            }   
            flag=!flag;
        });
        this.regionTab();

        $('.district-li').on('tap',function(){
            $(this).addClass('item-chosen').siblings().removeClass('item-chosen');

        });

    }

    renderer(list) {
        let cinemanavhtml = cinemanavView({
            list
        })
        $('.cinema-list-warp').html(cinemanavhtml);
        $('.city-entry').on('tap',function(){
            let citys=$(this).attr('data-city');
            location.hash=`${citys}`;
        })
        let cityname=window.localStorage.getItem('city');
        $('.city-entry .city').html(cityname);

        $('.search-entry').on('tap', function () {
            location.hash = 'search';
            window.localStorage.setItem('type','2');
        });
    }

    regionTab(){
        $('#region-tab li').on('tap',function(){
            $(this).addClass('chosen').siblings().removeClass('chosen');
            
        });
    }

    async render() {
        indexController.render();
        let that = this;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let time = year + '-' + month + '-' + day;
        let cityid=this.cityid=window.localStorage.getItem('cityid');

        let result = await cinemaModel.get({
            date:time,
            offsets:this.num,
            cityid:cityid||1
        });
        let result2= await cinemaModel.get2({
            cityid
        });
        
        let html = cinemaView({});
        $('main').html(html);
        
        let list =this.list= result.cinemas;
        this.renderer(list);

        let citylist=result2.district.subItems; 
        let citylist1=result2.district.subItems[2].subItems;
        this.closeTab(citylist,citylist1);

        let bScroll = new Bscroll.default($('.cinema-list-box').get(0), {
            probeType: 2
        });

        bScroll.on('scrollEnd', async function () {
            if (this.maxScrollY > this.y) {
                that.num = that.num + 20;

                let result = await cinemaModel.get({
                    date: time,
                    offsets: that.num,
                    cityid:cityid||1
                });

                let list = result.cinemas;
                that.list = [...that.list, ...list];
                that.renderer(that.list);
            }
        });

        $('head title').html('影院');
        $('header').html('影院');
        that.num = 0;

        $('.list-line').on('tap',function(){
            let cinemaid=$(this).attr('data-id');
            localStorage.setItem('cinemaid',cinemaid);
            location.hash='cinemadetails';
        });

    }
}

export default new Cinema();