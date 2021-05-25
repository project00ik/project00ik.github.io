
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

  $(".datepicker").each(function(){
    $(this).datepicker({
      dateFormat: 'yy-mm-dd',
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      dayNames: ['일','월','화','수','목','금','토'],
      dayNamesShort: ['일','월','화','수','목','금','토'],
      dayNamesMin: ['일','월','화','수','목','금','토'],
      showMonthAfterYear: true,
      yearSuffix: '.'    
    });
  })

});

function allCategoryBtn(){
  // gnb 전체카테고리 열고 닫기
  //pc
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

  // mobile
  $('.moBtnCate').on('click', function () {
    $(this).toggleClass('on');
    if ($(this).hasClass('on')) {
      $('.moCateLyWrap').addClass('open');
    } else {
      $('.moCateLyWrap').removeClass('open');
    }
  });
}

function allCategoryLyClose(){
  $('.cateLyWrap').hide();
  $('.moCateLyWrap').removeClass('open');
  $('.btnCate').removeClass('on');
  $('.moBtnCate').removeClass('on');
  $('.d1Btn').removeClass('on');
  $('.d2Layer').removeClass('active');
  $('.d3Layer').removeClass('active');
  $('.depthBtn').removeClass('on');
  $('.d3-list > li .acdBtn').removeClass('on');
  $('.d3-list > li .acdCont').hide();
  $('.visualCate .d1Btn').removeClass('on');
  $('.visualCate .d2Layer').removeClass('active');
  $('.visualCate .btn-layer-close').hide();
}

function layoutCategory(){
  // 1depth 레이어 이벤트
  $('.header, .content').on('mouseover', function () {
    $('.visualCate .d1Btn').removeClass('on');
    $('.visualCate .d2Layer').removeClass('active');
    $('.visualCate .btn-layer-close').hide();
  });

  // 카테고리 레이어 이벤트
  $('.cateLyArea').each(function () {
    var $cateLyArea = $(this);
    
    // 카테고리 1depth click 시 이벤트
    $cateLyArea.find('.d1Btn').on('click', function(){
      var $d1Bt = $(this);
      $(this).closest('.cate-layer').find('.d1Btn').not($d1Bt.addClass('on')).removeClass('on');
      $('.d2Layer').removeClass('active');
      if ($d1Bt.hasClass('on')){
        $d1Bt.closest('.d1Area').find('.d2Layer').addClass('active');
      } else {
        $d1Bt.closest('.d1Area').find('.d2Layer').removeClass('active');
      }
    });

    // 카테고리 depth 별 click 시 노출 이벤트
    $cateLyArea.find('.depth-list > li').each(function () {
      $(this).each(function(){
        $(this).on('click', function(){
          var $depthBtnOn = $(this);
          $depthBtnOn.siblings().find(' > .depthBtn').removeClass('on');
          $depthBtnOn.find('> .depthBtn').addClass('on');
          $depthBtnOn.siblings().find('.depthCont').removeClass('active');
          $depthBtnOn.find('> .depthCont').addClass('active');
        });
      });
    });
  });

  var $pcCateLyArea = $('.gnbPC .cateLyArea, .visualCate .cateLyArea');
  // 카테고리 1depth hover 시 이벤트
  $pcCateLyArea.find('.d1Btn').on('mouseover', function(){
    var $d1Bt = $(this);
    $(this).closest('.cate-layer').find('.d1Btn').not($d1Bt.addClass('on')).removeClass('on');
    $('.d2Layer').removeClass('active');
    if ($d1Bt.hasClass('on')){
      $d1Bt.closest('.d1Area').find('.d2Layer').addClass('active');
    } else {
      $d1Bt.closest('.d1Area').find('.d2Layer').removeClass('active');
    }
  });
  
  // PC 카테고리 depth 별 hover 시 이벤트
  $pcCateLyArea.each(function () {
    $(this).find('.depth-list > li').each(function () {
      $(this).each(function(){
        $(this).on('mouseover', function(){
          var $depthBtnOn = $(this);
          $depthBtnOn.siblings().find(' > .depthBtn').removeClass('on');
          $depthBtnOn.find('> .depthBtn').addClass('on');
          $depthBtnOn.siblings().find('.depthCont').removeClass('active');
          $depthBtnOn.find('> .depthCont').addClass('active');
        });
      });
    });
  });

  // PC 카테고리 depth 별 hover 시 닫기 버튼 노출
  $('.main-visual-cate').on('mouseover', function(){
    $('.visualCate .btn-layer-close').show();
  });
  
  
  // 모바일 카테고리 이전메뉴 보기
  $('.goback1depth').on('click', function () {
    $('.d2Layer').removeClass('active');
  });
  $('.goback2depth').on('click', function () {
    $('.d3Layer').removeClass('active');
    $('.d2-list').find('.depthBtn').removeClass('on');
  });
}

function d2lyClose(){
  // 카데고리 2depth layer 닫기
  $('.d2Layer').removeClass('active');
}

function moCteLyClose() {
  // 모바일 카데고리 닫기
  $('.d2Layer').removeClass('active');
}


function quickTopBtn(){
  // 스크롤 최상단으로 이동
    $('html, body').stop().animate({ scrollTop: 0 }, 300);
    return false;
}

function quickFloating(){
  // 퀵 플로팅 모바일 펼치기 js
  $('.qk-group-show').on('click', function(e){
      e.preventDefault();
      if ( $(this).is('.on') ) {
          $(this).siblings('.qk-group').slideUp();
      } else {
          $(this).siblings('.qk-group').slideDown();
      }
  })
}

function lyOpen(id) {
  // 팝업
  var $lyAcive = $('#' + id);
  $lyAcive.fadeIn();
  $lyAcive.addClass('open');
}

function lyClose(){
  // 팝업닫기
  $('.dim').hide();
  $('.lyPopupWrap').hide();
  $('.lyPopupWrap').removeClass('open');
}

function detailOptionLy(){
  // 상품상세 옵션 레이어 이벤트
  $('.detailLyBtn').on('click', function () {
    $('.option-ly-btn').hide();
    $('.option-ly-btn-open').show();
    $('body').addClass('detailLyOpen');
    $('.ly-detail').css('z-index', '102');
    $('.ly-detail').addClass('open');
    $('.ly-detail').after('<div class="detaileLyDim"></div>');
    $('.detaileLyDim').on('click', function(){
      $(this).remove();
      $('.ly-detail').removeClass('open');
      $('body').removeClass('detailLyOpen');
    });
  });
}

function buyNowLy(id){
  // 장바구니 바로구매 레이어 이벤트
  var $buyNowLyAcive = $('#' + id);
  $buyNowLyAcive.show();
  $buyNowLyAcive.addClass('open');
  $buyNowLyAcive.css('z-index', '102');
  $buyNowLyAcive.find('.ly-buyNowLy-wrap').after('<div class="buyNowLyDim"></div>');
  $('.buyNowLyDim').on('click', function(){
    $(this).remove();
    $('.ly-buyNowLy').removeClass('open');
    $buyNowLyAcive.hide();
  });
  
}

function buyNowLyClose(){
  // 장바구니 바로구매 레이어 닫기
  $('.buyNowLyDim').hide();
  $('.ly-buyNowLy').hide();
  $('.ly-buyNowLy').removeClass('open');
}

function detailLyClose() {
  // 닫기 버튼에  onclick="detailLyClose()" 넣어서 사용
  $('.option-ly-btn').show();
  $('.option-ly-btn-open').hide();
  $('.detaileLyDim').remove();
  $('.ly-detail').removeClass('open');
  $('.ly-detail').css('z-index', '100');
  $('body').removeClass('detailLyOpen');
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

// function scrollTab() {
//   // scroll 탭 관련 js
//   $('.scrollTab li').each(function () { 
//     $(this).bind('click', function () {
//       var depId = $(this).attr('data-tab');
//       var winW = $(window).width();
//       if (winW > 800){
//         var depPd = 278;
//       } else {
//         var depPd = 240;
//       }
//       $('html, body').animate({ scrollTop: $('#' + depId).offset().top - depPd }, 800, 'easeInOutExpo');
//       $(this).addClass('on');
//       $(this).siblings().removeClass('on');
//     });
//   });
// }
// $(window).resize(function(){
//   scrollTab();
// })

function scrollTop(){
  // 스크롤탭 fixed 고정
  var $wTop = $(window).scrollTop();
  var $contTop = $('.materiel-list').offset().top - 143;
  var $hdH = $('.header').height();
  var $tab = $('.tab-btn-list');
  if ($wTop < $contTop){
    $tab.removeClass('fixed').css({'top':'0'});
  } else {
    $tab.addClass('fixed').css({'top':$hdH});
  }
}

function ratingBtnArea(){
  // 포토리뷰 별점버튼 js
  $('.rating-btn-area').find('.btnStar').each(function(){
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

function allSlideTgArea(){
  // 신규요청 전체 간단보기 이벤트
  $('.allSlideTgArea').each(function(){
    $(this).find('.allSlideBtn').on('click', function(){
      var $allBt = $(this);
      $allBt.toggleClass('on');
      if($allBt.hasClass('on')){
        $('.allSlideTgArea .tgSlideBtn').addClass('on');
        $('.allSlideTgArea .tgSlideCont').slideDown();
      } else {
        $('.allSlideTgArea .tgSlideBtn').removeClass('on');
        $('.allSlideTgArea .tgSlideCont').slideUp();
      }
    });
    // 신규요청 상세 내용 개별 클릭시 전체상품 상세보기 버튼 on/off 이벤트
    $(this).find(".tgSlide").each(function(){
      $(this).find('.tgSlideBtn').on('click', function(){
        if($('.allSlideTgArea .tgSlideBtn.on').length < 1){
          $('.allSlideBtn').removeClass('on');
        } else {
          $('.allSlideBtn').addClass('on');
        }
      });
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

function reviewToggle() {
  // 리뷰토글
  $('.detail-review').each(function () {
    $(this).find('.review-text').on('click', function (e) {
      e.preventDefault();
      var $reviewActive = $(this);
      $('.detail-review ul > li').not($reviewActive.closest('li').addClass('on')).removeClass('on');
    })
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

function pagination() {
  // 페이지네이션
  $('.paging > a').each(function () {
    $(this).on('click', function () {
      $('.paging > a').removeClass('on');
      $(this).addClass('on');
    });
  });
}

function btnFilterDetail(){
  // 상세필터
  $('.btnFilterDetail').on('click', function(){
    $(this).toggleClass('on');
    if($(this).hasClass('on')){
      $('.filterDetailBox').slideDown();
    } else {
      $('.filterDetailBox').hide();
    }
  });
}

function selectionDelete(){
  // 선택항목 삭제버튼 이벤트
  $('.selection-area').find('.del').each(function(){
    $(this).on('click', function(){
      $(this).closest('.selection-item').hide();
    });
  })
}

function filterBoxMore(){
  // 필터 더보기 버튼 이벤트
  $('.btn-filter-more').on('click', function(){
    $(this).toggleClass('on');
    if($(this).hasClass('on')){
      $('.filter-box').css('height','auto');
    } else {
      $('.filter-box').css('height','108px');
    }
  });
}

function btnListLayout(){
  // 상품목록 리스트형으로 보기
  $('.btnListLayout').on('click', function () {
    $(this).toggleClass('on');
    if ($(this).hasClass('on')) {
      $('.productLayout').addClass('proList');
    } else {
      $('.productLayout').removeClass('proList');
    }
  })
}

function toggleResize(){
  //관심공종 pc mobile 여닫기
  var winW = $(window).width();
  var $tgcon = $('.type-slide')
  if (winW < 800){
    $tgcon.removeClass('open');
    $tgcon.find('.tgSlideCont').slideUp();
  } else {
    $tgcon.addClass('open');
    $tgcon.find('.tgSlideCont').slideDown();
  }
}

function fileupload(){
  //첨부파일 업로드
  $("#file").on('change',function(){
    var fileName = $("#file").val();
    $(".upload-name").val(fileName);
  });
}



// function btnTooltip(){
//   // 툴팁
//   $('.tooltipBtn').each(function(){
//     $(this).on('click', function(){
//       $(this).toggleClass('on');
//       if($(this).hasClass('on')){
//         $(this).closest('.tooltip-box').show();
//       } else {
//         $(this).closest('.tooltip-box').hide();
//       }
//     });
//     $(this).find('.btnCloseTooltip').on('click', function(){
//       $(this).closest('.tooltipBtn').removeClass('on');
//     })
//   })
// }

// function scaleImg(){
//   $('.product-1st').on('mouseover', function(){
//     $('.product-1st .unit-area > dt.on').addClass('on');
//   });
//   $('.product-1st').on('mouseoout', function(){
//     $('.product-1st .unit-area > dt.on').removeClass('on');
//   })
// }


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
  $('body').mouseup(function(e){
    if($('.realtimeLayer').has(e.target).length === 0){
      $('.realtimeLayer').hide();
      realtimeSearch.autoplay.start();
    }
  })
}




