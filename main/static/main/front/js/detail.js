/**
 * Created by yjq on 2018/10/14.
 */
$(function () {
    var url = location.search;
    var id = url.split('=')[1];
    if(url === '') {
        window.href = '/index';
    }
    $.ajax({
        url: '/article/detail?id='+ id,
        type: 'get',
        dataType:'json',
        success:function (res) {
            var data = res.data;
            $('.single-meta>.time>a').text(data.in_date.replace('T',' '))
            $('.eye>a').text(data.view + ' views');
            $('.single-header>h1').text(data.title);
            $('#introduction>p').text(data.introduction);
            $('.single-main').append(data.content);
            $('.crumbs>.nav-tag').text(data.tagname);
            $('.crumbs>.nav-tag').attr('href','/index?menu='+data.tagid);
        },
        error: function (e) {
            console.log(e);
        }
    })
    $(".menu-button").click(function(e) {$(".menu-mini-nav").slideToggle(); } )
    getUserInfo();
})
function getUserInfo() {
    $.ajax({
            url:'/user/info',
            type: 'get',
            success: function (res) {
                var data = res.data;
                $('#author-img>img').attr('src',data.avatar_url);
                $('.au-name>a').text(data.nick).attr('title',data.nick);
                $('.author-word').append('<span class="quotes q1"></span>'+data.introduction+'   <span class="quotes q2"></span>')
            }
        })
    var postData = {
        page: 1,
        pagesize: 1
    };
    $.ajax({
        url: '/article',
        type: 'get',
        data: postData,
        success: function (res) {
            $('.au-name .au-title').text('总共'+res.total+'篇文章');
        },
        error: function (e) {
            console.log(e);
        }
    });
}