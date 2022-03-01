# code-ninjas-be
Code Ninjas Barefoot Nomad Backend Development

## Usage

### For development:

#### Environment variables

Reminder to:

- create a .env file and insert referring values as shown in .env.example
- add a sample in .env.example for newly added environment variables

#### ES2015+ module:

For running without compiling first.

**Note:** Remember to set **"type":"module"** in package.json first and delete before push

```package.json
{
    devDependencies: {

    },
    "type":"module"
}
```

Running script
```bash
yarn run dev
```
