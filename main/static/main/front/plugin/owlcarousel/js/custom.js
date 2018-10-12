/**
 * Created by yjq on 2018/10/12.
 */
(function ($) {
    $(document).ready(function() {
        $('li.menu-item-has-children').hover(function() {
                $(this).find('ul').show();
                $('.nav-bg').stop().show()
            },
            function() {
                $(this).find('ul').hide();
                $('.nav-bg').hide()
            });
        $(window).scroll(function(){ if($(this).scrollTop()>130){$(".fixed").css("display","block")}else{$(".fixed").css("display","none")}})
        $(".menu-button").click(function() {$(".menu-mini-nav").slideToggle(); } )
        $(".date ul li").first().addClass("hov");
        $(".logindiv").hover(function(){$(this).addClass("hover");$(".login-links").css("display","block");},function(){$(this).removeClass("hover");$(".login-links").css("display","none")})
        $(".date ul li").hover(function(){$(this).addClass("hov").siblings().removeClass("hov");})
        $('#shang').click(function(){
            $('body,html').animate({scrollTop:0},500)
        });
        $("#comt").click(function() {
            $('body,html').animate({scrollTop: $(".ds-replybox").offset().top},500)

        });
        $("#xia").click(function() {
            $('body,html').animate({scrollTop: $("#footer").offset().top},500)

        });
        $('.single-main img').addClass("img-responsive").parent("a").addClass("fancybox-buttons").attr("rel","button");
        $('.fancybox-buttons').fancybox(
            {
                openEffect: 'none',
                closeEffect: 'none',

                prevEffect: 'none',
                nextEffect: 'none',

                centerOnScroll : true,

                closeBtn: false,

                helpers:
                    {
                        buttons:
                            {
                                position: 'bottom'
                            }
                    },

                afterLoad: function ()
                {
                    this.title = '第' + (this.index + 1) + '张, 总共 ' + this.group.length + '张' + (this.title ? ' - ' + this.title : '');
                }
            });
        $('.qq,.weixin').fancybox(
            {
                openEffect: 'none',
                closeEffect: 'none',

                prevEffect: 'none',
                nextEffect: 'none',

                centerOnScroll : true,

                closeBtn: false,

                helpers:
                    {
                        buttons:
                            {
                                position: 'bottom'
                            }
                    },

                afterLoad: function ()
                {
                    this.title = '扫一扫';
                }
            });

        $("#owl-demo").owlCarousel({
            autoPlay: true,
            slideSpeed : 300,
            paginationSpeed : 400,
            stopOnHover : true,
            singleItem:true

            // "singleItem:true" is a shortcut for:
            // items : 1,
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false

        });

// 使用 on() 使 js 对通过 Ajax 获得的新内容仍有效
        $(".page-nav a").on("click", function(){
            $(this).addClass("loading").text("LOADING...");
            $.ajax({
                type: "POST",
                url: $(this).attr("href"),
                success: function(data){
                    result = $(data).find(".content-ajax .post");
                    nextHref = $(data).find(".page-nav a").attr("href");
                    // 渐显新内容
                    $(".content-ajax").append(result.fadeIn(300));
                    $(".page-nav a").removeClass("loading").text("还有更多");
                    if ( nextHref != undefined ) {
                        $(".page-nav a").attr("href", nextHref);
                    } else {
                        // 若没有链接，即为最后一页，则移除导航
                        $(".page-nav").remove();
                    }
                }
            });
            return false;
        });
        function tin_check_login(){if(tin.uid>0) return true;if($("div.overlay").length<=0) $("#header").append('<div class="overlay"></div>');$("div.overlay").show(),$("body").addClass("fadeIn");$('#sign').removeClass("register").addClass("sign");$("div.overlay, form a.close").bind("click",function(){return $("body").removeClass("fadeIn"),$('#sign').removeAttr("class"),$("div.overlay").remove();});return false;};
    });


    $(document).ready(function(){
        $('.expand_collapse, .archives-yearmonth').css({cursor:"pointer"});
        $('.archives ul li ul.archives-monthlisting').hide();
        $('.archives ul li ul.archives-monthlisting:first').show();
        $('.archives ul li span.archives-yearmonth').click(function(){$(this).next().slideToggle('fast');return false;});
        $(".expand_collapse").click(function(){
            $(".archives ul li ul.archives-monthlisting").slideToggle("slow");
            $('.archives ul li ul.archives-monthlisting:first').slideToggle("fast");
            return false;
        });
    });


    jQuery(document).ready(function($) {
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $(document).on('click', '.comment-nav a', function(e) {
            e.preventDefault();
            $.ajax({
                type: "GET",
                url: $(this).attr('href'),
                beforeSend: function() {
                    $('.comment-nav').remove();
                    $('.commentlist').remove();
                    $('#loading-comments').slideDown();
                    $body.animate({scrollTop: $('#comments').offset().top - 65}, 800 );
                },//beforeSend
                dataType: "html",
                success: function(out) {
                    result = $(out).find('.commentlist');
                    abovenav = $(out).find('.comment-nav');
                    $('#loading-comments').slideUp(550);
                    $('#loading-comments').after(result.fadeIn(800));
                    result.after(abovenav);
                    $('.fn a').click (function() {$(this).attr('target','_blank');});
                }//success
            });//$.ajax
        });//function(e)
    });//ready

})(jQuery);
