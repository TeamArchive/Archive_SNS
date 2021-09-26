<div align="center">
	<img src="./images/archive_sns_logo.png" width="40%" alter="archive sns logo" />
	<h1> Archive SNS </h1>
</div>

# 소개

페이스북과 네이버 밴드를 모티브로 만든 그룹형태의 SNS 서비스. Nest.JS 와 React.JS 를 활용하여 구현하였다.

<br/>

## 👪 팀원 역할

| 이름 | 역할 | Github |
| :----------: | :---------: | :---------: |
| 김형준 | BE | [junnikym](https://github.com/junnikym) |
| 이상규 | BE | [salgu1998](https://github.com/salgu1998) |
| 박보성 | FE | [solarpark7346](https://github.com/solarpark7346) |

<br/>

## 💻 개발 환경
| BE | FE |
| :----------: | :---------: |
| Nest.JS | React.JS | 
| TypeORM | Redux |
| MySQL | |
| WebSocket | |

<br/>

## 📋 주요 키워드
 - REST API
 - Git 버전관리
 - ORM
 - Web Socket
 - Passport / Oauth2
 - File upload
 - Swagger

<br/>

# 환경설정 
<pre>
> git clone https://github.com/TeamArchive/Archive_SNS.git

Backend
> cd server & npm install
> npm run start

Frontend
> cd ../app & npm install
> npm start
</pre>

<br/>

## ERD
<div align="center">
<img src="./images/db_erd.svg" width="75%" alter="archive sns logo" />
</div>

<br/>

## 실행 화면
<div style="margin-left:25px;">
<h3><strong>Swagger - REST API</strong></h3>
<div style="margin-left:15px;">
<details markdown="1">
<summary>Account</summary>

![account](https://user-images.githubusercontent.com/76906458/134766959-6f6d24f1-7811-4e4c-98d4-1b41d21be583.JPG)

</details>

<details markdown="1">
<summary>Auth</summary>

![auth](https://user-images.githubusercontent.com/76906458/134766960-7200f275-1327-468c-937f-942c25d709ab.JPG)

</details>

<details markdown="1">
<summary>Post</summary>

![post](https://user-images.githubusercontent.com/76906458/134766967-0b25e2a9-966b-4190-baad-d62b36e94eca.JPG)

</details>

<details markdown="1">
<summary>PostLike</summary>

![postlike](https://user-images.githubusercontent.com/76906458/134766958-dcd8769a-a043-4b60-afeb-69f91ba2b010.JPG)

</details>

<details markdown="1">
<summary>PostGroup</summary>

![post_group](https://user-images.githubusercontent.com/76906458/134766968-6e182e37-8cc2-4aad-ac67-4cab3737a177.JPG)

</details>

<details markdown="1">
<summary>Comment</summary>

![comment](https://user-images.githubusercontent.com/76906458/134766963-43cebfc2-51ef-4c0c-a57e-490e98b671e7.JPG)

</details>

<details markdown="1">
<summary>CommentLike</summary>

![commentlike](https://user-images.githubusercontent.com/76906458/134766965-62523296-9b00-4c9e-bb53-2c5e3450943e.JPG)

</details>

<details markdown="1">
<summary>Friend</summary>

![friend](https://user-images.githubusercontent.com/76906458/134766966-871515d9-6203-4bb3-adf7-b372722fe91f.JPG)

</details>

<details markdown="1">
<summary>Chat</summary>

![chat](https://user-images.githubusercontent.com/76906458/134766961-b2f2936c-de9f-42d6-8850-9d91b15790fe.JPG)

</details>

<details markdown="1">
<summary>ChatGroup</summary>

![chat-group](https://user-images.githubusercontent.com/76906458/134766962-9ad01c16-7853-45c4-9cb3-8ade64d6c1d5.JPG)

</details>
</div>
</div>
<br/>

-----
Archive SNS is [MIT licensed](LICENSE).