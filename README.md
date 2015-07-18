## Get Offer

一个使用 Polymer，Express 与 MongoDB 开发的匿名实习交流论坛。

### 运行

1. 安装 Node.js 与 MongoDB，并做好相应的配置
2. 安装依赖

  ```bash
  npm install
  bower install
  ```
3. 运行 MongoDB 并配置 db.js。默认数据库为 `mongodb://localhost:27017/getoffer`。

4. 运行服务器，可直接运行：

  ```bash
  node bin/www
  ```
  或使用 pm2 守护：

  ```bash
  npm install -g pm2  # 如果没有安装过 pm2
  pm2 start bin/www
  ```
  默认 3000 端口

### 开发

1. 安装 supervisor，gulp

  ```bash
  npm install -g supervisor
  npm install -g gulp
  ```
2. 如需要开启前端开发环境（监视前端代码并在修改时重启，使用 livereload）：

  ```bash
  gulp serve
  ```

  模拟生产环境：

  ```bash
  gulp serve:dist
  ```
3. 如需要开启后端开发环境（监视后端代码并在修改时重启）：

  ```
  npm start
  ```

### 测试

运行：

```bash
npm test
```
