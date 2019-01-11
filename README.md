# Potential TestCafe Fixture Hook Bug

With two tests

```
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
```

```
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

```

The following output is expected

```
npm test.......


> testcafe-overlapping-hooks@1.0.0 test /Users/john/git/testcafe-overlapping-hooks
> testcafe chrome:headless testcafe/tests/*

 Running tests in:
 - HeadlessChrome 71.0.3578 / Mac OS X 10.14.1

 fixture one
SETUP 1 START
SETUP 1 DONE
Starting Test
Finished Test
TEARDOWN 1 START
TEARDOWN 1 DONE
 ✓ this is my first test

 fixture two
SETUP 2 START
SETUP 2 DONE
Starting Test
Finished Test
TEARDOWN 2 START
TEARDOWN 2 DONE
 ✓ this is my second test
```

BUT this is the output....


```
npm test.......

> testcafe-overlapping-hooks@1.0.0 test /Users/john/git/testcafe-overlapping-hooks
> testcafe chrome:headless testcafe/tests/*

 Running tests in:
 - HeadlessChrome 71.0.3578 / Mac OS X 10.14.1

 fixture one
SETUP 1 START
SETUP 1 DONE
Starting Test
Finished Test
TEARDOWN 1 START
SETUP 2 START
TEARDOWN 1 DONE
 ✓ this is my first test

 fixture two
SETUP 2 DONE
Starting Test
Finished Test
TEARDOWN 2 START
TEARDOWN 2 DONE
 ✓ this is my second test
```

To highlight, the setup of test 2 starts before the teardown of test one is finished

```
TEARDOWN 1 START
SETUP 2 START
TEARDOWN 1 DONE
```
