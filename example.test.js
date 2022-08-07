describe('try sqlite3', () => {
  it('try sqlite3', async () => {
    console.log('before')

    await new Promise(resolve => {
      const db = new window.sqlite3.Database(':memory:')
      db.close(resolve)
    })

    console.log('after')
  })
})
