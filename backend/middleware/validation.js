const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorIssues = result.error.issues || result.error.errors || [];
    return res.status(400).json({
      success: false,
      errors: errorIssues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }
  req.body = result.data;
  next();
};

module.exports = validate;
