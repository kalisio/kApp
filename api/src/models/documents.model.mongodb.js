export default function (app, options) {
  const db = options.db || app.db
  options.Model = db.collection('documents')
  // Use compound index to have unique pairs scope/value
  options.Model.createIndex({ name: 1 }, { unique: true })
}
