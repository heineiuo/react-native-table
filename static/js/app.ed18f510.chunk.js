(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{97:function(e,t,r){"use strict";r.d(t,"a",(function(){return Z}));var n=r(21),o=r.n(n),i=r(0),l=r(5),a=r(10),c=r(93),u=r(14),d=r(39),s=r(92),f=r(3),h=Object(i.createContext)({});function b(){return Object(i.useContext)(h)}var p=r(13),j=r.n(p),O=r(62),m=r(2);function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){j()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function v(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return w(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function x(e){var t=e.column,r=e.children,n=e.index,o=b(),a=o.debug,c=o.columns,u=o.rowHeight,d=o.panController,s=o.reIndex,f=o.columnKeyExtractor,h=t.widthValue,p=t.leftValue,j=Object(i.useRef)(new l.a.Value(1)).current,g=Object(i.useRef)(0),w=f(t),x=Object(i.useMemo)((function(){return O.a.create({onMoveShouldSetPanResponder:function(e,t){return d.current?d.current===t.stateID:(d.current=t.stateID,!0)},onPanResponderGrant:function(e,t){j.setValue(.4);var r=JSON.parse(JSON.stringify(p));a&&console.log("[reindex] grant: ",r,e.nativeEvent.locationX),g.current=r+e.nativeEvent.locationX},onPanResponderMove:function(e,t){a&&console.log("onPanResponderMove",e);for(var r,n=g.current+t.dx,o=null,i=v(c);!(r=i()).done;){var l=r.value;if(o)l.highlightValue.setValue(0);else{var u=JSON.parse(JSON.stringify(l.rightValue));Math.abs(u-n)<50?(o=l,l.highlightValue.setValue(1)):l.highlightValue.setValue(0)}}},onPanResponderRelease:function(e,t){a&&console.log("onPanResponderRelease",e),j.setValue(1),d.current=null;for(var r,o=g.current+t.dx,i=null,l=-1,u=0,h=v(c);!(r=h()).done;){var b=r.value;if(!i&&f(b)!==w){var p=JSON.parse(JSON.stringify(b.rightValue));Math.abs(p-o)<50&&(i=b,l=u)}b.highlightValue.setValue(0),u++}if(i){var O=l+1;O===n||(n<l&&O--,a&&console.log("[reindex] fromIndex "+n+" toIndex "+O),s({fromIndex:n,toIndex:O}))}else a&&console.log("[reindex] not change, release at wrong position")}})}),[a,c,d,w,f,n,p,j,s]);return Object(m.jsx)(l.a.View,y(y({},x.panHandlers),{},{style:{zIndex:-1,opacity:j,width:h,height:u},children:r}))}var C=r(59);function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){j()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function V(e){var t=e.index,r=e.column,n=e.resizeable,o=void 0!==n&&n,a=r.highlightValue,c=r.widthValue,u=b(),d=u.debug,s=u.rowHeight,f=u.panController,h=u.columns,p=u.resizerWidth,j=u.borderColor,g=u.cellMinWidth,y=u.highlightBorderColor,v=u.resizeMode,w=(u.indexCellWidth,u.columnKeyExtractor),x=u.onChangeColumnSize,I=w(r),V=Object(i.useMemo)((function(){if(!o)return{panHandlers:{}};var e=null,r=null,n=!1,i=0,u=new l.a.Value(0),s=h[t+1];return O.a.create({onPanResponderTerminate:function(e,t){d&&console.log("onPanResponderTerminate",e)},onPanResponderTerminationRequest:function(e,t){return d&&console.log("onPanResponderTerminationRequest",e),!1},onPanResponderReject:function(e){d&&console.log("onPanResponderReject",e)},onMoveShouldSetPanResponder:function(e,t){return d&&console.log("onMoveShouldSetPanResponder",e,f.current,t.stateID),f.current?f.current===t.stateID:(f.current=t.stateID,!0)},onPanResponderGrant:function(){d&&console.log("onPanResponderGrant"),n=!1,a.setValue(1);var t=JSON.parse(JSON.stringify(c));c.setOffset(t),u.setOffset(t);var o=-1;if("keep-total-width"===v&&s){var l=JSON.parse(JSON.stringify(s.widthValue));o=t+l-g,s.widthValue.setOffset(l)}u.removeAllListeners(),c.removeAllListeners(),e=u.addListener((function(e){var t=e.value;n=t<g||o>-1&&t>o})),r=c.addListener((function(e){var t=e.value;i=t}))},onPanResponderMove:function(e,t){d&&console.log("resizer onPanResponderMove",f.current),u.setValue(t.dx),n||(c.setValue(t.dx),"keep-total-width"===v&&s&&s.widthValue.setValue(-t.dx))},onPanResponderRelease:function(){d&&console.log("onPanResponderRelease"),a.setValue(0),c.flattenOffset(),u.flattenOffset(),f.current=null,s&&s.widthValue.flattenOffset(),x({width:i,columnId:I}),u.removeListener(e),c.removeListener(r),n=!1}})}),[d,I,x,o,a,h,v,g,t,f,c]);return Object(m.jsx)(l.a.View,P(P({},V.panHandlers),{},{style:[{position:"absolute",top:0,left:l.a.subtract(r.rightValue,p/2),zIndex:10,height:s,width:p}],children:Object(m.jsx)(C.a,{style:[{display:"flex",alignItems:"center",width:p,height:s}],children:function(e){var t=e.hovered;return Object(m.jsx)(l.a.View,{style:[{height:s},{backgroundColor:a.interpolate({inputRange:[0,1],outputRange:[j,y]}),width:a.interpolate({inputRange:[0,1],outputRange:[1,3]})},t&&{width:3,backgroundColor:y}]})}})}))}function R(e){var t=e.resizeable,r=void 0!==t&&t,n=e.column,o=e.index,i=b(),a=i.rowHeight,c=i.borderColor,d=i.ColumnHeaderComponent,s=Object(m.jsx)(f.a,{style:{padding:4},children:Object(m.jsx)(u.a,{children:n.title})});return d&&(s="type"in d?d:Object(m.jsx)(d,{resizeable:r,columnIndex:o,column:n,field:n})),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(l.a.View,{style:[{overflow:"hidden",zIndex:-1,borderColor:c,borderBottomWidth:1,height:a,top:0,alignItems:"center",width:n.widthValue}],children:Object(m.jsx)(x,{column:n,index:o,children:s})}),Object(m.jsx)(V,{resizeable:r,column:n,index:o})]})}function S(){var e=b(),t=e.borderColor,r=e.indexCellWidth,n=e.columns,o=e.rowHeight,i=e.totalWidthValue,a=e.tailCellWidth,c=e.resizeable,u=e.tableWidth,d=e.HeadColumnHeaderComponent,s=e.TailColumnHeaderComponent,h=e.columnKeyExtractor,p=null,j=null;return s&&(p="type"in s?s:Object(m.jsx)(s,{})),d&&(j="type"in d?d:Object(m.jsx)(d,{})),Object(m.jsxs)(l.a.View,{style:[{width:i,minWidth:u,borderBottomWidth:1,height:o,borderColor:t,backgroundColor:"#fff",display:"flex",flexDirection:"row",justifyContent:"flex-start"}],children:[Object(m.jsx)(f.a,{style:{height:o,width:r},children:j}),n.map((function(e,t){return Object(m.jsx)(R,{resizeable:c,column:e,index:t},h(e))})),Object(m.jsx)(l.a.View,{style:{minWidth:a,height:o},children:p})]})}function W(e){var t=e.column,r=(e.columnIndex,b()),n=r.rowHeight,o=r.resizerWidth,i=r.borderColor,a=r.highlightBorderColor,c=(r.indexCellWidth,t.highlightValue);return Object(m.jsx)(l.a.View,{style:[E.wrapper,{height:n,width:o,zIndex:c.interpolate({inputRange:[0,1],outputRange:[-10,10]}),right:-o/2}],children:Object(m.jsx)(l.a.View,{style:[{height:n,backgroundColor:c.interpolate({inputRange:[0,1],outputRange:[i,a]}),width:c.interpolate({inputRange:[0,1],outputRange:[1,3]})}]})})}var E=r(7).a.create({wrapper:{position:"absolute",top:0,display:"flex",alignItems:"center"}});function k(e){var t=e.visible,r=e.color;return Object(m.jsx)(f.a,{style:[{display:t?"flex":"none",zIndex:0,position:"absolute",width:"100%",height:"100%",borderWidth:2,top:0,left:0,borderColor:r}],children:Object(m.jsx)(f.a,{style:[{width:"100%",height:"100%",borderWidth:3,top:0,left:0,borderColor:"#fff"}]})})}function H(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?H(Object(r),!0).forEach((function(t){j()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):H(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function M(e){var t=e.column,r=e.row,n=e.columnId,a=e.columnIndex,c=e.rowIndex,u=e.data,s=e.rowId,f=e.hovered,h=e.pressed,p=b(),j=p.focusCell,O=p.borderColor,g=p.highlightBorderColor,y=p.rowHeight,v=p.renderCell,w=p.columnKeyExtractor,x=p.cellsMap,C=Object(i.useState)(!1),I=o()(C,2),P=I[0],V=I[1],R=Object(i.useRef)(D(D({},u),{},{columnId:n,rowId:s,blur:function(){V(!1)},focus:function(){V(!0)}})),S=Object(i.useCallback)((function(){j({rowId:s,columnId:n})}),[s,n,j]);return Object(i.useEffect)((function(){x.current.set(s+"_"+n,R.current)}),[S,x,u,s,n]),Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(l.a.View,{style:[{zIndex:5,position:"relative",borderColor:O,borderBottomWidth:1,height:y,alignItems:"center",width:t.widthValue,overflow:"visible"}],children:[Object(m.jsx)(k,{visible:P,color:g}),Object(m.jsx)(d.a,{style:{width:"100%",height:"100%",overflow:"hidden"},onPress:S,children:v({focused:P,focus:S,hovered:f,pressed:h,column:t,columnId:w(t),columnIndex:a,row:r,rowId:s,rowIndex:c,item:u})}),Object(m.jsx)(W,{column:t,columnIndex:a})]})})}function A(e){var t=e.item,r=e.index,n=void 0===r?0:r,o=b(),a=o.columns,c=o.columnKeyExtractor,d=o.cellsExtractor,s=o.rowHoverdBackgroundColor,h=o.rowHeight,p=o.borderColor,j=o.indexCellWidth,O=o.totalWidthValue,g=o.keyExtractor,y=o.TailCellComponent,v=o.IndexCellComponent,w=o.tableWidth,x=Object(i.useMemo)((function(){return g(t)}),[g,t]),I=null,P=Object(m.jsx)(f.a,{children:Object(m.jsx)(u.a,{children:n+1})});return y&&(I="type"in y?y:Object(m.jsx)(y,{index:n})),v&&(P="type"in v?v:Object(m.jsx)(v,{index:n})),Object(m.jsx)(l.a.View,{style:{height:h,width:O,minWidth:w},children:Object(m.jsx)(C.a,{style:function(e){var t=e.hovered;return[{display:"flex",flexDirection:"row",justifyContent:"flex-start",height:h,width:"100%",borderBottomWidth:1,borderColor:p},t&&{backgroundColor:s}]},children:function(e){var r=e.pressed,o=e.hovered;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(f.a,{style:{left:0,top:0,padding:4,height:h,width:j},children:P}),a.map((function(e,i){var l=c(e),a=d(t).find((function(e){return c(e)===l}));return Object(m.jsx)(M,{column:e,columnId:l,rowId:x,row:t,rowIndex:n,columnIndex:i,hovered:o,pressed:r,data:a},l)})),I]})}})})}function z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?z(Object(r),!0).forEach((function(t){j()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function T(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return F(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return F(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var B=r(56),N=r.n(B);function J(){var e=b(),t=e.borderColor,r=e.indexCellWidth,n=e.rowHeight,o=e.totalWidthValue,i=e.tableWidth,a=e.FooterIndexCellComponent,c=e.FooterCellComponent,u=null,d=null;return a&&(u="type"in a?a:Object(m.jsx)(a,{})),c&&(d="type"in c?c:Object(m.jsx)(c,{})),Object(m.jsxs)(l.a.View,{style:[{width:o,minWidth:i,borderBottomWidth:1,height:n,borderColor:t,backgroundColor:"#fff",display:"flex",flexDirection:"row",justifyContent:"flex-start"}],children:[Object(m.jsx)(f.a,{style:{height:n,width:r},children:u}),Object(m.jsx)(l.a.View,{style:{minWidth:l.a.subtract(o,r),height:n},children:d})]})}var K=["onLayout","userSelect","borderColor","style","rowHeight","TableHead","keyExtractor","data","renderItem","ListEmptyComponent"];function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function G(e){var t=e.onLayout,r=e.userSelect,n=e.borderColor,o=e.style,a=e.rowHeight,c=e.TableHead,u=e.keyExtractor,d=e.data,s=e.renderItem,f=e.ListEmptyComponent,h=N()(e,K),b=Object(i.useCallback)((function(e,t){return{length:a,offset:a*t,index:t}}),[a]);return Object(m.jsx)(l.a.FlatList,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){j()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({onLayout:t,initialNumToRender:10,style:[{userSelect:r,overflow:"auto",borderRadius:2,borderColor:n,borderTopWidth:1,borderRightWidth:1,borderLeftWidth:1,borderBottomWidth:1},o],getItemLayout:b,maxToRenderPerBatch:1,disableVirtualization:!1,stickyHeaderIndices:[0],ListHeaderComponent:c,ListFooterComponent:J,ListEmptyComponent:f,keyExtractor:u,data:d,renderItem:s},h))}function $(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function q(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return X(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return X(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var _=Object(i.forwardRef)((function(e,t){var r,n,c=e.debug,d=void 0!==c&&c,s=e.preventScrollWhenArrowMove,b=void 0===s||s,p=e.cellsExtractor,O=void 0===p?function(e){return e.cells}:p,g=e.columnKeyExtractor,y=void 0===g?function(e){return e.columnId}:g,v=e.keyExtractor,w=void 0===v?function(e){return e.id}:v,x=(e.useRecyclerListView,e.columns),C=e.resizeMode,I=void 0===C?"increase-total-width":C,P=e.style,V=e.data,R=e.resizeable,W=void 0===R||R,E=e.cellWidth,k=void 0===E?150:E,H=e.resizerWidth,D=void 0===H?24:H,M=e.borderColor,z=void 0===M?"#d8dee4":M,F=e.highlightBorderColor,B=void 0===F?"blue":F,N=e.indexCellWidth,J=void 0===N?40:N,K=e.tailCellWidth,U=void 0===K?100:K,X=e.rowHeight,_=void 0===X?36:X,Q=e.cellMinWidth,Y=void 0===Q?40:Q,Z=e.rowHoverdBackgroundColor,ee=void 0===Z?"#f6f8fa":Z,te=e.ColumnHeaderComponent,re=e.IndexCellComponent,ne=e.TailCellComponent,oe=e.HeadColumnHeaderComponent,ie=e.TailColumnHeaderComponent,le=e.FooterIndexCellComponent,ae=e.FooterCellComponent,ce=e.renderCell,ue=e.onChangeColumnSize,de=e.onChangeColumns,se=e.onValueChange,fe=e.onEndReached,he=e.onEndReachedThreshold,be=e.onLayout,pe=Object(i.useRef)(new l.a.Value(0)).current,je=Object(i.useState)(0),Oe=o()(je,2),me=Oe[0],ge=Oe[1],ye=Object(i.useRef)(new Map),ve=Object(i.useRef)({}),we=Object(i.useMemo)((function(){for(var e,t=function(e){for(var t,r=e.columns,n=e.columnsWidth,o=void 0===n?{}:n,i=e.indexCellWidth,a=e.cellWidth,c=e.keyExtractor,u=void 0===c?function(e){return e.id}:c,d=[],s=0,f=T(r);!(t=f()).done;){var h,b=t.value,p=L({},b);p.leftValue=0===s?new l.a.Value(i):d[s-1].rightValue,p.highlightValue=new l.a.Value(0);var j=u(b);p.widthValue=o[j]?o[j]:new l.a.Value(null!=(h=b.initialWidth)?h:a),p.rightValue=l.a.add(p.leftValue,p.widthValue),d.push(p),s++}return d}({columnsWidth:ve.current,columns:x,indexCellWidth:J,cellWidth:k,resizerWidth:D,tailCellWidth:U}),r={},n=q(t);!(e=n()).done;){var o=e.value;r[y(o)]=o.widthValue}return ve.current=r,t}),[x,J,y,k,D,U]),xe=Object(i.useRef)({}).current,Ce=Object(i.useState)("none"),Ie=o()(Ce,1)[0],Pe=Object(i.useRef)(),Ve=Object(i.useCallback)((function(e){Pe.current&&Pe.current.blur();var t=e.rowId,r=e.columnId,n=ye.current.get(t+"_"+r);n&&(Pe.current=n,Pe.current.focus())}),[]),Re=Object(i.useCallback)((function(e){var t=e.fromIndex,r=e.toIndex,n=x.slice(),o=n[t];return n.splice(t,1),n.splice(r,0,o),de(n)}),[x,de]),Se=Object(i.useCallback)((function(e){return ce?ce(e):Object(m.jsx)(f.a,{style:{padding:4},children:Object(m.jsx)(u.a,{style:{},children:e.item.value})})}),[ce]),We=Object(i.useCallback)((function(e){var t=e.nativeEvent.layout.width;ge(t),be&&be(e)}),[be]),Ee=Object(i.useMemo)((function(){for(var e,t=new l.a.Value(J+U),r=q(we);!(e=r()).done;){var n=e.value;t=l.a.add(t,n.widthValue)}return t}),[we,J,U]),ke=Object(i.useCallback)((function(e){ue&&ue(e)}),[ue]),He=Object(i.useMemo)((function(){return{debug:d,preventScrollWhenArrowMove:b,keyExtractor:w,cellsExtractor:O,columnKeyExtractor:y,tailCellWidth:U,panController:xe,resizerWidth:D,resizeable:W,columns:we,cellWidth:k,borderColor:z,highlightBorderColor:B,rowHoverdBackgroundColor:ee,rowHeight:_,focusCell:Ve,indexCellWidth:J,reIndex:Re,totalWidthValue:Ee,cellMinWidth:Y,renderCell:Se,ColumnHeaderComponent:te,TailColumnHeaderComponent:ie,HeadColumnHeaderComponent:oe,FooterIndexCellComponent:le,FooterCellComponent:ae,TailCellComponent:ne,IndexCellComponent:re,tailCellLeftValue:pe,resizeMode:I,tableWidth:me,cellsMap:ye,onChangeColumnSize:ke}}),[d,ke,b,O,y,U,Re,xe,_,k,z,D,we,W,w,B,ee,Ve,J,ie,ne,pe,Y,Se,re,te,oe,le,ae,Ee,me,I]);return Object(i.useImperativeHandle)(t,(function(){return{getFocusedCell:function(){return Pe},focusCell:Ve,getColumns:function(){return x}}}),[Ve,x]),r=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],n=Object(i.useCallback)((function(e){if(Pe.current){var t=Pe.current,r=t.rowId,n=t.columnId,o=V.findIndex((function(e){return w(e,0)===r})),i=x.findIndex((function(e){return y(e,0)===n}));if("ArrowUp"===e.key){if(o>0){var l=w(V[o-1],0);b&&e.preventDefault(),Ve({columnId:n,rowId:l})}}else if("ArrowDown"===e.key){if(o<V.length-1){var a=w(V[o+1],0);b&&e.preventDefault(),Ve({columnId:n,rowId:a})}}else if("ArrowLeft"===e.key){if(i>0){var c=y(x[i-1],0);b&&e.preventDefault(),Ve({columnId:c,rowId:r})}}else if("ArrowRight"===e.key&&i<x.length-1){var u=y(x[i+1],0);b&&e.preventDefault(),Ve({columnId:u,rowId:r})}}}),[V,Ve,b,x,y,w]),Object(i.useEffect)((function(){if("web"===a.a.OS)return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)};function e(e){var t=!1;("string"===typeof r&&e.key===r||r.includes(e.key))&&(t=!0),t&&n(e)}}),[r,n]),Object(i.useEffect)((function(){se&&se(He)}),[He,se]),Object(m.jsx)(h.Provider,{value:He,children:Object(i.createElement)(G,{onEndReached:fe,borderColor:z,userSelect:Ie,onLayout:We,style:P,data:V,rowHeight:_,TableHead:S,keyExtractor:w,onEndReachedThreshold:he,renderItem:function(e){return Object(m.jsx)(A,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?$(Object(r),!0).forEach((function(t){j()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):$(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e))}})})}));_.displayName="Table";var Q=function(){return Array.from({length:1e3},(function(e,t){return{id:"id"+t,fields:[{fieldId:"f1",value:""+Math.random().toString().slice(2)},{fieldId:"f2",value:""+Math.random().toString().slice(2)},{fieldId:"f3",value:""+Math.random().toString().slice(2)},{fieldId:"f4",value:""+Math.random().toString().slice(2)}]}}))},Y=function(){return[{fieldId:"f1",title:"Fileds1",initialWidth:400},{fieldId:"f2",title:"Fileds2",initialWidth:200},{fieldId:"f3",title:"Fileds3",initialWidth:200},{fieldId:"f4",title:"Fileds4"}]};function Z(){var e=Object(s.a)(),t=e.height,r=e.width,n=Object(i.useState)(Y),h=o()(n,2),b=h[0],p=(h[1],Object(i.useState)(Q)),j=o()(p,2),O=j[0],g=(j[1],Object(i.useRef)()),y=Object(i.useRef)(new l.a.Value(100)),v=Object(i.useRef)(new l.a.Value(200)),w=Object(i.useRef)(new l.a.Value(200)),x=Object(i.useMemo)((function(){return l.a.add(l.a.add(y.current,v.current),w.current)}),[]),C=Object(i.useCallback)((function(){g.current.addColumn({fieldId:"f"+(b.length+1),title:"Fileds"+(b.length+1)})}),[b]),I=Object(i.useCallback)((function(){console.log("onEndReached")}),[]);return Object(i.useEffect)((function(){"web"===a.a.OS&&(document.body.style.overflow="hidden",document.body.style.margin="0px"),setTimeout((function(){l.a.timing(y.current,{toValue:r-420,duration:300,useNativeDriver:!1}).start()}),2e3)}),[]),Object(m.jsxs)(c.a,{children:[Object(m.jsx)(f.a,{style:{width:"100%"},children:Object(m.jsx)(l.a.View,{style:{backgroundColor:"#af1",height:10,width:x}})}),Object(m.jsx)(_,{onChangeColumnSize:console.log,columnKeyExtractor:function(e){return e.fieldId},cellsExtractor:function(e){return e.fields},cellWidth:400,ref:g,highlightBorderColor:"blue",style:{margin:10,width:r-40,height:t-40},initialColumns:b,data:O,IndexCellComponent:function(e){var t=e.index;return Object(m.jsx)(f.a,{children:Object(m.jsxs)(u.a,{numberOfLines:1,style:{},children:[">",t+1]})})},TailCellComponent:function(){return Object(m.jsx)(f.a,{children:Object(m.jsx)(u.a,{children:"[]"})})},HeadColumnHeaderComponent:function(){return Object(m.jsx)(f.a,{children:Object(m.jsx)(d.a,{onPress:C,children:Object(m.jsx)(u.a,{children:"o"})})})},TailColumnHeaderComponent:function(){return Object(m.jsx)(f.a,{children:Object(m.jsx)(d.a,{onPress:C,children:Object(m.jsx)(u.a,{children:"Add column"})})})},ColumnHeaderComponent:function(e){var t=e.column;return Object(m.jsx)(f.a,{style:{padding:4},children:Object(m.jsx)(u.a,{style:{color:"green"},children:t.title})})},FooterIndexCellComponent:function(){return Object(m.jsx)(f.a,{children:Object(m.jsx)(u.a,{children:"+"})})},FooterCellComponent:function(){return Object(m.jsx)(f.a,{children:Object(m.jsx)(u.a,{children:"..."})})},renderCell:function(e){var t=e.item;return Object(m.jsxs)(f.a,{style:{padding:4},children:[Object(m.jsx)(u.a,{style:{color:"blue"},children:t.value}),Object(m.jsx)(d.a,{onPress:function(e){e.preventDefault()},style:{position:"absolute",right:4,top:4,borderRadius:6,borderColor:"#eee",borderWidth:1,backgroundColor:"#fff",paddingHorizontal:8,paddingVertical:4},children:Object(m.jsx)(u.a,{children:"\u2193"})})]})},onEndReached:I})]})}},98:function(e,t,r){e.exports=r(123)}},[[98,1,2]]]);
//# sourceMappingURL=app.ed18f510.chunk.js.map