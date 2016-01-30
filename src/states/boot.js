(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    preload: function () {
      this.load.image('progressBar', 'assets/preloader.gif');
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.windowConstraints.bottom = "visual";
    },

    create: function () {
      this.game.stage.disableVisibilityChange = true;
      this.game.input.maxPointers = 1;
      this.game.state.start('preload');
    }
  };

  module.exports = Boot;

}());
