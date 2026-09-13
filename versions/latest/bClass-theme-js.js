/***
 * * Bclass theme js v1.1.0
 * * Copyright 2021 ("https://github.com/EW-EndWall/bClass-theme-js/blob/main/LICENSE")
 * * Licensed ("Bik Public License 2.0")
 * * License Update ("03/28/2024")
 */
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    // * current year
    $(".current-year").each((index, element) => {
      $(element).text($(element).text() + new Date().getFullYear());
    });
    // * -----------------------------------------------------
    // * scroll x mouse | scroll x mouse hide
    $("ul.ul-li-x-scroll, ul.ul-li-x-scroll-hide").each((index, element) => {
      $(element).on("wheel", (event) => {
        if (event.originalEvent.deltaY === 0) return;
        event.preventDefault();
        event.currentTarget.scrollLeft += event.originalEvent.deltaY;
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
    // * is input type tel to phone number edit
    $("input[type=tel]").on("keyup", (event) => {
      // * elements
      const input = event.target;
      const start = input.selectionStart;
      const end = input.selectionEnd;
      // * val data  variable
      const originalValue = input.value;
      const formattedValue = formatPhoneNumber(originalValue);
      // * Update input value without losing caret position
      if (originalValue !== formattedValue) {
        input.value = formattedValue;
        const newPos = start + (formattedValue.length - originalValue.length);
        phoneNumberSetCaretPosition(input, newPos);
      }
    });
    // * -----------------------------------------------------
    const createCss = (getElemets, checkedUniqueClassList) => {
      // * create class func - check and create style
      const createClass = ({ className, classKey, classValue, prefixName }) => {
        // * get css value
        let cssDynamicVal = classValue
          ? classValue
          : className.match(/\[(.*?)\]/)?.[1];
        // * Stop to prevent invalid CSS from being generated if the value is empty.
        if (!cssDynamicVal) return;
        // * is content, Securely process content property: allow safe CSS functions or wrap text in quotes
        if (classKey == "content") {
          let v = String(cssDynamicVal).trim();
          cssDynamicVal = /^(attr|var|url|counters?)\([^;{}]*\)$/.test(v)
            ? v
            : `"${v.replace(/"/g, '\\"')}"`;
        }
        // * create css
        const cssRule = (() => {
          const createClassname = className.replace(/[\[\]#%!().,:]/g, "\\$&"); // * - [ ] # % ! ( ) . , :
          // * is check prefix - ex: before affter
          if (prefixName != null) {
            const prefixVal = prefixes[prefixName];
            // * match check prefix
            if (prefixVal != undefined) {
              return `.${prefixName}\\:${createClassname}${prefixVal}{${classKey}:${cssDynamicVal}}`;
            }
          } else {
            return `.${createClassname}{${classKey}:${cssDynamicVal}}`;
          }
        })();
        // * add css rule
        if (cssRule) addCssRule(cssRule);
      };
      // * clear class unique
      let uniqueClassList = uniqueClasses(getElemets);
      // * checked list check
      if (checkedUniqueClassList.size > 0)
        uniqueClassList = uniqueClassList.filter(
          (item) => !checkedUniqueClassList.has(item),
        );
      // * check class css
      uniqueClassList.forEach((className, index) => {
        // * preventing duplicate classes
        checkedUniqueClassList.add(className);
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
        // * Shorthand Spacing (m-1.5, p-5, hover:m-2)
        // const isShorthand = className.match(
        //   /^(?:([a-zA-Z0-9-]+):)?([a-zA-Z]+-)([0-9]+(?:\.[0-9]+)?)$/,
        // );
        // if (isShorthand != null) {
        //   const shorthandPrefix = isShorthand[1]; //* E.g.: 'hover' (Otherwise, it returns undefined)
        //   const shorthandPattern = isShorthand[2]; //* E.g.: 'm-'
        //   const shorthandValue = isShorthand[3]; //*  E.g.: '1.5' or '5'

        //   if (shorthandSpacing[shorthandPattern] !== undefined) {
        //     createClass({
        //       prefixName: shorthandPrefix,
        //       className: shorthandPattern + shorthandValue,
        //       classKey: shorthandSpacing[shorthandPattern],
        //       classValue: `${shorthandValue}rem`,
        //     });
        //     return; // * Process complete, skip the next checks.
        //   }
        // }
        // * is include -[
        const patternCheck = className.indexOf("-[");
        const classEndCheck = className.indexOf("]"); // * bug fix
        if (patternCheck !== -1 && classEndCheck !== -1) {
          // * class find
          const findClass = className
            .substring(0, patternCheck + 1) // * find patern class
            .replace(/([^:]+):/, ""); // * : and before clear, bug fix
          // * pattern find
          const findPattern = patterns.find((patternObj) =>
            findClass.startsWith(patternObj.pattern),
          );
          // * Match check
          if (findPattern != undefined) {
            const property = findPattern.property;
            // * prefix find index
            let prefixCheck = className.indexOf(":");
            // * is prefix index check
            if (prefixCheck != -1) {
              const prefixclassName = className.slice(prefixCheck + 1);
              const prefixName = className.slice(0, prefixCheck);
              // * class create
              createClass({
                className: prefixclassName,
                classKey: property,
                prefixName: prefixName,
              });
            } else {
              // * class create
              createClass({
                classKey: property,
                className: className,
              });
            }
          }
        }
      });
    };
    // * get all elements
    const uniqueClasses = (elements) => {
      // * check checked class list
      const classes = new Set();
      elements.forEach((element) => {
        if (element && element.classList) {
          element.classList.forEach((className) => classes.add(className));
        }
      });
      return Array.from(classes);
    };
    // * create css style
    const addCssRule = (cssCode) => {
      let styleElement = document.getElementById("bClass-createCssStyle");
      //* style element is null
      if (styleElement == null) {
        styleElement = document.createElement("style"); // * create <style>
        styleElement.type = "text/css"; // * type add
        styleElement.id = "bClass-createCssStyle"; // * id add
        document.head.appendChild(styleElement); // * add <style>
      }
      styleElement.appendChild(document.createTextNode(cssCode)); // * add css code
    };
    // const shorthandSpacing = {
    //   "m-": "margin",
    //   "mt-": "margin-top",
    //   "mb-": "margin-bottom",
    //   "ml-": "margin-left",
    //   "mr-": "margin-right",
    //   "p-": "padding",
    //   "pt-": "padding-top",
    //   "pb-": "padding-bottom",
    //   "pl-": "padding-left",
    //   "pr-": "padding-right",
    // };
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
    let checkedUniqueClassList = new Set();
    // * load page create dynamic css
    createCss(document.querySelectorAll("*"), checkedUniqueClassList);
    // * Timer reference (for performance optimization)
    let cssTimeout;
    // * Create the watcher and define a callback func
    new MutationObserver((mutations) => {
      let shouldUpdate = false;
      // * 1. We scan the incoming mutations and check if there is a valid HTML element.
      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i];
        if (mutation.addedNodes.length > 0) {
          const hasValidElement = Array.from(mutation.addedNodes).some(
            (node) => node.nodeType === 1 && node.nodeName !== "SCRIPT",
          );
          if (hasValidElement) {
            shouldUpdate = true;
            break; // * Break the loop if we've found even one (avoid unnecessary processing).
          }
        }
      }
      // * 2. If a valid element has been added, start the page scanning process.
      if (shouldUpdate) {
        // * Debounce (grouping) operation.
        // * Even if React or Vue triggers it 50 times in rapid succession, we cancel the previous command and ensure it executes only once—15 milliseconds after the final operation.
        clearTimeout(cssTimeout);
        cssTimeout = setTimeout(() => {
          createCss(document.querySelectorAll("*"), checkedUniqueClassList);
        }, 15);
      }
    }).observe(document.body, { childList: true, subtree: true }); // * watch body changes
    // * -----------------------------------------------------
  }
});
