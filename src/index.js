import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(
    process.env.NODE_ENV === undefined
      ? `Running on Production Server`
      : `Running on ${process.env.NODE_ENV} Server`
  );
});
