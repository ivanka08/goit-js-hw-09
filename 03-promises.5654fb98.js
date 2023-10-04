var o,e;(o=2,e=1500,new Promise(((i,s)=>{const n=Math.random()>.3;setTimeout((()=>{n?i({position:o,delay:e}):s({position:o,delay:e})}),e)}))).then((({position:o,delay:e})=>{console.log(`✅ Fulfilled promise ${o} in ${e}ms`)})).catch((({position:o,delay:e})=>{console.log(`❌ Rejected promise ${o} in ${e}ms`)}));
//# sourceMappingURL=03-promises.5654fb98.js.map
