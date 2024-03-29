import express, { request, response } from 'express';
import userService from './user-service';
import bcrypt from 'bcryptjs';

/**
 * Express router containing user methods.
 */
const router = express.Router();
export const salt = bcrypt.genSaltSync(10);
//trenger denne å eksporteres?

router.get('/', (_request, response) => {
  response.send('Hello world');
});

router.get('/users', (_request, response) => {
  userService
    .getAllUsers()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/users/:user_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  userService
    .getUser(user_id)
    .then((user) => (user ? response.send(user) : response.status(404).send('User not found')))
    .catch((error) => response.status(500).send(error));
});

// login
router.get('/users/login/:email/:password', (request, response) => {
  const email = String(request.params.email);
  const password = String(request.params.password);
  userService
    .signInUser(email)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        response.send(user);
      } else {
        response.status(400).send('Incorrect Email and/or Password! ');
      }
    })
    .catch(() => response.status(500).send('Network error'));
});

// register new user with bcrypt
router.post('/users/register', (request, response) => {
  const data = request.body;
  if (
    data &&
    data.password &&
    data.password.length != 0 &&
    data.email &&
    data.email.length != 0 &&
    data.full_name &&
    data.full_name.length != 0
  )
    userService
      .emailCheck(data.email)
      .then(() => {
        bcrypt.hash(data.password, salt, (error, hash) => {
          if (error) throw error;
          data.password = hash;
          userService
            .createUser(data.full_name, data.email, data.password)
            .then((user_id) => response.send({ user_id: user_id }))
            .catch((error) => response.status(500).send(error));
          return;
        });
      })
      .catch((error) => response.status(409).send(error));
  else
    response
      .status(400)
      .send('Missing one or more of the following attributes: full_name, email, password');
});

// Updates a user´s information
router.put('/users/:user_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  const data = request.body;
  if (
    data &&
    typeof data.full_name == 'string' &&
    data.full_name.length != 0 &&
    typeof data.email == 'string' &&
    data.email.length != 0 &&
    typeof data.password == 'string' &&
    data.password.length != 0 &&
    typeof data.phone_number == 'string' &&
    data.phone_number.length != 0 &&
    typeof data.savings_from == 'number' &&
    data.savings_from >= 0 &&
    typeof data.savings_to == 'number' &&
    data.savings_to >= 0 &&
    data.savings_to >= data.savings_from &&
    typeof data.risk_willingness == 'string' &&
    data.risk_willingness.length != 0 &&
    typeof user_id == 'number' &&
    user_id != 0
  )
    userService
      .updateUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
        savings_from: data.savings_from,
        savings_to: data.savings_to,
        risk_willingness: data.risk_willingness,
        user_id: user_id,
      })
      .then(() => response.send('User was updated'))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Propperties are not valid');
});

router.delete('/users/:user_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  if (typeof user_id == 'number' && user_id != 0) {
    userService
      .deleteUser(user_id)
      .then((_result) => response.send())
      .catch((error) => response.status(500).send(error));
  } else {
    response.status(400).send('Propperties are not valid');
  }
});
//--------------------------------------------------------------------------------------------------------------------------------------
//INVESTMENTS:
//--------------------------------------------------------------------------------------------------------------------------------------

//A path to a given user´s investments
router.get('/users/:user_id/investments', (request, response) => {
  const user_id = Number(request.params.user_id);
  userService
    .getAllUserInvestments(user_id)
    .then((userInvestments) =>
      userInvestments
        ? response.send(userInvestments)
        : response.status(404).send('User-investments not found')
    )
    .catch((error) => response.status(500).send(error));
});

//A path to a given user´s given investment
router.get('/users/:user_id/investments/:investment_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  const investment_id = Number(request.params.investment_id);
  userService
    .getUserInvestment(user_id, investment_id)
    .then((userInvestment) =>
      userInvestment
        ? response.send(userInvestment)
        : response.status(404).send('User-investment not found')
    )
    .catch((error) => response.status(500).send(error));
});

router.put('/users/:user_id/investments/:investment_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  const investment_id = Number(request.params.investment_id);
  const data = request.body;
  if (
    data &&
    typeof data.sell_date == 'string' &&
    data.sell_date.length != 0 &&
    typeof user_id == 'number' &&
    user_id != 0 &&
    typeof investment_id == 'number' &&
    investment_id != 0
  )
    userService
      .updateSoldUserInvestment(data.sell_date, user_id, investment_id)
      .then(() => response.send('Sell_date was updated'))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Propperties are not valid');
});

//A path that contributes to creating a new investment for a given user
//SKAL DET VÆRE PARANTES ETETR INVESTMENTS HER PÅ POST?
//--------------------------------------------------------
router.post('/users/:user_id/investments', (request, response) => {
  const data = request.body;
  //Hvordan blir det med yield?
  //Det trengs vel strengt tatt ikke å være nødvendig å pushe inn når et investering lages i utgangspunktet
  if (
    data &&
    data.amount &&
    data.amount.length != 0 &&
    data.buy_price &&
    data.buy_price != 0 &&
    data.buy_date &&
    data.buy_date.length != 0 &&
    // data.sell_date &&
    // data.sell_date.length != 0 &&
    data.user_id &&
    data.user_id != 0 &&
    data.company_id &&
    data.company_id != 0
  )
    userService
      .createUserInvestment(
        data.amount,
        data.buy_price,
        data.buy_date,
        // data.sell_date,
        data.user_id,
        data.company_id
      )
      .then((investment_id) => response.send({ investment_id: investment_id }))
      .catch((error) => response.status(500).send(error));
  else
    response
      .status(400)
      .send(
        'Missing task one or more of the following attributes: amount, investment_date, user_id, company_id'
      );
});

//Updates a user-investment´s content

// Updates a user´s information
// router.put('/users/:user_id/investments/:investment_id', (request, response) => {
//   const investment_id = Number(request.params.investment_id);
//   const user_id = Number(request.params.user_id);
//   const data = request.body;
//   if (
//     typeof user_id == 'number' &&
//     user_id != 0 &&
//     typeof investment_id == 'number' &&
//     investment_id != 0 &&
//     typeof data.amount == 'number' &&
//     data.amount != 0 &&
//     typeof data.investment_date == 'string' &&
//     data.investment_date.length != 0 &&
//     typeof data.investment_yield == 'string' &&
//     data.investment_yield.length != 0 &&
//     typeof data.company_id == 'number' &&
//     data.company_id != 0
//   )
//     userService
//       .updateUserInvestment({
//         amount: data.amount,
//         investment_date: data.investment_date,
//         investment_yield: data.investment_yield,
//         company_id: data.company_id,
//         user_id: user_id,
//         investment_id: investment_id,
//       })
//       .then(() => response.send('User-investment was updated'))
//       .catch((error) => response.status(500).send(error));
//   else response.status(400).send('Propperties are not valid');
// });

router.delete('/users/:user_id/investments/:investment_id', (request, response) => {
  const investment_id = Number(request.params.investment_id);
  if (typeof investment_id == 'number' && investment_id != 0) {
    userService
      .deleteUserInvestment(investment_id)
      .then((_result) => response.send())
      .catch((error) => response.status(500).send(error));
  } else {
    response.status(400).send('Propperties are not valid');
  }
});

//------------------------------------------------------------------------------------------------------------------
//           PREFERED-INDUSTRY FOR USER
//------------------------------------------------------------------------------------------------------------------

router.get('/users/:user_id/industries', (request, response) => {
  const user_id = Number(request.params.user_id);
  userService
    .getAllPreferedIndustries(user_id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/users/:user_id/industries/:industry_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  const industry_id = Number(request.params.industry_id);
  userService
    .getPreferedIndustry(user_id, industry_id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

/**
 * Get a all industries regardless of a user.
 */
router.get('/industries', (_request, response) => {
  userService
    .getAllIndustries()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.post('/users/:user_id/industries', (request, response) => {
  const user_id = Number(request.params.user_id);
  // const industry_id = Number(request.params.industry_id);
  const data = request.body;

  if (data && user_id && user_id != 0 && data.industry_name && data.industry_name.length != 0)
    userService
      .createNewPreferedIndustry(user_id, data.industry_name)
      .then(() => response.status(201).send('successfully updated'))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing task one or more of attributes');
});

// Updates a given user´s prefered industry
// router.put('/users/:user_id/industries/:industry_id', (request, response) => {
//   const industry_id = Number(request.params.industry_id);
//   const user_id = Number(request.params.user_id);
//   const data = request.body;
//   if (
//     typeof data.industry_name == 'string' &&
//     data.industry_name.length != 0 &&
//     typeof user_id == 'number' &&
//     user_id != 0 &&
//     typeof industry_id == 'number' &&
//     industry_id != 0
//   )
//     userService
//       .updatePreferedIndustry({
//         industry_name: data.industry_name,
//         user_id: user_id,
//         industry_id: industry_id,
//       })
//       .then(() => response.send('User-investment was updated'))
//       .catch((error) => response.status(500).send(error));
//   else response.status(400).send('Propperties are not valid');
// });

//BURDEN DENNE SKRIVES OM SLIK AT MAN KAN SLETTE PÅ BAKGRUNN AV INDUSTRY_NAME?
//Delete a prefered industry for a given user:

router.delete('/users/:user_id/industries/:industry_id', (request, response) => {
  const industry_id = Number(request.params.industry_id);
  const user_id = Number(request.params.user_id);

  if (
    typeof industry_id == 'number' &&
    industry_id != 0 &&
    typeof user_id == 'number' &&
    user_id != 0
  ) {
    userService
      .deletePreferedIndustry(industry_id, user_id)
      .then((_result) => response.send())
      .catch((error) => response.status(500).send(error));
  } else {
    response.status(400).send('Propperties are not valid');
  }
});

export default router;
