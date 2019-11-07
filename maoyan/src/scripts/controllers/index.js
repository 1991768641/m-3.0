const layoutView = require('../views/layout.art')
const layoutnavView=require('../views/layout-nav.art');

class Index {

    bindClick() {
        location.hash=$(this).attr('data-to');
    }
    
    render() {
        const html = layoutView({});
        const nav = layoutnavView({});
        let name=window.localStorage.getItem('newuser');
        var cityname = window.localStorage.getItem('city');
        var cityid = window.localStorage.getItem('cityid');

        if (!cityname) {
            window.localStorage.setItem('city', '北京');
            cityname = window.localStorage.getItem('city');
        }
        if (!cityid) {
            window.localStorage.setItem('cityid', '1');
            cityid = window.localStorage.getItem('cityid');
        }

        $('.navlist').html(nav);
        $('#root').html(html);

        $('footer .li-cinema').on('tap', this.bindClick);
        $('footer .li-movie').on('tap', this.bindClick);

        $('.li-name').on('tap',function(){
            if(name){
                window.location.hash='profile';
            }
            else{
                window.location.hash='login';
            }
        })
    }
}
export default new Index();