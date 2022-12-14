import jwt from "jsonwebtoken";

const secret = 'test';

// not called
const auth = async (req, res, next) => {
  console.log('calling auth in middleware')
  try {
    console.log(req.headers);
    const token = req.headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;