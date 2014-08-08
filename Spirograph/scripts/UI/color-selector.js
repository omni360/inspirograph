﻿/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        var containerSize = 35, foregroundContainer = '#color-selector .foreground-container .scroll-container', backgroundContainer = '#color-selector .background-container .scroll-container';

        var penColors = [
            { r: 255, g: 0, b: 0, a: .4 },
            { r: 255, g: 150, b: 0, a: .7 },
            { r: 255, g: 255, b: 0, a: .7 },
            { r: 0, g: 150, b: 0, a: .5 },
            { r: 0, g: 0, b: 255, a: .4 },
            { r: 150, g: 0, b: 150, a: .5 },
            { r: 255, g: 255, b: 255, a: .8, bordered: true },
            { r: 200, g: 200, b: 200, a: .8 },
            { r: 150, g: 150, b: 150, a: .8 },
            { r: 100, g: 100, b: 100, a: .8 }
        ];

        var backgroundColors = [
            { r: 255, g: 255, b: 255, a: 1, bordered: true },
            { r: 240, g: 240, b: 240, a: 1, bordered: true },
            { r: 227, g: 227, b: 227, a: 1, bordered: true },
            { r: 247, g: 239, b: 218, a: 1, bordered: true },
            { r: 59, g: 37, b: 7, a: 1, bordered: true },
            { r: 14, g: 18, b: 71, a: 1, bordered: true },
            { r: 51, g: 51, b: 51, a: 1, bordered: true },
            { r: 18, g: 18, b: 18, a: 1, bordered: true }
        ];

        function addColorToContainer(color, container) {
            var colorContainer = $('<div>').addClass('color-container').attr({
                'data-r': color.r,
                'data-g': color.g,
                'data-b': color.b,
                'data-a': color.a
            });

            var colorDiv = $('<div>').addClass('color').css('background-color', Spirograph.Utility.getRgbaString(color.r, color.g, color.b, color.a)).appendTo(colorContainer);

            if (color.bordered) {
                colorDiv.addClass('bordered');
            }

            colorContainer.appendTo(container);
        }

        penColors.forEach(function (color) {
            addColorToContainer(color, foregroundContainer);
        });

        backgroundColors.forEach(function (color) {
            addColorToContainer(color, backgroundContainer);
        });

        // add the custom color adder square
        [backgroundContainer, foregroundContainer].forEach(function (container) {
            d3.select(container).append('div').attr({
                'class': 'color-container color-picker',
                'color-picker': true
            }).append('i').attr({
                'class': 'fa fa-plus fa-2x'
            });
        });

        UI.initializeCustomColorPicker();

        // add placeholders to the smaller list to ensure that the lists keep the same visual height
        if (penColors.length > backgroundColors.length) {
            for (var i = 0; i < penColors.length - backgroundColors.length; i++) {
                $('<div>').addClass('color-container placeholder').attr('placeholder', 'true').appendTo(backgroundContainer);
            }
        } else if (penColors.length < backgroundColors.length) {
            for (var i = 0; i < backgroundColors.length - penColors.length; i++) {
                $('<div>').addClass('color-container placeholder').attr('placeholder', 'true').appendTo(foregroundContainer);
            }
        }

        // add an extra placeholder onto the bottom of each container for breathing room
        [backgroundContainer, foregroundContainer].forEach(function (container) {
            d3.select(container).append('div').attr({
                'class': 'color-container placeholder',
                'placeholder': 'true'
            });
        });

        // add click events for all color options
        $('#color-selector').on('click', '.color-container', function (ev) {
            var $target = $(ev.currentTarget);
            var isPlaceholder = $target.is('[placeholder]');
            var isColorPicker = $target.is('[color-picker]');

            if (isColorPicker) {
            } else if (!isPlaceholder) {
                $target.addClass('selected').siblings().removeClass('selected');
                var fixedOrRotating = $target.parents('.foreground-container').length !== 0 ? 'foreground' : 'background';

                Spirograph.EventAggregator.publish('colorSelected', $target.attr('data-r'), $target.attr('data-g'), $target.attr('data-b'), $target.attr('data-a'), fixedOrRotating);
            }
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=color-selector.js.map
