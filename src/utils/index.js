//  Mapping Object structure for response GET All
const mapDBToModelGetAll = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

// Mapping Object structure for response GET by id
const mapDBToModelGetSpecified = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModelGetAll, mapDBToModelGetSpecified };
