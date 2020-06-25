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
  createTodo(input:{title:"My title"}) {
    title
  }
}
```


