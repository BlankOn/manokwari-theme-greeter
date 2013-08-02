(function ($) {
  $.fn.getTextWidth = function() {
    var spanText = $("BODY #spanCalculateTextWidth");

    if (spanText.size() <= 0) {
      spanText = $("<span id='spanCalculateTextWidth' style='filter: alpha(0);'></span>");
      spanText.appendTo("BODY");
    }

    var valu = this.val();
    if (!valu) valu = this.text();

    spanText.text(valu);

    spanText.css({
      "fontSize": this.css('fontSize'),
      "fontWeight": this.css('fontWeight'),
      "fontFamily": this.css('fontFamily'),
      "position": "absolute",
      "top": 0,
      "opacity": 0,
      "left": -2000
    });

    return spanText.outerWidth() + parseInt(this.css('paddingLeft')) + 'px';
  };

  $.fn.getTextHeight = function(width) {
    var spanText = $("BODY #spanCalculateTextHeight");

    if (spanText.size() <= 0) {
      spanText = $("<span id='spanCalculateTextHeight'></span>");
      spanText.appendTo("BODY");
    }

    var valu = this.val();
    if (!valu) valu = this.text();

    spanText.text(valu);

    spanText.css({
      "fontSize": this.css('fontSize'),
      "fontWeight": this.css('fontWeight'),
      "fontFamily": this.css('fontFamily'),
      "top": 0,
      "left": -1 * parseInt(width) + 'px',
      "position": 'absolute',
      "display": "inline-block",
      "width": width
    });

    return spanText.innerHeight() + 'px';
  };

  /**
   * Adjust the font-size of the text so it fits the container.
   *
   * @param minSize     Minimum font size?
   * @param maxSize     Maximum font size?
   * @param truncate    Truncate text after sizing to make sure it fits?
   */
  $.fn.autoTextSize = function(minSize, maxSize, truncate) {
    var width = 200;
    var textWidth = parseInt(this.getTextWidth());
    var fontSize = 50;//parseInt(this.css('font-size'));

    while (width < textWidth || (maxSize && fontSize > parseInt(maxSize))) {
      if (minSize && fontSize <= parseInt(minSize)) break;

      fontSize--;
      this.css('font-size', fontSize + 'px');

      textWidth = parseInt(this.getTextWidth());
    }

    if (truncate) this.autoTruncateText();
  };

  /**
   * Function that truncates the text inside a container according to the
   * width and height of that container. In other words, makes it fit by chopping
   * off characters and adding '...'.
   */
  $.fn.autoTruncateText = function() {
    _truncated = false;
    var _self = this,
        _width = _self.outerWidth(),
        _textHeight = parseInt(_self.getTextHeight(_width)),
        _text = _self.text();

    // As long as the height of the text is higher than that
    // of the container, we'll keep removing a character.
    while (_textHeight > _self.outerHeight()) {
      _text = _text.slice(0,-1);
      _self.text(_text);
      _textHeight = parseInt(_self.getTextHeight(_width));
      _truncated = true;
    }

    // When we actually truncated the text, we'll remove the last
    // 3 characters and replace it with '...'.
    if (!_truncated) return;
    _text = _text.slice(0, -3);

    // Make sure there is no dot or space right in front of '...'.
    var lastChar = _text[_text.length - 1];
    if (lastChar == ' ' || lastChar == '.') _text = _text.slice(0, -1);
    _self.text(_text + '...');
  };
})(jQuery);
