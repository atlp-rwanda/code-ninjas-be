/* eslint-disable import/prefer-default-export */
import * as searching from '../validations/tripSearch';
import ApplicationError from '../utils/errorResponse';

const search = (req, res, next) => {
  const validateSearchValue = searching.tripSearch.validate(req.query);
  if (!validateSearchValue.error) {
    next();
  } else {
    ApplicationError.semanticError(
      {
        data: { message: validateSearchValue.error.details[0].context.label },
      },
      res
    );
  }
};
export { search };
