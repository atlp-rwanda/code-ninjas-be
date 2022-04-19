const baseHTML = (body) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
        button {
          background-color: dodgerblue;
          padding: 1rem;
          color: white;
        }
      </style>
    </head>
    <body>
      ${body}
    </body>
    </html>`;
};

const confirmTemplate = (url) => {
  const body = `<h1>You're almost there!</h1>
                <p>Confirm your email address by clicking the following link.</p>
                <a href=${url}><button>Confirm your email address</button></a>`;
  return {
    subject: 'Barefoot Nomad Welcome Message',
    html: baseHTML(body),
  };
};

const resetPasswordTemplate = (name, url) => {
  const body = `<h1>Hello, ${name}</h1>
                <p>Click on the link below to reset your passowrd</p>
                <a href=${url}><button>Reset Password</button></a>`;
  return {
    subject: 'Barefoot Nomad Password Reset',
    html: baseHTML(body),
  };
};

export { confirmTemplate, resetPasswordTemplate };
