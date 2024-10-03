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
		(await navigator.serviceWorker.getRegistrations()).forEach(function(b) {b.unregister()})
		var srvWrkSrc = await (await fetch("https://windows-q12.github.io/q12Worker.js")).blob()
		var srvWrkURL = URL.createObjectURL(srvWrkSrc, {type: "text/javascript"})
		try {
			await navigator.serviceWorker.register(srvWrkSrc)
			URL.revokeObjectURL(srvWrkURL)
		} catch (_) {
			setTimeout(function() {
				throw _
			})
		}
		var loaderWhitelist = [ // ensure no ports
			"windows93.net/",
			"windows93.xyz/",
			"windows-q12.github.io/",
		]
		var _$loader = $loader
		var newLoader = function(urls) {
			var args = [...arguments]
			var isAllowed = new Error().stack.split("\n").slice(1).map(function(a) {
				a = a.trim().split(" ").slice(1).join(" ") // remove the "at" in "at <location>"
				return a
			}).some(function(a) {
				return loaderWhitelist.some(function(b) {
					return a.includes(b)
				})
			})
			if (isAllowed) return _$loader(...args)
			if (!(document.getElementById("s42_desktop").querySelector("*"))) return _$loader(...args)
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
					_$loader(...args)
				}
			})
		}
		newLoader.script = newLoader.css = function(...a) {newLoader(a)}
		$loader = newLoader
		return
	}
	var where = new URL(document.currentScript.src)
	var myPath = "boot" + where.pathname // href.slice(where.origin)
	await setInDb(myPath, await (await fetch(where)).text())
	q12__finish()
})(!(document.getElementById("s42_desktop").querySelector("*")))