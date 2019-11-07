import registerView from './../views/register.art';
import indexController from './index';

class Login {

    register() {
        
        var person = {
            'username': '',
            'password': ''
        };

        let user = $('.normal-register-form #inp-username');
        let psd = $('.normal-register-form #inp-password');
        let btn = $('.register-btn');
        let reuser = /^[\w]{3,10}$/;
        let repsd = /^[\w]{3,10}$/;
        let flag1, flag2;

        user.on('input', function () {
            person.username = user.val();
            if (person.username) {
                if (reuser.test(person.username)) {
                    flag1 = true;
                } else {
                    flag1 = false;
                }
            } else {
                flag1 = false;
            }
        });

        psd.on('input', function () {
            person.password = psd.val();
            if (person.password) {
                if (repsd.test(person.password)) {
                    flag2 = true;
                } else {
                    flag2 = false;
                }
            } else {
                flag2 = false;
            }
        });

        btn.on('tap', function () {
            let result=window.localStorage.getItem('result');
            if (flag1 == true && flag2 == true) {
                var newresult = [];
                if (result) {
                    newresult = JSON.parse(window.localStorage.getItem('result'));
                    let flag=true;
                    for (let i = 0; i < newresult.length; i++) {
                        if (newresult[i].username == user.val()) {
                            alert('该用户已被注册');
                            window.location.reload();
                            flag=false;
                            break;
                        } 
                    }
                    if(flag){
                        newresult.push(person);
                        window.localStorage.setItem('result',JSON.stringify(newresult));
                        alert('注册成功');
                        location.hash='login';
                    }

                } else {
                    var result1 = [];
                    result1.push(person);
                    window.localStorage.setItem('result',JSON.stringify(result1));
                    alert('注册成功');
                    location.hash='login';
                }
            } else {
                alert('信息填写有误，请重新填写');
                window.location.reload();
            }

        });
    }

    render() {
        indexController.render();
        let html = registerView({});
        $('#root').html(html);

        $('.loginback').on('tap', function () {
            window.history.back();
        })
        $('.login-now').on('tap', function () {
            location.hash = 'login';
        });
        this.register();
    }
}
export default new Login();