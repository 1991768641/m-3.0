import cinemalistView from '../views/cinemadetails.art';
const cinemaModel = require('./../models/cinemas');

class Cinemalist {
    constructor() {
        this.title='',
        this.list=[],
        this.addr=''
    }
    async render() {
        let cinemaid = localStorage.getItem('cinemaid');
        let result = await cinemaModel.get1({
            cinemaid: cinemaid
        })
        let title=this.title=result.showData.cinemaName;
        let movies=this.list=result.showData.movies;
        let cinemadata=this.addr=result.cinemaData;

        let html = cinemalistView({
            title,
            movies,
            cinemadata
        })
        $('#root').html(html);

        this.myswiper();

        $('.back').on('click',function(){
            window.history.back();
        })
    }

    myswiper() {
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: false, //可选选项，自动滑动
            slidesOffsetBefore: 75,
            slidesPerView: 'auto',
        })
        new Swiper('.swiper-container');
        var mySwiper = document.querySelector('.swiper-container').swiper
    }
}

export default new Cinemalist();