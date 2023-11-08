import{i as h,g as I,a as b,o as w,s as E,c as B,d as v,b as L,r as u,e as C,f as A,h as x}from"./assets/vendor-db96d7c3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))m(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&m(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function m(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const O={apiKey:"AIzaSyCSIOIvaBcm09OifpCpfKPAwnfy_t377rM",authDomain:"testfirebase-422a2.firebaseapp.com",databaseURL:"https://testfirebase-422a2-default-rtdb.europe-west1.firebasedatabase.app",projectId:"testfirebase-422a2",storageBucket:"testfirebase-422a2.appspot.com",messagingSenderId:"589688307018",appId:"1:589688307018:web:e010a81c7decb75d56d5b3"},p=h(O),f=I(p),c=b(p),g=document.getElementById("email"),y=document.getElementById("password"),i=document.getElementById("signOut");let r=!1;function k(){const e=g.value,t=y.value;E(c,e,t).then(o=>{alert("Вход успешен"),i.style.display="block",r=!0}).catch(o=>{alert(`Ошибка входа: ${o.message}`)})}function D(){const e=g.value,t=y.value;B(c,e,t).then(o=>{alert("Регистрация успешна"),i.style.display="block",r=!0}).catch(o=>{alert(`Ошибка регистрации: ${o.message}`)})}function S(){const e=c.currentUser;e?v(e).then(()=>{alert("Аккаунт удален"),i.style.display="none",r=!1}).catch(t=>{alert(`Ошибка при удалении аккаунта: ${t.message}`)}):alert("Пользователь не вошел в систему")}function U(){L(c).then(()=>{alert("Выход выполнен успешно"),i.style.display="none",r=!1})}let l="";w(c,e=>{e?(l=e.uid,console.log("Пользователь вошел в систему. ID пользователя:",l)):console.log("Пользователь вышел из системы.")});async function P(){const e=u(f,"shoppingList");try{const t=await C(e);return t.exists()?t.val():null}catch(t){throw console.error("Ошибка при чтении данных:",t),t}}async function N(e){const t=u(f,`shoppingList/${l}`);try{await A(t,e),console.log("Запись успешно создана для пользователя:",l)}catch(o){throw console.error("Ошибка при создании записи:",o),o}}async function R(){const e=u(f,"shoppingList");try{await x(e),console.log("Запись успешно удалена")}catch(t){throw console.error("Ошибка при удалении записи:",t),t}}const $=document.getElementById("login"),K=document.getElementById("register"),q=document.getElementById("deleteAccount");$.addEventListener("click",k);K.addEventListener("click",D);q.addEventListener("click",S);i.addEventListener("click",U);const z=document.getElementById("readData"),F=document.getElementById("createItem"),M=document.getElementById("deleteItem"),a=document.getElementById("output");z.addEventListener("click",async()=>{if(r)try{const e=await P();e?a.textContent=JSON.stringify(e,null,2):a.textContent="Нет данных в базе"}catch(e){a.textContent="Ошибка при чтении данных: "+e.message}else a.textContent="Пользователь не вошел в систему"});F.addEventListener("click",async()=>{if(r){const e={name:"Новый продукт",quantity:1};try{await N(e),a.textContent="Запись успешно создана"}catch(t){a.textContent="Ошибка при создании записи: "+t.message}}else a.textContent="Пользователь не вошел в систему"});M.addEventListener("click",async()=>{if(r)try{await R(),a.textContent="Запись успешно удалена"}catch(e){a.textContent="Ошибка при удалении записи: "+e.message}else a.textContent="Пользователь не вошел в систему"});
//# sourceMappingURL=commonHelpers.js.map
