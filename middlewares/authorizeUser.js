import jwt from 'jsonwebtoken'


if(username === user.username && password === user.password) { 
  //if user log in success, generate a JWT token for the user with a secret key
  jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
      if(err) { console.log(err) }    
      res.send(token);
  });
} else {
  console.log('ERROR: Could not log in');
}