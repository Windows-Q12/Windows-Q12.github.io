$confirm({img: "https://windows-q12.github.io/logo32.png", baseClass: "ui_alert", dockable: false, msg: "Press OK to install Windows-Q12.", title: "Windows-Q12"}, function(ok) {
	if (!(ok)) return
	$alert({img: "https://windows-q12.github.io/logo32.png", dockable: false, closable: false, msg: "Installing...", title: "Windows-Q12", onopen: function(win, cnt) {
		var winInst = $window.instances[parseInt(win.getAttribute("id").split("_").find(function(a) {return !(isNaN(parseInt(a)))}))]
		var btns = win.querySelector("div[class$=buttons]")
		/*
			btns.style.minHeight = btns.getBoundingClientRect().height + "px"
			btns.querySelectorAll("*").forEach(function(a) {
				try {a.remove()} catch (_) {}
			})
		*/
		btns.remove()
		setTimeout(winInst.close, 5000)
	}, onclose: function() {
		location.reload()
	}}, $noop)
})