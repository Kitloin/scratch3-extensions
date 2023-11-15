let style = document.createElement("style");style.innerHTML = `[class^="stage-header_stage-button-icon"] {  transform: scaleX(-1);}[class^="target-pane_target-pane"] {  -webkit-flex-direction: row-reverse;  -ms-flex-direction: row-reverse;  flex-direction: row-reverse;}[dir="ltr"] [class^="target-pane_stage-selector-wrapper"] {  margin-left: 0;  margin-right: calc(0.5rem / 2);}[dir="ltr"] [class^="sprite-selector_sprite-selector"] {  margin-left: calc(0.5rem / 2);  margin-right: 0;}[dir="rtl"] [class^="target-pane_stage-selector-wrapper"] {  margin-right: 0;  margin-left: calc(0.5rem / 2);}[dir="rtl"] [class^="sprite-selector_sprite-selector"] {  margin-right: calc(0.5rem / 2);  margin-left: 0;}[class^="gui_flex-wrapper"] {  -webkit-flex-direction: row-reverse;  -ms-flex-direction: row-reverse;  flex-direction: row-reverse;  overflow-x: hidden;}[dir="ltr"] [class^="backpack_backpack-header"] {  border-top-right-radius: 0;  border-top-left-radius: 0.5rem;}[dir="ltr"] [class^="blocks_blocks_C530M"] .injectionDiv,[dir="ltr"] [class^="asset-panel_wrapper"] {  border-top-right-radius: 0;  border-bottom-right-radius: 0;  border-bottom-left-radius: 0.5rem;}[dir="ltr"] [class^="gui_extension-button-container"] {  border-bottom-left-radius: 0.5rem;}[dir="rtl"] [class^="backpack_backpack-header"] {  border-top-left-radius: 0;  border-top-right-radius: 0.5rem;}[dir="rtl"] [class^="blocks_blocks_C530M"] .injectionDiv,[dir="rtl"] [class^="asset-panel_wrapper"] {  border-top-left-radius: 0;  border-bottom-left-radius: 0;  border-bottom-right-radius: 0.5rem;}[dir="rtl"] [class^="gui_extension-button-container"] {  border-bottom-right-radius: 0.5rem;}.Popover {  z-index: 40;}`;
document.body.appendChild(style);void(0);
const collection = document.getElementsByClassName("react-tabs_react-tabs__tab_3Nn-X gui_tab_27Unf");
collection[0].innerHTML = '<img draggable="false" src="https://raw.githubusercontent.com/scratchfoundation/scratch-www/develop/static/svgs/project/sprite-count.svg"><span>Looks</span>';
let amogus = '';
document.body.appendChild(amogus);void(0);
// =================== Scratch extension =================== 

// auto arguments is a little over complicated to deduce argument count

const letter = i => String.fromCharCode(97+i)

const auto_block = (blockType, opcode, text, args) => ({
	blockType,
	opcode,
	text,
	arguments: Object.fromEntries(
		new Array(text.split('[').length-1).fill().map((_,i)=> [
			letter(i), {
				type: (args && args[i]) || "number", 
				defaultValue: " "
			}
		])
	)
})
const mat_reporter_f = f => o => to_s(f(...new Array(Object.entries(o).length).fill().map((_,i)=> from_s(o[letter(i)]))))

class ScratchMath {

	constructor(runtime) {
		this.runtime = runtime
	/*	this.tempElem = document.createElement("link")
			this.tempElem.rel = "stylesheet"
			this.tempElem.type = "text/css"
			this.tempElem.href = "https://scratchjs.crossscar.repl.co/styles.css"
			document.head.appendChild(this.tempElem)
			
			this.consoleElem = document.createElement("div")
			this.consoleElems = {}
			this.consoleElem.classList.add("ScratchJS-console")
			this.consoleElems.clearBtn = document.createElement("button")
			this.consoleElems.clearBtn.classList.add("ScratchJS-console-clear")
			this.consoleElems.clearBtn.innerHTML = "X"
			this.consoleElems.clearBtn.title = "Clear Console"
			this.consoleElem.appendChild(this.consoleElems.clearBtn)
			document.querySelector(".stage-wrapper_stage-wrapper_2bejr").appendChild(this.consoleElem)

			this.consoleElems.clearBtn.addEventListener("click", () => {
				this.console.clear()
			}) */
	}

	getInfo() {
	    return {
	    	id: "math",
	    	name: "JS",
	    	blocks: [
		auto_block('reporter', "Fetch", "羊 fetch [a]"),
	        {
	        	blockType: 'command',
	        	opcode: 'EvalCmd',
	        	text: '羊 run [a]',
	        	arguments: {
	        		a: {
	        			type: "string",
	        			defaultValue: " "
	        		},
	        		b: {
	        			type: "string",
	        			defaultValue:" "
	        		}
	        	}
	        },

	        '---',

	        
	    	],
	    	
	    }
	}

	EvalCmd({a}) {
		try {
eval(a)
  

} catch (err) {

  alert(err)

}
	}

	Fetch({a}) {
    let file = a;
    return fetch(file)
        .then(x => x.text())
        .then(y => {
            let ans = y;
            return ans;
        });
}
	
}

// ============== globalize vm and load extension ===============

function findReactComponent(element) {
    let fiber = element[Object.keys(element).find(key => key.startsWith("__reactInternalInstance$"))];
    if (fiber == null) return null;

    const go = fiber => {
        let parent = fiber.return;
        while (typeof parent.type == "string") {
            parent = parent.return;
        }
        return parent;
    };
    fiber = go(fiber);
    while(fiber.stateNode == null) {
        fiber = go(fiber);
    }
    return fiber.stateNode;
}

window.vm = findReactComponent(document.getElementsByClassName("stage-header_stage-size-row_14N65")[0]).props.vm;

(function() {
    var extensionInstance = new ScratchMath(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
