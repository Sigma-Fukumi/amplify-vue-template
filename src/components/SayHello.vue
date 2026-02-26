<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'
import { fetchAuthSession } from 'aws-amplify/auth'
import outputs from '../../amplify_outputs.json'

const { user, signOut } = useAuthenticator()

const executeLambda = async() => {
    const awsRegion = outputs.auth.aws_region;
    const functionName = outputs.custom.sayHelloFunctionName;
    const { credentials } = await fetchAuthSession();
    const lambda = new LambdaClient({ credentials: credentials, region: awsRegion })
    const command = new InvokeCommand({
    FunctionName: functionName,
    });
    const apiResponse = await lambda.send(command);

    if (apiResponse.Payload) {
    const payload = JSON.parse(new TextDecoder().decode(apiResponse.Payload));
    console.log(payload);
    }
}

</script>

<template>
    <button @click="executeLambda()">test</button>
</template>