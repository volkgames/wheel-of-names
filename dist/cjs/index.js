"use strict";var e=require("react/jsx-runtime"),t=require("react"),r=function(e,t,r,n,a,i){e.save(),e.beginPath(),e.translate(t-n,r-a),e.scale(n,a),e.arc(1,1,1,0,2*Math.PI,!1),e.fillStyle=i,e.fill(),e.closePath(),e.restore()},n=function(e,t,r,n,a,o,l,c,s){e.save(),e.beginPath(),e.moveTo(t,r),e.arc(t,r,n,i(a),i(o),l),e.lineTo(t,r),e.fillStyle=c,e.fill(),e.restore()},a=function(e,t){return t.clearRect(0,0,e.width,e.height)},i=function(e){return e*Math.PI/180},o=function(e,t){return e+t*Math.random()},l=function(e,t){return function(e,t){return Math.round(o(e+1,t-1))-1}(360*e,360*t)};!function(e,t){void 0===t&&(t={});var r=t.insertAt;if("undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===r&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(".canvas-container {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}");var c=["#3369e8","#d50f25","#eeb211","#009925","#000000"],s=function(o){var s,u=o.size,f=void 0===u?300:u,d=o.list,v=o.minSpins,h=void 0===v?1:v,g=o.maxSpins,y=void 0===g?5:g,m=o.fps,p=void 0===m?14:m,x=o.onComplete,C=o.colors,S=void 0===C?c:C,w=o.fontColor,b=void 0===w?"#fff":w,k=o.fontFamily,R=void 0===k?"Arial":k,P=o.backgroundColor,T=void 0===P?"#fff":P,j=o.pointerColor,I=void 0===j?"#fff":j,M=o.highlightColor,N=void 0===M?"rgba(255,100,100,0.5)":M,B=o.fontSize,E=void 0===B?20:B,W=o.tickSound,q=o.winSound,z=o.tickPlaybackRate,A=void 0===z?4:z,D=o.winPlaybackRate,F=void 0===D?1:D,L=o.onClick,O=void 0===L||L,G=t.useRef(null),H=t.useRef(null),J=t.useRef(null),K=t.useRef(null),Q=t.useRef(null),U=f/2,V=U-U/10,X=360/d.length,Y=-1,Z=-1,$=-1,_=-1,ee=function(){if(H.current){var e=H.current,t=e.getContext("2d");if(t){a(e,t);r(t,U,U,V/10,V/10,I),t.save(),t.translate(U,U),t.rotate(i(180));var n,o,l,c,s,u,f,d,v,h=U/20;o=0,l=h,c=h,s=0,u=6*h,f=-h,d=h,v=I,(n=t).save(),n.rotate(i(o)),n.beginPath(),n.moveTo(l,c),n.lineTo(s,u),n.lineTo(f,d),n.fillStyle=v,n.closePath(),n.fill(),n.strokeStyle="#000",n.restore(),t.restore()}}},te=function(){if(K.current){var e=K.current,t=e.getContext("2d");if(t){a(e,t);var r=f/2;t.save(),t.translate(r,r),t.rotate(i(Z)),t.translate(-r,-r),G.current&&(t.drawImage(G.current,0,0),t.restore(),J.current&&(t.drawImage(J.current,0,0),H.current&&t.drawImage(H.current,0,0)))}}},re=function(){if(Y<0)return Y=l(h,y),Z=0,$=10,_=.15,void(s=setInterval((function(){return re()}),1e3/p));Z>Y-360&&($-=_)<1&&($=1);var e=Z%360+X/2,t=Math.round(e%X);t<X&&t>X-5&&Q.current&&W&&(Q.current.src=W,Q.current.playbackRate=A,Q.current.play()),(Z+=$)>Y?(clearInterval(s),te(),function(e){var t=(e=-e)%360,r=t/X,a=Math.round(r),i=a;a<0&&(a-=a+a),a>=d.length&&(a-=d.length);var o=270-(t-(X/2+i*X)),l=o-X,c=N;if(J.current){var s=J.current.getContext("2d");s&&(s.lineWidth=V/20,s.setLineDash([s.lineWidth]),n(s,U,U,V-V/50,o,l,!0,c),ee(),te(),Q.current&&q&&(Q.current.src=q,Q.current.playbackRate=F,Q.current.play()),x&&x(d[a]))}}(Z),Y=-1):te()};t.useEffect((function(){!function(){if(G.current){var e=G.current,t=G.current.getContext("2d");if(t){var o;a(e,t),r(t,U,U,V,V,T),t.font="".concat(null!=E?E:X*(V/U),"pt ").concat(R),t.textBaseline="middle";for(var l=0,c=0;l<d.length;l++)t.save(),t.translate(U,U),t.rotate(i(90-X*l)),t.translate(-U,-U),c==S.length&&(c=0),o=S[c],c++,n(t,U,U,V-V/50,180-X/2,180+X/2,!1,o),t.save(),t.fillStyle=b,t.fillText(d[l],2*(U-V),U,6*(U-V)),t.restore(),t.restore()}}}(),ee(),te()}),[d,f,E]);var ne={display:"none"};return e.jsxs("div",{className:"canvas-container",children:[e.jsx("canvas",{width:f,height:f,ref:G,style:ne}),e.jsx("canvas",{width:f,height:f,ref:H,style:ne}),e.jsx("canvas",{width:f,height:f,ref:J,style:ne}),e.jsx("canvas",{width:f,height:f,ref:K,style:{cursor:O?"pointer":"default",width:f,height:f},onClick:function(){O&&function(){if(!(Z<Y)&&J.current){var e=J.current,t=e.getContext("2d");t&&(a(e,t),re())}}()}}),e.jsx("audio",{src:undefined,ref:Q})]})};s.displayName="WheelOfNames",module.exports=s;
//# sourceMappingURL=index.js.map
