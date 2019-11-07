import cityView from './../views/city.art';
import cityitemView from './../views/cityitem.art';
import cityModle from './../models/city.js';

class City {
    constructor() {
        this.list = []
    }

    renderer(list) {

        let cityitemhtml = cityitemView({
            list
        })

        $('.city-list-box').html(cityitemhtml);
    }

    createdhot (obj) {
        var citys={
            citynames:'',
            cityids:''
        }
        citys.citynames= obj.html();
        citys.cityids=obj.attr('data-id');

        var result=localStorage.getItem('citys');
        var resultlist=JSON.parse(result);

        if(result){
            resultlist.unshift(citys);
            localStorage.setItem('citys',JSON.stringify(resultlist));
        }else{
            var newresult=[];
            newresult.unshift(citys);
            localStorage.setItem('citys',JSON.stringify(newresult));
        }
    }
    

    async render() {
        let result = await cityModle.get({});
        let list = this.list = result.cts;
        let that=this;
        let historycity=[];

        let newcitys=JSON.parse(localStorage.getItem('citys'));
        for(var i=0;i<3;i++){
            historycity.push(newcitys[i]);
        }

        let html = cityView({historycity});
        $('#root').html(html);
        this.renderer(list);

        $('.city-list .city-item').on('tap', function () {
            window.localStorage.setItem('city', $(this).attr('data-nm'));
            window.localStorage.setItem('cityid', $(this).attr('data-id'));
            that.createdhot($(this));
            window.history.back();
        });
        $('.city-hotitem').on('tap',function(){
            window.localStorage.setItem('city', $(this).html());
            window.localStorage.setItem('cityid', $(this).attr('data-id'));
            that.createdhot($(this));
            window.history.back();
        });
        $('.city-nowlist .city-item').on('tap', function () {
            window.localStorage.setItem('city', $(this).html());
            window.localStorage.setItem('cityid', $(this).attr('data-id'));
            that.createdhot($(this));
            window.history.back();
        });

        $('.city-fail').on('tap',function(){
            window.location.reload();
        });
    }
}

export default new City();


/*
    formatList(data, field) {
        var letter_reg = /^[A-Z]$/;
        var fin = [];
        var list = new Array();
        for (var i = 0; i < data.length; i++) {
            // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
            list["#"] = new Array();
            // 首字母 转 大写英文
            var letter = data[i][field].substr(0, 1).toUpperCase();
            // 是否 大写 英文 字母
            if (!letter_reg.test(letter)) {
                letter = "#";
            }
            // 创建 字母 分组
            if (!(letter in list)) {
                list[letter] = new Array();
            }
            // 字母 分组 添加 数据
            list[letter].push(data[i]);
        }
        // 转换 格式 进行 排序；
        var resault = new Array();
        for (var key in list) {
            resault.push({
                letter: key,
                list: list[key]
            });
        }
        resault.sort(function (x, y) {
            return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
        });
        // # 号分组 放最后
        var last_arr = resault[0];
        resault.splice(0, 1);

        // 转换 数据 格式
        for (var i = 0; i < resault.length; i++) {
            var json_sort = {};
            json_sort["title"] = resault[i].letter;
            json_sort["items"] = resault[i].list;
            fin.push(json_sort);
        }

        return fin;
    }
*/