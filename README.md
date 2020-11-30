# React hooks

## 说明

- typescript版本的hooks
- 很多要配合具体的业务使用，效果更好
- 之前工作中的积累，现在考虑要换工作， 要慢慢的重新的收集。。。

## 启动项目，查看效果

```bash
$ npm i
$ npm start
```


### useRequest

- typescript 版本的 useRequest, 可以声明【请求参数类型】与【返回数据类型】，在开发早期定义，以便后续更改或填充实际值
- 避免直接使用axios等库的callback地狱
- 与社区的实现相比，简单易用，没有集成多余功能

### useMergeState

- 简单的 useMergeState 钩子，相较于useState的直接替换，本钩子做merge操作
- 可重置为原始state
- 目前最主要的使用场景为 可以设置很多筛选条件的列表。把所有的的筛选值合并到同一对象，每次更改某一个条件，拿到变化后的筛选条件，再从后端取数据

### useToggle

- 简单的toggle钩子，可重置状态
- 用于两种状态的切换场景

### LICENCE
MIT
