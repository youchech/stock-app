export const formatDate = (dateString) => {
  if (!dateString) return '-'

  const date = new Date(dateString)

  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
