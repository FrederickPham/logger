# logger
A logger for just about everything.



### Installation

1. Install NPM packages
   ```sh
   yarn add @fdrpham/logger
   ```
   or

    ```sh
   npm install @fdrpham/logger
   ```

2. Enter your logger config and use

   ```JS
    import {createLogger} from '@fdrpham/logger'

    const logger = createLogger({
        defaultMeta: {
            service_name: 'fdr-logger'
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
