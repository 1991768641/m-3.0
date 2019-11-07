import profileView from './../views/profile.art';
import indexController from './index';

class Profile{

    render(){
        let name=window.localStorage.getItem('newuser');

        if(name){
            indexController.render();
            let html=profileView({});
            $('main').html(html);
            $('head title').html('我的');
            $('header').html(name);
        }
        else{
            location.hash='login';
        }

        $('.loginout').on('tap',function(){
            window.localStorage.removeItem('newuser');
            alert('退出成功');
            window.location.reload();
        });
    }
}

export default new Profile();