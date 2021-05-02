
$(document).ready(function (){
  // var appHidden = function(){ 
	// 	var agent = navigator.userAgent;
	// 	agent = agent.toLowerCase();
		
	// 	if (agent.indexOf("ipod") != -1 || agent.indexOf("iphone") != -1 || agent.indexOf("ipad") != -1) { // iOS일때
  //     $('body').addClass('ios');
  //   } else { // iOS가 아닐때
  //     $('body').addClass('android');
	// 	}
  // }; appHidden();

  // $(window).scroll(function (){
  //   /* 스크롤 방향 체크 [S] */
  //   if ($(this).scrollTop() >= 43) {
  //     nowScrollTop = $(this).scrollTop();
  //     $('body').removeClass('scrollTop');
  //     if (wheelDelta() == 'down') {
  //       $('body').removeClass('scrollUp');
  //       $('body').addClass('scrollDown');
  //     }
  //     if (wheelDelta() == 'up') {
  //       $('body').removeClass('scrollDown');
  //       $('body').addClass('scrollUp');
  //     }
  //     // - 초기화
  //     prevScrollTop = nowScrollTop;
  //   } else { 
  //     $('body').addClass('scrollTop');
  //   }
  //   // - 스크롤 움직임 감지
  //   $.fn.scrollStopped = function (callback) {
  //     var that = this, $this = $(that);
  //     $this.scroll(function (ev) {
  //       clearTimeout($this.data('scrollTimeout'));
  //       $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
  //     });
  //   };
  //   // - 스크롤 멈췄을 때 
  //   // $(window).scrollStopped(function (ev) {
  //   //   console.log(ev);
  //   //   console.log('scroll stopped');
  //   // }); 
  //   /* 스크롤 방향 체크 [E] */
    
  //   // fixedArea(); // 플로팅 버튼 관련 스크롤 이벤트(fixed-area share, top)
  //   nowScrollPosition(); // 현재 스크롤 위치 기억

  // });

});

function allCategoryBtn(){
  // gnb 전체카테고리 열고 닫기
  $('.btnCate').on('click', function (){
    var $catFirstBt = $('.cateLyWrap').find('.d1Area').eq(0).find('> .d1Btn');
    var $catFirstCt = $('.cateLyWrap').find('.d1Area').eq(0).find('> .d2Layer');
    $(this).toggleClass('on');
    if($(this).hasClass('on')){
      $('.cateLyWrap').slideDown();
      // 첫번째 메뉴 on
      $catFirstBt.addClass('on');
      $catFirstCt.addClass('active');
    } else {
      $('.cateLyWrap').hide();
    }
  });
}

function allCategoryLyClose(){
  $('.cateLyWrap').hide();
  $('.btnCate').removeClass('on');
}

function layoutCategory(){
  // 카테고리 레이어 이벤트
  $('.cateLyArea').each(function () {
    var $cateLyArea = $(this);
    // 1depth 레이어 이벤트
    $('.header, .content').on('mouseover', function () {
      $('.visualCate .d1Btn').removeClass('on');
      $('.visualCate .d2Layer').removeClass('active');
    });
    $cateLyArea.find('.d1Btn').on('mouseover', function(){
      var $d1Bt = $(this);
      $(this).closest('.cate-layer').find('.d1Btn').not(
        $d1Bt.addClass('on')
      ).removeClass('on');
      $('.d2Layer').removeClass('active');
      if ($d1Bt.hasClass('on')){
        $d1Bt.closest('.d1Area').find('.d2Layer').addClass('active');
      } else {
        $d1Bt.closest('.d1Area').find('.d2Layer').removeClass('active');
      }
    });
    // 카테고리 depth 별 click 시 노출 이벤트
    // 2depth
    $cateLyArea.find('.d2-list > li > .depthBtn').each(function () {
      $(this).on('click', function () {
        $('.d2-list > li .depthBtn').removeClass('on');
        $(this).addClass('on');
        $('.d2-list > li .depthCont').removeClass('active');
        $(this).parent().find('> .depthCont').addClass('active');
      });
    });
    // 3depth
    $cateLyArea.find('.d3-list > li > .depthBtn').each(function () {
      $(this).on('click', function () {
        $('.d3-list > li .depthBtn').removeClass('on');
        $(this).addClass('on');
        $('.d3-list > li .depthCont').removeClass('active');
        $(this).parent().find('> .depthCont').addClass('active');
      });
    });
    // 4depth
    $cateLyArea.find('.d4-list > li > .depthBtn').each(function () {
      $(this).on('click', function () {
        $('.d4-list > li .depthBtn').removeClass('on');
        $(this).addClass('on');
      });
    });
  });
  
}

function d2lyClose(){
  // 카데고리 2depth layer 닫기
  $('.d2Layer').removeClass('active');
  // <button class="d2-layer-close d2LyClose" onclick="d2lyClose()">닫기</button>
}

function quickTopBtn(){
  // 스크롤 최상단으로 이동
    $('html, body').stop().animate({ scrollTop: 0 }, 300);
    return false;
}

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

function lyClose(){
  // 팝업닫기
  $('body').removeClass('nonScroll');
  $('.dim').hide();
  $('.lyPopup').animate({ top: '100%' }, 50);
  // data-scroll 저장된 스크롤 위치로 이동
  var scrollPoint = $('body').attr('data-scroll');
  $(window).scrollTop(scrollPoint);
}

function mdClose(){
  // 팝업닫기
  $('body').removeClass('nonScroll');
  $('.dim').hide();
  $('.mdPopup').hide();
  // data-scroll 저장된 스크롤 위치로 이동
  var scrollPoint = $('body').attr('data-scroll');
  $(window).scrollTop(scrollPoint);
}

function tab(){ // 탭 관련 js
  $('.tabArea').each(function (){
    var $tabName = $(this);
    var $tabBtn = $tabName.find('.tabBtn');
    var $tabCont = $tabName.find('.tabCont');
    $tabCont.removeClass('active');
    $tabBtn.eq(0).addClass('on');
    $tabCont.eq(0).addClass('active');
    $tabBtn.on('click', function (){
      var $activeBtn = $(this);
      $activeBtn.closest('.tabArea').find('.tabBtn').removeClass('on');
      $activeBtn.addClass('on');
      $activeBtn.closest('.tabArea').find('.tabCont').removeClass('active');
      var activeTab = $activeBtn.attr('data-tab');
      $('#' + activeTab).addClass('active');
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

function toggleAreaClose(){
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

/* ==========================================================================
    swiper(plugin)
========================================================================== */
function realtimeSearchSlide(){
  //header 실시간검색 swiper(plugin) option
  var itemNum = $('.realtimeSearchSlide .swiper-slide').length;
  if (itemNum > 1) {
    var realtimeSearch = new Swiper('.swiper-container.realtimeSearchSlide', {
      direction: 'vertical',
      spaceBetween: 10,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      }
    });
  } else {
    var realtimeSearch = new Swiper('.swiper-container.realtimeSearchSlide', {
      direction: 'vertical',
      spaceBetween: 10,
      centeredSlides: true,
      loop: true
    })
  }
  $('.realTimeMore').on('click', function (){
    $(this).addClass('on');
    realtimeSearch.autoplay.stop();
    $('.realtimeLayer').slideDown();

  });
  $('.realtimeLyClose').on('click', function (){
    $(this).removeClass('on');
    realtimeSearch.autoplay.start();
    $('.realtimeLayer').hide();
  })
}

