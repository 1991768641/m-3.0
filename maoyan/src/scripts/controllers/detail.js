import detailView from './../views/detail.art';
import detaillistView from './../views/detail-nav.art';
import detailhideView from './../views/detail-hideshow.art';
import detailModel from './../models/detail';

const Bscroll = require('better-scroll');

class Detail {
    constructor() {
        this.list = []
        this.time = 0
        this.detailitem=[]
    }

    renderer(list) {
        let detaillisthtml = detaillistView({
            list
        })
        
        $('.detail-list-wrap').html(detaillisthtml);
    }

    detailtitle(detailitem){
        let detailhidehtml=detailhideView({
            detailitem
        })
        $('.movebox .hideshow').html(detailhidehtml);
    }

    async render() {
        let that = this;
        
        let date = new Date();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let days=date.getDay();
        let week=['日','一','二','三','四','五','六'];
        let weeks;

        let time = date.getTime() + '';
        this.time = time;
        
        let result = await detailModel.get({
            time: this.time
        });

        let hash=location.hash;
        let ids=hash.replace(/[^0-9]/ig, "");
        let detailmovieid=ids;

        let result1=await detailModel.get1({
            detailmovieid:detailmovieid
        });

        let html = detailView({});
        $('#root').html(html);

        let list = this.list = result.cinemas;
        let detailitem=this.detailitem= result1.detailMovie;

        this.renderer(list);
        this.detailtitle(detailitem);

        let bScroll = new Bscroll.default($('.detailbox').get(0), {
            probeType: 2
        });

        let bScrollcow = new Bscroll.default($('.show-day').get(0), {
            probeType: 2,
            scrollX:true
        });

        $('.back').on('tap', function () {
            window.history.back();
        });
        
        let showDay=$('.showDay');
        
        for(let i=0;i<showDay.length;i++){

            let times=month+'月'+day+'日';
            weeks='周'+week[i+1];

            if(i==0){
                weeks='今天';
            }
            else if(i==1){
                weeks='明天';
            }
            else if(i==2){
                weeks='后天';
            }
            $('.showDay').eq(i).html(weeks+times);
            day++;   
        }

    }
}
export default new Detail();