## Pull Request Naming and Description Convention

### PR Naming

```
#<story-id> story description
```

Example

```
#869522144 Most travelled destinations
```

### PR Description Template (Markdown)

The description should contain the following headings and the related content:

```
### What does this PR do?
 Set up the migrations and models structure
### Description of Task to be completed?
Configure BareFoot Nomad to use PostgreSQL as DB Engine and Sequelize ORM By
Setting up the migrations and models structure & creating user table and model setup to test the whole configuration

### How should this be manually tested?
Get started By Running commands bellow:
  - clone repo
  - switch to develop branch
  - ``yarn install``: to install all dependencies
  - ``yarn run migrate``: to migrate table
  - ``yarn run run-seeds``: to populate table with sample data
  - ``yarn run down``: to drop table(be careful you will lose all your data)
Test if you can access data stored in your database:
  - Create .env file
  - add database url using "DB_CONNECT" as variable
  - add database password using "DB_PASSWORD" as variable
  - Open postman
  - type in this route "localhost:3000/api/user" and use ``GET`` http verb  (you will be able to see all users in your database)

### Any background context you want to provide?
### What are the relevant pivotal tracker stories?
[#181414700](https://www.pivotaltracker.com/story/show/181414700)
### Screenshots (if appropriate)
### Questions:
```
