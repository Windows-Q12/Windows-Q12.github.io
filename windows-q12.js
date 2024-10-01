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
		return
	}
	var where = new URL(document.currentScript.src)
	var myPath = "boot" + where.pathname // href.slice(where.origin)
	await setInDb(myPath, await (await fetch(where)).text())
	q12__finish()
})(!(document.getElementById("s42_desktop").querySelector("*")))