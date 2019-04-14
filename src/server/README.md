```
├── constant  
│   └── tags.ts  定义 service 的别名常量，让 service 唯一
│   └── types.ts  其他工具函数唯一化
├── controllers  实现 inversify 导出的接口，并且注入相关路由
├── interface  提供给 service 的接口
│   └── IIndex.ts  给 IndexService.ts 提供接口
├── ioc  提供给外部一个容器去做依赖注入
├── models  定义数据类型
├── services  去具体实现 interface 定义的接口，并且将 service 对应的数据灌入到 controller 中
│   └── IndexService.ts  对应 IIndex.ts 接口，实现接口
└── yarn.lock
```

package.json 具体包功能注解：

- inversify：让 node 可以使用依赖注入的方式去实现。
- inversify-binding-decorators：将 inversify 的 bind...to 方法进行简写。