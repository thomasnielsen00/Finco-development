import express from 'express';
import companyService from './company-service';

/**
 * Express router containing methods.
 */
const router = express.Router();

router.get('/companies', (_request, response) => {
  companyService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/companies/:company_id', (request, response) => {
  const company_id = Number(request.params.company_id);
  companyService
    .get(company_id)
    .then((company) =>
      company ? response.send(company) : response.status(404).send('Company not found')
    )
    .catch((error) => response.status(500).send(error));
});

// router.get('/tasks/:id', (request, response) => {
//   const id = Number(request.params.id);
//   taskService
//     .get(id)
//     .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
//     .catch((error) => response.status(500).send(error));
// });

export default router;
