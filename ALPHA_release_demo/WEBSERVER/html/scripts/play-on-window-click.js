/* global AFRAME */
AFRAME.registerComponent('play-on-window-click', {
	init: function () {
		this.onClick = this.onClick.bind(this);
	},
	play: function () {
		window.addEventListener('mousedown', this.onClick);
		document.addEventListener('touchstart', this.onClick);
	},
	pause: function () {
		window.removeEventListener('mousedown', this.onClick);
		document.removeEventListener('touchstart', this.onClick);
	},
	onClick: function () {
    
    
		var components = this.el.components;
		var image;

		if (components.ambisonic) {
			components.ambisonic.playSound();
		} else if (components.sound) {
            
            components.sound.playSound();

            
            //var currSound =  components.sound.src;
            
            //var currSound =  this.el.getAttribute('sound');
            //var getId = currSound.src.substring(2, 3);
            var currSound =  this.el.getAttribute('src');
            var getId = currSound.substring(1);//.src.substring(2, 3);
            //getId = 'audio_'+getId;
            //alert(getId);
            document.getElementById(getId).volume = 0.01;
            document.getElementById(getId).play();

		} else if (components.material) {
			try {
				image = components.material.material.map.image;
				image.play();
			} catch (e) {}
		} 
        
        document.querySelector('#msg').setAttribute('visible', false);
	}
});