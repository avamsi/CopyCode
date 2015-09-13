// ==UserScript==
// @author       Vamsi Krishna | vamsi_ism@outlook.com
// @description  Adds a copy button after 'pre' tags.
// @homepage     https://github.com/krikx/CopyCode
// @match        *://*/*
// @name         CopyCode
// @version      0.1
// ==/UserScript==

onload = function(){
	function insertAfter(referenceNode, newNode){
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	function copy(event){
		var range = document.createRange();
		range.selectNode(pre[this.id]);

		var sel = getSelection();
		sel.removeAllRanges(); // removing selection without backup
		sel.addRange(range);

		var success = document.execCommand('copy');
		sel.removeAllRanges(); // possible TODO

		if (success){
			this.innerText = "Copied!";
			this.setAttribute("style", "cursor:pointer");
			setTimeout(
				function(but){
					but.innerText = "Copy";
					but.setAttribute("style", "cursor:pointer");
				},
				196, this
			)
		}
	}

	var pre = document.getElementsByTagName('pre');
	var but, att;

	for (var i = 0; i < pre.length; i++){
		but = document.createElement("button");
		but.innerText = "Copy"

		att = document.createAttribute("id");
		att.value = i;
		but.setAttributeNode(att);

		att = document.createAttribute("style");
		att.value = "cursor:pointer";
		but.setAttributeNode(att);

		insertAfter(pre[i], but);
		but.addEventListener('click', copy);
	}
}
