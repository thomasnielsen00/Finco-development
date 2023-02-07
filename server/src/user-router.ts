import express from 'express';
import userService from './user-service';

/**
 * Express router containing user methods.
 */
const router = express.Router();

router.get('/users', (_request, response) => {
  userService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/users/:user_id', (request, response) => {
  const user_id = Number(request.params.user_id);
  userService
    .get(user_id)
    .then((user) => (user ? response.send(user) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

// Example request body: { username: "new user" }
// Example response body: { user_id: 4 }
router.post('/users', (request, response) => {
  const data = request.body;
  if (data && data.title && data.title.length != 0)
    userService
      .create(
        data.username,
        data.password,
        data.email,
        data.risk_willingness,
        data.monthly_savings_amount
      )
      .then((new_id) => response.send({ user_id: new_id }))
      .catch((error) => response.status(500).send(error));
  else
    response
      .status(400)
      .send(
        'Missing task one of the following attributes: username, password, email, risk_willingnes, monthly_savings_amount'
      );
});

router.delete('/users/:user_id', (request, response) => {
  userService
    .delete(Number(request.params.user_id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
