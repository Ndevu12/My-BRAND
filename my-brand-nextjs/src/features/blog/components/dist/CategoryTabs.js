"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CategoryTabs = void 0;
var react_1 = require("react");
function CategoryTabs(_a) {
    var categories = _a.categories, activeCategory = _a.activeCategory, onCategoryChange = _a.onCategoryChange, _b = _a.isSearchActive, isSearchActive = _b === void 0 ? false : _b;
    var containerRef = react_1.useRef(null);
    var scrollContainerRef = react_1.useRef(null);
    var _c = react_1.useState(false), isCalculated = _c[0], setIsCalculated = _c[1];
    // All categories including "All Topics"
    var allCategories = react_1.useMemo(function () { return __spreadArrays([
        { _id: "all", name: "All Topics", icon: "grid" }
    ], categories.filter(function (category) { return category._id !== "all"; })); }, [categories]);
    // Calculate category button sizes and adjust visibility
    react_1.useEffect(function () {
        var calculateButtonSizes = function () {
            if (!containerRef.current || !scrollContainerRef.current)
                return;
            var container = containerRef.current;
            var scrollContainer = scrollContainerRef.current;
            var containerWidth = container.offsetWidth;
            var padding = 32; // Container padding (16px each side)
            var availableWidth = containerWidth - padding;
            // Create temporary buttons to measure actual widths
            var tempContainer = document.createElement("div");
            tempContainer.className =
                "flex gap-2 md:gap-4 invisible absolute -top-full";
            tempContainer.style.fontSize =
                window.getComputedStyle(container).fontSize;
            tempContainer.style.fontFamily =
                window.getComputedStyle(container).fontFamily;
            document.body.appendChild(tempContainer);
            var buttonWidths = [];
            allCategories.forEach(function (category) {
                var tempButton = document.createElement("button");
                tempButton.className =
                    "px-4 py-2 rounded-full font-medium whitespace-nowrap flex-shrink-0";
                tempButton.innerHTML = "" + (category._id !== "all"
                    ? "<i class=\"fas fa-" + category.icon + " mr-2\"></i>"
                    : "") + category.name;
                tempContainer.appendChild(tempButton);
                buttonWidths.push(tempButton.offsetWidth);
            });
            document.body.removeChild(tempContainer);
            // Apply responsive sizing to scroll container
            var gap = window.innerWidth >= 768 ? 16 : 8; // md:gap-4 vs gap-2
            var totalWidth = 0;
            var visibleButtons = 0;
            for (var i = 0; i < buttonWidths.length; i++) {
                var buttonWithGap = buttonWidths[i] + (i > 0 ? gap : 0);
                if (totalWidth + buttonWithGap <= availableWidth) {
                    totalWidth += buttonWithGap;
                    visibleButtons++;
                }
                else {
                    break;
                }
            }
            // If not all buttons fit, enable horizontal scrolling
            if (visibleButtons < allCategories.length) {
                scrollContainer.style.width = Math.max(availableWidth, totalWidth) + "px";
            }
            else {
                scrollContainer.style.width = "auto";
            }
            setIsCalculated(true);
        };
        // Calculate on mount and resize
        var timer = setTimeout(calculateButtonSizes, 100); // Small delay to ensure DOM is ready
        window.addEventListener("resize", calculateButtonSizes);
        return function () {
            clearTimeout(timer);
            window.removeEventListener("resize", calculateButtonSizes);
        };
    }, [allCategories]);
    // Auto-scroll to show active category
    react_1.useEffect(function () {
        if (!scrollContainerRef.current || !isCalculated)
            return;
        var activeButton = scrollContainerRef.current.querySelector("[data-category=\"" + activeCategory + "\"]");
        if (activeButton) {
            var container = scrollContainerRef.current.parentElement;
            if (container) {
                var containerRect = container.getBoundingClientRect();
                var buttonRect = activeButton.getBoundingClientRect();
                // Check if button is fully visible
                if (buttonRect.left < containerRect.left ||
                    buttonRect.right > containerRect.right) {
                    // Scroll to center the active button
                    var scrollLeft = activeButton.offsetLeft -
                        container.offsetWidth / 2 +
                        activeButton.offsetWidth / 2;
                    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
                }
            }
        }
    }, [activeCategory, isCalculated]);
    return (React.createElement("div", { className: "bg-gray-100/50 dark:bg-secondary/50 py-4 sticky top-16 z-10 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-800/50" },
        React.createElement("div", { className: "max-w-6xl mx-auto px-4", ref: containerRef },
            React.createElement("div", { className: "overflow-x-auto scrollbar-hide" },
                React.createElement("div", { ref: scrollContainerRef, className: "flex gap-2 md:gap-4 justify-start md:justify-center min-w-max transition-opacity duration-300 " + (isCalculated ? "opacity-100" : "opacity-0") }, allCategories.map(function (category) { return (React.createElement("button", { key: category._id, "data-category": category._id, onClick: function () { return onCategoryChange(category._id); }, className: "px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 " + (activeCategory === category._id && !isSearchActive
                        ? "bg-yellow-500 text-black shadow-lg"
                        : isSearchActive
                            ? "bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 opacity-60"
                            : "bg-white/70 dark:bg-secondary border border-gray-300 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 text-gray-700 dark:text-white hover:shadow-md") },
                    category._id !== "all" && (React.createElement("i", { className: "fas fa-" + category.icon + " mr-2" })),
                    category.name)); }))))));
}
exports.CategoryTabs = CategoryTabs;
