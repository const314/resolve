---
id: summary
title: Summary
---

- [Introduction](introduction.md)

  - [Setting Up](introduction.md#setting-up)
    - [Prerequisites](introduction.md#prerequisites)
    - [Getting Started](introduction.md#getting-started)
  - [Examples](introduction.md#examples)
  - [Learning Resouces](introduction.md#learning-resouces)

- [Basics](basics/README.md)

  - [reSolve app structure](basics/resolve-app-structure.md)
    - [Configuration](basics/resolve-app-structure.md#configuration)
    - [Write and Read Sides](basics/resolve-app-structure.md#write-and-read-sides)
    - [Folder Structure](basics/resolve-app-structure.md#folder-structure)
    - [Storage Adapters](basics/resolve-app-structure.md#storage-adapters)
  - [Write Side](basics/write-side.md)
    - [Configuring Commands and Events](basics/write-side.md#configuring-commands-and-events)
    - [Sending a Command](basics/write-side.md#sending-a-command)
    - [Command Handler](basics/write-side.md#command-handler)
    - [Aggregate Projection Function](basics/write-side.md#aggregate-projection-function)
    - [Event Store](basics/write-side.md#event-store)
  - [Read Side](basics/read-side.md)
    - [Read Models and View Models](basics/read-side.md#read-models-and-view-models)
    - [Configuring Read Models](basics/read-side.md#configuring-read-models)
    - [Initialize Read Model](basics/read-side.md#initialize-read-model)
    - [Updating Read Model via Projection Function](basics/read-side.md#updating-read-model-via-projection-function)
    - [Resolvers](basics/read-side.md#resolvers)
    - [Performing Queries Using HTTP API](basics/read-side.md#performing-queries-using-http-api)
    - [View Model Specifics](basics/read-side.md#view-model-specifics)
  - [Frontend](basics/frontend.md)
    - [React/Redux Support](basics/frontend.md#react-redux-support)
    - [Sending Commands as Redux Actions](basics/frontend.md#sending-commands-as-redux-actions)
    - [Reactive View Models, Event Subscription](basics/frontend.md#reactive-view-vodels-event-subscription)
    - [Optimistic Commands](basics/frontend.md#optimistic-commands)

- [Authentication and Authorization](authentication-and-authorization.md)

  - [Setting up Authentication](authentication-and-authorization.md#setting-up-authentication)
  - [Using 3rd Party Auth Services](authentication-and-authorization.md#using-3rd-party-auth-services)
  - [Making Your Own User Registry](authentication-and-authorization.md#making-your-own-user-registry)
  - [Using JWT Tokens for C and Q Authorization](authentication-and-authorization.md#using-jwt-tokens-for-c-and-q-authorization)

- [Preparing to Production](preparing-to-production.md)

  - [Configuration Options](preparing-to-production.md#configuration-options)
  - [Configuring Adapters](preparing-to-production.md#configuring-adapters)
  - [Configure App URLs](preparing-to-production.md#configure-app-urls)

- [Advanced Techniques](advanced-techniques.md)

  - [Splitting Code Into Chunks](advanced-techniques.md#splitting-code-into-chunks)
  - [Running Serverless](advanced-techniques.md#running-serverless)
  - [Server-Side Rendering](advanced-techniques.md#server-side-rendering)
  - [Process Managers (Sagas)](advanced-techniques.md#process-managers-sagas)

- [FAQ](faq.md)
- [API Reference](api-reference.md)
- [Troubleshooting](troubleshooting.md)