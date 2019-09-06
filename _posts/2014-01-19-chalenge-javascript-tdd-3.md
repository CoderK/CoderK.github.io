---
layout: post
title: 도전! JavaScript TDD – 3. 점진적 명세 작성
date: 2013-11-25 00:24:03.000000000 +09:00
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- 개발 이야기
tags:
- TDD
- Front-End
- JavaScript
- Test
author:
  login: jeokrang
  email: jeokrang@gmail.com
  display_name: 개발왕 김코딩
  first_name: 훈민
  last_name: 김
permalink: "2014-01-19-chalenge-javascript-tdd-3"
---
이전 시간에는 자판기에 재고 기능을 추가하면서 “TDD 리듬”에 대해서 이야기를 했다. 지금까지 만든 테스트 코드는 아래와 같다.

```js
$(function() {
 
    var oVendingMachine = null;
 
    module('VendingMachine', {
        setup : function(){
            oVendingMachine = new VendingMachine();
            oVendingMachine.supply({
                "Coke": 1,
                "Sprite" : 1,
                "Orange Juice" : 1,
                "Apple Juice" : 1,
                "NonExistingDrink": 0
            });
        },
        teardown : function(){
            /* 리소스 정리 */
            oVendingMachine = null;
        }
    });
 
    test("자판기에서 원하는 음료를 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Sprite");
        var sBeverage3 = oVendingMachine.buy("Orange Juice");
        var sBeverage4 = oVendingMachine.buy("Apple Juice");
 
        // Then
        equal(sBeverage1, "Coke");
        equal(sBeverage2, "Sprite");
        equal(sBeverage3, "Orange Juice");
        equal(sBeverage4, "Apple Juice");
    });
 
    test("재고가 있는 음료만 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("NonExistingDrink");
 
        // Then
        equal(sBeverage1, null);
    });
 
    test("재고만큼 음료를 구매할 수 있다.", function(){
        // given
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
});
```

테스트 대상이 되는 모델 코드는 다음과 같았다.

```js
function VendingMachine() {
    this._htStocks = {};
};
 
VendingMachine.prototype = {
 
    buy : function(sBeverage){
        if( this._hasNoStocks(sBeverage) ){
            return null;
        }
 
        this._htStocks[sBeverage]--;
        return sBeverage;
    },
 
    _hasNoStocks: function (sBeverage) {
        return !this._htStocks[sBeverage] || this._htStocks[sBeverage] < 1;
    },
 
    supply : function(htStocks){
        this._htStocks = htStocks;
    }
};
```

오랜만에 코드를 보니 좀 낯설기는 하지만, 다행히 라인이 길지 않아서 금방 눈에 들어온다. 이번에는 특별히 불만 있는 부분이 없으므로 별 설명없이 그냥 진행해야겠다.

## 동전 투입

오늘 만들어야 할 것이 무엇인지 이전 시간에 남겨둔 할 일 목록을 한 번 살펴보자. 

- ~~음료를 뽑을 수 있다.~~
- ~~콜라, 사이다, 오렌지 주스, 사과 주스 중 원하는 음료를 뽑을 수 있다.~~
- 동전을 넣을 수 있다.
- 지폐를 넣을 수 있다.
- 거스름 돈을 반환 받을 수 있다.
- ~~**재고만큼 음료를 구매할 수 있다.**~~

동전과, 지폐 투입 기능을 구현하고 난 후에 거스름 돈 반환 기능을 구현하는 게 자연스러울 것 같다. 그래서 이번 시간에는 동전 투입 기능을 가지고 TDD를 수련해보겠다. 이전 시간에 이야기했던 TDD 리듬을 되새기며 테스트 코드를 작성했다.

```js
test("동전을 넣을 수 있다.", function(){
    // given
    // when
    oVendingMachine.insertCoin(500);
 
    // then
    equal( oVendingMachine.balance(), 500);
});
```

가끔 테스트 코드를 작성하다보면 하나의 테스트 케이스에 서로 다른 메소드가 맞물려 있는 경우가 있다. 보통 동작을 수행하고 상태를 확인해야 하는 경우가 그러한데, 방금 작성한 테스트 코드가 여기에 해당한다.

insertCoin으로 동전을 투입하고 balance를 호출해서 잔액을 확인하기 때문에, 테스트를 통과하려면 insertCoin과 balance 메소드를 둘 모두를 구현해야 한다. 맞물린 두 개의 기능이 차지하는 비중이 커서 구현이 어려울 것 같다면, 각각의 테스트 케이스를 만들어서 하나씩 공략하는 것이 좋다. 하지만 지금의 경우는 둘 다 어려워 보이지 않으므로 하나의 테스트 케이스에서 모두를 구현해도 별 문제가 될 것 같진 않다.

한 호흡에 둘 다 가보자. 테스트를 통과할 수 있는 가장 빠른 코드를 작성했다.

```js
insertCoin : function(nCoin){
 
},
 
balance : function(){
    return 500;
},
```

물론 테스트도 통과한다(이쯤 되면 이 멘트가 지겨울 법도…).

[![스크린샷 2014-01-19 오후 5.47.04](/assets/images/legacy/스크린샷-2014-01-19-오후-5.47.04.png)](/assets/images/legacy/스크린샷-2014-01-19-오후-5.47.04.png)

 훌륭한 개발자인 우리는 방금 전 코드가 말도 안 된다는 것을 알고 있다. 이런 코드를 작성한 자신이 믿기지 않는다.

내 마음도 몰라주는 TDD는 왜 이런 허접한 코드를 작성하라고 잔소리하는 걸까? 그깟 TDD가 뭐라고 이런 불편함을 감수해야 하지?

TDD는 “품질 높은 깔끔한 코드”를 지향한다. 깔끔한 코드는 지속, 반복적인 리팩토링을 통해서 얻는다. TDD가 이런 단순한 구현을 강조하는 이유 중 하나는 리팩토링 시점을 빨리 가져가기 위해서다. 아주 단순한 코드로 중복을 남기고, 허점을 남기고. 그러다보면 문제를 조기에 발견할 수 있는 가능성이 커진다. 자연스럽게 리팩토링 시점도 당겨진다.

여기에 더해 **“도전! JavaScript TDD – 시작**“에서 이야기 했던 것처럼, 테스트를 검증하기 위한 목적도 있다. 1장에서 했던 이야기를 다시 한 번 되짚어 보자.

> TDD는 가능하면 상수를 사용하라고 이야기한다.
>
> 이유가 뭘까?
>
> 사람은 코드를 작성할 때 실수를 하기 마련이다. 그래서 테스트 코드가 필요하다. 그런데 테스트 코드를 짤 때는 과연 실수를 하지 않을까?
>
> 당연히 한다. 그럼 테스트 코드도 검증이 필요하게 된다. 그렇다면 테스트 코드는 어떻게 검증을 할까?
>
> 테스트 코드를 테스트하는 코드를 짜야할까? 이런.. 그럼 마치 뫼비우스의 띠처럼 끝도 없이 테스트 코드를 짜야할 것이다. 이건 무모하고 비생산적인 일이다.
>
> 그럼 어떻게 해야할까?
>
> 방법은 테스트 코드가 실수할 확률을 줄이는 것이다.  
>
> 사람은 주로 집중을 하지 못할 때 실수를 많이 한다. 사람이 작성하는 코드도 마찬가지다. 코드가 하는 일이 많으면 많을 수록 집중력이 떨어져서 실수할 확률이 높아 진다. 이와는 반대로 코드가 하는 일이 너무 단순해서 명확하면 실수할 확률은 그만큼 줄어든다.
>
> 예를 들어, 1과 2를 받아서 1 + 2를 돌려주는 함수가 있다고 하자. 이 함수는 하는 일이 너무 명확해서 실수를 할 확률이 아주 낮다. 이렇게 아주 단순한 기능을 만들어서 에러가 없음을 검증하고 난 다음에, 여기에 조금씩 살을 붙여나가는 것이 TDD의 기본이다. 그래서 TDD는 에러를 제거하는 코드를 최대한 빨리 단순하게 작성할 것을 강조하며, 이를 위한 방법 중에 하나로 상수 사용을 권장한다.

동작이 더 이상 간결할 수 없을 만큼 간결하면, 테스트 코드를 검증해야한다는 딜레마를 해결할 수 있다. 가장 간결한 동작을 만드는 데 상수만큼 좋은 선택이 있을까? 상수 사용은 한마디로 **“품질 높은 깔끔한 코드”를 만들기 위한 초석**을 놓는 일이라고 할 수 있다.

그런데 기존 개발 방식에 익숙해있는 나 같은 개발자는 이게 상당히 눈에 거슬린다. 엄청나게 큰 죄를 지은 것 같다. 특히 상수를 반환하거나, 인자로 받은 값을 그대로 돌려주는 일은 참기 어렵다. 이 코드를 코드리뷰에 들고 갔다가는 변명만 주구장창 하다가 나올 게 머리 속에 그려진다. 

이전 시간에 이야기했듯이 익숙해지는데 시간이 필요하다. 자신에게 조금만 관대해질 필요가 있다. 잠시만 우리가 저지른 어처구니 없는 행동을 용서하자. TDD를 함으로써 어쩔 수 없이 받아들여야 하는 일이라면 차라리 좀 더 생산적인 일에 시간을 쓰자. 다음 테스트에서 어떻게 이 문제를 바로 잡을 지 고민하는 일 같은 거 말이다. 

> 나는 지금 콜라를 먹고 싶고, 콜라는 하나에 600원 이라고 가정하자. 주머니에는 500원 짜리 하나와 100원 짜리 하나가 있다. 한 번에 다 우겨 넣을 수 없다. 500원을 넣고, 100원을 넣어야 한다.

이거다. 이거면 방금 우리가 만든 테스트 코드의 허점을 공략할 수 있다.

```js
test("동전을 여러 번 넣을 수 있다.", function(){
    // given
    // when
    oVendingMachine.insertCoin(500);
    oVendingMachine.insertCoin(100);
 
    // then
    equal( oVendingMachine.balance(), 600);
});
```

깨지는 테스트를 확인하고,

[![스크린샷 2014-01-19 오후 7.29.18](/assets/images/legacy/스크린샷-2014-01-19-오후-7.29.18.png)](/assets/images/legacy/스크린샷-2014-01-19-오후-7.29.18.png)

테스트를 통과할 수 있는 코드를 만든다.

```js
function VendingMachine() {
    this._htStocks = {};
    this._nBalance = 0;
};
 
VendingMachine.prototype = {
 
   ...
 
    insertCoin : function(nCoin){
        this._nBalance += nCoin;
    },
 
    balance : function(){
        return this._nBalance;
    },
 
    ...
 
};
```

녹색불이 들어왔다.

[![스크린샷 2014-01-19 오후 7.31.13](/assets/images/legacy/스크린샷-2014-01-19-오후-7.31.13.png)](/assets/images/legacy/스크린샷-2014-01-19-오후-7.31.13.png)

 쑥쑥 진행되니 흥이 절로 난다. 리팩토링 할 곳이 있는지 살펴보자. 모델 코드 쪽에는 없는 것 같고, 테스트 코드 중  **“동전을 넣을 수 있다”**는 명세는 이제 필요 없으니 지워도 될 것 같다.

```js
// 지워버리자.
test("동전을 넣을 수 있다.", function(){
    // given
    // when
    oVendingMachine.insertCoin(500);
 
    // then
    equal( oVendingMachine.balance(), 500);
});
```

다음 명세를 향해 나아가자. 사실 “동전 넣기”는 “음료 구매”라는 목적이 있는 행위다. 동전 넣기와 음료 구매는 하나의 시나리오로 동작할 가능성이 아주 높다. 다음 단계에서 이 둘을 하나로 묶는 명세를 만들 수 있다면 아주 매끄러운 시나리오가 등장하겠지…?

또 상상의 나래를 펼쳐본다.

> 나는 지금 콜라를 먹고 싶다. 콜라 하나의 가격은 500원. 주머니에 500원이 있다. 콜라 하나를 먹을 수 있는 금액이다. 동전을 자판기에 넣고 콜라를 눌렀다. 콜라가 나왔다. 혹시 자판기가 미쳐서 콜라를 하나 더 주지 않을까 싶어 버튼을 눌러봤다. 하지만 잔액 부족으로 콜라는 나오지 않는다.

이걸 명세로 옮기고, 코드로 만든다.

```js
test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
    // given
    oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
    oVendingMachine.insertCoin(500);
 
    // when
    var sBeverage1 = oVendingMachine.buy("Coke");
    var sBeverage2 = oVendingMachine.buy("Coke");
 
    // then
    equal( sBeverage1, "Coke" );
    equal( sBeverage2, null );
});
```

재고가 없어서 콜라를 구매할 수 없는 상황이 되어서는 곤란하므로 given에서 충분한 재고를 설정해준다.  처음에 구매한 콜라는 나오지만, 두번째 구매를 시도한 콜라는 잔액 부족으로 나오지 않아야 한다. 콜라의 가격에 대한 요구사항은 아직 없으므로 편의상 500원으로 가정하겠다.

테스트가 깨지는 걸 확인하고,

[![스크린샷 2014-01-20 오후 11.16.03](/assets/images/legacy/스크린샷-2014-01-20-오후-11.16.03.png)](/assets/images/legacy/스크린샷-2014-01-20-오후-11.16.03.png)

통과할 수 있는 아주 단순한 코드를 작성해서, 

```js
test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
    // given
    oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
    oVendingMachine.insertCoin(500);
 
    // when
    var sBeverage1 = oVendingMachine.buy("Coke");
    var sBeverage2 = oVendingMachine.buy("Coke");
 
    // then
    equal( sBeverage1, "Coke" );
    equal( sBeverage2, null );
});
```

녹색불이 들어………..와야 하는데? 이런, 문제가 생겼다.

[![스크린샷 2014-01-20 오후 11.20.12](/assets/images/legacy/스크린샷-2014-01-20-오후-11.20.12.png)](/assets/images/legacy/스크린샷-2014-01-20-오후-11.20.12.png)

방금 작성한 코드가 사이드 이펙트를 만들어서 다른 테스트를 망가뜨린 처참한 광경이다. ctrl + z 생각이 간절하지만, 생각보다 별 문제가 아닐 수도 있으니 원인부터 파악하자.

나와야 하는 음료가 나오지 않는 걸 보면 이전에는 없던, 제품 가격과 잔액을 비교하는 코드가 들어갔기 때문임을 의심해 볼 수 있다. 정말 그렇다면 테스트 케이스마다 적절하게 동전을 넣어주는 걸로 쉽게 문제를 해결할 수 있다.

```js
$(function() {
 
    var oVendingMachine = null;
 
    module('VendingMachine', {
        setup : function(){
            oVendingMachine = new VendingMachine();
            oVendingMachine.supply({
                "Coke": 1,
                "Sprite" : 1,
                "Orange Juice" : 1,
                "Apple Juice" : 1,
                "NonExistingDrink": 0
            });
        },
        teardown : function(){
            /* 리소스 정리 */
            oVendingMachine = null;
        }
    });
 
    test("자판기에서 원하는 음료를 뽑을 수 있다.", function(){
        // Given
        oVendingMachine.insertCoin(10000);
 
        // When
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Sprite");
        var sBeverage3 = oVendingMachine.buy("Orange Juice");
        var sBeverage4 = oVendingMachine.buy("Apple Juice");
 
        // Then
        equal(sBeverage1, "Coke");
        equal(sBeverage2, "Sprite");
        equal(sBeverage3, "Orange Juice");
        equal(sBeverage4, "Apple Juice");
    });
 
    test("재고가 있는 음료만 뽑을 수 있다.", function(){
        // Given
        oVendingMachine.insertCoin(10000);
 
        // When
        var sBeverage1 = oVendingMachine.buy("NonExistingDrink");
 
        // Then
        equal(sBeverage1, null);
    });
 
    test("재고만큼 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.insertCoin(10000);
 
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
 
    test("동전을 여러 번 넣을 수 있다.", function(){
        // given
        // when
        oVendingMachine.insertCoin(500);
        oVendingMachine.insertCoin(100);
 
        // then
        equal( oVendingMachine.balance(), 600);
    });
 
    test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
        oVendingMachine.insertCoin(500);
 
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
 
});
```

테스트를 통과했다.

[![스크린샷 2014-01-20 오후 11.24.17](/assets/images/legacy/스크린샷-2014-01-20-오후-11.24.17.png)](/assets/images/legacy/스크린샷-2014-01-20-오후-11.24.17.png)

지금은 에제 진행을 위해 깨지는 모든 테스트 케이스를 수정하고 난 다음에 테스트를 통과 여부를 확인했지만, 실전에서는 코드를 추가할 때마다 하나씩 테스트를 돌려가며 확인할 것을 추천한다. 보폭이 넓으면 문제의 원인을 찾기가 어렵기 때문이다.

테스트는 통과했지만 **“500”**이라는 상수를 구현 코드에 두고 오는 죄가 아닌 죄를 저질렀다. 좀 더 촘촘한 테스트를 만들어서 상수를 걷어내자. 

음료별 가격을 설정하는 시나리오를 만들어 볼까?

일단 할 일 목록에 추가하고,

- ~~음료를 뽑을 수 있다.~~
- ~~콜라, 사이다, 오렌지 주스, 사과 주스 중 원하는 음료를 뽑을 수 있다.~~
- 동전을 넣을 수 있다.
- **음료별 가격을 설정할 수 있다.**
- 지폐를 넣을 수 있다.
- 거스름 돈을 반환 받을 수 있다.
- ~~재고만큼 음료를 구매할 수 있다.~~

신나게 다시 달린다.

```js
test("음료별로 가격을 설정할 수 있다.", function(){
    // given
    oVendingMachine.insertCoin(800);
 
    // when
    oVendingMachine.setPrice({
        "Coke": 500,
        "Sprite" : 300
    });
 
    // then
    equal( oVendingMachine.buy("Coke"), "Coke" );
    equal( oVendingMachine.buy("Sprite"), "Sprite" );
});
```

빨간불을 확인하고,

[![스크린샷 2014-01-20 오후 11.29.49](/assets/images/legacy/스크린샷-2014-01-20-오후-11.29.49.png)](/assets/images/legacy/스크린샷-2014-01-20-오후-11.29.49.png)

녹색불을 향해서 나아간다.

```js
test("음료별로 가격을 설정할 수 있다.", function(){
    // given
    oVendingMachine.insertCoin(800);
 
    // when
    oVendingMachine.setPrice({
        "Coke": 500,
        "Sprite" : 300
    });
 
    // then
    equal( oVendingMachine.buy("Coke"), "Coke" );
    equal( oVendingMachine.buy("Sprite"), "Sprite" );
});
```

테스트를 통과하려 했지만… 슬프게도 실패다.

[![스크린샷 2014-01-20 오후 11.36.07](/assets/images/legacy/스크린샷-2014-01-20-오후-11.36.07.png)](/assets/images/legacy/스크린샷-2014-01-20-오후-11.36.07.png)

마지막 테스트는 통과했지만,  직전의 테스트가 깨졌다.

“동전을 넣은 만큼만 음료를 구매할 수 있다”는 테스트의 Given절에서 음료의 가격 설정을 해주지 않았기 때문에 나오지 말아야 할 콜라가 나오고 있다.

살포시 깨지는 테스트의 Given 절에서 콜라 가격을 설정해주자.

```js
test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
    // given
    oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
    oVendingMachine.setPrice({ "Coke": 500 });
    oVendingMachine.insertCoin(500);
 
    // when
    var sBeverage1 = oVendingMachine.buy("Coke");
    var sBeverage2 = oVendingMachine.buy("Coke");
 
    // then
    equal( sBeverage1, "Coke" );
    equal( sBeverage2, null );
});
```

그리고 다시 테스트를 돌려주면…

[![스크린샷 2014-01-20 오후 11.39.46](/assets/images/legacy/스크린샷-2014-01-20-오후-11.39.46.png)](/assets/images/legacy/스크린샷-2014-01-20-오후-11.39.46.png)

통과다. 드디어 긴 여행을 마쳤다. 하지만 집으로 가기 전에 아직 해야 할 일이 남았다.

buy 메소드가 장황한 이야기를 늘어놓고 있는 게 눈에 거슬린다. 녹색불이 들어왔으니 리팩토링을 하자. 행여 실수하더라도 두려워하지 마시라, 우리에겐 테스트 코드라는 든든한 백이 있으니.

메소드 안에 있는 코드는 추상화 수준을 동일하게 맞춰주는 것이 좋다. 추상화 수준이 들쑥날쑥하면 코드를 읽는 흐름이 부자연스러워지기 때문이다. 그래서 기존 buy 메소드 내 코드를 구문 단위로 별도의 메소드로 추출해서 전체 추상화 수준을 동일하게 맞췄다. 이전 코드와 어떤 차이가 있는지 잠시 살펴보는 것도 좋을 것 같다.

```js
test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
    // given
    oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
    oVendingMachine.setPrice({ "Coke": 500 });
    oVendingMachine.insertCoin(500);
 
    // when
    var sBeverage1 = oVendingMachine.buy("Coke");
    var sBeverage2 = oVendingMachine.buy("Coke");
 
    // then
    equal( sBeverage1, "Coke" );
    equal( sBeverage2, null );
});
```

영어를 잘못하는 나에게 메소드명 짓기는 정말 힘든 일이다. 이 때는 콩글리시를 뱉어내는 구글 번역기가 별 도움이 되질 않는다.

테스트 코드도 리팩토링 할 부분이 있는지 살펴보자.

음료별 가격을 설정하는 부분을 setup으로 올리면,  “음료별로 가격을 설정할 수 있다”는 테스트 케이스는 없어도 될 것 같다. 그리고 Given절에서 oVendingMachine.insertCoin을 호출해서 동전을 넣어주고 잇는데, 이것도 setup으로 옮겨서 초기 투입 금액을 가지고 시작하게 만들면 중복을 제거할 수 있다.

“동전을 여러 번 넣을 수 있다”는 테스트 케이스는 balance가 돌려주는 값이 **초기 투입 금액에 영향**을 받기 때문에 DEFAULT_MONEY 변수를 전역에 선언해서 expected 값에 더하도록 했다(처음에는 그냥 테스트를 수정할 때마다 변경을 해주다가 이게 너무 귀찮아서 이런 방식을 선택했다).

```js
$(function() {
 
    var oVendingMachine = null;
    var DEFAULT_MONEY = 10000;
 
    module('VendingMachine', {
        setup : function(){
            oVendingMachine = new VendingMachine();
            oVendingMachine.supply({
                "Coke": 1,
                "Sprite" : 1,
                "Orange Juice" : 1,
                "Apple Juice" : 1,
                "NonExistingDrink": 0
            });
            oVendingMachine.setPrice({
                "Coke": 500,
                "Sprite" : 300,
                "Orange Juice" : 200,
                "Apple Juice" : 100
            });
            oVendingMachine.insertCoin(DEFAULT_MONEY);
        },
        teardown : function(){
            /* 리소스 정리 */
            oVendingMachine = null;
        }
    });
 
    test("자판기에서 원하는 음료를 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Sprite");
        var sBeverage3 = oVendingMachine.buy("Orange Juice");
        var sBeverage4 = oVendingMachine.buy("Apple Juice");
 
        // Then
        equal(sBeverage1, "Coke");
        equal(sBeverage2, "Sprite");
        equal(sBeverage3, "Orange Juice");
        equal(sBeverage4, "Apple Juice");
    });
 
    test("재고가 있는 음료만 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("NonExistingDrink");
 
        // Then
        equal(sBeverage1, null);
    });
 
    test("재고만큼 음료를 구매할 수 있다.", function(){
        // given
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
 
    test("동전을 여러 번 넣을 수 있다.", function(){
        // given
        // when
        oVendingMachine.insertCoin(500);
        oVendingMachine.insertCoin(100);
 
        // then
        equal( oVendingMachine.balance(), DEFAULT_MONEY + 600);    //  DEFAULT_MONEY에 합산한다.
    });
 
    test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
 
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
 
});
```

그리고 테스트를 다시 돌려보면 5번 케이스가 깨진다.

[![5번이 깨진다.](/assets/images/legacy/5번이-깨진다..png)](/assets/images/legacy/5번이-깨진다..png)

setup에서 동전을 10,000원이나 넣고 있기 때문에, 잔액이 부족한 상황을 연출할 수가 없다. 1번 테스트 케이스를 통과할 수 있을 정도의 금액(2,000원)만 초기에 설정해주고, 깨지는 5번 테스트 케이스의 given 절에서 콜라를 3번 구매하고 시작하면 간단하게 문제를 해결할 수 있다.

테스트 코드가 아래와 같이 바꼈다.

```js
$(function() {
 
    var oVendingMachine = null;
    var DEFAULT_MONEY = 2000;
 
    module('VendingMachine', {
        setup : function(){
            oVendingMachine = new VendingMachine();
            oVendingMachine.supply({
                "Coke": 1,
                "Sprite" : 1,
                "Orange Juice" : 1,
                "Apple Juice" : 1,
                "NonExistingDrink": 0
            });
            oVendingMachine.setPrice({
                "Coke": 500,
                "Sprite" : 300,
                "Orange Juice" : 200,
                "Apple Juice" : 100
            });
            oVendingMachine.insertCoin( DEFAULT_MONEY );
        },
        teardown : function(){
            /* 리소스 정리 */
            oVendingMachine = null;
        }
    });
 
    test("자판기에서 원하는 음료를 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Sprite");
        var sBeverage3 = oVendingMachine.buy("Orange Juice");
        var sBeverage4 = oVendingMachine.buy("Apple Juice");
 
        // Then
        equal(sBeverage1, "Coke");
        equal(sBeverage2, "Sprite");
        equal(sBeverage3, "Orange Juice");
        equal(sBeverage4, "Apple Juice");
    });
 
    test("재고가 있는 음료만 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("NonExistingDrink");
 
        // Then
        equal(sBeverage1, null);
    });
 
    test("재고만큼 음료를 구매할 수 있다.", function(){
        // given
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
 
    test("동전을 여러 번 넣을 수 있다.", function(){
        // given
        // when
        oVendingMachine.insertCoin(500);
        oVendingMachine.insertCoin(100);
 
        // then
        equal( oVendingMachine.balance(), DEFAULT_MONEY + 600);
    });
 
    test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
        oVendingMachine.buy("Coke");
        oVendingMachine.buy("Coke");
        oVendingMachine.buy("Coke");
 
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");
 
        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });
 
});
```

- ~~음료를 뽑을 수 있다.~~
- ~~콜라, 사이다, 오렌지 주스, 사과 주스 중 원하는 음료를 뽑을 수 있다.~~
- **동전을 넣을 수 있다.**
- ~~**음료별로 가격을 설정할 수 있다.**~~
- 지폐를 넣을 수 있다.
- 거스름 돈을 반환 받을 수 있다.
- ~~재고만큼 음료를 구매할 수 있다.~~ 

## 점진적 명세 작성

지금까지 총 다섯 개의 테스트 케이스를 만들었다. 각각의 테스트 케이스는 사용자 관점의 시나리오를 기반으로 작성한 명세를 가지고 있다. 눈치 챘는지 모르겠지만 지금까지 작성한 명세는 일련의 공통된 흐름을 가지고 변화해 왔다.

- 음료수를 구매할 수  있다. -> 원하는 음료를 구매할 수 있다. -> 재고만큼 음료를 구매할 수 있다.
- 동전을 넣을 수 있다. -> 동전을 여러 번 넣을 수 있다. -> 동전을 넣은 만큼 음료를 구매할 수 있다.

우선 하나의 기능을 선택한다(어떤 기능을 선택할 것이냐는 TDD와 BDD의 관점이 조금 다른데, 여기에서 그 부분은 논외로 하겠다).

사용자 관점에서 선택한 기능에 대한 가장 낮은 단계, 즉 아주 단순한 명세를 만든다. 명세에 살을 조금씩 덧붙여가다가, 다른 기능과 자연스럽게 어울리는 하나의 시나리오를 만든다. 즉, 바깥쪽에서 안쪽으로 조금씩 파고드는 형식인 셈이다. 명세를 표현하는 것이 테스트 코드이고, 테스트를 통과하기 위한 코드를 작성하면서 전체 개발을 진행해나가는 것이 TDD이기 때문에, 결국 명세의 흐름이 그대로 코드에 반영된다.

이런 식으로 TDD를 진행함으로써 얻을 수 있는 몇 가지 이점이 있다.

**첫 번째, 당장 해결해야하는 문제의 범위를 좁힐 수 있기 때문에 문제를 훨씬 쉽게 풀어나갈 수 있다.** 가장 단순한 단계부터 조금씩 구현 수준을 높혀가는 방식을 취함으로써 문제의 범위를 좁힐 수 있다.  인간의 한계를 인정하는 애자일의 철학이 묻어있다(개인적으로 이 점이 정말 매력적이다. 인간은 한계가 많은 동물이다).

**두 번째, 사용자 관점에서 애플리케이션의 행위를 바라보기 때문에 외부로 공개하는 인터페이스를 자연스럽게 추상화 할 수 있다.** 사용자 관점에서 가치있는 행위를 중심으로 테스트 코드를 작성함으로써 외부에 공개할 필요 없는 동작이 감춰진다. 이를 통해서 모듈의 인터페이스가 산만하게 흩어지는 것을 막을 수 있다. 물론 어디까지나 명세를 사용자 관점에서 잘 작성했을 때의 이야기다. 개발자 관점으로 명세를 작성하게 되면 이러한 이점을 취하기가 어려운데, 테스트가 지나치게 작고 얇게 만들어져서 모양새가 산만해지는 경우가 많다.   이쯤되면 명세를 작성하는 일이 얼마나 중요한지 감이 올 것이다. 그야말로 명세가 반이다. 또한 프로그래밍도 결국 하나의 글쓰기라는 것도 알 수 있다. 내가 이 힘들고 귀찮은 블로깅을 시작한 이유이기도 하다.

## 다음 장에 계속…

이번 장에서는 “동전 넣기” 기능을 추가하면서 명세가 진화해나가는 과정을 살펴보았다. 수련하면서 느끼는 건데 정말 명세가 반이다. 명세를 얼마나 잘 작성하고, 매끄럽게 발전시켜 나가느냐가 관건이다. 결국 글쓰기 능력이 아주 중요한데 이게 부족해서  TDD에 실패하는 경우도 종종 있는 것 같다. TDD를 잘하고 싶다면 글쓰기 연습도 함께 할 것을 추천하고 싶다.

다음 장에서 지폐 넣기와 반환 기능을 추가하면 시리즈가 일단락된다. 그 다음에는 간단한 UI 를 얹으면서 TDD를 진행해 볼 생각이다. 아마 가장 어려우면서 ROI는 잘 안 나오는 부분이 아닐까 생각한다. 그래서 사람들이 가장 궁금해하는 부분이기도 하고. 이 포스트와 별개로 회사 프로젝트를 하면서 조금씩 연습 해보고 있는데 삽질을 아주 많이 해서 재밌는 이야기가 좀 나올 것 같다. 그에 따라 반론도 엄청 많이 나올 것 같아서 조금은 걱정 되지만…

어쨌든 오늘은 여기까지.
