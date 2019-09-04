---
layout: post
title: AJAX & CORS Overview
date: 2014-04-20 00:24:03.000000000 +09:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- 개발 이야기
tags:
- AJAX
- CORS
- Front-End
- JavaScript
author:
  login: jeokrang
  email: jeokrang@gmail.com
  display_name: 개발왕 김코딩
  first_name: 훈민
  last_name: 김
permalink: "/posts/2014-04-20-ajax-cors-overview"
---

## **Ajax의 역사**

1990년대까지 웹 애플리케이션은 사용자가 서버로 요청을 보내면, 서버가 비지니스 로직을 처리한 후 새로운 웹 페이지를 만들어 클라이언트로 전송하는 방식이었다. 일부 데이터만 갱신하고 싶어도 페이지 전체를 받아와야하기 때문에 낭비가 많았다. 웹의 시작이 ‘문서’였다는 점을 생각해보면 당연한 일이었는지도 모르겠다.

[![request-response](/assets/images/legacy/request-response.png)](/assets/images/legacy/request-response.png)
 

 처음으로 이러한 비효율적인 구조를 개선하려는 시도를 한 회사는 유명한 Microsoft였다.

1996년에 Microsoft는 Internet Explorer에 iframe을 도입함으로써 콘텐츠를 비동기 방식으로 로딩할 수 있는 길을 열었다.  2년 후인 1998년에는 Microsoft Outlook Web Access 팀이 첫번째 XMLHTTP 컴포넌트를 클라이언트 스크립트로 만들었다. 1999년에는 Internet Explorer의 기본 페이지의 뉴스 기사와 주식 시세 정보를 동적으로 변경하는 데 기존 iframe 기술을 이용하였다. 또한 Internet Explorer 5에 비동기 웹 구현을 위한 XMLHTTP ActiveX를 탑재했는데, 훗날 Mozilla가 이 기술을 받아들여 2002년 출시한 Gecko Layout Engine 1.0에 적용하면서 XMLHttpRequest가 탄생했다.

이후에도 Microsoft는 XMLHttp ActiveX를 계속 지원하다가, Internet Explorer 7에서야 비로소 ActiveX가 필요없는 XMLHttpRequest를 선보였다.

![XMLHttpRequest](/assets/images/legacy/XMLHttpRequest.png)

 

비동기 웹 기술의 가장 큰 장점은 비동기적으로 작업을 수행함으로써 페이지 전체가 아닌 일부분만을 변경할 수 있다는 점이다. 하지만 당시의 웹이 가진 영향력은 지금에 비해 초라한 수준이었기 때문에 비동기 웹 기술은 갖고 있는 장점에도 불구하고 대중의 큰 관심을 받지는 못했다.

그러다가 2004 ~ 2005년에 Google이 Google Groups, Gmail 등에 비동기 웹 기술을 적용하면서 상황이 달라졌다. 대중이 관심을 갖기 시작한 것이다.

Ajax라는 용어는 2005년 2월 18일에 Jesse James Garret가 Google Page에 사용한 기술을 소개한 “[Ajax: A New Approach to Web Applications](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/)“라는 글에 처음 등장했다. 이 글에서 Jesse James Garret는 Ajax를 Asynchronous JavaScript and XML의 줄임말로  비동기 웹 애플리케이션을 만들기 위한 기술로 소개했다. Ajax는 단일 기술을 뜻하는 용어는 아니며 여러가지 기술 집합을 의미한다. 넓은 의미의 Ajax는 웹 클라이언트 측에서 Page Refresh 없이 비동기적으로 콘텐츠를 변경하기 위해 사용하는 모든 기술을 지칭한다. 이와 달리 좁은 의미의 Ajax는 서버 측과 비동기적으로 통신하는 기술을 말한다. 대체적으로 넓은 의미로 사용한다.

 

[![Ajax-history](/assets/images/legacy/Ajax-history.png)](/assets/images/legacy/Ajax-history.png)

 

## **XMLHttpRequest**

위에서 이미 언급했지만 XMLHttpRequest를 이용하면 클라이언트에서 비동기로 서버 측과 통신할 수 있다. 그런데 XMLHttpRequest라는 이름은 오해의 소지가 있다. 이 이름은 마치 XML 데이터만 주고 받아야 할 것 같고, HTTP 프로토콜만 이용해야 할 것 같은 느낌을 준다. 하지만 실제로는 JSON, HTML, 일반 텍스트로 응답 결과로 받을 수도 있고, 여기에 더해 HTTP 이외의 다른 프로토콜(file, ftp)도 지원한다(물론 이렇게 따지면 Ajax라는 이름도 눈에 거슬리긴 하지만…)

> Microsoft의 독자 기술이었던 XMLHTTP ActiveX는 Mozilla를 비롯한 다른 브라우저 벤더들이 이를 받아들이면서 XMLHTtpRequest가 되었다. 많은 브라우저 벤더들이 자사의 브라우저에 XMLHttpRequest를  적용하고 있음에도 불구하고, 이 기술에 대한 표준이 없는 상황이 지속되다가 2006년 4월 5일이 되어서야 [ XMLHttpRequest(이하 XHR) Object 명세 초안](http://www.w3.org/TR/2007/WD-XMLHttpRequest-20071026/)이 나왔다.  2002년에 XMLHttpRequest를 탑재한 Mozilla의 Gecko 1.0이 나온 이후 명세 초안이 발표되기까지 4년이나 걸린 셈이다. XMLHttpRequest는 2014년 4월 18일 현재 Working Draft 상태에 있다.

요즘에는 XMLHttpRequest를 이용하지 않은 웹 사이트를 찾아보기 힘들 정도로 보편적인 기술이 되었다. 이에 따라 jQuery와 같이 대중적으로 큰 인기를 얻고 있는 몇몇 라이브러리는 XMLHttpRequest를 편하게 이용할 수 있는 인터페이스를 제공하고 있다. 따라서 직접 JavaScript로 XMLHttpRequest 객체를 만들어 사용하는 경우가 드물다보니 라이브러리 내부에서 XMLHttpRequest를 쓰고 있다는 사실을 아예 모르는 사람도 있다. jQuery가 곧 JavaScript인 줄 아는 사람도 있을 정도니 그리 놀랄 일은 아니다.

알고 쓰는 것과 모르고 쓰는 것은 분명한 차이가 있다. 정상적으로 작동할 때는 모든 것이 순조롭다. 하지만 문제가 발생해서 안을 들여다봐야 하는 상황이 생겼다면 어떨까? 사람 일은 모를 일이다.

예제 코드를 통해 XMLHttpRequest를 이용하여 클라이언트에서 서버와 어떻게 데이터를 주고 받는지 살펴보자.

### **HTTP Request 만들기**

우선 XMLHttpRequest 객체를 생성한다.

```javascript
if (window.XMLHttpRequest) { // Mozilla, Safari, Chrome...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
    try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
    }
}
```

원래 객체를 생성하는 방법은 아주 간단하다. 하지만 브라우저, 그리고 브라우저 버전(IE의 경우)에 따라 XMLHttpRequest 객체를 만드는 방법이 달라서 if-else, try-catch로 분기를 타야한다.

### **응답처리 콜백함수 등록**

서버의 응답을 받아서 처리하는 콜백함수를 등록한다. 서버가 요청을 처리한 후 응답을 전송하면 클라이언트는 onreadystatechange에 등록한 콜백함수를 호출한다.

```javascript
httpRequest.onreadystatechange = function(){
 
    if(httpRequest.readyState === 4){
        // 응답 처리
        if (httpRequest.status === 200) {
            alert(httpRequest.responseText);
        } else {
            alert('There was a problem with the request.');
        }
 
    } else {
        // 대기중
    }
}
```

응답 결과를 받는 과정에서  onreadystatechange 콜백 함수는 단계별로 4번 호출된다. httpRequest.readyState가 갖고 있는 상태 값을 확인하면 어떤 단계에 있는지 알 수 있다. 응답코드 별로 의미하는 바는 다음과 같다.

- 0 (uninitialized) – xmlHttpRequest 객체 생성 완료
- 1 (loading) – connection open한 상태
- 2 (loaded) – 데이터 send 완료
- 3 (interactive) – 서버 측 데이터 수신 중
- 4 (complete) – 수신 완료

http.readyState 값이 4면 모든 송수신이 완료되어 서버 측이 전송한 결과를 확인할 수 있는 상태임을 의미한다. 서버 측에서 전송한 http 응답코드는 http.status 프로퍼티를 이용해서 확인할 수 있다.

### **요청 전송**

open 메소드를 호출해서 커넥션을 열고, send 메소드를 호출해서 서버 측으로 요청을 전송한다. open 메소드는 3개의 인자를 받는다.

- TYPE : get이나 post 같은 request method를 지정
- URL : 요청을 보낼 서버 측 URL
- ASYNC : true – 비동기 요청, false – 동기 요청

아래 코드는 ‘http://www.example.org/some.file’로 GET 메소드 요청을 비동기로 전송한다.

```javascript
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send(null);
```

두번째 매개변수에 false 값을 전달하면 요청을 동기 방식으로 전송한다. 비동기 통신을 위해 XMLHttpRequest가 탄생했지만 필요에 따라서는 동기적으로 이용할 수도 있는 셈이다.

send 메소드의 첫번째 인자는 HTTP Body에 추가할 내용을 문자열로 받는다. 위의 예제에서는 GET 요청이기 때문에 null 값을 전달했다. 만약 POST 형식으로 서버 측에 요청을 보낼 경우에는,  다음과 같이 send 함수를 호출할 때 전송할 데이터를 문자열 매개변수로 전달한다.

```js
"name=value&anothername="+encodeURIComponent(myVar)+"&so=on"
```

그리고 POST 요청인 경우에는 추가적으로 Content-Type을 지정해준다.

```js
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
```

### **간단 예제**

위에서 설명한 내용을 토대로 만든 간단한 예제 코드가 아래에 있다.

```js
<span id="ajaxButton" style="cursor: pointer; text-decoration: underline">
  Make a request
</span>
 
<script type="text/javascript">
(function() {
  var httpRequest;
  document.getElementById("ajaxButton").onclick = function() { makeRequest('test.html'); };
 
  function makeRequest(url) {
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (e) {}
      }
    }
 
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();
  }
 
  function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();
</script>
```

## **Ajax with Library**

최근에는 Ajax 요청을 추상화한 인터페이스를 제공하는 좋은 라이브러리들이 많이 나와있기 때문에, 위에 있는 예제처럼 복잡한 코드를 직접 작성할 일이 거의 없다.

많은 라이브러리 중 필자가 근무하고 있는 NTS는 jQuery와 Jindo를 사내 프로젝트에 가장 많이 사용한다. 둘은 사용 방법에 약간의 차이가 있을 뿐 XMLHttpRequest 객체를 이용한 Ajax 요청이란 기본 토대는 거의 비슷하다. 두 라이브러리 모두 문서화가 잘 되어있기 때문에 굳이 여기에서 사용법을 깊게 설명할 필요는 없을 것 같다. 간단하게 사용방법이 어떻게 다른지만 살펴보고 넘어가자.

### **jQuery**

jQuery는 Ajax와 관련된 다양한 종류의 메소드를 제공한다. 그 중에 가장 대표적인 게 $.ajax다.

```js
/**
 * 두 가지 방식으로 사용할 수 있다.
 * $.ajax(url, htOptions);
 * $.ajax(htOptions);
 */
 
/* 사용 예제 */
$.ajax("/users", {
    type : get,
    success : function(data){
        $('body').append(data);
    }
});
 
$.ajax({
    url : "/users",
    type : get,
    success : function(data){
        $('body').append(data);
    }
});
```

위의 예제에 나와있는 $호출은모두같은작업을수행하며단지을.ajax 호출은 모두 같은 작업을 수행하며, 단지 url을 $.ajax 메소드에 전달하는 방식만 다르다.

이 코드를 실행하면 클라이언트는 /users로 get 요청을 전송한다. 서버 측 응답이 오면 success 콜백함수를 실행하면서 data 매개변수에 결과 값을 전달한다. 전체 흐름은 Native JavaScript 요청과 같지만 요청의 세부적인 내용을 다 알 필요가 없게 추상화 되어있다는 점이 다르다. 한마디로 사용하기 쉽게 포장이 잘 되어있다.

요청 시에 전송하고 싶은 파라미터가 있다면 객체 리터럴로 옵션에 추가한다.

```js
$.ajax({
    url : "/users/huns",
    type : "POST",
    // options의 data 프로퍼티에 전송하고 싶은 프로퍼티를 객체 리터럴을 이용해서 지정한다.
    data : {
        name : "test",
        region : "test"
    },
    success : function(data){
        $('body').append(data);
    }
});
```

물론 GET 요청의 경우 url 뒤에 query string을 직접 입력해도 상관없다.

```js
$.ajax({
    url : "/users?name=huns&region=seoul",
    type : "GET",
    success : function(data){
        $('body').append(data);
    }
});
```

이외에도 다양한 옵션값을 적용할 수 있는데, 자세한 내용은 아래의 jQuery.ajax에 잘 나와있다.

> http://api.jquery.com/jQuery.ajax/

jQuery는 $.ajax보다 더 간단하게 사용할 수 있는 몇가지 메소드를 추가로 제공한다.

- [$.get()](http://api.jquery.com/jQuery.get/) : get 방식으로 Ajax 요청을 전송한다.
- [$.post()](http://api.jquery.com/jQuery.post/) : post 방식으로 Ajax 요청을 전송한다.
- [$.getJSON()](http://api.jquery.com/jQuery.getJSON/) : get 방식으로 Ajax 요청을 전송해서 JSON 데이터를 가져온다.
- [$.getScript()](http://api.jquery.com/jQuery.getSCRIPT/) : get방식으로 Ajax 요청을 전송해서 Script 데이터를 가져온다.
- [$(selector).load()](http://api.jquery.com/load/) : Ajax로 지정한 데이터를 가져와서 선택한 문서 객체에 삽입한다.

 

### **Jindo**

jindo는 Ajax 통신을 위한  jindo.$Ajax() 객체를 제공한다. 객체를 생성하고 난 다음에 request() 메소드를 호출하는 2단계를 거쳐야하는 점이 jQuery와는 다르다.

```js
var oAjax = new $Ajax('server.php', {
    type : 'xhr',
    method : 'get',     // GET 방식으로 통신
    onload : function(res){ // 요청이 완료되면 실행될 콜백 함수
        $('list').innerHTML = res.text();
    },
    timeout : 3,      // 3초 이내에 요청이 완료되지 않으면 ontimeout 실행 (생략 시 0)
    ontimeout : function(){ // 타임 아웃이 발생하면 실행될 콜백 함수, 생략 시 타임 아웃이 되면 아무 처리도 하지 않음
        alert("Timeout!");
    },
    async : true      // 비동기로 호출하는 경우, 생략하면 true
});
oAjax.request();
```

jindo는 요청 파라미터를 request 메소드를 호출할 때 인자로 받는다.

```js
var ajax = $Ajax("http://www.remote.com", {
    onload : function(res) {
        // onload 핸들러
    }
});
 
ajax.request( {key1:"value1", key2:"value2"} ); // 서버에 전송할 요청 파라미터
```



 

## **크로스 도메인(Cross Domain)**

XMLHttpRequest 객체는 기본적으로 동일 출처 정책(SOP, Same Origin Policy)의 제약을 받는다. 이 정책은 한 도메인의 JavaScript 코드를 불러오면 해당 코드 안에서 다른 도메인의 데이터를 요청할 수 없다는 것을 의미한다. 이를 크로스 도메인 이슈라고 한다.

동일 출처 정책을 만들 때의 웹 환경은 지금과 달랐기 때문에 당시에는 보안적 측면에서 이런한 제약은 당연했다.  하지만 최근에는 Ajax가 대중화되고, OpenAPI가 활성화되면서 클라이언트와 서버가 Ajax로 데이터를 주고 받는 형태의 웹 애플리케이션이 일반적이다. 웹 환경이 변하면서 동일 출처 정책은 개발자에게 성가신 존재가 되었다. 동일 출처 정책을 우회해서 서로 다른 도메인 간에 통신을 할 수 있게 해 줄 ‘무엇’을 원했다. 그 ‘무엇’이 공신력 있는 단체에서 만든 표준이라면 더할나위 없이 좋겠지만, 아쉽게도 오랫동안 표준이 없는 상황이 지속됐다. 이런 상황 속에서 영리한 개발자들은 몇 가지 창의적인 해결책을 만들었는데, 그 중 가장 많이 사용하는 JSONP, Reverse Proxy, Flash Socket을 이용한 방법이다.

 

### **JSONP**

JSONP 또는 JSON with padding은 다른 도메인의 데이터를 요청하기 위해 사용하는 자바스크립트 커뮤니케이션 기술이다. 이 방식은 \<script> 태그가 동일 출처 정책의 제약을 받지 않는 특성을 이용한다. 동적으로 생성할 JavaScript 코드를 \<script> 태그를 이용해서 불러옴으로써 동일 출처 정책을 우회한다. 설명이 조금 어려운데 요청과 응답이 오고 가는 흐름을 보면 쉽게 이해할 수 있다. success라는 이름의 콜백 함수가 있다. 이 함수는 이름처럼 Ajax 요청에 대한 서버 측 응답을 처리한다.

```js
function success(result){
    // success callback    
}
```

JSONP 방식은 XMLHttpRequest 객체를 이용해서 서버로 요청을 전송하는 대신 동적으로 \<script> 태그를 만들어 페이지에 삽입한다. 이 때 아래와 같이 script 태그의 src 속성에 호출할 API의 url을 넣어주고 query string에 callback 함수의 이름을 파라미터로 추가한다.

```js
<script src="http://api.example.com/resources?callback=success"></script>
```

서버는 요청 받은 작업을 수행한 후에 클라이언트로 응답을 전송한다. 그런데 결과를 그대로 전송하는 것이 아니라,

```js
{key : value} // JSONP 방식은 서버가 응답 결과를 이렇게 전송하지 않는다.
```

JSONP 방식은 callback 파라미터로 넘어온 콜백 함수를 호출하면서 응답결과를 호출 인자로 전달하는 스크립트 코드를 만들어 클라이언트로 전송한다.

```js
success({ key : value })   // 응답결과를 인자로 전달하는 콜백함수 호출 코드를 만들어 전송
```

클라이언트는 넘어온 결과 값을 해석해서 실행한다. 그러면 결과적으로 success 함수가 호출된다. 이는 Ajax 요청 응답 결과를 success 콜백함수가 받아서 실행하는 것과 같다. JSONP는 일종의 편법인 셈이다. JSONP 요청은 GET 메소드만 이용할 수 있다는 치명적인 단점을 가지고 있다.

jQuery와 Jindo는 둘 다 JSONP를 지원한다.

```js
// jQuery
$.ajax({
    url : "http://other.example.com/resources",
    dataType : "jsonp",
    jsonp : "success",
    success : function(results){
        // success callback
    }
});
 
// Jindo
var oAjax = new $Ajax('http://server.com/some/some.php', {
    type: 'jsonp',
    method: 'get',          // type 이 jsonp 이면 get 으로 지정하지 않아도 자동으로 get 으로 처리함 (생략가능)
    jsonp_charset: 'utf-8', // 요청 시 사용할 <script> 인코딩 방식 (생략 시 utf-8)
    onload: function(res){  // 요청이 완료되면 실행될 콜백 함수
        var response = res.json();
        var welList = $Element('list').empty();
 
        for (var i = 0, nLen = response.length; i < nLen; i++) {
            welList.append($("<li>" + response[i] + "</li>"));
        }
    },
    callbackid: '12345',                // 콜백 함수 이름에 사용할 아이디 값 (생략가능)
    callbackname: 'ajax_callback_fn'    // 서버에서 사용할 콜백 함수이름을 가지는 매개 변수 이름 (생략 시 '_callback')
});
oAjax.request();
```

> JSONP에서 p는 padding을 뜯한다. padding은 우리말로 속, 충전재를 의미한다. 여기에서는 클라이언트측 콜백 함수에 전달하는 응답 결과를 가리킨다. JSONP의 결과로 돌려받는 데이터는 JavaScript 호출 표현식이다. 그리고 그 안에 사용자가 원하는 결과가 들어있는데, 이것이 속과 같다는 뜻이다.

### **Reverse Proxy**

동일 출처 정책은 브라우저 보안 정책이기 때문에 Backend 영역은 이 제약에서 자유롭다. Reverse Proxy는 이러한 특징을 이용한 방법이다. 실제 서버와 클라이언트 사이에 별도의 Proxy 서버를 두고 이 서버를 이용해서 요청을 주고 받는 방식이다.  이러한 Proxy는 실제 서버 앞에서 자신이 마치 진짜 서버인 척 행동하기 때문에 Reverse Proxy라고 부른다. 별도의 서버를 구축해야하고 추가적인 네트워크 요청이 발생한다는 게 단점이다.

[![proxy](/assets/images/legacy/proxy1.png)](/assets/images/legacy/proxy1.png) 

### **Flash Socket**

Flash Socket을 이용해서 크로스 도메인 정책을 우회할 수도 있다. Jindo는 swf를 이용한 Ajax 요청을 지원한다. 

```js
var oAjax = new $Ajax('http://server.com/some/some.php', {
    type : 'flash',
    method : 'get',         // GET 방식으로 통신
    sendheader : false,     // 요청 헤더를 전송할지 여부. (생략 시 true)
    decode : true,          // 요청한 데이터 안에 utf-8 이 아닌 다른 인코딩이 되어 있을때 false. (생략 시 true)
    onload : function(res){ // 요청이 완료되면 실행될 콜백 함수
        $('list').innerHTML = res.text();
    }
});
 
$Ajax.SWFRequest.write("swf/ajax.swf");    // Ajax 호출을 하기 전에 반드시 플래시 객체를 초기화
oAjax.request();
```

### CORS(Cross Origin Resource Sharing)

크로스 도메인 이슈를 해결하는 표준이 없던 시절에는 위에서 언급한 방법을 이용해서 우회적으로 이 문제를 해결해야만 했다. 그러다가 2006년 5월 17일에 W3C는 access-control 명세 초안을 발표하여 크로스 도메인 이슈를 해결하는 표준을 만들기 위한 논의를 시작했는데, 이게 현재의 [CORS(Cross Origin Resources Sharing)](http://www.w3.org/TR/cors/)가 되었다. W3C는 2013년 12월 5일에 CORS 공식 권고안을 발표했고, 현재 [XMLHttpRequest Level 1 명세 초안](http://www.w3.org/TR/2014/WD-XMLHttpRequest-20140130/)은 CORS를 지원하고 있다.

CORS를 사용하기 위해서 클라이언트와 서버는 몇 가지 추가 정보를 주고 받아야 한다. 클라이언트는 CORS 요청을 위해 새로운 HTTP 헤더를 추가한다. 서버는 클라이언트가 전송한 헤더를 확인해서 요청을 허용할지 말지를 결정한다. 데이터에 사이드 이펙트를 일으킬 수 있는 HTTP 메소드를 사용할 때는 먼저 preflight 요청을 서버로 전송해서 서버가 허용하는 메소드 목록을 HTTP OPTIONS 헤더로 획득한 다음에 실제 요청을 전송한다.

이게 무슨 말인지 난 누군가, 또 여긴 어딘가 싶다. 이해를 돕기 위해 예제 찬스를 써야겠다. 클라이언트와 서버 사이에 어떤 요청이 오고가는지 예제를 통해 살펴보자.

### **Simple Requests**

기존 데이터에 사이드 이펙트를 일으키지 않는 GET, HEAD, POST 요청을 Simple Request라고 한다. POST 요청의 경우에는 서버로 전송하는 Content-Type이 application/x-www-form-urlencoded, multipart/form-data, text/plain 중에 하나여야 한다. 이 때는 HTTP 요청에 커스텀 헤더를 지정하지 않는다.

```js
var xhr = new XMLHttpRequest();
var url = 'http://api.com/resources/users/';
 
function simpleRequest() {
    xhr.open('GET', url, true);    // GET 요청을 전송한다.
    xhr.onreadystatechange = function(){
        // ...
    }
    xhr.send();
}
```

simpleRequest 함수를 호출하면 클라이언트는 아래의 요청을 서버로 전송한다.

> [Request Header]
>
> GET /resources/users/ HTTP/1.1
> Host: api.com
> User-Agent:
> Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
> Accept-Language: en-us,en;q=0.5
> Accept-Encoding: gzip,deflate
> Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
> Connection: keep-alive
> Referer: http://example.com/index.html
> **Origin: http://example.com**

위에 나와 있는 헤더 속성 중에 Origin은 요청의 출처를 나타낸다.

> [Response Header]
>
> HTTP/1.1 200 OK
> Date: Mon, 01 Dec 2008 00:23:53 GMT
> Server: Apache/2.0.61
> **Access-Control-Allow-Origin: \***
> Keep-Alive: timeout=2, max=100
> Connection: Keep-Alive
> Transfer-Encoding: chunked
> Content-Type: application/json

서버 측 응답 헤더의 내용 중에서 Access-Control-Allow-Origin을 눈여겨 보자. 이 값은 서버 자원에 접근할 수 있는 Origin을 의미한다. *은 모든 크로스 사이트 요청을 허용한다는 뜻이다. 따라서 이 경우 클라이언트는 example.com에서 api.com으로 Ajax 요청을 보낼 수 있다.

 

### **Preflighted Requests**

GET, HEAD, POST 이외의 메소드를 이용한 요청은 데이터에 사이드 이펙트를 만들 수 있기 때문에, CORS 스펙에 따라 클라이언트는 preflight 요청을 먼저 서버로 전송해야 한다. POST 요청이지만 Content-Type이  application/x-www-form-urlencoded, multipart/form-data, text/plain이 아닌 경우도 여기에 해당한다. 이 때는 커스텀 헤더를 설정한다.

```js
var xhr = new XMLHttpRequest();
var url = 'http://api.com/resources/users/';
var body = '<?xml version="1.0"?><user><name>Hunmin</name></user>';
 
function preflightedRequest() {
    xhr.open('POST', url, true);
 
    xhr.setRequestHeader('X-Custom-Header', 'pingpong');    // 커스텀 헤더 설정
    xhr.setRequestHeader('Content-Type', 'application/xml');  // POST 요청이지만 Content-Type에 따라 Preflighted Request임.
 
    xhr.onreadystatechange = function(){
        // ...
    }
 
    xhr.send(body);
}
```

브라우저는 실제 요청을 전송하기 전에 OPTIONS 메소드를 이용해서 preflight 요청을 서버로 전송한다.

> [Request Header]
>
> OPTIONS /resources/post-here/ HTTP/1.1
> Host: api.com
> User-Agent:
> Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
> Accept-Language: en-us,en;q=0.5
> Accept-Encoding: gzip,deflate
> Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
> Connection: keep-alive
> Origin: http://example.com
> **Access-Control-Request-Method: POST**
> **Access-Control-Request-Headers: X-Custom-Header**

단순 요청에는 없었던 Access-Control-Request-Method, Access-Control-Request-Headers가 추가된 것을 볼 수 있다.

- Access-Control-Request-Method : 실제 요청 때 사용할 메소드
- Access-Control-Request-Headers : 브라우저가 실제 요청을 보낼 때 헤더에 추가할 커스텀 속성

preflight 요청을 받은 서버는 CORS 관련 정보를 헤더에 담아서 아래와 같은 응답을 클라이언트로 전송한다.

> [Response Header]
>
> HTTP/1.1 200 OK
> Date: Mon, 01 Dec 2008 01:15:39 GMT
> Server: Apache/2.0.61 (Unix)
> **Access-Control-Allow-Origin: http://example.com**
> **Access-Control-Allow-Methods: POST, GET, OPTIONS**
> **Access-Control-Allow-Headers: X-Custom-Header**
> **Access-Control-Max-Age: 1728000**
> Vary: Accept-Encoding
> Content-Encoding: gzip
> Content-Length: 0
> Keep-Alive: timeout=2, max=100
> Connection: Keep-Alive
> Content-Type: text/plain

여기에서는 Access-Control-… 값을 눈여겨 봐야한다. 각 값은 서버가 허용하는 요청의 범위를 나타낸다.

- Access-Control-Allow-Origin : 허용하는 Origin
- Access-Control-Request-Methods : 허용하는 요청 메소드
- Access-Control-Allow-Headers : 허용하는 헤더 속성
- Access-Control-Max-Age : preflight request 캐시하는 시간(초 단위)

서버의 허락을 받은 후에  실제 요청을 전송한다. 이 과정은 Simple Requests와 동일하다. 전체 흐름을 그림으로 그려보면 아래와 같다.

[![preflight process](/assets/images/legacy/preflight-process.png)](/assets/images/legacy/preflight-process.png)

 

### **withCredential**

표준 CORS는 기본적으로 요청을 보낼 때 쿠키를 전송하지 않는다. 쿠키를 요청에 포함하고 싶다면 XMLHttpRequest 객체의 withCredentials 프로퍼티 값을 true로 설정해준다.

```js
xhr.withCredentials = true;
```

그리고 서버 측도 반드시 Access-Control-Allow-Credentials 응답 헤더를 true로 설정해야 한다.

> Access-Control-Allow-Credentials : true

CORS 요청이 성공하기 위해서는 이 두 개의 값이 모두 true여야 하며, 그렇지 않을 경우 요청은 실패한다.

 

### **XDomainRequest**

IE 8은 HTML 표준 CORS를 지원하지 않는다. IE8은 별도의 XDomainRequest 객체를 이용해서 크로스 도메인 이슈를 해결한다. 이에 대한 자세한 설명은 다음 링크를 참고한다.

> http://msdn.microsoft.com/en-us/library/ie/cc288060(v=vs.85).aspx

아래의 코드는 CORS 지원여부를 확인해서 CORS 요청 객체를 반환하는 함수를 선언하고 있다.

```js
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
 
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    xhr.open(method, url, true);
 
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
 
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
 
  }
  return xhr;
}
 
var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}
```

이 함수는 XHR객체의 withCredentials 프로퍼티를 확인해서 이 프로퍼티가 없으면 CORS를 지원하지 않는 브라우저로 판단해서 XDomainRequest 객체가 있는지 확인한다. XDomainRequest 객체가 있으면 이를 이용해서 xhr 인스턴스를 만들어 돌려준다.

한 가지 주의할 점이 있는데 XDomainRequest는 status 프로퍼티를 가지고 있지 않다. 따라서 서버 측 응답결과 코드를 확인할 수 있는 방법이 없다.

> IE9 이하 버전은 HTML 스펙상의 CORS를 지원하지 않기 때문에 XDomainRequest 객체를 이용해야 한다. 그런데 아쉽게도 jQuery는 XDomainRequest를 지원하지 않는다.
>
> http://bugs.jquery.com/ticket/8283
>
> 위의 내용이 약 3년 정도 전에 나온 이야기인데, 2014년 4월 14일 현재까지도 개선이 없는 걸 보면 앞으로도 지원할 계획이 없다고 봐야할 것 같다.
>
> IE9 이하에서 XDomainRequest를 이용한 Ajax 통신을 하기 위해서는 jquery.xdomain.js와 같은 별도의 jQuery Plugin을 이용해야 한다.

> XDomainRequest는 CORS 명세를 완벽하게 지원하고 있지는 않아서 사용할 때 제약이 많다. 그 중에서 Header를 추가할 수 없고, Cookie를 전송하지 못한다는 점은 아주 성가시다.  Header나 Cookie로 사용자 인증을 하는 시스템의 클라이언트를 개발해야하는 상황이라면 이게 얼마나 짜증나는 상황인지 감이 올 것이다. 이 문제는 인증 데이터를 body에 넣어서 post 메소드로 전송하는 방법으로 우회할 수 있지만 좋은 해결책인지는 잘 모르겠다. XDomainRequest가 가지고 있는 제약 사항에 대한 자세한 내용은 아래 링크를 참조하기 바란다.
>
> [XDomainRequest – Restrictions, Limitations and Workarounds](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx?Redirected=true))
