(async function(inBoot) {
	/*
		function quietSave(...a) {
			var n = $notif
			$notif = function() {}
			var res = $file.save(...a)
			$notif = n
			return res
		}
	*/
	function setInDb(k, v) {
		return new Promise(function(reso, reje) {
			$db.set(k, v, function() {reso()})
		})
	}
	if (inBoot) {
		var _$loader = $loader
		var newLoader = function(urls) {
			$confirm({
				title: "Injection request",
				img: "https://windows-q12.github.io/logo32.png",
				msg: `An application is attempting to inject the following URLs:<ul>${urls.map(function(a) {try{return JSON.stringify(a)}catch(_){return a+""}}).map(function(a) {return `<li>${a}</li>`}).join("")}</ul>Do you agree, that any injected <i>scripts</i> can become malware?`,
				onopen: function(win, cnt) {
					cnt.querySelector(".ui_alert__text").style.textAlign = "left"
				}
			},
			function(ok) {
				if (ok) {
					_$loader(...arguments)
				}
			})
		}
		return
	}
	var where = new URL(document.currentScript.src)
	var myPath = "boot" + where.pathname // href.slice(where.origin)
	await setInDb(myPath, await (await fetch(where)).text())
	q12__finish()
})(!(document.getElementById("s42_desktop").querySelector("*")))