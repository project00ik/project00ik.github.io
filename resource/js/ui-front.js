
$(document).ready(function () {
  var appHidden = function() { 
		var agent = navigator.userAgent;
		agent = agent.toLowerCase();
		
		if (agent.indexOf("ipod") != -1 || agent.indexOf("iphone") != -1 || agent.indexOf("ipad") != -1) { // iOS일때
      $('body').addClass('ios');
    } else { // iOS가 아닐때
      $('body').addClass('android');
		}
  }; appHidden();
  
  // 상품상세 swiper
  // var swiper = new Swiper('.sm-product-slide .swiper-container', {
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
  // });

  // 메인비주얼 swiper
  // var swiper = new Swiper('.sm-visual-slide .swiper-container', {
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  // });

  // 메인하단 swiper
  // var swiper = new Swiper('.sm-btm-slide .swiper-container', {
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'fraction',
  //   },
  // });

  // 스크롤형 swiper (카테고리 3depth)
  // var swiper = new Swiper('.scrollSwiper', {
  //   slidesPerView: 'auto',
  //   preventClicks: true,
  //   preventClicksPropagation: false,
  //   observer: true,
  //   observeParents: true
  // });
  // var $scrollSwiperItem = $('.scrollSwiper .swiper-wrapper .swiper-slide .scroll-tab-btn');
  // $scrollSwiperItem.on('click', function(){
  //   var target = $(this).parent();
  //   $scrollSwiperItem.parent().removeClass('on')
  //   target.addClass('on');
  //   muCenter(target);
  // });

  // toggleBtn(); // 토글버튼 (찜하기 버튼)
  // toggleLineArea(); // 토글영역 (line 디자인형)
  // toggleArea() // 토글영역
  // toggleSlideArea() // 토글 슬라이드(상품평 영역)
  // chkToggle() // checkbox 토글
  // radioToggle() // radio 토글 시 textarea 영역 show/hide
  // accordion(); // 아코디언
  // tab(); // 탭
  // photoReview(); // 포토리뷰 (팝업)
  // customSelect(); // 디자인셀렉트 관련 js(상품목록 정렬하기)
  // allChecked(); // all checked
  // btnMenu(); // 메뉴보기(카테고리)
  // menuTab(); // 메뉴탭(카테고리)
  // detailOptionLy(); // 상품상세 옵션 레이어 이벤트
  // menuLy(); // 3depth 레이어 메뉴선택
  // searchInputBox(); // 검색 input clear
  // lySearchPop(); // 검색어 입력시 노출 레이어
  // orderMoreArea(); // 주문결재 주문상품정보 전체보기 토글
  // productListLineAdd() // 상품리스트 4번째마다 라인 style 추가
  // ratingBtnArea(); // 포토리뷰 별점버튼 js
  // txtEq(); // 포토리뷰 글자수 0 이상 active(font-color) js
  // lyShare(); // 공유하기 팝업
  // popHasBtn(); // 팝업 하단에 버튼이 있는 경우
  // popHasSelect() // 이용약관 셀렉트가 있는 경우
  
  $(window).scroll(function () {
    /* 스크롤 방향 체크 [S] */
    if ($(this).scrollTop() >= 43) {
      nowScrollTop = $(this).scrollTop();
      $('body').removeClass('scrollTop');
      if (wheelDelta() == 'down') {
        $('body').removeClass('scrollUp');
        $('body').addClass('scrollDown');
      }
      if (wheelDelta() == 'up') {
        $('body').removeClass('scrollDown');
        $('body').addClass('scrollUp');
      }
      // - 초기화
      prevScrollTop = nowScrollTop;
    } else { 
      $('body').addClass('scrollTop');
    }
    // - 스크롤 움직임 감지
    $.fn.scrollStopped = function (callback) {
      var that = this, $this = $(that);
      $this.scroll(function (ev) {
        clearTimeout($this.data('scrollTimeout'));
        $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
      });
    };
    // - 스크롤 멈췄을 때 
    // $(window).scrollStopped(function (ev) {
    //   console.log(ev);
    //   console.log('scroll stopped');
    // }); 
    /* 스크롤 방향 체크 [E] */
    
    // fixedArea(); // 플로팅 버튼 관련 스크롤 이벤트(fixed-area share, top)
    nowScrollPosition(); // 현재 스크롤 위치 기억
  });
  
});

function lyOpen(id) {
  // 팝업
  var $lyAcive = $('#' + id);
  // var winHeight = $(window).outerHeight()
  $('body').attr('data-scroll', window.oriScroll); // data-scroll에 스크롤 위치 저장
  $('body').removeClass('scrollTop');
  $('body').addClass('nonScroll');
  // $lyAcive.css({
  //   'height': winHeight
  // });
  $lyAcive.show();
  $lyAcive.animate({ top: '0' }, 50);
  $lyAcive.addClass('open');
  // 팝업 하단에 버튼이 있는 경우
  if($lyAcive.find('.popBttom').length > 0){
    $lyAcive.addClass('hasBottm');
  } else {
    $lyAcive.removeClass('hasBottm');
  }
  // 이용약관 셀렉트가 있는 경우
  if($lyAcive.find('.popBttom02').length > 0){
    $lyAcive.addClass('hasBottm02');
  } else {
    $lyAcive.removeClass('hasBottm02');
  }
}

function mdOpen(id) {
  // 모달 팝업
  var $body = $('body');
  var $popAcive = $('#' + id);
  var $dim = '<div class="dim"></div>';
  var popW = $popAcive.outerWidth() / 2;
  var popH = $popAcive.outerHeight() / 2;

  $body.addClass('nonScroll');
  $body.css('top', '-233px')
  $('.mdPopup').hide();
  $popAcive.css('margin-left', '-' + popW + 'px');
  if ($(window).height() > $popAcive.outerHeight()) {
    $popAcive.css('margin-top', '-' + popH + 'px');
  }
  $popAcive.fadeIn();
  $('.nonScroll').find('.wrap').after($dim);
  $('.dim').on('click', function (e) {
    $(this).hide();
    $body.removeClass('nonScroll');
    $popAcive.hide();
    e.preventDefault();
  });
}

function lyClose() {
  // 팝업닫기
  $('body').removeClass('nonScroll');
  $('.dim').hide();
  $('.lyPopup').animate({ top: '100%' }, 50);
  // data-scroll 저장된 스크롤 위치로 이동
  var scrollPoint = $('body').attr('data-scroll');
  $(window).scrollTop(scrollPoint);
}

function mdClose() {
  // 팝업닫기
  $('body').removeClass('nonScroll');
  $('.dim').hide();
  $('.mdPopup').hide();
  // data-scroll 저장된 스크롤 위치로 이동
  var scrollPoint = $('body').attr('data-scroll');
  $(window).scrollTop(scrollPoint);
}

function lyShare(){
  // 공유하기 팝업
  $('.popBtnShare').each(function(){
    $(this).on('click', function(){
      $(this).addClass('on');
      if($(this).hasClass('on')){
        $('.lyShare').fadeIn();
        $('body').addClass('nonScroll');
      }
    });
  });
}

function innerLyClose(){
  $('.innerLyClose').each(function(){
    $(this).on('click', function(){
      $(this).closest('.lyPopup').removeClass('open')
      $(this).closest('.lyPopup').animate({ top: '100%' }, 50);
    })
  });
}

function lyShareClose() {
  $('body').removeClass('nonScroll');
  $('.lyShare').fadeOut();
  // data-scroll 저장된 스크롤 위치로 이동
  var scrollPoint = $('body').attr('data-scroll');
  $(window).scrollTop(scrollPoint);
}

function searchInputBox(){
  // 검색 input clear
  $('.search-input-box, .clear-input-box').each(function(){
    $(this).find('.clearInput').on('keyup focus', function(){
      $(this).siblings('.clearBtn').attr('style', 'visibility: visible');

      if($(this).val().length == 0){
        $(this).siblings('.clearBtn').attr('style', 'visibility: hidden');
      } else {
        $(this).siblings('.clearBtn').attr('style', 'visibility: visible');
      }
    });
  
    $(this).find('.clearInput').on('blur', function(){
      $(this).siblings('.clearBtn').attr('style', 'visibility: hidden');
    });
  
    $(this).find('.clearBtn').on('click touchstart', function(){
      $(this).closest('.clear-input-box').find('.clearInput').val('');
      $(this).closest('.clear-input-box').find('.clearBtn').attr('style', 'visibility: hidden');
      return false;
    });
  });
}

function lySearchPop(){
  // 검색어 입력시 노출 레이어 
  $('.search-input').on('click focus', function(){
    $('body').attr('data-scroll', window.oriScroll); // data-scroll에 스크롤 위치 저장
    $('body').addClass('nonScroll');
    $('.lySearchPop').show();
  });
}

function searchLyClose() {
  // 검색어 입력 팝업닫기
  $('body').removeClass('nonScroll');
  $('.lySearchPop').hide();
  // data-scroll 저장된 스크롤 위치로 이동
  var scrollPoint = $('body').attr('data-scroll');
  $(window).scrollTop(scrollPoint);
}


function menuTab(){
  $('.menuTabArea').each(function(){
    var $menuTabName = $(this);
    var $menuTabBtn = $menuTabName.find('.menuTabBtn');
    var $menuTabCont = $menuTabName.find('.menuTabCont');
    $menuTabCont.hide();
    $menuTabBtn.eq(0).addClass('on');
    $menuTabCont.eq(0).show();
    $menuTabBtn.on('click', function () {
      var $activeBtn = $(this);
      $activeBtn.closest('.menuTabArea').find('> ul > .menuTabBtn').removeClass('on');
      $activeBtn.addClass('on');
      $activeBtn.closest('.menuTabArea').find('> .menuTabCont').hide();
      var activeTab = $activeBtn.attr('data-tab');
      $('#' + activeTab).show();
    });
  })
}

function btnMenu(){
  // 메뉴보기
  $('.btn-menu').on('click', function () {
    $('.sm-ly-category').addClass('open');
    $('body').addClass('nonScroll');
    // $('html, body').scrollTop(0);
  });
  $('.menuClose').on('click', function () {
    $(window).scrollTop(window.oriScroll);
    $('.sm-ly-category').removeClass('open');
    $('body').removeClass('nonScroll');
  });
}

function menuLy(){
  // 3depth 레이어 메뉴선택
  $('.menuLy').each(function(){
    $(this).find('.sm-menu-ly-List > li').on('click', 'label', function(){
      var menuTxt = $(this).find('span').text();
      $('.menuTit').text(menuTxt);
      $('body').removeClass('nonScroll');
      $('.menuLyBtn').removeClass('on');
      $('.menuLy').slideUp();
      $('.popDim').remove();
    });
  });
  $('.menuLyBtn').on('click', function(){
    var menuTit = $(this);
    menuTit.toggleClass('on');
    if(menuTit.hasClass('on')){
      $('body').addClass('nonScroll');
      $('.menuLy').slideDown();
      $('.menuLy').before('<div class="popDim"></div>');
    } else {
      $('body').removeClass('nonScroll');
      $('.menuLy').slideUp();
      $('.popDim').remove();
    }
  })
}

function tab() {
  $('.tabArea').each(function () {
    var $tabName = $(this);
    var $tabBtn = $tabName.find('.tabBtn');
    var $tabCont = $tabName.find('.tabCont');
    $tabCont.hide();
    $tabBtn.eq(0).addClass('on');
    $tabCont.eq(0).show();
    $tabBtn.on('click', function () {
      var $activeBtn = $(this);
      $activeBtn.closest('.tabArea').find('.tabBtn').removeClass('on');
      $activeBtn.addClass('on');
      $activeBtn.closest('.tabArea').find('.tabCont').hide();
      var activeTab = $activeBtn.attr('data-tab');
      $('#' + activeTab).show();
    });

  })
}

function detailOptionLy(){
  // 상품상세 옵션 레이어 이벤트
  $('.detailLyBtn').on('click', function () {
    $('body').attr('data-scroll', window.oriScroll); // data-scroll에 스크롤 위치 저장
    $('body').removeClass('scrollTop');
    $('body').addClass('detailLyOpen');
    $('.sm-ly-detail').addClass('open');
    $('.sm-ly-detail').after('<div class="detaileLyDim"></div>');
    $('.detaileLyDim').on('click', function(){
      $(this).remove();
      $('.sm-ly-detail').removeClass('open');
      $('body').removeClass('detailLyOpen');
      // data-scroll 저장된 스크롤 위치로 이동
      var scrollPoint = $('body').attr('data-scroll');
      $(window).scrollTop(scrollPoint);
    });
  });

}

function orderMoreArea(){
  // 주문결재 주문상품정보 전체보기 토글
  $('.orderMoreArea').each(function(){
    var $orderMoreArea = $(this); 
    var $orderMoreBtn = $orderMoreArea.find('.moreBtn');
    $orderMoreBtn.on('click', function(){
      $(this).toggleClass('on');
      if($(this).hasClass('on')){
        $(this).closest('.orderMoreArea').addClass('open');
      } else {
        $(this).closest('.orderMoreArea').removeClass('open');
      }
    })
  })

}


function photoReview() {
  // 포토리뷰 목록
  $('.ptReview').each(function () {
    var $ptReview = $(this).find('> li');
    $ptReview.on('click', function () {
      var $openReview = $(this);
      $('.ptReview > li').removeClass('active');
      $openReview.addClass('active');
    });
  })
}

function ratingBtnArea(){
  // 포토리뷰 별점버튼 js
  $('.rating-btn-area').find('.btn-star').each(function(){
    $(this).on('click', function(){
      var starIndex = $(this).index() + 1;
      $(this).parent().attr('class','star'+ starIndex);
    })
  });
}

function txtEq(){
  // 포토리뷰 글자수 0 이상 active js
  var txtEq = $('.txt-eq').find('b');
  if(txtEq.text() >= 1){
    txtEq.addClass('active');
  } else {
    txtEq.removeClass('active');
  }
}

function toggleBtn(){
  // 토글버튼
  $('.tgBtn').each(function(){
    $(this).on('click', function(e){
      e.preventDefault();
      $(this).toggleClass("on");
    })
  });
}

function toggleLineArea(){
  // 토글영역
  $('.tgLineArea').each(function(){
    $(this).find('.tgLineBtn').on('click', function(e){
      var $active = $(this);
      e.preventDefault();
      $active.toggleClass("on");
      if($active.hasClass('on')){
        $active.closest('.tgLineArea').addClass('open');
        $active.closest('.tgLineArea').find('.tgLineCont').slideDown();
      } else {
        $active.closest('.tgLineArea').removeClass('open');
        $active.closest('.tgLineArea').find('.tgLineCont').slideUp();
      }
    });
  });
  // 주문결재 마지막 토글영역에 라인 style
  $('.sm-order .sm-line-layout2').last().addClass('last');
}

function toggleArea(){
  // 토글영역(show/hide)
  $(".tgArea").each(function(){
    $(this).find('.tgAreaBtn').on('click', function(){
      var $active = $(this);
      $active.toggleClass('on');
      if($active.hasClass('on')){
        $active.closest('.tgArea').addClass('open');
        $active.closest('.tgArea').find('.tgAreaCont').show();
      } else {
        $active.closest('.tgArea').removeClass('open');
        $active.closest('.tgArea').find('.tgAreaCont').hide();
      }
    });
  });
} 

function toggleSlideArea(){
  // 토글영역(slide모션)
  $(".tgSlide").each(function(){
    $(this).find('.tgSlideBtn').on('click', function(){
      var $active = $(this);
      $active.toggleClass('on');
      if($active.hasClass('on')){
        $active.closest('.tgSlide').addClass('open');
        $active.closest('.tgSlide').find('.tgSlideCont').slideDown();
      } else {
        $active.closest('.tgSlide').removeClass('open');
        $active.closest('.tgSlide').find('.tgSlideCont').slideUp();
      }
    });
  });
}

function toggleAreaClose() {
  // 닫기 버튼에  onclick="toggleAreaClose()" 넣어서 사용
  $('.tgAreaCont').hide();
  $(".tgArea").removeClass('open');
  $('.tgAreaBtn').removeClass('on');
}


function chkToggle(){
  // 체크토글영역
  $(".chkTg").each(function(){
    $(this).find('.chkTgBtn').on('click', function(){
      var $active = $(this);
      $active.toggleClass('on');
      if($active.find(".chk > input:checkbox").is(":checked") == true) {
        $active.addClass('on');
        $active.closest('.chkTg').addClass('open');
        $active.closest('.chkTg').find('.chkTgCont').show();
      } else {
        $active.removeClass('on');
        $active.closest('.chkTg').removeClass('open');
        $active.closest('.chkTg').find('.chkTgCont').hide();
      }
    });
  });
}

function radioToggle(){
  // 라디오 textarea show/hide
  $('.rdBtn').each(function(){
    $(this).on('click', function(){
      var $rdThis = $(this);
      $('.rdBtn').not($rdThis.addClass('on')).removeClass('on');
      if($('.rdTgArea .rdBtn').hasClass('on')){
        $('.rdTgCont').show();
      } else {
        $('.rdTgCont').hide();
      }
    });
  });  
}

function footerToggle(id){
  // footer 더보기 버튼
  var $footerActive = $('#' + id);
    var footerScrollPoint = $('.wrap').outerHeight() - $('.footer-wrap').outerHeight();
    $footerActive.closest('.footer-wrap').find('.footer-cont').stop().slideToggle(400);
    $footerActive.closest('.footer-wrap').toggleClass('open');
    $('html, body').animate({ scrollTop: footerScrollPoint }, 400);
}

function accordion(){
  // 아코디언
  var $acdName = $('.acdArea');
	var $acdBt = $acdName.find('.acdBtn');
	var $acdCt = $acdName.find('.acdCont');
	$acdBt.each(function(){
		$(this).on('click', function(e) {
      e.preventDefault();
      var $acdActive = $(this);
      var $acdBtnParent = $(this).parent();
      $acdBt.not($acdActive.toggleClass('on')).removeClass('on');
      if($acdBtnParent.hasClass('acdBtnArea')){
        $acdCt.not($acdActive.parent().parent().find($acdCt).slideToggle()).hide();
      } else {
        $acdCt.not($acdActive.parent().find($acdCt).slideToggle()).hide();
      }
    })
	});
}

function customSelect(){
  // 디자인셀렉트 관련 js
  $('.customSelect').each(function(){
    var $customSelect = $(this);
    $customSelect.find('.seleced-txt').on('click', function(){
      $(this).closest('.customSelect').toggleClass('on');
    });
    $customSelect.find('.select-list > li > label').on('click', function(){
      var selTxt = $(this).find('.sel-txt').text();
      $(this).closest('.customSelect').removeClass('on');
      $('.customSelect .seleced-txt').text(selTxt);
    });
  });
}

function inputPrice(){
  $('.input-price').find('input').on('keyup focus', function(){
    $(this).closest('.input-price').addClass('focus');
  })
  $('.input-price').find('input').on('blur', function(){
    $(this).closest('.input-price').removeClass('focus');
  });
}

function allChecked(){
  // all checked
	$('.allChk').each(function(){
		$(this).find(' > input').on('click', function(){
			$(this).closest('.allChkArea').find('.chk > input').prop('checked', this.checked);
    })
  })
  // 전체 선택이 아닐때 allChk checked false
  $('.allChkArea').find('.chk').on('click', function(){
    var $chk = $(this).closest('.allChkArea').find('.chk > input');
    var $chkLeng = $chk.length;
    var $chkCheckedLeng = $chk.filter(":checked").length;
    if($chkLeng == $chkCheckedLeng){
      $('.allChk').find('input').prop('checked', true);
    }else{
      $('.allChk').find('input').prop('checked', false);
    }
  });
}

function fixedArea(){
  // fixed-area share, top 버튼 관련 스크롤 이벤트
  if ($(this).scrollTop() >= 50) {
    $(".btn-fixed-top").fadeIn();
    $(".btn-fixed-share").addClass("up")
    $(".btn-fixed-home").addClass("up")
  } else {
    $(".btn-fixed-top").fadeOut();
    $(".btn-fixed-share").removeClass("up")
    $(".btn-fixed-home").removeClass("up")
  }

  $(".btn-fixed-top").on('click', function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 200);
    // $('html, body').scrollTop(0);
    return false;
  });
}

function detailLyClose() {
  // 닫기 버튼에  onclick="detailLyClose()" 넣어서 사용
  $('.detaileLyDim').remove();
  $('.sm-ly-detail').removeClass('open');
  $('body').removeClass('detailLyOpen');
}

/* 스크롤 방향 체크 */
// - 초기값
var prevScrollTop = 0;
var nowScrollTop = 0;
// - 재스크롤 시
function wheelDelta() {
  return prevScrollTop - nowScrollTop > 0 ? 'up' : 'down';
};

function nowScrollPosition() {
  // 현재 스크롤 위치 기억
  window.oriScroll = $(window).scrollTop();
  // console.log(window.oriScroll);
  return false;
}

function nowScrollReturn() {
  //스크롤 위치 되돌림
  $(window).scrollTop(window.oriScroll);
  return false;
}

function productListLineAdd(){
  // 상품리스트 4번째마다 라인 style 추가
  window.onload = function () {
    $('.sm-list-wrap .sm-list').find('.sm-product-unit:nth-child(4n+4)').after('<li class="line"></li>')
  }
}

function muCenter(target){
  // 스크롤형 swiper (카테고리 3depth)
  var snbwrap = $('.scrollSwiper .swiper-wrapper');
  var targetPos = target.position();
  var box = $('.scrollSwiper');
  var boxHarf = box.width()/2;
  var pos;
  var listWidth=0;
  
  snbwrap.find('.swiper-slide').each(function(){ listWidth += $(this).outerWidth();}) // 선택요소 까지 길이
  
  var selectTargetPos = targetPos.left + target.outerWidth()/2;
  if (selectTargetPos <= boxHarf) { // left
      pos = 0;
  }else if ((listWidth - selectTargetPos) <= boxHarf) { //right : target 절반 이후 영역이 boxHarf 보다 작을경우 right 정렬
      pos = listWidth-box.width();
  }else {
      pos = selectTargetPos - boxHarf; // 중앙정렬
  }
  
  setTimeout(function(){snbwrap.css({
    "transform": "translate3d("+ (pos*-1) +"px, 0, 0)",
    "transition-duration": "500ms"
  })}, 200);
}

function popHasBtn(){
  // 팝업 하단에 버튼이 있는 경우
  // $('.lyPopup').each(function(){
  //   if($(this).find('.popBttom').length >= 0){
  //     $('.lyPopup').addClass('hasBottm');
  //   }
  // });
}

function popHasSelect(){
  // 이용약관 셀렉트가 있는 경우
  // $('.lyPopup').each(function(){
  //   if($(this).find('.popBttom02').length >= 0){
  //     $('.lyPopup').addClass('hasBottm02');
  //   }
  // });
}