const createTestCafe = require('testcafe')
let testcafe = null

createTestCafe('localhost', 1337, 1338)
  .then(tc => {
    testcafe = tc
    const runner = testcafe.createRunner()
    console.log('TestCafe | record.js : runner initialized !')
    try {
      runner.video('test/videos', {
        singleFile: true,
        failedOnly: false,
        pathPattern: '${DATE}/${FILE_INDEX}.mp4'
      })
    } catch (error) {
      console.log('TestCafe | record.js :' + error)
    }

    return runner
      .src(['./test/basic.test.js'])
      .browsers(['firefox'])
      .run()
  })
  .then(failedCount => {
    console.log('Tests failed: ' + failedCount)
    testcafe.close()
  })
