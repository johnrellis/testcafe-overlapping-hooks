fixture`fixture two`
  .page('https://www.google.com/')
  .before(async () => {
    console.log('SETUP 2 START');
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log('SETUP 2 DONE');
  })
  .after(async () => {
    console.log('TEARDOWN 2 START')
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log('TEARDOWN 2 DONE')
  });


test('this is my second test', async (t) => {
  console.log('Starting Test');
  console.log('Finished Test');
});
