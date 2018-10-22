var pageIndex = 1;
var nav = -1;
function getAdvertData() {
    var postData = {
        page: 1,
        pagesize: 1
    };
    $.ajax({
        url: '/ad',
        type: 'get',
        data: postData,
        success: function (res) {
            $("#g-sidebar-top>a>img").attr('src',res.data[0].coverPicture);
        }
    })
}
function getChoiceArticle() {
    var postData = {
        page: 1,
        pagesize: 4
    };
    $.ajax({
        url: '/hot',
        type: 'get',
        data: postData,
        success: function (res) {
            var data = res.data;
            var $ul = $(".daodu>.dd-list");
            if(!res.data.length) {
                $ul.append('<li style="text-align: center">暂无数据</li>');
                return ;
            }
            for(var i = 0;i < data.length;i++) {
                $ul.append('<li>' +
                    '<figure class="dd-img">' +
                    '<a href="/front/article?id='+data[i].id+'">' +
                    '<img src="'+data[i].coverPicture+'" alt="吴少波_三思荟 | 新零售势道法术器模式"></a></figure>' +
                    '<div class="dd-content">' +
                    '<h2 class="dd-title"><a href="/front/article?id='+data[i].id+'">'+data[i].title+'</a></h2>' +
                    '<div class="dd-site xs-hidden">'+data[i].introduction+'</div></div></li>')
            }
        },
        error: function (e) {
            $('.remen').append('<li style="text-align: center">暂无数据</li>');
        }
    })
}
function getRecentArticle() {
    var postData = {
        page: 1,
        pagesize: 5
    };
    $.ajax({
        url: '/article',
        type: 'get',
        data: postData,
        success: function (res) {
            var data = res.data;
            var $ul = $("#rencent-posts>ul");
            if(!res.data.length) {
                $ul.append('<li style="text-align: center">暂无数据</li>');
                return ;
            }
            for(var i = 0;i < data.length;i++) {
                $ul.append('<li><a href="/front/article?id='+data[i].id+'">'+data[i].title+'</a></li>')
            }
        }
    })
}
function getHotArticle() {
    var postData = {
        page: 1,
        pagesize: 5
    };
    $.ajax({
        url: '/hot',
        type: 'get',
        data: postData,
        success: function (res) {
            var data = res.data;
            var $ul = $(".remen");
            if(!res.data.length) {
                $ul.append('<li style="text-align: center">暂无数据</li>');
                return ;
            }
            for(var i = 0;i < data.length;i++) {
                $ul.append('<li><a href="/front/article?id='+data[i].id+'">'+data[i].title+'</a></li>')
            }
        },
        error: function (e) {
            $('.remen').append('<li style="text-align: center">暂无数据</li>');
        }
    })
}
function getHeadlines() {
    var postData = {
        page: 1,
        pagesize: 6
    };
    $.ajax({
        url: '/article',
        type: 'get',
        data: postData,
        success: function (res) {
            var data = res.data;
            var $heading = $('.headlinesArticle>ul');
            $heading.empty();
            for (var i = 0;i < data.length;i++) {
                $heading.append('<li><h3><a href="/front/article?id='+data[i].id+'">'+data[i].title+'</a></h3></li>')
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
}
function getCarouselList() {
    var postData = {
        page: 1,
        pagesize: 5
    };
    $.ajax({
        url: '/carousel',
        type: 'get',
        data: postData,
        success: function (res) {
            var data = res.data;
            var $owl = $('#owl-demo');
            var $clickBtn = $('.owl-pagination')
            for (var i = 0;i < data.length;i++) {
                $owl.append('<div class="item">' +
                    '<div class="slider-img">' +
                    '<a href="/front/article?id='+data[i].id+'">' +
                    '<img class="hdp-img" src="'+data[i].coverPicture+'" alt="吴少波_三思荟 | 新零售势道法术器模式">' +
                    '</a>' +
                    '</div>' +
                    '<div class="slider-content">' +
                    '<h2>' +
                    '<a href="/front/article?id='+data[i].id+'">'+data[i].title+'</a></h2>' +
                    '<div class="slidertext xs-hidden">'+data[i].introduction+'</div></div></div>');
            }
            $("#owl-demo").owlCarousel({
                autoPlay: true,
                slideSpeed : 300,
                paginationSpeed : 400,
                stopOnHover : true,
                singleItem:true
            });
        },
        error: function (e) {
            console.log(e);
        }
    })
}
function getNewArticlePage(page, navId) {
    var postData = {
        page: page,
        pagesize: 10
    };
    if(navId !== -1) {
        postData['tagid'] = navId;
    }
    $.ajax({
        url: '/article',
        type: 'get',
        data: postData,
        success: function (res) {
            var data = res.data;
            var $contentAjax = $('.content-ajax');
            $('article.type-post').remove();
            for (var i = 0;i < data.length;i++) {
                $contentAjax.append('<article class="post type-post status-publish format-standard has-post-thumbnail hentry category-wcy">' +
                    '<figure class="entry-img">' +
                    '<span class="sort"><a href="#">'+data[i].tagname+'</a></span>' +
                    '<a href="/front/article?id='+data[i].id+'"><img src="'+data[i].coverPicture+'" alt="吴少波_三思荟 | 新零售势道法术器模式"></a>' +
                    '</figure>' +
                    '<div class="entry-content">' +
                    '<h2 class="entry-title"><a href="/front/article?id='+data[i].id+'">'+data[i].title+'</a></h2>' +
                    '<div class="entry-site xs-hidden">'+data[i].introduction+'</div>' +
                    '<div class="entry-meta">' +
                    '<div class="time"><i></i><a>'+data[i].in_date.replace('T',' ')+'</a></div></div></div></article>')
            }
            if(pageIndex !== 1) {
                $('.page-up').show();
                if(res.data.length < 10 && res.total <= pageIndex * 10) {
                    $('.page-down').hide();
                } else {
                    $('.page-down').show();
                }
            }
            if(pageIndex === 1) {
                if(res.total <= 10) {
                    $('.page-down').hide();
                } else {
                    $('.page-down').show();
                }
                $('.page-up').hide();
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
function getUserInfo() {
    $.ajax({
        url:'/user/info',
        type: 'get',
        success: function (res) {
            var data = res.data
            $('.wushaobo').attr('src',data.avatar_url);
        }
    })
}
$(function () {

    $("img").lazyload({
        effect:"fadeIn"
    });
    $(document).on('click','.header-menu-nav>li,.menu-mini-nav>li',function(e) {
        e.stopPropagation();
        var index = $(this).index();
        $('.header-menu-nav>li.current-menu-item').removeClass('current-menu-item');
        $('#mini-nav>li.current-menu-item').removeClass('current-menu-item');
        $('#main-nav>li').eq(index).addClass('current-menu-item');
        $('#fixed-nav>li').eq(index).addClass('current-menu-item');
        $('#fixed-list>li').eq(index).addClass('current-menu-item');
        $('#mini-nav>li').eq(index).addClass('current-menu-item');
        pageIndex = 1;
        var nav = $(this).data('nav');
        if(nav === -1) {
            $('.top-list').show();
            $('.daodu').show();
            $('.tip').show();
            $('.cat-title').hide();
        }else if (nav === ''){
            window.location.href = '/front/article?id=-1'
        } else {
            $('.top-list').hide();
            $('.daodu').hide();
            $('.tip').hide();
            $('.cat-title').show();
            if (nav === 0) {
                $('.cat-title>h1').text('营销观点')
            }else if(nav === 1) {
                $('.cat-title>h1').text('营销策略');
            }else if(nav === 2) {
                $('.cat-title>h1').text('实战案例');
            }
        }
        getNewArticlePage(pageIndex, nav);
    }).on('click','.page-up',function (e) {
        e.stopPropagation();
        pageIndex--;
        getNewArticlePage(pageIndex);
    }).on('click','.page-down',function (e) {
        e.stopPropagation();
        pageIndex++;
        getNewArticlePage(pageIndex);
    });
    $(".menu-button").click(function(e) {$(".menu-mini-nav").slideToggle(); } );
    var url = location.search;
    var menu = url.split('=')[1];
    if(!!menu) {
        nav = menu;
        var index = parseInt(nav)+1;
        $('.header-menu-nav>li.current-menu-item').removeClass('current-menu-item');
        $('#mini-nav>li.current-menu-item').removeClass('current-menu-item');
        $('#main-nav>li').eq(index).addClass('current-menu-item');
        $('#fixed-nav>li').eq(index).addClass('current-menu-item');
        $('#fixed-list>li').eq(index).addClass('current-menu-item');
        $('#mini-nav>li').eq(index).addClass('current-menu-item');
        $('.top-list').hide();
        $('.daodu').hide();
        $('.tip').hide();
        $('.cat-title').show();
        if (nav === 0) {
            $('.cat-title>h1').text('取势第一')
        }else if(nav === 1) {
            $('.cat-title>h1').text('道法术器');
        }else if(nav === 2) {
            $('.cat-title>h1').text('3sd营销体系');
        }
        // getNewArticlePage(pageIndex, nav);
    }
    getNewArticlePage(pageIndex, nav);
    // getUserInfo();
    getAdvertData();
    getRecentArticle();
    getHotArticle();
    getChoiceArticle();
    getCarouselList();
    getHeadlines();
});