const {createLogger} = require('../lib/index')

const logger = createLogger({
    defaultMeta: {
        service_name: 'fdao-logger'
    },
    tracing: {
        tracerSessionName: 'test',
        requestId: '12345'
    }
})

setImmediate(() => {
    const string = 'this is a test'
    logger.info(`test`, 'hello')
    logger.info(`object`, {key: 'test', value: 1000})
    logger.info(`object1: ${{a: 1}}`)
    logger.error(`object2: ${string}`)
})