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
		this.tempElem = document.createElement("link")
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
			})
	}

	getInfo() {
	    return {
	    	id: "math",
	    	name: "AI",
	    	blocks: [
		auto_block('reporter', "completePrompt", "羊 complete [a]")

	        '---',

	        
	    	],
	    	
	    }
	}

	
	completePrompt({a}) {
    const text = a.trim();
    const url = `https://api.openai.com/v1/engines/text-davinci-003/completions`;
    const options = {
			method: "POST",
			body: JSON.stringify({
				prompt: text,
				max_tokens: 300,
		}),	
			headers: {
				"Authorization": "Bearer " + "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",
				"Content-type": "application/json; charset=UTF-8"
       },
     };
        });
  const response = await fetch(url, options);
	const jsonData = await response.json();
	const output = jsonData.choices[0].text;
	return output;
    
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
