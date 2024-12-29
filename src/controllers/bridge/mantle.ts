import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

import BadRequest from '../../errors/bad-request';
import ApplicationError from '../../errors/application-error';

export const create: RequestHandler = async (req, res, next) => {
  const { mnemonicSeed, path } = req.body;
  await check('mnemonicSeed', 'mnemonicSeed cannot be blank')
    .not()
    .isEmpty()
    .run(req);
  await check('path', 'path cannot be blank').not().isEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new BadRequest(
        errors
          .array()
          .map((e) => e.msg)
          .join(', ')
      )
    );
  }

  try {
    res.json({
      hello: 'hello',
    });
  } catch (error) {
    return next(new ApplicationError());
  }
};
