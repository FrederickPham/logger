# logger
A logger for just about everything.



### Installation

1. Install NPM packages
   ```sh
   yarn add @fdao/logger
   ```
   or

    ```sh
   npm install @fdao/logger --save
   ```

2. Enter your logger config and use

   ```JS
    import {createLogger} from '@fdao/logger'

    const logger = createLogger({
        defaultMeta: {
            service_name: 'fdao-logger'
        },
        tracing: {
            tracerSessionName: 'test',
            requestId: '12345'
        }
    })

    // info || error || warn || debug
    logger.info('info', String | Object)
    
    // or
    const log = {data: "sample"}
    logger.info(`info ${JSON.stringify(log)}`)

   ```