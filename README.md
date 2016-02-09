A content type for [H5P](http://h5p.org) that displays a prompt and a simple text box. The user's submission is emitted as an xAPI statement with the `answered` verb. 

To add a simple xAPI reporter to test that the submission is happening, paste the following into your browser's console before clicking `Submit`:

```
H5P.externalDispatcher.on('xAPI', function (event) {
  console.log(event.data.statement);
});
```

See [here](https://h5p.org/documentation/x-api) for more on H5P and xAPI.

See [here](https://h5p.org/tutorial-greeting-card) for more on custom H5P content types.
