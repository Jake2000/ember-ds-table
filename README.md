# Ember-ds-table

## Installation

```bash
ember install ember-ds-table
```

## Usage

Set up the table properties,

```javascript
// ../controllers/application.js
columns:  [
  {
      title: '#',
      path: 'id'
  },
  {
      title: 'Avatar',
      path: 'avatar',
      component: 'user-avatar'
  },
  {
      title: 'First Name',
      path: 'firstName'
  },
  {
      title: 'Last Name',
      path: 'lastName'
  },
  {
      title: 'Address',
      path: 'address'
  },
  {
      title: 'State',
      path: 'state'
  },
  {
      title: 'Country',
      path: 'country'
  }
],
```

```handlebars
<!-- ../templates/application.hbs -->

{{ds-table
  modelName='user'
  columns=columns
}}
```

```handlebars
<!-- ../templates/components/user-avatar.hbs -->

<img src={{value}} style="width:30px;height:30px;border-radius:50%;">
```


