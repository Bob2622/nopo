### 配置中目录选择规则说明

支持 glob 配置，如果为文件夹必须以 ‘/’ 结尾
source 选择器示例
```shell
./ -> 获取当前目录下所有文件和文件夹（默认加上**，即包含所有子文件夹）
./* -> 获取当前目录下所有文件和文件夹（不包含子目录）
./*.js -> 获取当前目录下所有js文件（不包含子目录）
./***.js -> 等价于 ./*.js
./*/*.js -> 获取一级子目录下js文件，如：‘./test/test.js’
./*/*/*.js -> 获取二级子目录下js文件，如：‘./test/test/test.js’
./**/*/*.js -> 获取子目录级别大于1的目录下js文件，如：‘./test/test.js’, ‘./test/test/test.js’
./*/**/*.js -> 等价于./**/*/*.js
./**/*.js -> 获取当前目录下及子文件夹下所有js文件
./**/*.{js,txt} -> 获取 js/txt 
./abc?.js -> ?指代1个任意字符 如：‘./abc1.js’,
./abc*.js -> *0个以上任意字符 如：‘./abc.js’, ‘./abc1.js’, ‘./abc01.js’
./abc**.js -> *0个以上任意字符 如：‘./abc.js’, ‘./abc1.js’, ‘./abc01.js’
#./aab.js -> 注释用的
!./aab.js -> 非
/ -> 当前盘根目录，如 E:\\
/Server -> E:\\Server\\ 在win平台下推荐使用相对路径写法
```