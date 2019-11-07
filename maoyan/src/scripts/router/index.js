//显示首页的壳子
import indexController from '../controllers/index';
import movieController from '../controllers/movie';
import cinemaController from '../controllers/cinema';
import cinemadetailsController from '../controllers/cinemadetails';
import profileController from '../controllers/profile';
import detailController from '../controllers/detail';
import hotController from '../controllers/hot';
import downloadController from '../controllers/download';
import cityController from '../controllers/city';
import searchController from '../controllers/search';
import loginController from '../controllers/login';
import registerController from '../controllers/register';

class router {
    constructor() {
        this.render();
    }
    render() {
        window.addEventListener('load', this.pageload.bind(this));
        window.addEventListener('hashchange', this.handhashchange.bind(this));
    }

    setactiveClass(hash) {
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active');
    }

    renderDOM(hash) {
        let pagetoController = {
            movieController,
            cinemaController,
            profileController,
            detailController,
            hotController,
            downloadController,
            cityController,
            searchController,
            loginController,
            registerController,
            cinemadetailsController
        }
        pagetoController[hash + 'Controller'].render();

    }
    
    pageload() {
        let hash = location.hash.substr(1) || 'movie';
        let reg = new RegExp('^(\\w+)', 'g');
        let path = reg.exec(hash);

        indexController.render();
        location.hash = hash;

        this.renderDOM(path[1]);
        this.setactiveClass(path[1]);
    }
    handhashchange() {
        let hash = location.hash.substr(1);
        let reg = new RegExp('^(\\w+)', 'g');
        let path = reg.exec(hash);
        this.renderDOM(path[1]);
        this.setactiveClass(path[1]);
    }

}
new router();