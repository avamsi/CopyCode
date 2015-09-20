// ==UserScript==
// @author       Vamsi Krishna | vamsi_ism@outlook.com
// @description  Adds a copy button after 'pre' tags.
// @grant        none
// @homepage     https://github.com/krikx/CopyCode
// @match        *://*/*
// @name         CopyCode
// @version      0.1
// ==/UserScript==

var css = "/* google fonts */ @import url(https://fonts.googleapis.com/css?family=Open+Sans); .kxbt { border-radius: 4px; cursor: pointer; display: inline-block; font-family: 'Open Sans', 'sans-serif'; font-size: 15px; margin-bottom: 5px; padding: 5px; padding-top: 3px; transition: .2s; } .blue { color: #55acee; border: 1px #55acee solid; } .blue:hover { background-color: #55acee; color: #fff; } .green { color: #2ecc71; border: 1px #2ecc71 solid; } .green:hover { color: #fff; background-color: #2ecc71; } .red { color: #e74c3c; border: 1px #e74c3c solid; } .red:hover { color: #fff; background-color: #e74c3c; } /* green and red are almost never used as timeout is too fast to observe any noticible difference */";
var style = document.createElement('style');
style.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(style);

function Init(){
	var blocks = document.getElementsByTagName('pre');

	for (var id = 0; id < blocks.length; id++){
		var btn = document.createElement('div');
		btn.innerText = 'Copy';
		btn.setAttribute('class', 'kxbt blue');

		InsertAfter(blocks[id], btn);
	}
}

function InsertAfter(refNode, newNode){
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	WireClick(newNode, refNode); // add the click funtionality
}

function WireClick(btn, block){
	btn.addEventListener('click', function(){
		Copy(btn, block);
	});
}

function Copy(btn, block){
	var range = document.createRange();
	range.selectNode(block);

	var sel = getSelection();
	sel.removeAllRanges(); // TODO | removing selection without backup
	sel.addRange(range);

	var success = document.execCommand('copy');
	sel.removeAllRanges(); // possible TODO
	var msg = success ? 'Copied!' : 'Error!';
	var tcls = success ? 'kxbt green' : 'kxbt red';

	btn.innerText = msg;
	btn.setAttribute('class', tcls);
	setTimeout( // revert back to blue in 256ms
		function(btn){
			btn.innerText = 'Copy';
			btn.setAttribute('class', 'kxbt blue');
		},
		256, btn
	)
}

function main(){
	var body = document.getElementsByTagName('body')[0];

	// do not inject twice
	if (body.hasAttribute('data-kxbt-inited')){
		return;
	}

	body.setAttribute('data-kxbt-inited', true);
	Init();
}

// wait until ready
window.addEventListener('load', main);
