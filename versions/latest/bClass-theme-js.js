/***
 * * Bclass theme js v1.1.0
 * * Copyright 2021 ("https://github.com/EW-EndWall/bClass-theme-js/blob/main/LICENSE")
 * * Licensed ("Bik Public License 2.0")
 * * License Update ("03/28/2024")
 */
document.addEventListener("DOMContentLoaded", () => {
  // * current year
  $(".current-year").each((index, element) => {
    $(element).text($(element).text() + new Date().getFullYear());
  });

  // * -----------------------------------------------------

  // * scroll x mouse | scroll x mouse hidden
  $("ul.ul-li-x-scroll, ul.ul-li-x-scroll-hidden").each((index, element) => {
    $(element).on("wheel", (event) => {
      if (event.originalEvent.deltaY === 0) return;
      event.preventDefault();
      element.scrollLeft += event.originalEvent.deltaY;
    });
  });

  // * -----------------------------------------------------

  // * Phone number formater
  const formatPhoneNumber = (phoneNumber) => {
    // * Remove all non-numeric characters except the plus sign
    let cleaned = phoneNumber.replace(/[^\d]/g, "");

    const cleanedLeng = cleaned.length;

    if (cleanedLeng > 16) {
      cleaned.slice(0, -1);
    }
    // * Extract parts of the number based on length
    if (cleanedLeng > 9) {
      const match = cleaned.match(/^(\d{3,4})(\d{3,4})(\d{2,4})(\d{2,4})$/);
      return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }
    if (cleanedLeng > 7) {
      const match = cleaned.match(/^(\d{3,4})(\d{3,4})(\d{2,4})$/);
      return `(${match[1]}) ${match[2]} ${match[3]}`;
    }
    if (cleanedLeng > 4) {
      const match = cleaned.match(/^(\d{3,4})(\d{2,4})$/);
      return `(${match[1]}) ${match[2]}`;
    }
    if (cleanedLeng > 2) {
      const match = cleaned.match(/^(\d{3,4})$/);
      return `(${match[1]})`;
    }
    return cleaned;
  };

  // * Adjust phone number spelling position
  const phoneNumberSetCaretPosition = (elem, pos) => {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.move("character", pos);
      range.select();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    $("input[type=tel]").on("keyup", (event) => {
      const input = event.target;
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const originalValue = input.value;
      const formattedValue = formatPhoneNumber(originalValue);

      // * Update input value without losing caret position
      if (originalValue !== formattedValue) {
        input.value = formattedValue;
        const newPos = start + (formattedValue.length - originalValue.length);
        phoneNumberSetCaretPosition(input, newPos);
      }
    });
  });

  // * -----------------------------------------------------

  const createCss = (getElemets, checkedUniqueClassList) => {
    // * create class func - check and create style
    const createClass = ({ className, classKey, classValue, prefixName }) => {
      // * get css value
      let cssDynamicVal = classValue
        ? classValue
        : className.match(/\[(.*?)\]/)[1];

      // * is content
      if (classKey == "content") cssDynamicVal = `"${String(cssDynamicVal)}"`;

      // * create css
      const cssRule = (() => {
        const createClassname = className.replace(/[\[\]#%!(),:]/g, "\\$&"); // * - [ ] # % ! ( ) , :

        // * is check prefix - ex: before affter
        if (prefixName != null) {
          const prefixVal = prefixes[prefixName];

          // * match check prefix
          if (prefixVal != undefined) {
            checkedUniqueClassList.push(`${prefixName}:${className}`);
            return `.${prefixName}\\:${createClassname}${prefixVal}{${classKey}:${cssDynamicVal}}`;
          }
        } else {
          checkedUniqueClassList.push(className);
          return `.${createClassname}{${classKey}:${cssDynamicVal}}`;
        }
      })();

      // * add css rule
      cssRules += cssRule;
    };

    // * clear class unique
    let uniqueClassList = uniqueClasses(getElemets);

    // * checked list check
    if (checkedUniqueClassList.length) {
      uniqueClassList = uniqueClassList.filter(
        (item) => checkedUniqueClassList.indexOf(item) == -1
      );
    }

    // * check class css
    uniqueClassList.forEach((className, index) => {
      // * custom class - ex: hover:[color:red] or [color:red]
      const isCustom = className.match(/^(.*?:)?\[(.*?)\]|^\[(.*?)\](.*)$/);
      if (isCustom != null) {
        const customClass = isCustom[2].split(":"); // * [color, red]
        // * is key val
        switch (customClass.length) {
          case 2:
            if (isCustom[1] != undefined) {
              createClass({
                prefixName: isCustom[1].slice(0, -1), // * : to delete - hover: to hover
                className: `[${isCustom[2]}]`,
                classKey: customClass[0],
                classValue: customClass[1],
              });
            } else {
              createClass({
                className: className,
                classKey: customClass[0],
                classValue: customClass[1],
              });
            }
            break;

          case 1:
            console.error("incorrect: class value is not specified");
            break;
        }
        return;
      }

      // * is include -[
      const patternCheck = className.indexOf("-[");
      if (patternCheck !== -1) {
        const findClass = className
          .substring(0, patternCheck + 1) // * find patern class
          .replace(/([^:]+):/, ""); // * : and before clear, bug fix
        const findPattern = patterns.find((patternObj) =>
          findClass.startsWith(patternObj.pattern)
        );

        // * Match check
        if (findPattern != undefined) {
          const property = findPattern.property;
          let prefixCheck = className.indexOf(":");

          if (prefixCheck != -1) {
            const prefixclassName = className.slice(prefixCheck + 1);
            const prefixName = className.slice(0, prefixCheck);

            createClass({
              className: prefixclassName,
              classKey: property,
              prefixName: prefixName,
            });
          } else {
            createClass({
              classKey: property,
              className: className,
            });
          }
        }
      }

      if (uniqueClassList.length - 1 == index) {
        addCssRule(cssRules);
      }
    });
  };

  // * get all elements
  const uniqueClasses = (elements) => {
    // * check checked class list
    const classes = new Set();
    elements.forEach((element) => {
      classes.add([...element.classList]);
    });

    return Array.from(classes).flat();
  };

  // * create css style
  const addCssRule = (cssCode) => {
    let styleElement = document.getElementById("createCssStyle");
    //* style element check
    if (styleElement == null) {
      styleElement = document.createElement("style"); // * create <style>
      styleElement.type = "text/css"; // * type add
      styleElement.id = "createCssStyle"; // * id add
      document.head.appendChild(styleElement); // * add <style>
    }
    styleElement.innerText = cssCode; // * add css code
  };

  // * Patterns and related CSS properties
  let patterns = [
    { pattern: "w-", property: "width" },
    { pattern: "h-", property: "height" },
    { pattern: "m-", property: "margin" },
    { pattern: "mt-", property: "margin-top" },
    { pattern: "mb-", property: "margin-bottom" },
    { pattern: "ml-", property: "margin-left" },
    { pattern: "mr-", property: "margin-right" },
    { pattern: "p-", property: "padding" },
    { pattern: "pt-", property: "padding-top" },
    { pattern: "pb-", property: "padding-bottom" },
    { pattern: "pl-", property: "padding-left" },
    { pattern: "pr-", property: "padding-right" },
    { pattern: "top-", property: "top" },
    { pattern: "bottom-", property: "bottom" },
    { pattern: "left-", property: "left" },
    { pattern: "right-", property: "right" },
    { pattern: "bg-", property: "background-color" },
    { pattern: "color-", property: "color" },
    { pattern: "content-", property: "content" },
    { pattern: "transform-", property: "transform" },
    { pattern: "font-size-", property: "font-size" },
    { pattern: "gap-", property: "gap" },
    { pattern: "filter-", property: "filter" },
    { pattern: "rounded-", property: "border-radius" },
    { pattern: "rounded-tl-", property: "border-top-left-radius" },
    { pattern: "rounded-tr-", property: "border-top-right-radius" },
    { pattern: "rounded-bl-", property: "border-bottom-left-radius" },
    { pattern: "rounded-br-", property: "border-bottom-right-radius" },
  ];

  // * Prefixes and their equivalents
  const prefixes = {
    hover: ":hover",
    focus: ":focus",
    before: "::before",
    after: "::after",
    first: ":first-of-type",
    last: ":last-of-type",
    active: ":active",
    checked: ":checked",
    disabled: ":disabled",
    enabled: ":enabled",
  };

  // * all create css rules
  let cssRules = "";
  let checkedUniqueClassList = [];

  // * load page create dynamic css
  createCss(document.querySelectorAll("*"), checkedUniqueClassList);

  // * Create the watcher and define a callback func
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // * It will work when an element is added inside the body.
      if (
        mutation.addedNodes.length > 0 &&
        [mutation.addedNodes[0].nodeName].indexOf("#text") == -1 &&
        [mutation.addedNodes[0].nodeName].indexOf("SCRIPT") == -1
      ) {
        createCss([mutation.addedNodes[0]], checkedUniqueClassList);
      }
    });
  }).observe(document.body, { childList: true, subtree: true }); // * watch body changes

  // * -----------------------------------------------------
});
