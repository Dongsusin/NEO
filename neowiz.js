//서브헤더더
$(function () {
  let depth1 = $(".mainmenu .mainmenu_list > li ");
  let header = $("header");

  depth1
    .mouseenter(function () {
      header.stop().animate({ height: "500px" });
    })
    .mouseleave(function () {
      header.stop().animate({ height: "93px" });
    });
});
//슬라이더
var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 2000); // 2초마다 이미지가 체인지됩니다
}
//games roller
let roller = document.querySelector(".rolling-list");
roller.id = "roller1";
let clone = roller.cloneNode(true);
clone.id = "roller2";
document.querySelector(".wrap").appendChild(clone);
document.querySelector("#roller1").style.left = "0px";
document.querySelector("#roller2").style.left =
  document.querySelector(".rolling-list ul").offsetWidth + "px";
roller.classList.add("original");
clone.classList.add("clone");
//포토폴리오 팝업
// 쿠키 가져오기
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
// 쿠키 설정하기
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
// 쿠키 삭제하기 (테스트용)
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
// 테스트용: 브라우저 콘솔에서 deletePopupCookie() 호출로 쿠키 삭제 가능
window.deletePopupCookie = () => deleteCookie("hidePopup");
// 페이지 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // 이미 오늘 다시 보지 않기 설정이 되어 있다면 팝업을 띄우지 않음
  if (getCookie("hidePopup") !== "true") {
    const overlay = document.createElement("div");
    overlay.style = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.5); z-index: 999;
        `;

    const popup = document.createElement("div");
    popup.style = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            padding: 20px; background-color: white; border: 1px solid #333;
            border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center; z-index: 1000;
        `;
    popup.innerHTML = `
            <p>이 사이트는 상업적인 용도가 아니며,<br> 포트폴리오 용도로 제작되었습니다.</p>
            <button style="
                margin-top: 12px; padding: 4px 12px; border-radius: 4px; border: none;
                background-color: #333; color: white; cursor: pointer;
            ">닫기</button>
            <br/>
            <label style="margin-top: 8px; display: block; cursor: pointer;">
                <input type="checkbox" style="margin-right: 5px;" id="noShowToday">
                오늘 다시 보지 않기
            </label>
        `;

    const closeButton = popup.querySelector("button");
    const noShowToday = popup.querySelector("#noShowToday");

    closeButton.addEventListener("click", () => {
      if (noShowToday.checked) {
        setCookie("hidePopup", "true", 1); // 하루 동안 유지
      }
      overlay.remove();
      popup.remove();
    });

    document.body.append(overlay, popup);
  }
});

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    header.classList.add("on");
  } else {
    header.classList.remove("on");
  }
});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("header").outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $("header").addClass("nav-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("nav-up");
    }
  }

  lastScrollTop = st;
}
