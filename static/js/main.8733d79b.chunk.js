(this["webpackJsonptrading-app"]=this["webpackJsonptrading-app"]||[]).push([[0],{21:function(e,t){},24:function(e,t,a){e.exports=a(61)},29:function(e,t,a){},52:function(e,t){},53:function(e,t){},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(22),s=a.n(c),o=(a(29),a(2)),l=a(3),r=a(4),u=a(7),d=a(6),m=a(5),h=a(23),p=a.n(h),f=a(10),v=a.n(f),g=a(8),k=a.n(g);n.Component;function E(e,t){return new Promise((function(a,n){var i=new FileReader,c=!!i.readAsBinaryString;i.onload=function(e){var n=e.target.result,i=k.a.read(n,{type:c?"binary":"array"}),s=i.SheetNames[0],o=i.Sheets[s],l={rows:k.a.utils.sheet_to_json(o,{header:1}),cols:function(e){for(var t=[],a=k.a.utils.decode_range(e).e.c+1,n=0;n<a;++n)t[n]={name:k.a.utils.encode_col(n),key:n};return t}(o["!ref"])};return a(l),t(null,l)},e&&c?i.readAsBinaryString(e):i.readAsArrayBuffer(e)}))}a(54),a(55);var b=function(e){return i.a.createElement("div",{className:"loader",style:e.sizeStyle})},y=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={stockDetails:{},loadingStockDetails:!1},n.openTab=n.openTab.bind(Object(u.a)(n)),n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.fetchStockDetails(this.props.item.code),document.getElementById("defaultOpen-".concat(this.props.item.code)).click()}},{key:"openTab",value:function(e,t){var a,n,i;for(n=document.getElementsByClassName("tabcontent-".concat(this.props.item.code)),a=0;a<n.length;a++)n[a].style.display="none";for(i=document.getElementsByClassName("tablinks-".concat(this.props.item.code)),a=0;a<i.length;a++)i[a].className=i[a].className.replace(" active","");document.getElementById(t).style.display="block",e.currentTarget.className+=" active"}},{key:"fetchStockDetails",value:function(e){var t=this,a="".concat(e,".NSE"),n=["F41ON15LGCFM4PR7","SYTCQBUIU44BX2G4","50M3AP1K3Y","RNZPXZ6Q9FEFMEHM","VZLZ58FTEXZW7QZ6"],i=n[Math.floor(Math.random()*n.length)],c="https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=".concat(a,"&apikey=").concat(i);this.setState({loadingStockDetails:!0}),v.a.get(c).then((function(e){t.setState({stockDetails:e.data["Global Quote"]})})).catch((function(e){return console.log(e)})).finally((function(){t.setState({loadingStockDetails:!1})}))}},{key:"render",value:function(){var e=this,t=this.state.stockDetails;return i.a.createElement("div",{className:"stock-details"},i.a.createElement("div",null,i.a.createElement("div",{className:"title"},this.props.item.name),i.a.createElement("div",{className:"tab"},i.a.createElement("button",{className:"tablinks-".concat(this.props.item.code),onClick:function(t){return e.openTab(t,"latest")},id:"defaultOpen-".concat(this.props.item.code)},"Latest Data"),i.a.createElement("button",{className:"tablinks-".concat(this.props.item.code),onClick:function(t){return e.openTab(t,"historical")}},"Historical"),i.a.createElement("button",{className:"tablinks-".concat(this.props.item.code),onClick:function(t){return e.openTab(t,"technical")}},"Technical Indicators")),i.a.createElement("div",{id:"historical",className:"tabcontent"},i.a.createElement("h3",null,"Paris"),i.a.createElement("p",null,"Paris is the capital of France.")),i.a.createElement("div",{id:"technical",className:"tabcontent"},i.a.createElement("h3",null,"Tokyo"),i.a.createElement("p",null,"Tokyo is the capital of Japan.")),this.state.loadingStockDetails?i.a.createElement(b,{sizeStyle:{height:"30px",width:"30px",marginLeft:"40%"}}):i.a.createElement("div",{id:"latest",className:"tabcontent-".concat(this.props.item.code," details")},t&&Object.keys(t).length?Object.keys(t).map((function(e,a){return i.a.createElement("div",{key:a},e," : ",t[e])})):null)))}}]),a}(n.Component),S=(a(56),function(e){console.log("props.stockItems",e.stockItems);var t=e.stockItems.map((function(e,t){return i.a.createElement(y,{key:t,item:e})}));return i.a.createElement("div",{className:"StockList"},t)});a(57);var N=function(e){return i.a.createElement("div",{className:"filter_stocks"},i.a.createElement("div",{className:"label",style:{paddingLeft:"10px"}},"Filter the stocks based on these parameters: "),i.a.createElement("div",{className:"filters"},e.filterParams.map((function(t,a){return i.a.createElement("div",{className:"FilterParams",key:a},t,": ",i.a.createElement("input",{type:"number",onChange:function(a){return e.filterValues(a.target.value,"min",t)}})," - ",i.a.createElement("input",{type:"number",onChange:function(a){return e.filterValues(a.target.value,"max",t)}}))}))))};a(58);var O=function(e){return i.a.createElement("div",{className:"ImportFile"},i.a.createElement("div",{className:"header"},"You could even import .xlsx file to add the stocks in the search bar!(up to 5 stocks can be filtered at a time)"),i.a.createElement("input",{type:"file",onChange:e.onChange,onClick:e.onClick,style:{padding:"10px"}}),e.totalEntriesInfile.length?i.a.createElement("div",{className:"total_entries"},e.totalEntriesInfile.length-1," entries found in the file"):"",e.totalEntriesInfile.length?i.a.createElement(N,{filterParams:["Market Capitalization","Return on equity","Price to Earning","Pledged percentage","PEG Ratio","Price to book value","Debt to equity"],filterValues:e.filterValues}):"")},C=(a(59),function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).removeTag=function(e,t){var a=Object(o.a)(n.state.tags);a.splice(t,1),n.setState({tags:a}),n.props.onRemove(e)},n.inputKeyDown=function(e,t){e.code=e.code.split(".")[0].toString(),n.props.onSelect(e,t),n.state.tags.find((function(t){return t.code.toLowerCase()===e.code.toLowerCase()}))||(n.setState({tags:[].concat(Object(o.a)(n.state.tags),[e])}),n.tagInput.value=null)},n.state={tags:[]},n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.setState({tags:this.props.entries})}},{key:"componentDidUpdate",value:function(e,t,a){e.entries.length!==this.props.entries.length&&this.setState({tags:Object(o.a)(new Set([].concat(Object(o.a)(this.state.tags),Object(o.a)(this.props.entries))))})}},{key:"render",value:function(){var e=this,t=this.state.tags,a=this.props.predictions;return i.a.createElement("div",null,i.a.createElement("div",{className:"input-tag"},i.a.createElement("ul",{className:"input-tag__tags"},t.map((function(t,a){return i.a.createElement("li",{key:a},t.code,i.a.createElement("button",{type:"button",onClick:function(){e.removeTag(t,a)}},"+"))})),i.a.createElement("li",{className:"input-tag__tags__input"},i.a.createElement("input",{type:"text",onChange:this.props.onChange,placeholder:"Enter proper NSE code for your stock",ref:function(t){e.tagInput=t}})))),i.a.createElement("div",{className:"SearchBar__Predictions"},i.a.createElement("div",null,this.props.value.length>1&&a&&a.length?a.map((function(t,a){return i.a.createElement("div",{key:a,className:"prediction",onClick:function(a){return e.inputKeyDown(t,a)}},t.code," : ",t.name)})):i.a.createElement("div",null,this.props.value.length>1&&!this.props.isDataFetched&&a&&!a.length?i.a.createElement("div",{className:"prediction"},i.a.createElement(b,{sizeStyle:{height:"12px",width:"12px",marginLeft:"40%"}})):null)),i.a.createElement("div",{className:"error"},this.props.value.length>1&&this.props.isDataFetched&&a&&!a.length?"No stock found with such keywords":null)))}}]),a}(n.Component)),w=(a(60),{}),j=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={predictions:[],stocks:[],value:"",dataFetched:!1,totalEntriesInfile:[],filters:{},selectedStocks:[]},e.handleChange=e.handleChange.bind(Object(u.a)(e)),e.onSelectStock=e.onSelectStock.bind(Object(u.a)(e)),e}return Object(r.a)(a,[{key:"handleChange",value:function(e){var t=this;clearTimeout(this.timeout);var a=e.target.value;this.setState({value:a}),a.length>1?this.timeout=setTimeout((function(){t.fetchAllPredictions(a)}),600):this.setState({predictions:[]})}},{key:"fetchAllPredictions",value:function(e){var t=this,a="".concat(e,".NSE"),n=["F41ON15LGCFM4PR7","SYTCQBUIU44BX2G4","50M3AP1K3Y","RNZPXZ6Q9FEFMEHM","VZLZ58FTEXZW7QZ6"],i=n[Math.floor(Math.random()*n.length)],c="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=".concat(a,"&apikey=").concat(i);this.setState({dataFetched:!1}),v.a.get(c).then((function(e){var a=p.a.flattenDeep(Array.from(e.data.bestMatches).map((function(e){return[{code:e["1. symbol"],name:e["2. name"]}]})));t.setState({predictions:a})})).catch((function(e){return console.log(e)})).finally((function(){return t.setState({dataFetched:!0})}))}},{key:"onSelectStock",value:function(e,t){e.code=e.code.split(".")[0].toString(),this.setState({value:"",predictions:[],selectedStocks:[].concat(Object(o.a)(this.state.selectedStocks),[e])}),t.preventDefault()}},{key:"onRemoveStock",value:function(e,t){var a=e.code.split(".")[0].toString(),n=this.state.selectedStocks.filter((function(e){return e.code!==a}));this.setState({selectedStocks:n})}},{key:"filterValues",value:function(e,t,a){w[a]||(w[a]={}),w[a][t]=e,w[a].min||w[a].max||delete w[a];var n=this.state.totalEntriesInfile[0],i=n.indexOf("NSE Code"),c=n.indexOf("Name"),s=Object(o.a)(this.state.totalEntriesInfile.slice(0,this.state.totalEntriesInfile.length)).filter((function(e){return Object.keys(w).every((function(t){return w[t].min&&w[t].max&&e[n.indexOf(t)]>=Number(w[t].min)&&e[n.indexOf(t)]<=Number(w[t].max)}))}));s=s.slice(0,5);var l=Object(o.a)(s.map((function(e){return{code:e[i],name:e[c]}})));this.setState({selectedStocks:l})}},{key:"fileHandler",value:function(e){if(e.target.files.length){var t=e.target.files[0],a=t.name;"xlsx"===a.slice(a.lastIndexOf(".")+1)&&this.renderFile(t)}}},{key:"renderFile",value:function(e){var t=this;E(e,(function(e,a){e?console.log(e):t.setState({totalEntriesInfile:a.rows})}))}},{key:"render",value:function(){var e=this.state.value;return i.a.createElement("div",{className:"App"},i.a.createElement("h1",{className:"App__Title"},"Stock Search"),i.a.createElement(C,{entries:this.state.selectedStocks,value:e,onChange:this.handleChange,onClick:this.handleClick,isDataFetched:this.state.dataFetched,predictions:this.state.predictions,onSelect:this.onSelectStock,onRemove:this.onRemoveStock.bind(this)}),i.a.createElement(O,{onChange:this.fileHandler.bind(this),onClick:function(e){e.target.value=null},totalEntriesInfile:this.state.totalEntriesInfile,filterValues:this.filterValues.bind(this)}),i.a.createElement(S,{stockItems:this.state.selectedStocks}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.8733d79b.chunk.js.map