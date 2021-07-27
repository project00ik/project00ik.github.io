
$(document).ready(function (){
  
  // 데이터피커
  $(".datepicker").each(function(){
    $(this).datepicker({
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      changeYear: true,
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
      dayNames: ['일','월','화','수','목','금','토'],
      dayNamesShort: ['일','월','화','수','목','금','토'],
      dayNamesMin: ['일','월','화','수','목','금','토'],
      showMonthAfterYear: true,
      //yearSuffix: '.'    
    });
  })

  searchBox(); //상단 검색박스 펼침
  // searchInputBox(); // 검색 input clear
  cartMainPop();//메인 장바구니 팝업

});

function cartMainPop(){
  //메인 장바구니 팝업
  var winW = $(window).width();
  if(winW > 800){
    $('body').mouseup(function(e){
      if($('.icon-btn.cart').has(e.target).length === 0){
        $('.cart-box').siblings('.tgBtn').removeClass('on');
      }
    })
  }
}
// $(winow).resize(function(){
//   cartMainPop();
// })
function cartlyClose(){
  //메인 장바구니 팝업닫기
  $('.cart-box').siblings('.tgBtn').removeClass('on');
}


function searchBox(){
  //상단 검색박스 펼침
  var hdSearchArea = $('.header-cont .search-area');
  var searchBox = $('.header-cont .search-box');
  var searchBoxWordAll = $('.header-cont .search-box .search-word .s-list > ul > li');
  var wordBox = $('.header-cont .word-box');
  var ipHdSearch = $('.header-cont .search-area .inp-area .inp');
  var ipDelBtn = $(".header-cont .search-area .inp-area .del");
  var closeBtn = $('.header-cont .search-bt .close');
  var alldelBtn = $('.header-cont .search-bt .all-del');
  ipHdSearch.focus(function(e){
    searchBox.addClass("on");
    allCategoryLyClose(); // 카테고리 레이어 닫기
    $('.del').each(function(){
      // 최근검색어 삭제
      $(this).click(function(){
        $(this).closest('li').remove();
      })
    })
    alldelBtn.click(function(){
      searchBoxWordAll.remove();
    });
    closeBtn.click(function(){
      searchBox.removeClass("on");
    })
    $('body').mouseup(function(e){
      if(hdSearchArea.has(e.target).length === 0){
        searchBox.removeClass('on');
      }
    })

    /* 검색창 focus시 input value값 여부에 따라 searchBox 노출 여부 (동시 노출되는 현상 관련 추가js) */
    if($(this).val().length > 0){//val값 있을때
      searchBox.removeClass('on');
      wordBox.addClass('on');
    } 

    $(document).on("keyup",".header-cont .search-area .inp-area .inp",function () {  // val값삭제
      ipDelBtn.toggle(Boolean($(this).val()));
      searchBox.addClass("on");
      if($(this).val().length > 0){ //keyup val값 있을때
        wordBox.addClass('on');
        searchBox.removeClass('on');
        ipDelBtn.click(function(){ //keyup val 삭제버튼 클릭
          ipHdSearch.val('');
          wordBox.removeClass('on');
          ipDelBtn.toggle(Boolean($(this).val()));
        })
        $('body').mouseup(function(e){
          if(hdSearchArea.has(e.target).length === 0){
            wordBox.removeClass('on');
          }
        })
      } else { //val값 없을때
        searchBox.addClass("on");
        wordBox.removeClass('on');
      }
    });
  })
}

function searchInputBox(){
  // 검색 input clear
  $('.form-search').each(function(){
    $(this).find('.input').on('keyup focus', function(){
      $(this).siblings('.del').attr('style', 'visibility: visible');
      if($(this).val().length == 0){
        $(this).siblings('.del').attr('style', 'visibility: hidden');
      } else {
        $(this).siblings('.del').attr('style', 'visibility: visible');
      }
    });
    $(this).find('.del').on('click touchstart', function(){
      $(this).closest('.form-search').find('.input').val('');
      $(this).closest('.form-search').find('.del').attr('style', 'visibility: hidden');
      return false;
    });
    $(this).find('.input').on('blur', function(){
      setTimeout(function() {
        $('.del').attr('style', 'visibility: hidden');
      }, 300);
    });
    
  });
}

function delBtn(){
  // 삭제 이벤트 (장바구니 옵션 등)
  $('.del-box-cont .btn.btn-del').each(function () {
    $(this).click(function () {
      $(this).closest('.del-box').remove();
    })
  });
  // 삭제 이벤트 (바로구매/장바구니 옵션 등)
  $('.option-result .btn.btn-del').each(function () {
    $(this).click(function () {
      $(this).closest('.option-box').remove();
    })
  });
}

function deleteArea() {
  // 삭제 이벤트 (공통 : 최근 본 상품)
  $('.delBtn').each(function () {
    $(this).click(function () {
      $(this).closest('.delCont').remove();
    })
  });
  $('.deleteAllBtn').on('click', function(){
    $('.delArea').find('.delCont').remove();
  })
}

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
  $('.main-visual-cate .cate-layer-wrap').removeClass('open');
}

function layoutCategory(){
  // 1depth 레이어 이벤트
  $('.header, .content').on('mouseover', function () {
    $('.visualCate .d1Btn').removeClass('on');
    $('.visualCate .d2Layer').removeClass('active');
    $('.visualCate .btn-layer-close').hide();
    $('.main-visual-cate .cate-layer-wrap').removeClass('open');
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
        $d1Bt.closest('.cate-layer-wrap').addClass('open');
      } else {
        $d1Bt.closest('.d1Area').find('.d2Layer').removeClass('active');
        $d1Bt.closest('.cate-layer-wrap').removeClass('open');
      }
    });

    // 카테고리 depth 별 click 시 노출 이벤트
    $cateLyArea.find('.depth-list').each(function () {
      $(this).find('> li').each(function(){
        $(this).find('> .depthBtn').on('click', function(){
          var $depthBtnOn = $(this);
          $depthBtnOn.closest('li').siblings().find(' > .depthBtn').removeClass('on');
          $depthBtnOn.closest('li').find('> .depthBtn').addClass('on');
          $depthBtnOn.closest('li').siblings().find('.depthCont').removeClass('active');
          $depthBtnOn.closest('li').find('> .depthCont').addClass('active');
        });
      });
    });
  });

  var $pcCateLyArea = $('.gnbPC .cateLyArea, .visualCate .cateLyArea');
  // 카테고리 1depth hover 시 이벤트
  $pcCateLyArea.find('.d1Btn').on('mouseover', function(){
    var $d1Bt = $(this);
    $(this).closest('.cate-layer').find('.d1Btn').not($d1Bt.addClass('on')).removeClass('on');
    // 초기화
    $pcCateLyArea.find('.d2Layer').removeClass('active');
    $pcCateLyArea.find('.partition-area .depthBtn').removeClass('on');
    $pcCateLyArea.find('.partition-area .depthCont').removeClass('active');
    // hover시 2depth, 3depth 첫번째 on처리
    $pcCateLyArea.find('.d2-list > li.first > .depthBtn').addClass('on');
    $pcCateLyArea.find('.d3-list > li.first > .depthBtn').addClass('on');
    $pcCateLyArea.find('.d3-list > li.first > .d4Layer').addClass('active');
    // 1depth on 이벤트
    if ($d1Bt.hasClass('on')){
      $d1Bt.closest('.d1Area').find('.d2Layer').addClass('active');
      $('.main-visual-cate .cate-layer-wrap').addClass('open');
    } else {
      $d1Bt.closest('.d1Area').find('.d2Layer').removeClass('active');
      $('.main-visual-cate .cate-layer-wrap').removeClass('open');
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
  
  // PC 카테고리 depth 별 첫번째 펼침 처리
  $pcCateLyArea.each(function () {
    $(this).find('.depth-list').each(function(){
      var $depthBtnFirst = $(this).find('> li').eq(0);
      $depthBtnFirst.addClass('first');
      $pcCateLyArea.find('.d2-list').find('> li').eq(0).find('> .depthBtn').addClass('on');
      $depthBtnFirst.find('> .depthCont').addClass('active');
    });
  });

  // PC 카테고리 depth 별 hover 시 닫기 버튼 노출
  $('.main-visual-cate').on('mouseover', function(){
    $('.visualCate .btn-layer-close').show();
  });
  
  
  // 모바일 카테고리 이전메뉴 보기
  $('.goback1depth').on('click', function () {
    $('.moCateLyWrap .d2Layer').removeClass('active');
  });
  $('.goback2depth').on('click', function () {
    $('.moCateLyWrap .d3Layer').removeClass('active');
    $(this).closest('.depthCont').removeClass('active');
    $('.moCateLyWrap .d2-list').find('.depthBtn').removeClass('on');
    $('.d3-list.acdArea').find('.acdBtn').removeClass('on');
    $('.d3-list.acdArea').find('.acdCont').hide();
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
        $('.quickDim').remove();
      } else {
        $(this).siblings('.qk-group').slideDown();
        $('.quick-menu').after('<div class="quickDim"></div>');
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

function inLyOpen(id) {
  // 팝업안에 팝업
  var $lyAcive = $('#' + id);
  $lyAcive.fadeIn();
  $lyAcive.addClass('open');
}

function inLyClose(id){
  // 팝업안에 팝업 닫기
  var $inLyCloseAcive = $('#' + id);
  $inLyCloseAcive.hide();
  $inLyCloseAcive.removeClass('open');
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

function optionResultHeight(){
  // 바로구매/장바구니 팝업 옵션 높이 제어 js
  $('.option-wrap .option-area').each(function(){
    var $selectLeng = $(this).find('>.form-area').length;
    $(this).closest('.option-wrap').find('.option-result').addClass('selLeng'+ $selectLeng);
  });
}
    
function lyboxWrap(){
  // 주문상태 레이어 이벤트
  $('.lyboxbtn').on('click', function(){
    $('.lyboxbtn').not($(this).toggleClass('on')).hide();
    if($(this).hasClass('on')){
      $('.lyboxWrap').slideDown();
    } else {
      $('.lyboxWrap').hide();  
    }
  });
  $('.lyboxClose').on('click', function(){
    $('.lyboxbtn').removeClass('on');
    $(this).closest('.lyboxWrap').hide();
  })
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

function tabReset(){
  // 탭 초기화
  console.log('test');
  $('.tabArea .tabBtn').removeClass('on');
  $('.tabArea .tabCont').removeClass('active');
  $('.tabArea .tabBtn').eq(0).addClass('on');
  $('.tabArea .tabCont').eq(0).addClass('active');
}

function tab(){ // 탭 관련 js
  $('.tabArea').each(function (){
    var $tabName = $(this);
    var $tabBtn = $tabName.find('.tabBtn');
    var $tabCont = $tabName.find('.tabCont');
    // 아이디/비밀번호 찾기 예외
    if(!$(this).parent().hasClass('find')){
      $tabCont.removeClass('active');
      $tabBtn.eq(0).addClass('on');
      $tabCont.eq(0).addClass('active');
    }

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

function cartFixedBtn(){
  // 장바구니 fixed 고정 버튼 영역 
  var $winSrollTop = $(window).scrollTop();
  var $winHeight = $(window).height();
  var $scrollPoint = $('.cart-total-area').offset().top - $winHeight + 108; /* 장바구니 floating영역 높이 값 :108 */
  var $fixBtnArea = $('.cart-floating-box');
  if ($winSrollTop > $scrollPoint){
    $fixBtnArea.addClass('hide');
  } else {
    $fixBtnArea.removeClass('hide');
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

function orderFormeTgView(){
  // 주문현황 폼영역 열고 닫기
  $('.orderFormeTgView').each(function(){
    var $targetScrollPoint = $('.formeTgScrollPoint').offset().top - 300;
    $(this).find('.formTgBtn').on('click', function(){
      $(this).toggleClass('on');
      if($(this).hasClass('on')){
        $('.orderFormeTgView').addClass('open');
      } else {
        $('.orderFormeTgView').removeClass('open');
        $('html, body').stop().animate({ scrollTop: $targetScrollPoint }, 300);
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
        $acdCt.not($acdActive.parent().parent().find($acdCt).slideToggle()).slideUp();
      } else {
        $acdCt.not($acdActive.parent().find($acdCt).slideToggle()).slideUp();
      }
    })
	});
}

function inputPrice(){
  // 금액 input focus 효과
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
  var filterBox = $('.filterDetailBox');
  $('.btnFilterDetail').on('click', function(){
    $(this).toggleClass('on');
    if($(this).hasClass('on')){
      filterBox.addClass('open');
      filterBox.slideDown();
    } else {
      filterBox.removeClass('open');
      filterBox.slideUp();
    }
  });

  // 상세필터 PC / Mobile 반응형 관련 js
  $(window).resize( function() {
    var winW = $(window).outerWidth();
    if(winW < 800){
      $('.btnFilterDetail').removeClass('on');
      filterBox.removeClass('open');
      filterBox.hide();
    } else {
      $('#filterDetail').removeClass('open');
      $('#filterDetail').hide();
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
  // 상품목록 리스트형으로 보기 PC / Mobile 반응형 관련 js
  $(window).resize( function() {
    var winW = $(window).outerWidth();
    if(winW < 800){
      $('.btnListLayout').removeClass('on');
      $('.productLayout').removeClass('proList');
    }
  });
}

function toggleResize(){
  //관심공종 pc mobile 여닫기
  var winW = $(window).width();
  var $tgcon = $('.type-slide')
  if (winW < 800){
    $tgcon.find('.tgSlideBtn').removeClass('on');
    $tgcon.removeClass('open');
    $tgcon.find('.tgSlideCont').slideUp();
  } else {
    $tgcon.find('.tgSlideBtn').addClass('on');
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

function lyNextTab(){
  // 팝업 다음버튼 클릭 이벤트(첫번째 탭으로 이동)
  $('.tabArea').each(function(){
    var tabNextBt = $(this).find('.tabBtn');
    var tabNextCt = $(this).find('.tabCont');
    tabNextBt.removeClass('on');
    tabNextBt.eq(1).addClass('on');
    tabNextCt.removeClass('active');
    tabNextCt.eq(1).addClass('active');
  });
  
}

function lyPrevTab(){
  // 팝업 이전버튼 클릭 이벤트(두번쨰 탭으로 이동)
  $('.tabArea').each(function(){
    var tabPrevBt = $(this).find('.tabBtn');
    var tabPrevCt = $(this).find('.tabCont');
    tabPrevBt.removeClass('on');
    tabPrevBt.eq(0).addClass('on');
    tabPrevCt.removeClass('active');
    tabPrevCt.eq(0).addClass('active');
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
  $('.gnb-right-area').mouseover(function (){
    $(this).addClass('on');
    realtimeSearch.autoplay.stop();
    $('.realtimeLayer').show();
  });
  $('.gnb-right-area').mouseleave(function (){
    $(this).removeClass('on');
    realtimeSearch.autoplay.start();
    $('.realtimeLayer').hide();
  });
  // $('body').mouseup(function(e){
  //   if($('.realtimeLayer').has(e.target).length === 0){
  //     $('.realtimeLayer').hide();
  //     realtimeSearch.autoplay.start();
  //   }
  // })
}






