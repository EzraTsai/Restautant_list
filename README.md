# Restautant_list
一個使用 Node.js + Express 打造的餐廳美食網站，提供使用者依照餐廳名稱進行搜尋，並可管理自己的餐廳清單，如新增、修改、刪除餐廳資料等功能。

# 專案畫面
![image](https://github.com/EzraTsai/Restautant_list/blob/master/image/picture4.png)
![image](https://github.com/EzraTsai/Restautant_list/blob/master/image/picture2.png)

# Features - 產品功能
* 使用者可以註冊一個帳號
* 使用者也可以透過 Facebook Login 直接登入
* 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
* 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳
* 使用者可以排序所有餐廳

# Environment SetUp - 環境建置
MongoDB v4.0 以上
Node.js

# Installing - 專案安裝流程
1. 打開你的 terminal，Clone 此專案至本機電腦  
```git clone https://github.com/EzraTsai/Restautant_list.git```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾  
```cd restaurantList```

3. 安裝 npm 套件  
```在 Terminal 輸入 npm install 指令```

4. 匯入種子檔案  
```npm run seed 匯入使用者與餐廳資料```

5. 啟動伺服器，執行 app.js 檔案  
```nodemon app.js```

6. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結  
```The Express server is running on http://localhost:3000```

# Contributor - 專案開發人員
Ezra.Tsai
