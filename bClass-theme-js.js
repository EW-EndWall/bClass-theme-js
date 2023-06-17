// ? scroll x mouse start
const ul_ul_li_x_scroll = document.querySelectorAll("ul.ul-li-x-scroll");
if (ul_ul_li_x_scroll) {
  ul_ul_li_x_scroll.forEach(function (element) {
    element.addEventListener("wheel", function (event) {
      if (event.deltaY === 0) return;
      event.preventDefault();
      this.scrollLeft += event.deltaY;
    });
  });
}
// ? scroll x mouse end
// ? scroll x mouse hidden start
const ul_ul_li_x_scroll_hidden = document.querySelectorAll(
  "ul.ul-li-x-scroll-hidden"
);
if (ul_ul_li_x_scroll_hidden) {
  ul_ul_li_x_scroll_hidden.forEach(function (element) {
    element.addEventListener("wheel", function (event) {
      if (event.deltaY === 0) return;
      event.preventDefault();
      this.scrollLeft += event.deltaY;
    });
  });
}
// ? scroll x mouse hidden end
// ? before affter function start
(() => {
  let elementsBefore = Array.from(
    document.querySelectorAll('[data-ba="before"]')
  );
  let elementsAfter = Array.from(
    document.querySelectorAll('[data-ba="after"]')
  );

  let name = "cutom-create" + new Date().getTime();
  let cssCode = ``;
  elementsBefore.forEach((element, index) => {
    const content = element.getAttribute("data-ba-content");
    const clas = element.getAttribute("data-ba-class");
    let css = listClasses(clas);
    const className = "-b-" + name + index;
    if (content) {
      css += `content: "${content}";`;
    }
    cssCode += `.${className}::before {${css}}`;
    element.classList.add(className);
  });
  elementsAfter.forEach((element, index) => {
    const content = element.getAttribute("data-ba-content");
    const clas = element.getAttribute("data-ba-class");
    let css = listClasses(clas);
    const className = "-a-" + name + index;
    if (content) {
      css += `content: "${content}";`;
    }
    cssCode += `.${className}::after {${css}}`;
    element.classList.add(className);
  });
  applyCSS(cssCode);
})();

// * create css style
function applyCSS(cssCode) {
  // * create <style>
  let styleElement = document.createElement("style");
  styleElement.type = "text/css";
  styleElement.appendChild(document.createTextNode(cssCode));

  // * add <style>
  document.head.appendChild(styleElement);
}

// * class list
function listClasses(element) {
  // * string to arr
  const otherClasses = element.split(" ");
  let res = "";
  // * get all class css
  otherClasses.forEach((className) => {
    res += findCSSClass(className);
  });
  return res;
}

function findCSSClass(className) {
  // * find class css
  const styleSheets = document.styleSheets;

  for (let i = 0; i < styleSheets.length; i++) {
    const styleSheet = styleSheets[i];

    if (styleSheet.cssRules) {
      const cssRules = styleSheet.cssRules;

      for (let j = 0; j < cssRules.length; j++) {
        const cssRule = cssRules[j];

        if (cssRule.selectorText && cssRule.selectorText.includes(className)) {
          const ruleStyle = cssRule.style;
          let ruleText = "";

          for (let k = 0; k < ruleStyle.length; k++) {
            const property = ruleStyle[k];
            ruleText +=
              property + ": " + ruleStyle.getPropertyValue(property) + "; ";
          }
          // * class css
          return ruleText;
        }
      }
    }
  }
}
// ? before affter function end

// ! edit.. jq ?

// // * create cookie
// function setCookie(cookieName, cookieValue, numdaystilexpireasinteger) {
//   const d = new Date();
//   d.setTime(d.getTime() + numdaystilexpireasinteger * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + d.toUTCString();
//   document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
// }

// // * get cookie
// function getCookie(cookieName) {
//   const name = cookieName + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     const c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// // * check coockie
// function checkCookiesConfirmation() {
//   const x = getCookie("cookies-confirmation"); //call cookie to get its value
//   if (x != "") {
//     $(".cookies-confirmation").remove();
//   } else {
//     setCookie("cookies-confirmation", "yes", 2);
//     // * reel app remove comment
//     // $(".cookies-confirmation").remove();
//   }
// }

// // * start check coockie
// setTimeout(function () {
//   checkCookiesConfirmation();
// }, 5000);
