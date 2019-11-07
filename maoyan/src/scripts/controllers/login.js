import loginView from './../views/login.art';
import indexController from './index';

class Login {

    login() {
        let newuser;
        let user = $('.normal-login-form #inp-username');
        let psd = $('.normal-login-form #inp-password');
        let btn = $('.login-btn');

        btn.on('tap', function () {
            var attr = JSON.parse(window.localStorage.getItem('result'));
            let flag = true;
            if (attr) {
                for (var i = 0; i < attr.length; i++) {
                    if (flag == true) {
                        if ((user.val() == attr[i].username)) {
                            var index = i;
                            flag = false;
                            if ((psd.val() == attr[index].password)) {
                                newuser = user.val();
                                window.localStorage.setItem('newuser', newuser);
                                flag = false;
                                alert('登录成功');
                                window.location.hash = 'profile';
                            } else {
                                alert('用户名或密码错误');
                                window.location.reload();
                                break;
                            }
                        } 
                    }

                }
            } else {
                alert('您还没有注册，请注册后登录');
                window.location.hash = 'register';
            }
            /* if(flag==false){
                alert('无该用户或用户名密码错误');
                window.location.reload();
            } */

        });
    }
    render() {
        indexController.render();
        let html = loginView({});
        $('#root').html(html);

        $('.loginback').on('tap', function () {
            window.history.back();
        });

        $('.register-now').on('tap', function () {
            location.hash = 'register';
        });

        this.login();
    }


}
export default new Login();