/***
 * * Bclass theme js v1.0.0
 * * Copyright 2021 ("https://github.com/EW-EndWall/bClass-theme-js/blob/main/LICENSE")
 * * Licensed ("Bik Public License 2.0")
 * * License Update ("03/28/2024")
 */
document.addEventListener("DOMContentLoaded", () => {
  // * current year
  $(".current-year").each(function () {
    $(this).text($(this).text() + new Date().getFullYear());
  });
  // * -----------------------------------------------------
  // * scroll x mouse | scroll x mouse hidden
  $("ul.ul-li-x-scroll, ul.ul-li-x-scroll-hidden").each(function () {
    $(this).on("wheel", function (event) {
      if (event.originalEvent.deltaY === 0) return;
      event.preventDefault();
      this.scrollLeft += event.originalEvent.deltaY;
    });
  });
  // * -----------------------------------------------------
  // * before affter function
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

          if (
            cssRule.selectorText &&
            cssRule.selectorText.includes(className)
          ) {
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
  // * -----------------------------------------------------
});
