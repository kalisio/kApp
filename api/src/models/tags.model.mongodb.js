export default async function (app, options) {
  const db = options.db || app.db
  options.Model = db.collection('tags')
  // Use compound index to have unique pairs scope/value
  await options.Model.createIndex({ name: 1 }, { unique: true })
}
