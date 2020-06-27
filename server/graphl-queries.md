## List all todos

```graphql
{
 	todos {
    title,
    completed
  }
}
```

## Add new todo

```graphql
mutation{
  addTodo(title:"title") {
    id
    title
  }
}
```


