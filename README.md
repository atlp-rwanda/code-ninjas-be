# Barefoot Nomad

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

## Usage

## - (For development):

### Environment variables

Reminder to:

- create a .env file and insert referring values as shown in .env.example
- add a sample in .env.example for newly added environment variables

### ES2015+ module:

For running without compiling first.

**Note:** Remember to set **"type":"module"** in package.json first and delete before push

```
{
    ...
    "type":"module"
}
```

Running script
```bash
yarn run dev
```


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
#### What does this PR do?
#### Description of Task to be completed?
#### How should this be manually tested?
#### Any background context you want to provide?
#### What are the relevant pivotal tracker stories?
#### Screenshots (if appropriate)
#### Questions:
```