import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [{
        'https://parseapi.back4app.com/graphql': {
            headers: {
                "X-Parse-Application-Id": process.env.APP_ID,
                "X-Parse-Client-Key":  process.env.CLIENT_KEY,
                "X-Parse-Master-Key": process.env.JS_KEY
            }
        }
    }],
    documents: ['src/**/*.graphql.ts'],
    generates: {
        'src/schema.ts': {
            plugins: ['typescript']
        },
        'src': {
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.generated.tsx',
                baseTypesPath: 'schema.ts',
            },
            plugins: [
                'typescript-operations',
                'typescript-react-apollo'
            ],
            config: {
                withHooks: true
            }
        }
    }
}


export default config
