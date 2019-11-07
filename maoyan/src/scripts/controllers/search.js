import searchView from './../views/search.art';
import searchlistView from './../views/search-list.art';
import searchMovie from './../models/search';
import indexController from './index';
import searchhistoryView from './../views/search-history.art';

class Search {
    constructor() {
        this.list = []
        this.list1 = []
        this.cityid = 1
        this.content = ''
    }

    renderer(list, list1, moviestotal, cinemastotal) {
        let searchlisthtml = searchlistView({
            list,
            list1,
            moviestotal,
            cinemastotal
        })
        $('.search-result .result-wrapper').html(searchlisthtml);
    }

    movies(list, moviestotal) {
        let searchlisthtml = searchlistView({
            list,
            moviestotal
        })
        $('.search-result .result-wrapper').html(searchlisthtml);

        $('.result-wrapper .list .moviecell').on('tap', function () {
            let id = $(this).attr('data-id');
            location.hash = `detail/` + id;
        })
    }

    deletehistory() {

        $('.history-item .del-word').on('tap', function () {
            let history = localStorage.getItem('search-history');
            let historylist = JSON.parse(history);
            let index = $(this).attr('data-index');

            historylist.splice(index, 1);
            localStorage.setItem('search-history', JSON.stringify(historylist));
            if (history) {
                $('.search-history').show();
                let searchhistoryhtml = searchhistoryView({
                    historylist
                });
                $('.search-history').html(searchhistoryhtml);
                location.reload();
            }
        });
    }

    cinemasart(list1, cinemastotal) {
        let searchlisthtml = searchlistView({
            list1,
            cinemastotal
        })
        $('.search-result .result-wrapper').html(searchlisthtml);
    }

    render() {
        let newhistory = [];
        let history = localStorage.getItem('search-history');
        let historylist = JSON.parse(history);
        let that = this;
        indexController.render();
        let html = searchView({});
        $('#root').html(html);

        if (history) {
            $('.search-history').show();
            let searchhistoryhtml = searchhistoryView({
                historylist
            });
            $('.search-history').html(searchhistoryhtml);
        }
        //删除历史记录
        this.deletehistory();

        //根据搜索历史进行请求接口
        $('.history-item .word').on('tap', async function () {
            $('.search-history').hide();
            var content = $(this).html();
            $(".search-input").val(content);
            let cityid = this.cityid = window.localStorage.getItem('cityid');
            let type = window.localStorage.getItem('type');
            let result = await searchMovie.get({
                content: content,
                cityid: cityid,
                type: type
            });

            let cinemastotal, moviestotal;
            let list1, list;

            if (result.movies) {
                list = that.list = result.movies.list;
                moviestotal = result.movies;
            } else {
                list = null;
                moviestotal = null;
            }

            if (result.cinemas) {
                list1 = that.list1 = result.cinemas.list;
                cinemastotal = result.cinemas;
            } else {
                list1 = null;
                cinemastotal = null;
            }

            if (cinemastotal != null && moviestotal != null) {
                that.renderer(list, list1, moviestotal, cinemastotal);
                $('.search-result').show();
            } else if (cinemastotal != null && moviestotal == null) {
                that.cinemasart(list1, cinemastotal);
                $('.search-result').show();
            } else {
                that.movies(list, moviestotal);
                $('.search-result').show();
            }

        });

        $('.cancel').on('tap', function () {
            window.history.back();
        });
        $('.back').on('tap', function () {
            window.history.back();
        });

        $(".search-input").keyup(async function (ev) {
            var content = $('.search-input').val();
            $('.search-history').hide();
            $('.del-input').show();
            $('.del-input').on('click', function () {
                $('.search-input').val("");
                $('.del-input').hide();
                $('.search-result').hide();
                history = localStorage.getItem('search-history');
                historylist = JSON.parse(history);
                if (history) {
                    let searchhistoryhtml = searchhistoryView({
                        historylist
                    });
                    $('.search-history').html(searchhistoryhtml);
                    $('.search-history').show();
                }
                that.deletehistory();
            });
            if (content != '') {
                if (ev.keyCode == 13) {
                    if (history) {
                        newhistory = JSON.parse(history);
                        newhistory.push($('.search-input').val());
                        localStorage.setItem('search-history', JSON.stringify(newhistory));
                    } else {
                        var newhistory1 = [];
                        newhistory1.push($('.search-input').val());
                        localStorage.setItem('search-history', JSON.stringify(newhistory1));
                    }

                    let cityid = this.cityid = window.localStorage.getItem('cityid');
                    let type = window.localStorage.getItem('type');
                    let result = await searchMovie.get({
                        content: content,
                        cityid: cityid,
                        type: type
                    });

                    let cinemastotal, moviestotal;
                    let list1, list;

                    if (result.movies) {
                        list = that.list = result.movies.list;
                        moviestotal = result.movies;
                    } else {
                        list = null;
                        moviestotal = null;
                    }

                    if (result.cinemas) {
                        list1 = that.list1 = result.cinemas.list;
                        cinemastotal = result.cinemas;
                    } else {
                        list1 = null;
                        cinemastotal = null;
                    }

                    if (cinemastotal != null && moviestotal != null) {
                        that.renderer(list, list1, moviestotal, cinemastotal);
                        $('.search-result').show();
                    } else if (cinemastotal != null && moviestotal == null) {
                        that.cinemasart(list1, cinemastotal);
                        $('.search-result').show();
                    } else {
                        that.movies(list, moviestotal);
                        $('.search-result').show();
                    }
                }

            } else {
                $('.search-result').hide();
                $('.del-input').hide();
                $('.search-history').show();

            }
        });
    }
}

export default new Search();