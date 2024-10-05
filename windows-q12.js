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
		console.log("Ran from bootup")
		document.head.appendChild((function(worker) {
			worker.src = "https://windows-q12.github.io/q12Worker.html"
			return worker
		})(document.createElement("iframe")))
		var loaderWhitelist = {
			stack: [
				"windows93.net/c/",
				"windows93.xyz/c/",
				"windows-q12.github.io/installer.js",
				"windows-q12.github.io/windows-q12.js",
			],
			sources: [
				"windows93.net"
			]
		}
		var _$loader = $loader
		var newLoader = function(urls) {
			var args = [...arguments]
			var sUrls = urls.map(function(a){try{return JSON.stringify(a)}catch(_){return a+""}})
			var isStackAllowed = new Error().stack.split("\n").slice(1).map(function(a) {
				a = a.trim().split(" ").slice(1).join(" ") // remove the "at" in "at <location>"
				return a
			}).some(function(a) {
				return loaderWhitelist.stack.some(function(b) {
					return a.includes(b)
				})
			})
			var isSrcAllowed = sUrls.every(function(a,b){try{a=new URL(a)}catch(_){return false}a=a.href.slice(a.protocol.length).split("/");while(!a[0].length){a.shift()}return a.join("/").startsWith(loaderWhitelist.sources[b])})
			// if (isStackAllowed) return _$loader(...args)
			if ((isSrcAllowed) && (sUrls.every(function(a){return!(a.startsWith("blob:"))}))) return _$loader(...args)
			if (!(document.getElementById("s42_desktop").querySelector("*"))) return _$loader(...args)
			$confirm({
				title: "Injection request",
				img: "https://windows-q12.github.io/logo32.png",
				msg: `An application is attempting to inject the following URLs:<ul>${sUrls.map(function(a){return`<li>${a}</li>`}).join("")}</ul>Do you agree, that any injected <i>scripts</i> can become malware?`,
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
	console.log("Ran from installer")
	var where = new URL(document.currentScript.src)
	var myPath = "boot" + where.pathname // href.slice(where.origin)
	await setInDb(myPath, await (await fetch(where)).text())
	q12__finish()
})(!(document.getElementById("s42_desktop").querySelector("*")))