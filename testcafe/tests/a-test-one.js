fixture`fixture one`
  .page('https://www.google.com/')
  .before(async () => {
    console.log('SETUP 1 START');
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log('SETUP 1 DONE');
  })
  .after(async () => {
    console.log('TEARDOWN 1 START')
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log('TEARDOWN 1 DONE')
  });


test('this is my first test', async (t) => {
    console.log('Starting Test');
    console.log('Finished Test');
});
